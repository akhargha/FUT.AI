# FUT.AI - A Full Stack Web Application

FUT.AI, derived from 'Futbol' or Soccer, is a robust full-stack web application designed to bring soccer enthusiasts the latest from La Liga. It combines data from various APIs, presents weather conditions for the games, and AI-generates insightful articles about the matches using. Our service-oriented architecture ensures scalability and robust data management through microservices, each tailored for specific functions.

## Features

- **Real-time Soccer Match Information**: Fetches latest fixtures, team details, live scores, and more from La Liga.
- **Weather Updates**: Provides real-time weather conditions for the cities where the matches are held.
- **Dynamic Article Generation**: Utilizes OpenAI GPT 3.5 to generate narrative articles based on match results and weather conditions.
- **Interactive Web Interface**: Sleek and user-friendly interface displaying fixtures, allowing users to select favorite teams, and accessing generated articles.

## Architecture

FUT.AI is structured into several directories, each representing a microservice with its own Dockerfile and Kubernetes configuration for service deployment and management.

![Cloud](https://github.com/akhargha/FUT.AI/assets/117129106/a679346a-fed9-47b6-9faf-6b9009e3f097)



### Directories

- **FootballAPI**: Integrates with API-FOOTBALL from RAPIDAPI to gather and store data about game fixtures, team details, and scores in Supabase.
- **WeatherAPI**: Uses WeatherAPI.com to fetch and update weather conditions for match locations in the same Supabase table.
- **ArticleGenerator**: Employs OpenAI GPT 3.5 to generate and store articles based on data from FootballAPI and WeatherAPI.
- **Website**: Built with React + Vite and JoyUI, features:
    1. **Fixtures Page**: Displays upcoming games using sleek UI cards.
    2. **Favorite Teams Page**: Allows selection and management of favorite La Liga teams.
    3. **Blog Page**: Shows articles generated for selected favorite teams.
- **Kubernetes**: Manages services, deployments, and cron jobs. Includes Config Maps and Secrets for secure API key storage.

## Deployment Journey to Google Kubernetes Engine (GKE)

![IMG_1471](https://github.com/akhargha/FUT.AI/assets/117129106/a722a000-5f47-4be5-9ad9-9efb7a493ac4)

### Final Result

![Screenshot 2024-05-07 at 3 08 35 AM](https://github.com/akhargha/FUT.AI/assets/117129106/166ab5fc-bce4-412d-b7ab-b4c98e7446ca)


### Prerequisites

Before setting up the project, ensure you have the following software and accounts set up:

- **Docker**: [Download Docker](https://www.docker.com/get-started)
- **Kubernetes**: [Install Google Cloud CLI](https://cloud.google.com/sdk/docs/install) and follow the instructions to set up a Kubernetes cluster on Google Kubernetes Engine (GKE). [Setting up a GKE cluster](https://cloud.google.com/kubernetes-engine/docs/how-to/creating-a-cluster)
- **Supabase account**: [Create a Supabase account](https://supabase.com/)

### Project Setup

#### Connect to the GKE cluster

For managing different Kubernetes clusters, including the transition from a local environment (like Docker Desktop) to Google Kubernetes Engine (GKE), follow these steps to set up and switch context to the GKE cluster:

1) **Install gcloud CLI**

   Download and install the Google Cloud CLI. After installation, if prompted with choices, use Ctrl-C to exit the prompt. Make sure to restart your Visual Studio Code or other IDEs to update the path environment variables after installation.

   ```bash
   # Visit the official page to download and install gcloud CLI
   https://cloud.google.com/sdk/docs/install
   ```

2) **Log into Google with IAM**

   Authenticate your Google account with the following command:

   ```bash
   gcloud auth login
   ```

   Enter the email associated with your Google account that has been registered with Google via the Identity and Access Management (IAM) for our GKE cluster.

3) **Get the GKE context**

   Install the necessary GKE authentication plugin:

   ```bash
   gcloud components install gke-gcloud-auth-plugin
   ```

   Then, fetch the credentials for the GKE cluster:

   ```bash
   gcloud container clusters get-credentials autopilot-cluster-1 --region us-central1 --project horizontal-ray-375222
   ```

   This command configures `kubectl` to use the credentials for the specified GKE cluster.

#### Managing Kubernetes Contexts

- **List available contexts**:

  ```bash
  kubectl config get-contexts
  ```

- **Check the current context**:

  ```bash
  kubectl config current-context
  ```

- **Switch to the GKE cluster context**:

  ```bash
  kubectl config set-context gke_horizontal-ray-375222_us-central1_autopilot-cluster-1
  ```

- **Verify connection to the GKE cluster**:

  ```bash
  kubectl get nodes
  ```

  If the command displays the nodes of the GKE cluster, you have successfully connected and can now use `kubectl` and `helm` to manage the cluster.

#### Create Your Namespace

To organize your resources within the GKE cluster, create a namespace:

```bash
kubectl create namespace <your-namespace-name>
```

Switch namespace from default to `<your-namespace-name>`

```bash
kubectl config set-context --current --namespace=<your-namespace-name>
```

Replace `<your-namespace-name>` with your preferred name for the namespace.




### Dockerization and Multi-Architecture Build

After completing the development of our Full Stack App, we began Dockerizing our application. Each microservice (excluding the Kubernetes directory) was equipped with its own Dockerfile. However, we encountered our first major challenge when we realized the need for multi-architecture Docker images to accommodate different hardware architectures.

```bash
# Creating a new Docker builder
docker buildx create --name mybuilder --use
docker buildx inspect --bootstrap

# Building and pushing multi-architecture images
docker buildx build --platform linux/amd64,linux/arm64 -t yourusername/football-api:v1 --push .
```

This approach ensured compatibility across different server architectures, which is essential for deploying on GKE.

### Kubernetes Configuration

For each microservice, we created `Service.yaml` and `Deployment.yaml` files. These Kubernetes configurations leverage Docker images and integrate environmental configurations through Kubernetes Secrets and ConfigMaps, enhancing security and manageability of sensitive data.

### ConfigMaps and Secrets

ConfigMaps and Secrets were set up to securely store and provide configuration data and API keys to our services. This separation of sensitive information from our application code is critical for maintaining the security and integrity of our application in a production environment.


### Kubernetes Code Deployment

This section outlines the steps for deploying code using Kubernetes.

1. **Apply your Kubernetes configuration**
   Deploy your configuration files located in the Kubernetes directory.
   ```bash
   kubectl apply -f Kubernetes/
   ```

2. **Verify the deployment**
   Check the status of all components (pods, services, deployments, etc.) to ensure everything is running as expected.
   ```bash
   kubectl get all
   ```

3. **Check Ingress configurations**
   Verify the Ingress to ensure it is set up correctly and review the associated IP addresses and hosts.
   ```bash
   kubectl get ingress -o wide
   ```

4. **View the application**
   Access the application by visiting the IP address provided in your Ingress configurations, that exposes Port `80` of the cluster. In this case:
    - Go to `34.36.57.193`


### Automation with CronJobs

We implemented two CronJobs to automate our services:
1. **GetFixtures CronJob**: Updates football match fixtures and associated data daily.
2. **GenerateArticles CronJob**: Generates and stores articles based on the latest matches and weather conditions.

### Continuous Integration and Deployment

Our CI/CD pipeline automates the deployment process, ensuring quick and secure updates with each push to the `main` branch. Here's a brief overview of each step:

- **Trigger**: Activates automatically on push to `main`.
- **Checkout**: Pulls the latest code from the repository.
- **Setup Buildx**: Configures Docker Buildx for multi-architecture support (amd64 and arm64).
- **Docker Login**: Authenticates to Docker Hub using secure GitHub Secrets.

**Build and Push Steps for Each Service**:
- **ArticleGenerator**: `docker buildx build --platform linux/amd64,linux/arm64 -t yourusername/article-generator:v1 --push .`
- **FootballAPI**: `docker buildx build --platform linux/amd64,linux/arm64 -t yourusername/football-api:v1 --push .`
- **WeatherAPI**: `docker buildx build --platform linux/amd64,linux/arm64 -t yourusername/weather-api:v1 --push .`
- **Website**: `docker buildx build --platform linux/amd64,linux/arm64 -t yourusername/website:v1 --push .`

Each component is built and pushed to Docker Hub, ensuring that our services are always up-to-date and available for deployment.


### Command Line Integration Setup

Create a new Python script named `futai.py`. This script will handle parsing command line arguments and include the functionality to open a web browser to the ingress address.

```python
import sys
import webbrowser

def open_browser(address):
    """ Opens the default web browser to the specified address. """
    webbrowser.open(address)

def main():
    # Check the command line arguments
    if len(sys.argv) > 1:
        command = sys.argv[1]
        if command == 'run':
            # Ingress address for your application
            ingress_address = 'http://34.36.57.193'
            open_browser(ingress_address)
        else:
            print(f"Unknown command {command}")
    else:
        print("Usage: futai <command>")
        print("Commands:")
        print("  run    Opens the application in the web browser.")

if __name__ == "__main__":
    main()
```

#### Step 3: Making the Script Executable
To run the script from the command line easily, you can make it executable and add a shebang line at the top of the script.

Add a shebang line at the start of your `futai.py`:
```python
#!/usr/bin/env python3
```
Make the script executable:
```bash
chmod +x futai.py
```
Move the script to a directory in your PATH (optional, for ease of use):
```bash
sudo mv futai.py /usr/local/bin/futai
```

#### Step 4: Using the CLI
Now, you can use the CLI tool by simply typing:
```bash
futai run
```
This command should open the default web browser to the ingress address of your application.



### Optional: Local Development and Testing

#### Running FUT.AI locally

Follow these steps to set up the FUT.AI project on your local machine for development and testing purposes:

1. **Clone the repository**
   ```bash
   git clone https://github.com/akhargha/FUT.AI
   ```

2. **Navigate to the project directory**
   ```bash
   cd FUT.AI
   ```

3. **ArticleGenerator setup**
   Navigate to the `ArticleGenerator` directory and install the necessary dependencies.
   ```bash
   cd ArticleGenerator
   pip install -r requirements.txt
   virtualenv venv
   source venv/bin/activate
   export OPENAI_API_KEY='your_openai_api_key_here'
   export SUPABASE_KEY='your_supabase_key_here'
   python ArticleApp.py
   ```

4. **FootballAPI setup**
   Setup for the `FootballAPI` and its sub-directory `addFixtures`.
   ```bash
   cd FootballAPI
   cd addFixtures
   pip install -r requirements.txt
   virtualenv venv
   source venv/bin/activate
   export RAPID_API_KEY='your_rapid_api_key_here'
   export SUPABASE_KEY='your_supabase_key_here'
   python addFixtures.py
   ```

5. **WeatherAPI setup**
   Configure the `WeatherAPI` service by following these steps.
   ```bash
   cd WeatherAPI
   pip install -r requirements.txt
   virtualenv venv
   source venv/bin/activate
   export SUPABASE_KEY='your_supabase_key_here'
   python forecastWeather.py
   ```

6. **Website setup**
   Set up the front-end website component.
   ```bash
   cd website
   npm install
   # Setup an .env file with your Supabase credentials
   echo "VITE_SUPABASE_URL='your_supabase_url_here'" > .env
   echo "VITE_SUPABASE_KEY='your_supabase_key_here'" >> .env
   npm run dev
   ```

Please replace `your_openai_api_key_here`, `your_supabase_key_here`, and other placeholder keys with your actual API keys and credentials.


## Overview

### Snapshots of our UI

![Screenshot 2024-05-07 at 3 17 57 AM](https://github.com/akhargha/FUT.AI/assets/117129106/53bff63c-6ebd-4e66-9a49-dacd25206a52)

![Screenshot 2024-05-07 at 3 18 13 AM](https://github.com/akhargha/FUT.AI/assets/117129106/114f8ea2-e964-44ac-9c02-4700a8a2ab19)

![Screenshot 2024-05-07 at 3 18 34 AM](https://github.com/akhargha/FUT.AI/assets/117129106/eab70cab-5337-4c99-ac45-349f9785b33f)

![Screenshot 2024-05-07 at 3 18 43 AM](https://github.com/akhargha/FUT.AI/assets/117129106/eae6904c-4df2-41a9-93ac-76b870fdd06c)


### Languages and Frameworks

The project has been developed using the following languages and frameworks:
- Language: Python, Java and Javascript
- Framework: Flask, NodeJS
- AI Tool: OpenAI GPT 3.5
- Database: Supabase


### Team Members

The project is currently being developed by:

- Shivanshu Dwivedi
- Anupam Khargaria
- Shashwath Sunkum

![FullSizeRender](https://github.com/akhargha/FUT.AI/assets/117129106/e5184e25-a050-4f00-9b83-51d17326e2e4)

  
### Credits
This project is mentored by Professor Jonathan Johnson, Trinity College.
  


