from flask import Flask, jsonify
import requests
import json
from datetime import datetime, timedelta

app = Flask(__name__)


@app.route('/get-teams')
def get_standings():
    url = 'https://api-football-v1.p.rapidapi.com/v3/teams'
    querystring = {"league": "140", "season": "2023"}

    headers = {
        'X-RapidAPI-Key': '29f493b303mshacb5a21245936edp14fdbdjsn0517920ec46c',  # Replace with your actual API key
        'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
    }

    response = requests.get(url, headers=headers, params=querystring)
    data = response.json()
    # standings = data['response'][0]['league']['standings'][0]
    # Assuming first array contains the standings we're interested in

    teams = []
    for fixture in data['response']:
        details = {
            'Team Name': fixture['team']['name'],
            'Team Logo': fixture['team']['logo']
        }
        teams.append(details)

    directory = '../website/src/data'
    with open(f'{directory}/league_teams_list.json', 'w') as f:
        json.dump(teams, f, indent=4)

    return jsonify(teams)


if __name__ == '__main__':
    app.run(debug=True)
