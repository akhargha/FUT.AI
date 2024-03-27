import * as React from "react";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Typography from "@mui/joy/Typography";
import { CssVarsProvider } from "@mui/joy/styles";
import CssBaseline from "@mui/joy/CssBaseline";

const NavBar = () => {
  return (
    <CssVarsProvider>
      <CssBaseline />
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "16px",
          bgcolor: "success.100",
          "&:hover": {
            bgcolor: "success.200",
          },
        }}
      >
        <img
          src="https://cdn-icons-png.flaticon.com/512/53/53283.png"
          loading="lazy"
          alt=""
          style={{ maxWidth: "30px", height: "auto" }}
        />

        <Box sx={{ display: "flex", gap: "2em" }}>
          <Button
            variant="solid"
            color="success"
            onClick={() => (window.location.href = "/myteam.html")}
          >
            My Teams
          </Button>
          <Button
            variant="solid"
            color="success"
            onClick={() => (window.location.href = "/")}
          >
            Fixtures
          </Button>
          <Button
            variant="solid"
            color="success"
            onClick={() => (window.location.href = "/blog.html")}
          >
            Blogs
          </Button>
        </Box>
      </Box>
    </CssVarsProvider>
  );
};

export default NavBar;
