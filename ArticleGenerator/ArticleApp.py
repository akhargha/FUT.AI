from flask import Flask, request, jsonify
import requests
import json
from flask_restx import Api, Resource, fields
from flask_cors import CORS
import os

# Initializing the Flask application
app = Flask(__name__)
api = Api(app, version='1.0', title="Question Generator")
CORS(app)

ns = api.namespace('question', description="QuestionGenerator")
input_model = api.model("InputText", {
    'text': fields.String(required=True, description='Input text to generate question'),
})

# Defining the API URL for the Mistral model and the authentication header
MISTRAL_API_URL = "https://api-inference.huggingface.co/models/google/gemma-7b"
MISTRAL_HEADERS = {"Authorization": "Bearer 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"}  # Ensure you use your actual token


@ns.route('/generate-article')
class ArticleGenerator(Resource):
    @ns.expect(input_model)
    def post(self):
        # Load the JSON file
        with open('website/src/data/weekly_fixtures.json', 'r') as f:
            data = json.load(f)

        if not data:
            return {'error': 'JSON data is empty'}, 400

        # Access the first item from the list
        match_info = data[0]

        input_text_city = match_info.get('city', '').strip()
        input_text_score = match_info.get('score', '').strip()
        input_text_home_team = match_info.get('home_team', '').strip()
        input_text_away_team = match_info.get('away_team', '').strip()
        input_start_time = match_info.get('start_time', '').strip()

        prompt_text = f"{input_text_city} {input_text_away_team} {input_text_home_team} {input_text_score} {input_start_time} Can you create a detailed article about this soccer match details in 650 words?"

        request_payload = {
            "inputs": prompt_text,
            "parameters": {
                "max_new_tokens": 650,  # Adjusted to match the prompt request for word count
                "max_length": 650
            },
            "options": {"wait_for_model": True}
        }

        response = requests.post(MISTRAL_API_URL, headers=MISTRAL_HEADERS, json=request_payload)

        if response.status_code != 200:
            return {'error': 'Failed to generate article through API', 'message': response.text}, response.status_code

        article_text = response.json()[0]['generated_text']
        article_data = {
            "HomeTeam": input_text_home_team,
            "AwayTeam": input_text_away_team,
            "Article": article_text
        }

        file_path = os.path.join('website/src/data', 'article.json')
        with open(file_path, 'w', encoding='utf-8') as f:
            json.dump(article_data, f, ensure_ascii=False, indent=4)

        return article_data


if __name__ == '__main__':
    app.run(debug=True, port=5004)