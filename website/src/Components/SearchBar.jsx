import * as React from 'react';
import { useEffect, useState } from 'react';
import Box from '@mui/joy/Box';
import Typography from '@mui/joy/Typography';
import Autocomplete from '@mui/joy/Autocomplete';
import Button from '@mui/joy/Button';
import { supabase } from '../supabase_client'; // Ensure this path is correct

export default function SearchBar() {
  const [teams, setTeams] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [highlightedTeam, setHighlightedTeam] = useState(null);

  // Fetch teams from the database
  useEffect(() => {
    const fetchTeams = async () => {
      const { data, error } = await supabase
        .from('LaLigaLeague')
        .select('team_name, team_logo');
      if (error) {
        console.error('Error fetching teams:', error);
      } else {
        setTeams(data);
      }
    };
    fetchTeams();
  }, []);

  // Function to handle highlighting an option (on hover or keyboard navigation)
  const handleHighlightChange = (event, option) => {
    setHighlightedTeam(option);
  };

  // Function to add the highlighted team to the favourites in the database
  const addTeamToFavourites = async () => {
    if (highlightedTeam) {
      setSelectedTeam(highlightedTeam);
      const { data, error } = await supabase
        .from('favourite_team')
        .insert([{ team_name: highlightedTeam.team_name }]);

      if (error) {
        console.error('Error adding team to favourites:', error);
      } else {
        console.log('Added to favourites:', highlightedTeam.team_name);
        // You can perform additional actions here, such as displaying a success message
      }
    }
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', minHeight: '100vh' }}>
      <Box sx={{ width: 400 }}>
        <Autocomplete
          placeholder="Select a team"
          options={teams}
          getOptionLabel={(option) => option.team_name}
          sx={{ width: '100%' }}
          onHighlightChange={handleHighlightChange}
          renderOption={(props, option) => (
            <Box component="li" {...props} sx={{ display: 'flex', alignItems: 'center' }}>
              <img src={option.team_logo} alt="" style={{ width: 30, height: 30, marginRight: 10 }} />
              <Typography level="body2">{option.team_name}</Typography>
            </Box>
          )}
        />
      </Box>
      <Button sx={{ ml: 1 }} onClick={addTeamToFavourites} style={{ maxHeight: "25px" }}>Add</Button>
    </Box>
  );
}
