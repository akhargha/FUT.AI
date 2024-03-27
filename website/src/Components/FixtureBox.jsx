import * as React from "react";
import Card from "@mui/joy/Card";
import Typography from "@mui/joy/Typography";
import Grid from "@mui/joy/Grid";

const FixtureBox = (props) => {
  const { home_team, away_team, start_time, venue, home_team_logo,  away_team_logo, score } = props;

  return (
    <Card sx={{ width: 530 }} color="success" variant="outlined" invertedColors>
      {/** League */}
      <div style={{ display: "flex", justifyContent: "center" }}>
        <img
          src="https://media.api-sports.io/football/leagues/140.png"
          loading="lazy"
          alt=""
          style={{ maxWidth: "50px", height: "auto" }}
        />
      </div>

      {/** all grids */}
      <div>
        {/** Logo and Score */}
        <Grid container spacing={1} sx={{ flexGrow: 1 }}>
          <Grid
            item
            xs={4}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img
              src={home_team_logo}
              loading="lazy"
              alt=""
              style={{ maxWidth: "50px", height: "auto" }}
            />
          </Grid>
          <Grid
            item
            xs={4}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography level="h3">{score}</Typography>
          </Grid>
          <Grid
            item
            xs={4}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img
              src={away_team_logo}
              loading="lazy"
              alt=""
              style={{ maxWidth: "50px", height: "auto" }}
            />
          </Grid>

          {/** Team Name */}
          <Grid container spacing={1} sx={{ flexGrow: 1 }}>
            <Grid
              item
              xs={4}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography level="h3">{home_team}</Typography>
            </Grid>
            <Grid
              item
              xs={4}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            ></Grid>
            <Grid
              item
              xs={4}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography level="h3">{away_team}</Typography>
            </Grid>
          </Grid>
        </Grid>
      </div>

      <div>
        <Typography level="body-sm" style={{ textAlign: "center" }}>
          {start_time} | {venue}
        </Typography>
      </div>
    </Card>
  );
};

export default FixtureBox;
