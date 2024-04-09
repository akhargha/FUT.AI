import * as React from "react";
import FixtureBox from "./Components/FixtureBox";
import NavBar from "./Components/NavBar";
import SearchBar from "./Components/SearchBar";

const MyTeam = () => {
  return (
    <div>
      <NavBar />
      <div style={{ padding: "20px", textAlign: "center"}}>
        <h1>Add your favorite teams</h1>
      <SearchBar />
      </div>
    </div>
  );
};

export default MyTeam;
