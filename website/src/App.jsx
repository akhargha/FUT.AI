import * as React from "react";
import Grid from "@mui/joy/Grid"; // Import Grid from MUI Joy
import NavBar from "./Components/NavBar";
import FixtureBox from "./Components/FixtureBox";
import weeklyFixtures from "./data/weekly_fixtures.json";

const App = () => {
  return (
    <div>
      <NavBar />
      <br />
      <Grid container spacing={2} sx={{ padding: '20px'}}> {/* Add a Grid container here */}
        {weeklyFixtures.map((fixture, index) => (
          <Grid item xs={4} key={index}> {/* Each FixtureBox as a Grid item */}
            <FixtureBox
              home_team={fixture.home_team}
              away_team={fixture.away_team}
              start_time={fixture.start_time}
              venue={fixture.venue}
              home_team_logo={fixture.home_team_logo}
              away_team_logo={fixture.away_team_logo}
              score={fixture.score}
            />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default App;
