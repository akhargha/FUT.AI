import requests
from flask import Flask, jsonify

app = Flask(__name__)


@app.route('/forecast-weather')
def sports_weather():
    url = 'http://api.weatherapi.com/v1/forecast.json'
    api_key = '81a60096a4254881ada201256243103'
    location = 'Hartford'
    days = '3'

    params = {
        'key': api_key,
        'q': location,
        'days': days
    }

    response = requests.get(url, params=params)
    if response.ok:
        current_weather = response.json()['current']
        forecast = response.json()['forecast']['forecastday']
        # Extracting important info from current weather
        current_info = {
            "temperature": f"{current_weather['temp_c']} °C",
            "feels_like": f"{current_weather['feelslike_c']} °C",
            "condition": current_weather['condition']['text'],
            "wind": f"{current_weather['wind_kph']} kph, direction {current_weather['wind_dir']}",
            "humidity": f"{current_weather['humidity']}%",
            "uv_index": current_weather['uv']
        }

        # Extracting important info from forecast
        forecast_info = []
        for day in forecast:
            day_info = {
                "date": day['date'],
                "avg_temp": f"{day['day']['avgtemp_c']} °C",
                "max_temp": f"{day['day']['maxtemp_c']} °C",
                "min_temp": f"{day['day']['mintemp_c']} °C",
                "condition": day['day']['condition']['text'],
                "chance_of_rain": day['day']['daily_chance_of_rain'],
                "chance_of_snow": day['day']['daily_chance_of_snow'],
                "max_wind": f"{day['day']['maxwind_kph']} kph"
            }
            forecast_info.append(day_info)

        # Return both current weather and forecast info
        return jsonify({"current_weather": current_info, "forecast": forecast_info}), 200
    # return jsonify(response.json()), 200

    else:
        return jsonify({"error": "Failed to fetch sports events data"}), response.status_code

if __name__ == '__main__':
    app.run(debug=True)
