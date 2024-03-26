const https = require('https');

const options = {
    method: 'GET',
    hostname: 'api-football-v1.p.rapidapi.com',
    port: null,
    path: '/v3/standings?season=2023&league=140', // La Liga, 2023 season
    headers: {
        'X-RapidAPI-Key': '29f493b303mshacb5a21245936edp14fdbdjsn0517920ec46c', // Replace with your actual API key
        'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
    }
};

const req = https.request(options, function (res) {
    let rawData = '';

    res.on('data', (chunk) => {
        rawData += chunk;
    });

    res.on('end', () => {
        try {
            const parsedData = JSON.parse(rawData);
            displayLeagueStandings(parsedData);
        } catch (e) {
            console.error(e.message);
        }
    });
});

req.on('error', (e) => {
    console.error(`Got error: ${e.message}`);
});

req.end();

function displayLeagueStandings(data) {
    const standings = data.response[0].league.standings[0]; // Assuming first array contains the standings we're interested in
    console.log("La Liga Standings - 2023 Season\n");
    console.log("Rank | Team                     | Points | GD    | Form");
    console.log("-----|--------------------------|--------|-------|----------");
    standings.forEach(team => {
        const name = team.team.name.padEnd(25, ' '); // Ensure team name aligns nicely
        const points = String(team.points).padStart(6, ' ');
        const goalsDiff = String(team.goalsDiff).padStart(5, ' ');
        const form = team.form;
        console.log(`${String(team.rank).padStart(4, ' ')} | ${name} | ${points} | ${goalsDiff} | ${form}`);
    });
}
