window.onload = () => {
    // Retrieve scoreboard data from localStorage
    const scoreboardData = JSON.parse(localStorage.getItem("scoreboardData"));
    const outputTable = document.querySelector("#outputScoreboard tbody");
    const teamKillsChartCtx = document.getElementById("teamKillsChartOutput").getContext("2d");

    // Prepare the chart data
    const teamKillsData = {
        labels: [],
        datasets: [{
            label: "Team Kills",
            data: [],
            backgroundColor: "rgba(75, 192, 192, 0.6)",
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 1
        }]
    };

    // Loop through teams and players to populate the table and chart data
    scoreboardData.forEach((team) => {
        let totalKills = 0;

        // Loop through each player's data
        team.players.forEach((player) => {
            const row = document.createElement("tr");
            const kdRatio = player.deaths === 0 ? player.kills : (player.kills / player.deaths).toFixed(2);

            row.innerHTML = `
                <td>${team.teamName}</td>
                <td>${player.playerName}</td>
                <td>${player.kills}</td>
                <td>${player.deaths}</td>
                <td>${player.assists || 0}</td>
                <td>${kdRatio}</td>
            `;
            outputTable.appendChild(row);

            // Sum up the kills for the team's total kills
            totalKills += parseInt(player.kills, 10);
        });

        // Add the team's total kills to the chart data
        if (!teamKillsData.labels.includes(team.teamName)) {
            teamKillsData.labels.push(team.teamName);
            teamKillsData.datasets[0].data.push(totalKills);
        }
    });

    // Initialize the chart
    const teamKillsChart = new Chart(teamKillsChartCtx, {
        type: "bar",
        data: teamKillsData,
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                }
            }
        }
    });
};
