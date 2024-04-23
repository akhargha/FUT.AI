# FUT.AI

## Introduction
- FUT.AI is an innovative platform designed to revolutionize the way content is generated and consumed. 
- It displays the scores of your favorite soccer franchises and articles related to those matches.
- The project utilizes advanced algorithms and Google Gemini Pro LLM model to collect score and aggregate data regarding articles, providing a seamless experience from authentication to content delivery on the cloud. 

## Project Overview
FUT.AI is a cutting-edge platform that transforms how soccer content is generated and consumed. By leveraging advanced algorithms and the Google Gemini Pro LLM model, FUT.AI aggregates live scores of your favorite soccer teams alongside related articles, offering a comprehensive and seamless experience. This innovative project not only provides up-to-the-minute score updates but also integrates weather information from match stadiums, enriching the context for each game. Users can access this wealth of information through a user-friendly frontend or directly via the Command Line, making FUT.AI an essential tool for soccer enthusiasts and content consumers seeking a centralized, cloud-based solution for soccer-related data.

## Features
- **Authentication**: Secure user authentication process. (Most probably using Google's OAuthentication)
- **Frontend**: A user-friendly interface for interacting with the platform using Javascript.
- **Score Aggregator**: An intelligent system that aggregates scores from API.
- **Article Generator**: A Google Gemini Pro API which uses the information of the matches extracted through API to create articles regarding the soccer match.
- **Database**: Robust data storage and retrieval systems which stores the scores of soccer matches and then also creates 

<a href="https://ibb.co/9YGpd61"><img src="https://i.ibb.co/7ybS0PZ/Untitled-2024-04-23-0201-2.png" alt="Untitled-2024-04-23-0201-2" border="0"></a><br />

## Team Members

The project is currently being developed by:

- Shivanshu Dwivedi
- Anupam Khargaria
- Shashwath Sunkum
  
## Team Mentor
This project is mentored by Professor Jonathan Johnson, Trinity College.

## Testing Files

- To test ArticleApp run the following commands

####     docker build -t articleapp . 
####     docker run -p 8080:8080 articleapp
####     docker pull shivanshudwivedi/articleapp

- To test Aggregator

####     docker build -t FutAPI . 
####     docker run -p 8080:8080 FutAPI

- To test FAST API
  
## Languages and Frameworks

The project has been developed using the following languages and frameworks:
- Language: Python, Java and Javascript
- Framework: Flask, Spring Boot, NodeJS
- AI Tool: Mistral-v1
- AI Integration tool: Langchain, HuggingFace
- Database: Spring JPA, H2, Hibernate
  

## Interface

The user interface will feature :

1) Score Section
2) Fixtures Section
3) Blogs Section
4) Weather Section 

NOTE: All the above details are subject to change as the project evolves and progresses.
describe the general UI layout and primary actions]. 

NOTE: All the above details are subject to change as the project evolves and progresses.

