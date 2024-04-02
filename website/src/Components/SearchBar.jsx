import * as React from 'react';
import Autocomplete from '@mui/joy/Autocomplete';
import Box from '@mui/joy/Box';
import Typography from '@mui/joy/Typography';

export default function SearchBar() {
  return (
    <Autocomplete
      placeholder="Combo box"
      options={top100Films}
      sx={{ width: 300 }}
      renderOption={(props, option) => (
        <Box component="li" {...props} sx={{ display: 'flex', alignItems: 'center' }}>
          <img src={option.img} alt="" style={{ width: 30, height: 30, marginRight: 10 }} />
          <Typography variant="body2">{option.label} ({option.year})</Typography>
        </Box>
      )}
    />
  );
}

const top100Films = [
  { 
    label: 'The Shawshank Redemption', 
    year: 1994,
    img: 'https://media.api-sports.io/football/teams/532.png'
  },
  {
    label: 'The Godfather',
    year: 1972,
    img: 'https://media.api-sports.io/football/teams/532.png'
  },
  {
    label: 'The Godfather',
    year: 1972,
    img: 'https://media.api-sports.io/football/teams/532.png'
  },
  {
    label: 'The Godfather',
    year: 1972,
    img: 'https://media.api-sports.io/football/teams/532.png'
  },
  {
    label: 'The Godfather',
    year: 1972,
    img: 'https://media.api-sports.io/football/teams/532.png'
  },
  {
    label: 'The Godfather',
    year: 1972,
    img: 'https://media.api-sports.io/football/teams/532.png'
  }
  // Add more film objects with img property
];
