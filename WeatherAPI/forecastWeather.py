import json
import requests
from flask import Flask, jsonify, request
import os

app = Flask(__name__)

# Environment variables
WEATHER_URL = os.getenv('WEATHER_URL')
WEATHER_KEY = os.getenv('WEATHER_KEY')

@app.route('/forecast-weather')
def sports_weather():
    city = request.args.get('city')
    
    url = 'http://api.weatherapi.com/v1/forecast.json'
    api_key = '81a60096a4254881ada201256243103'
    
    try:
        params = {
            'key': WEATHER_KEY,
            'q': city
        }
        response = requests.get(WEATHER_URL, params=params)
        
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
    app.run(debug=True, host='0.0.0.0', port=5001)