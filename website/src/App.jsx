import React, { useEffect, useState } from "react";
import Grid from "@mui/joy/Grid";
import NavBar from "./Components/NavBar";
import FixtureBox from "./Components/FixtureBox";
import { supabase } from "./supabase_client"; // Make sure the path to your Supabase client is correct

const App = () => {
  const [fixtures, setFixtures] = useState([]);

  useEffect(() => {
    const fetchFixtures = async () => {
      const { data, error } = await supabase
        .from("weekly_fixtures")
        .select("*");

      if (error) {
        console.error("Error fetching fixtures:", error);
      } else {
        setFixtures(data);
      }
    };

    fetchFixtures();
  }, []);

  return (
    <div>
      <NavBar />
      <br />
      <Grid container spacing={2} sx={{ padding: '20px'}}>
        {fixtures.map((fixture, index) => (
          <Grid item xs={4} key={index}>
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
