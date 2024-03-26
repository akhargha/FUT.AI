from flask import Flask, jsonify
import requests
import json
from datetime import datetime, timedelta

app = Flask(__name__)


@app.route('/get-weekly-fixtures')
def get_standings():
    url = 'https://api-football-v1.p.rapidapi.com/v3/fixtures'
    # Calculate 'from' and 'to' dates
    today = datetime.now()
    one_week_later = today + timedelta(weeks=1)

    # Format dates in 'YYYY-MM-DD' format
    from_date = today.strftime('%Y-%m-%d')
    to_date = one_week_later.strftime('%Y-%m-%d')
    querystring = {"league": "140", "season": "2023", "from": from_date, "to": to_date}

    headers = {
        'X-RapidAPI-Key': '29f493b303mshacb5a21245936edp14fdbdjsn0517920ec46c',  # Replace with your actual API key
        'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
    }

    response = requests.get(url, headers=headers, params=querystring)
    data = response.json()
    # standings = data['response'][0]['league']['standings'][0]
    # Assuming first array contains the standings we're interested in

    matches = []
    for fixture in data['response']:
        match = {
            'home_team': fixture['teams']['home']['name'],
            'away_team': fixture['teams']['away']['name'],
            'start_time': fixture['fixture']['date'],
            'venue': fixture['fixture']['venue']['name'],
            'home_team_logo': fixture['teams']['home']['logo'],
            'away_team_logo': fixture['teams']['away']['logo'],
            'score': f"{fixture['goals']['home']} - {fixture['goals']['away']}"
        }
        matches.append(match)

    directory = '../website/src/data'
    with open(f'{directory}/weekly_fixtures.json', 'w') as f:
        json.dump(matches, f, indent=4)

    return jsonify(matches)


if __name__ == '__main__':
    app.run(debug=True)
