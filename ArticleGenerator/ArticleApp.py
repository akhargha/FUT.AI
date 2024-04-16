from flask import Flask, request, jsonify
import requests
import json
from flask_restx import Api, Resource, fields
from flask_cors import CORS
import os
from supabase import create_client, Client

# Initializing the Flask application
app = Flask(__name__)
api = Api(app, version='1.0', title="Article Generator API")
CORS(app)

ns = api.namespace('article', description="Article Generator Operations")

# Defining the API URL for the Mistral model and the authentication header
MISTRAL_API_URL = "https://api-inference.huggingface.co/models/google/gemma-7b"
MISTRAL_HEADERS = {"Authorization": "Bearer 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"}  # Replace with your actual token

# Initialize Supabase client
url = "https://hbrecxmlkcpcwmoijrke.supabase.co"
key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhicmVjeG1sa2NwY3dtb2lqcmtlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTMyNDk3MjIsImV4cCI6MjAyODgyNTcyMn0.2Oubd4u4Ehw2XHCynBQEbxCbugJ88tGzsDIsm6xxJik"
supabase: Client = create_client(url, key)


@ns.route('/generate-article')
class ArticleGenerator(Resource):
    def get(self):
        # Retrieve data from the weekly_fixtures table
        response = supabase.table('weekly_fixtures').select("*").execute()
        data = response.data

        if not data:
            return {'error': 'No fixture data available'}, 404

        # Access the first item from the list
        match_info = data[0]
        input_text_id = match_info.get('id')
        input_text_city = match_info.get('city', '')
        input_text_score = match_info.get('score', '')
        input_text_home_team = match_info.get('home_team', '')
        input_text_away_team = match_info.get('away_team', '')
        input_start_time = match_info.get('start_time', '')

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
            "id": input_text_id,
            "article_data": article_text
        }

        # Check if article already exists
        existing_article = supabase.table('articles').select("id").eq("id", input_text_id).execute()
        if existing_article.data:
            return {'message': 'Article already exists with this ID'}, 409  # HTTP 409 Conflict

        # Proceed to insert if not existing
        insert_response = supabase.table('articles').insert(article_data).execute()

        return article_data, 201


if __name__ == '__main__':
    app.run(debug=True, port=5000)
