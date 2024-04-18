from flask import Flask, jsonify
import requests
from datetime import datetime, timedelta
from supabase import create_client, Client

app = Flask(__name__)

# Supabase setup
url = 'https://hbrecxmlkcpcwmoijrke.supabase.co'  # Replace with your Supabase project URL
key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhicmVjeG1sa2NwY3dtb2lqcmtlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTMyNDk3MjIsImV4cCI6MjAyODgyNTcyMn0.2Oubd4u4Ehw2XHCynBQEbxCbugJ88tGzsDIsm6xxJik'  # Replace with your Supabase API key
supabase: Client = create_client(url, key)

@app.route('/get-weekly-fixtures')
def get_standings():
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
        matches.append(match)

    # Insert matches into Supabase
    insert_result = supabase.table('weekly_fixtures').insert(matches).execute()

    # if insert_result.error:
    #     print(f"Error inserting data into Supabase: {insert_result.error}")
    #     return jsonify({"error": "Failed to insert data into Supabase"}), 500
    #
    # return jsonify(matches)

if __name__ == '__main__':
    app.run(debug=True)
