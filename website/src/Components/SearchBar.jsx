import * as React from 'react';
import { useEffect, useState } from 'react';
import Box from '@mui/joy/Box';
import Typography from '@mui/joy/Typography';
import Autocomplete from '@mui/joy/Autocomplete';
import Button from '@mui/joy/Button';
import { supabase } from '../supabase_client';

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

  // Function to handle the addition of the highlighted team
  const handleAddTeam = () => {
    if (highlightedTeam) {
      setSelectedTeam(highlightedTeam);
      console.log(highlightedTeam);
      // Perform additional actions here, such as updating a list
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
      <Button sx={{ ml: 1 }} onClick={handleAddTeam} style={{ maxHeight: "25px" }}>Add</Button>
    </Box>
  );
}
