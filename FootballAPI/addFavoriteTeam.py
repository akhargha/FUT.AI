import json
import sys

def add_favorite_team(team_name):
    json_file_path = '../website/src/data/favoriteTeam.json'

    try:
        # Try to open the existing JSON file
        with open(json_file_path, 'r') as file:
            favorite_teams = json.load(file)
    except FileNotFoundError:
        # If the file does not exist, start a new list
        favorite_teams = []

    # Append the new team name to the list
    if team_name not in favorite_teams:  # Avoid duplicates
        favorite_teams.append(team_name)

    # Write the updated list back to the file
    with open(json_file_path, 'w') as file:
        json.dump(favorite_teams, file, indent=4)

if __name__ == "__main__":
    if len(sys.argv) > 1:
        add_favorite_team(sys.argv[1])
    else:
        print("Please provide a team name as a parameter.")
