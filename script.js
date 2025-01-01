const scoreboardBody = document.querySelector("#scoreboard tbody");
const teamKillsChartCtx = document.getElementById("teamKillsChart").getContext("2d");

// Chart.js setup
const teamKillsData = {
    labels: [],
    datasets: [
        {
            label: "Team Kills",
            data: [],
            backgroundColor: "rgba(75, 192, 192, 0.6)",
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 1,
        },
    ],
};

const teamKillsChart = new Chart(teamKillsChartCtx, {
    type: "bar",
    data: teamKillsData,
    options: {
        responsive: true,
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    },
});

// Function to update the chart
function updateChart() {
    teamKillsChart.update();
}

// Function to calculate team totals
function calculateTeamTotals(teamName) {
    let totalKills = 0;
    let totalDeaths = 0;

    document.querySelectorAll(`tr[data-team="${teamName}"].player-row`).forEach((row) => {
        const kills = parseInt(row.getAttribute("data-kills"), 10) || 0;
        const deaths = parseInt(row.getAttribute("data-deaths"), 10) || 0;

        totalKills += kills;
        totalDeaths += deaths;
    });

    return { totalKills, totalDeaths };
}

// Function to update the team's header row with totals
function updateTeamHeader(teamName) {
    const { totalKills, totalDeaths } = calculateTeamTotals(teamName);
    const headerRow = document.querySelector(`.team-header[data-team="${teamName}"]`);
    if (headerRow) {
        headerRow.querySelector(".team-name").textContent = `${teamName} (Kills: ${totalKills}, Deaths: ${totalDeaths})`;
    }
}

// Function to sort teams by total kills
function sortTeams() {
    const rows = Array.from(scoreboardBody.children);
    const teams = new Map();

    rows.forEach((row) => {
        if (row.classList.contains("team-header")) {
            const teamName = row.getAttribute("data-team");
            const { totalKills } = calculateTeamTotals(teamName);
            teams.set(teamName, totalKills);
        }
    });

    const sortedTeams = [...teams.entries()].sort((a, b) => b[1] - a[1]);

    scoreboardBody.innerHTML = "";
    sortedTeams.forEach(([teamName]) => {
        rows.forEach((row) => {
            if (row.getAttribute("data-team") === teamName) {
                scoreboardBody.appendChild(row);
            }
        });
    });

    updateChart();
}

// Function to add a new team
function addTeam() {
    const teamName = prompt("Enter Team Name:");
    if (!teamName || teamName.trim() === "") {
        alert("Team name cannot be empty!");
        return;
    }

    // Add team header
    const headerRow = document.createElement("tr");
    headerRow.classList.add("team-header");
    headerRow.setAttribute("data-team", teamName);
    headerRow.innerHTML = `<td colspan="7" class="team-name">${teamName} (Kills: 0, Deaths: 0)</td>`;
    scoreboardBody.appendChild(headerRow);

    // Add Add Player button for this team
    const addPlayerButtonRow = document.createElement("tr");
    addPlayerButtonRow.innerHTML = `
        <td colspan="7">
            <button onclick="addPlayer('${teamName}')">Add Player to ${teamName}</button>
        </td>
    `;
    scoreboardBody.appendChild(addPlayerButtonRow);

    // Add default player row
    addPlayerRow(teamName, "Player 1");

    updateChartData();
}

// Function to add a new player row
function addPlayer(teamName) {
    const playerName = prompt("Enter Player Name:");
    if (!playerName || playerName.trim() === "") {
        alert("Player name cannot be empty!");
        return;
    }

    addPlayerRow(teamName, playerName);
}

// Function to add a player row
function addPlayerRow(teamName, playerName) {
    const row = document.createElement("tr");
    row.classList.add("player-row");
    row.setAttribute("data-team", teamName);
    row.setAttribute("data-kills", "0");
    row.setAttribute("data-deaths", "0");

    row.innerHTML = `
        <td></td>
        <td contenteditable="true">${playerName}</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td>
            <button onclick="editPlayer(this)">Edit</button>
            <button onclick="deleteRow(this)">Delete</button>
        </td>
    `;

    scoreboardBody.appendChild(row);
}

// Function to edit player stats
function editPlayer(button) {
    const row = button.closest("tr");
    const kills = parseInt(prompt("Enter kills:", row.getAttribute("data-kills")) || 0, 10);
    const deaths = parseInt(prompt("Enter deaths:", row.getAttribute("data-deaths")) || 0, 10);
    const assists = parseInt(prompt("Enter assists:", row.cells[4].textContent) || 0, 10);

    const kdRatio = deaths === 0 ? kills : (kills / deaths).toFixed(2);

    row.setAttribute("data-kills", kills);
    row.setAttribute("data-deaths", deaths);

    row.innerHTML = `
        <td></td>
        <td contenteditable="true">${row.cells[1].textContent}</td>
        <td>${kills}</td>
        <td>${deaths}</td>
        <td>${assists}</td>
        <td>${kdRatio}</td>
        <td>
            <button onclick="editPlayer(this)">Edit</button>
            <button onclick="deleteRow(this)">Delete</button>
        </td>
    `;

    updateTeamTotals(row.getAttribute("data-team"));
}

// Function to delete a player or team row
function deleteRow(button) {
    const row = button.closest("tr");
    const teamName = row.getAttribute("data-team");
    row.remove();
    updateTeamTotals(teamName);
}

// Function to update team totals
function updateTeamTotals(teamName) {
    updateTeamHeader(teamName);
    updateChartData();
}

// Function to update chart data
function updateChartData() {
    teamKillsData.labels = [];
    teamKillsData.datasets[0].data = [];

    const headerRows = document.querySelectorAll(".team-header");
    headerRows.forEach((row) => {
        const teamName = row.getAttribute("data-team");
        const { totalKills } = calculateTeamTotals(teamName);

        teamKillsData.labels.push(teamName);
        teamKillsData.datasets[0].data.push(totalKills);
    });

    updateChart();
}

// Function to save data and view output
function saveData() {
    localStorage.setItem("scoreboardData", JSON.stringify(getScoreboardData()));
    window.location.href = "output.html";
}

// Function to get scoreboard data
function getScoreboardData() {
    const teams = [];
    document.querySelectorAll(".team-header").forEach((headerRow) => {
        const teamName = headerRow.getAttribute("data-team");
        const players = [];
        document.querySelectorAll(`tr[data-team="${teamName}"].player-row`).forEach((playerRow) => {
            const playerName = playerRow.cells[1].textContent;
            const kills = playerRow.getAttribute("data-kills");
            const deaths = playerRow.getAttribute("data-deaths");
            players.push({ playerName, kills, deaths });
        });
        teams.push({ teamName, players });
    });
    return teams;
}

// Initialize teams (example)
addTeam();
