from flask import Flask, jsonify
import requests

app = Flask(__name__)


@app.route('/get-standings')
def get_standings():
    url = 'https://api-football-v1.p.rapidapi.com/v3/standings'
    querystring = {'season': '2023', 'league': '140'}

    headers = {
        'X-RapidAPI-Key': '29f493b303mshacb5a21245936edp14fdbdjsn0517920ec46c',  # Replace with your actual API key
        'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
    }

    response = requests.get(url, headers=headers, params=querystring)
    data = response.json()
    standings = data['response'][0]['league']['standings'][0]
    # Assuming first array contains the standings we're interested in

    formatted_standings = []
    for team in standings:
        formatted_standings.append({
            'Rank': team['rank'],
            'Team': team['team']['name'],
            'Points': team['points'],
            'Goal Difference': team['goalsDiff'],
            'Form': team['form']
        })

    return jsonify(formatted_standings)


if __name__ == '__main__':
    app.run(debug=True)
