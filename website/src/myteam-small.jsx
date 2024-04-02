import * as React from "react";
import FixtureBox from "./Components/FixtureBox";
import NavBar from "./Components/NavBar";
import SearchBar from "./Components/SearchBar";

const MyTeam = () => {
  return (
    <div>
      <NavBar />
      <FixtureBox />
      <SearchBar />
      <h1>MyTeam</h1>
    </div>
  );
};

export default MyTeam;
