import * as React from 'react';
import Box from '@mui/joy/Box';
import Typography from '@mui/joy/Typography';
import Autocomplete from '@mui/joy/Autocomplete';
import Button from '@mui/joy/Button'; // Import Button from '@mui/joy'
import teamsData from '../data/league_teams_list.json'; // Make sure the path is correct

export default function SearchBar() {
  const [selectedTeam, setSelectedTeam] = React.useState(null);
  const [highlightedTeam, setHighlightedTeam] = React.useState(null);

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
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Autocomplete
        placeholder="Select a team"
        options={teamsData}
        getOptionLabel={(option) => option['Team Name']}
        sx={{ width: 300 }}
        onHighlightChange={handleHighlightChange}
        renderOption={(props, option) => (
          <Box component="li" {...props} sx={{ display: 'flex', alignItems: 'center' }}>
            <img src={option['Team Logo']} alt="" style={{ width: 30, height: 30, marginRight: 10 }} />
            <Typography level="body2">{option['Team Name']}</Typography>
          </Box>
        )}
      />
      <Button onClick={handleAddTeam}>Add</Button>
    </Box>
  );
}
