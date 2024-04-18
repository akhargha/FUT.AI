from flask import Flask
from flask_restx import Api, Resource
from flask_cors import CORS
import os
from openai import OpenAI
from supabase_client import supabase

# Initializing the Flask application
app = Flask(__name__)
api = Api(app, version='1.0', title="Article Generator API")
CORS(app)

ns = api.namespace('article', description="Article Generator Operations")

# Initialize the OpenAI and Supabase clients
openai_client = OpenAI(api_key=os.environ.get("OPENAI_API_KEY"))


@ns.route('/generate-articles')
class ArticleGenerator(Resource):
    def get(self):
        
        supabase.table('articles').delete().neq('id', 0).execute()
        
        # Retrieve data from the weekly_fixtures table
        response = supabase.table('weekly_fixtures').select("*").execute()
        fixtures = response.data

        if not fixtures:
            return {'error': 'No fixture data available'}, 404

        articles = []
        for match_info in fixtures:
            input_text_id = match_info.get('id')
            input_text_city = match_info.get('city', '')
            input_text_score = match_info.get('score', '')
            input_text_home_team = match_info.get('home_team', '')
            input_text_away_team = match_info.get('away_team', '')
            input_start_time = match_info.get('start_time', '')

            prompt_text = f"{input_text_city} {input_text_away_team} {input_text_home_team} {input_text_score} {input_start_time} Write a detailed article about this soccer match in 250 words."

            # Generate article using OpenAI's Chat API
            completion = openai_client.chat.completions.create(
                model="gpt-4",
                messages=[
                    {"role": "system", "content": "You are a sports journalist writing articles about La Liga soccer matches."},
                    {"role": "user", "content": prompt_text}
                ]
            )

            if completion.choices[0].message:
                article_text = completion.choices[0].message.content
                article_data = {
                    "id": input_text_id,
                    "article_data": article_text
                }
                
                supabase.table('articles').insert(article_data).execute()

                articles.append(article_data)
            else:
                articles.append({'id': input_text_id, 'error': 'Failed to generate article'})

        return articles, 200

if __name__ == '__main__':
    app.run(debug=True, port=5000)
