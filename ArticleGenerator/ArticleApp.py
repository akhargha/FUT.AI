from flask import Flask, request, jsonify
import requests
import json
from flask_restx import Api, Resource, fields
from flask_cors import CORS
import os

# Initializing the Flask application
app = Flask(__name__)

# Defining the API URL for the Mistral model and the authentication header
MISTRAL_API_URL = "https://api-inference.huggingface.co/models/mistralai/Mixtral-8x7B-Instruct-v0.1"
MISTRAL_HEADERS = {"Authorization": "Bearer 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"}

# Hypothetical backend service URL for soccer match details
SOCCER_MATCH_API_URL = "http://127.0.0.1:5000" #Mention the URL from where you can get the scores

# Function to query the language model
def query_mistral(payload):
    response = requests.post(MISTRAL_API_URL, headers=MISTRAL_HEADERS, json=payload)
    return response.json()


# Function to get soccer match details
def get_soccer_match_details():
    # Simulating a GET request to the backend service
    response = requests.get(SOCCER_MATCH_API_URL)
    if response.status_code == 200:
        return response.json()
    else:
        return None

# Endpoint to process the input and query the language model
@app.route('/generate_article', methods=['GET'])
def generate_article():
    match_details = get_soccer_match_details()
    if match_details:
        teams = match_details.get('teams', 'Team 1 vs Team 2')
        score = match_details.get('score', '0-0')
        venue = match_details.get('venue', 'Unknown Stadium')

        # Concatenate match details with the instruction
        combined_input = f"{teams}, {score}, at {venue}. Create an article about it."

        # Query the language model with the combined input
        model_response = query_mistral({"inputs": combined_input})

        # Return the model's response
        return jsonify(model_response)
    else:
        return jsonify({'error': 'Failed to retrieve soccer match details'}), 500


# Run the Flask application
if __name__ == '__main__':
    app.run(debug=True, port=1234)
