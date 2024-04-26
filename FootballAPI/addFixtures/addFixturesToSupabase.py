from flask import Flask, jsonify
import requests
from datetime import datetime, timedelta
from supabase_client import supabase

app = Flask(__name__)

@app.route('/get-weekly-fixtures')
def get_standings():
    supabase.table('weekly_fixtures').delete().neq('id', 0).execute()

    api_url = 'https://api-football-v1.p.rapidapi.com/v3/fixtures'
    one_week_later = datetime.now()
    today = one_week_later - timedelta(weeks=1)
    from_date = today.strftime('%Y-%m-%d')
    to_date = one_week_later.strftime('%Y-%m-%d')

    querystring = {"league": "140", "season": "2023", "from": from_date, "to": to_date}
    headers = {
        'X-RapidAPI-Key': '29f493b303mshacb5a21245936edp14fdbdjsn0517920ec46c',  # Replace with your actual API key
        'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
    }

    response = requests.get(api_url, headers=headers, params=querystring)
    data = response.json()

    matches = []
    for fixture in data['response']:
        match = {
            'home_team': fixture['teams']['home']['name'],
            'away_team': fixture['teams']['away']['name'],
            'start_time': fixture['fixture']['date'],
            'venue': fixture['fixture']['venue']['name'],
            'city': fixture['fixture']['venue']['city'],
            'home_team_logo': fixture['teams']['home']['logo'],
            'away_team_logo': fixture['teams']['away']['logo'],
            'score': f"{fixture['goals']['home']} - {fixture['goals']['away']}"
        }
        print("HEHE")
        
        
        # ...
        # Make a request to the forecastWeather endpoint to get the weather for the city
        weather_response = requests.get(f"http://forecast-weather:5001/forecast-weather?city={match['city']}")
        if weather_response.ok:
            weather_data = weather_response.json()
            match['weather'] = weather_data['weather']
        else:
            match['weather'] = 'Unknown'
        
        matches.append(match)

    # Insert matches into Supabase
    insert_result = supabase.table('weekly_fixtures').insert(matches).execute()

    return jsonify(matches)

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)