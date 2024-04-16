import React, { useEffect, useState } from "react";
import NavBar from "./Components/NavBar";
import SearchBar from "./Components/SearchBar";
import { supabase } from "./supabase_client";  // Ensure this path is correct

const MyTeam = () => {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    const fetchTeams = async () => {
      const { data: favouriteTeams, error: favouriteError } = await supabase
        .from('favourite_team')
        .select('team_name');

      if (favouriteError) {
        console.error('Error fetching favourite teams:', favouriteError);
        return;
      }

      const teamNames = favouriteTeams.map(team => team.team_name);

      const { data: leagueTeams, error: leagueError } = await supabase
        .from('LaLigaLeague')
        .select('team_name, team_logo')
        .in('team_name', teamNames);

      if (leagueError) {
        console.error('Error fetching league teams:', leagueError);
        return;
      }

      setTeams(leagueTeams);
    };

    fetchTeams();
  }, []);

  return (
    <div>
      <NavBar />
      <div style={{ padding: "20px", textAlign: "center" }}>
        <h1>Add your favorite teams</h1>
        <SearchBar />
        <h1>My teams</h1>
        {teams.length > 0 ? (
          <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap" }}>
            {teams.map((team, index) => (
              <div key={index} style={{ margin: "10px", textAlign: "center" }}>
                <h3>{team.team_name}</h3>
                <img src={team.team_logo} alt={team.team_name} style={{ width: "50px", height: "50px" }} />
              </div>
            ))}
          </div>
        ) : (
          <p>No favourite teams added yet!</p>
        )}
      </div>
    </div>
  );
};

export default MyTeam;
