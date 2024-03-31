import requests
from flask import Flask, jsonify

app = Flask(__name__)


@app.route('/sports-weather')
def sports_weather():
    url = 'http://api.weatherapi.com/v1/sports.json'
    api_key = '81a60096a4254881ada201256243103'

    location = 'Madrid'

    params = {
        'key': api_key,
        'q': location,
    }

    response = requests.get(url, params=params)
    if response.ok:
        return jsonify(response.json()['football']), 200
    else:
        return jsonify({"error": "Failed to fetch sports events data"}), response.status_code


if __name__ == '__main__':
    app.run(debug=True)
