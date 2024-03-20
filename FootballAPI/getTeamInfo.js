const http = require('https');

const options = {
    method: 'GET',
    hostname: 'api-football-v1.p.rapidapi.com',
    port: null,
    path: '/v3/teams?id=64',
    headers: {
        'X-RapidAPI-Key': '29f493b303mshacb5a21245936edp14fdbdjsn0517920ec46c', // Use your actual API key
        'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
    }
};

const req = http.request(options, function (res) {
    let data = ''; // Use a string to accumulate data

    res.on('data', function (chunk) {
        data += chunk; // Append chunks of data to the string
    });

    res.on('end', function () {
        const response = JSON.parse(data); // Parse the JSON string
        // Access the team name and ID from the response
        if (response && response.response && response.response.length > 0) {
            const team = response.response[0].team;
            const teamName = team.name;
            const teamId = team.id.toString(); // Ensure the ID is a string

            console.log(`Team Name: ${teamName}`);
            console.log(`Team ID: ${teamId}`);
        } else {
            console.log("No team data found.");
        }
    });
});

req.on('error', function (e) {
    console.error(`Got error: ${e.message}`);
});

req.end();
