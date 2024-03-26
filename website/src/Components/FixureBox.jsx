import * as React from "react";
import Card from "@mui/joy/Card";
import Typography from "@mui/joy/Typography";
import AspectRatio from "@mui/joy/AspectRatio";
import Button from "@mui/joy/Button";
import ButtonGroup from "@mui/joy/ButtonGroup";
import Grid from "@mui/joy/Grid";

const FixureBox = (props) => {
  const { imageSrc, name, position, emailAddress, linkedinUrl } = props;

  return (
    <Card sx={{ width: 500 }} color="neutral" variant="outlined" invertedColors>
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
              src="https://media.api-sports.io/football/teams/529.png"
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
            <Typography level="h2">0 - 0</Typography>
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
              src="https://media.api-sports.io/football/teams/530.png"
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
              <Typography level="h3">Barcelona</Typography>
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
              <Typography level="h3">Atletico Madrid</Typography>
            </Grid>
          </Grid>
        </Grid>
      </div>

      <div>
        <Typography level="body-sm" style={{ textAlign: "center" }}>
          March 26 | Estadi de la Ceràmica
        </Typography>
      </div>
    </Card>
  );
};

export default FixureBox;
