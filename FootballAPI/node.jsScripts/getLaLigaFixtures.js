const https = require('https');

const options = {
    method: 'GET',
    hostname: 'api-football-v1.p.rapidapi.com',
    port: null,
    path: '/v3/fixtures?date=2024-03-16&league=140&season=2023', // Example date and league ID for La Liga
    headers: {
        'X-RapidAPI-Key': '29f493b303mshacb5a21245936edp14fdbdjsn0517920ec46c', // Replace with your actual API key
        'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
    }
};

const req = https.request(options, function (res) {
    let rawData = '';

    res.on('data', function (chunk) {
        rawData += chunk;
    });

    res.on('end', function () {
        try {
            const parsedData = JSON.parse(rawData);
            formatFixtures(parsedData);
        } catch (e) {
            console.error(e.message);
        }
    });
});

req.on('error', function (e) {
    console.error(`Got error: ${e.message}`);
});

req.end();

function formatFixtures(data) {
    console.log("### La Liga Fixtures on 03/17/2024\n");
    data.response.forEach((match) => {
        const homeTeam = match.teams.home.name;
        const awayTeam = match.teams.away.name;
        const score = match.goals.home !== null && match.goals.away !== null ? `${match.goals.home} - ${match.goals.away}` : "N/A";
        const stadium = `${match.fixture.venue.name}, ${match.fixture.venue.city}`;

        console.log(`**${homeTeam} vs ${awayTeam}**`);
        console.log(`- Score: ${score}`);
        console.log(`- Stadium: ${stadium}\n`);
    });
}
