import json
import requests
from flask import Flask, jsonify, request
from supabase_client import supabase

app = Flask(__name__)

@app.route('/forecast-weather')
def sports_weather():
    city = request.args.get('city')
    
    url = 'http://api.weatherapi.com/v1/forecast.json'
    api_key = '81a60096a4254881ada201256243103'
    
    try:
        params = {
            'key': api_key,
            'q': city
        }
        response = requests.get(url, params=params)
        
        if response.ok:
            current_weather = response.json()['current']['condition']['text']
            return jsonify({"weather": current_weather}), 200
        else:
            print(f"Failed to fetch weather data for {city}")
            return jsonify({"error": "Failed to fetch weather data"}), 500
    
    except Exception as e:
        print(e)
        return jsonify({"error": "Failed to fetch weather data"}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5001)