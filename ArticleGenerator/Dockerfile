# Use an official Python runtime as a parent image
FROM --platform=linux/amd64 python:3.10 AS build

# Set the working directory in the container
WORKDIR /app

# Copy the local directory contents into the container at /app
COPY . /app

# Install any needed packages specified in requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Make port 5000 available to the world outside this container
EXPOSE 5000

ENV SUPABASE_URL='https://hbrecxmlkcpcwmoijrke.supabase.co'
ENV SUPABASE_KEY='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhicmVjeG1sa2NwY3dtb2lqcmtlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTMyNDk3MjIsImV4cCI6MjAyODgyNTcyMn0.2Oubd4u4Ehw2XHCynBQEbxCbugJ88tGzsDIsm6xxJik'
ENV OPENAI_API_KEY='sk-proj-VbqYzw4WCXwHrOIUPwyKT3BlbkFJ5DL4VMQ56kwM3bp1UgFy'

# Define environment variable
ENV FLASK_APP=ArticleApp.py
ENV FLASK_RUN_HOST=0.0.0.0
ENV FLASK_ENV=production

# Run app.py when the container launches
CMD ["flask", "run"]
