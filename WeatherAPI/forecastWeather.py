import json

import requests
from flask import Flask, jsonify
from supabase_client import supabase

app = Flask(__name__)


@app.route('/forecast-weather')
def sports_weather():
    url = 'http://api.weatherapi.com/v1/forecast.json'
    api_key = '81a60096a4254881ada201256243103'

    try:
        # Fetch cities from Supabase
        data = supabase.table('weekly_fixtures').select('city').execute()
        cities = data.data

        # Loop through each city and fetch weather data
        for city_info in cities:
            city = city_info['city']
            params = {
                'key': api_key,
                'q': city
            }
            response = requests.get(url, params=params)
            if response.ok:
                current_weather = response.json()['current']['condition']['text']
                # Update the 'weather' column in the same row with the current weather condition
                supabase.table('weekly_fixtures').update({'weather': current_weather}).eq('city', city).execute()
            else:
                print(f"Failed to fetch weather data for {city}")
        
        return jsonify({"success": "Weather updated successfully"}), 200

    except Exception as e:
        print(e)
        return jsonify({"error": "Failed to fetch or update weather data"}), 500

if __name__ == '__main__':
    app.run(debug=True)
