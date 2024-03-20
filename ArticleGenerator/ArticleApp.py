#Importing Flask
from flask import Flask, request, jsonify

#Importing Flasgger route
from flasgger import swag_from

#Importing Swagger
from flasgger import Swagger

#Importing request library
import requests

#Defining the app in flask
ArticleApp = Flask(__name__)

#Defining the template for Swagger UI implementation
template = {
    "swagger": "2.0",
    "info": {
      "title": "Flask Kafka API",
      "description": "Ask your questions to Gemma",
      "version": "1.0"
    }
  }
ArticleApp.config['SWAGGER'] = {
    'title': 'Flask Kafka API',
    'uiversion': 2,
    'template': './resources/flasgger/swagger_ui.html'
}

#Make the app run on Swagger UI
Swagger(ArticleApp, template=template)

#Defining the Authentication for Gemma
API_URL = "https://api-inference.huggingface.co/models/google/gemma-7b"
headers = {"Authorization": "Bearer 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"}

#Defining the query model to Gemma
def query(payload):
    response = requests.post(API_URL, headers=headers, json=payload)
    return response.json()

#Defining the post method for the given application
@swag_from('ask.yml')
@ArticleApp.route('/ask', methods=['POST'])
def ask_question():
    data = request.get_json()
    if not data or 'question' not in data:
        return jsonify({'error': 'Please provide a question in JSON format.'}), 400

    question = data['question']
    output = query({"inputs": question})
    return jsonify(output)

#Running the ArticleApp
if __name__ == '__main__':
    ArticleApp.run(debug=True, port=8080)
