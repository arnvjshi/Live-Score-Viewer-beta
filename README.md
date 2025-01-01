# BGMI Live Scoreboard

This project is a dynamic live scoreboard for the BGMI (Battlegrounds Mobile India) game. The scoreboard allows the addition of teams and players, and updates their stats like kills, deaths, assists, and calculates the K/D ratio. The final output is displayed with a cleaner UI and bar charts.

## Features

- **Add Teams and Players**: You can add up to 5 players for each team.
- **Dynamic Updates**: Kills, deaths, and assists are updated dynamically through JavaScript.
- **Calculate K/D Ratio**: The K/D ratio is automatically calculated for each player.
- **Sort Teams**: Teams can be sorted based on the total kills of their players.
- **Charts**: The output page shows a bar chart of total kills per team.
- **Mobile-Friendly**: The UI is responsive and works seamlessly on mobile devices.
- **No HTML Input**: Data can only be added or edited through JavaScript, ensuring a clean frontend.

## Files Structure

- **index.html**: The main page where users add teams, players, and update stats.
- **output.html**: The view-only page that shows the cleaner scoreboard and graphs.
- **output.js**: Handles rendering the scoreboard and the bar chart on the output page.
- **style.css**: The CSS file for styling the pages with a dark theme and mobile-friendly design.

## Setup Instructions

### Prerequisites
- Ensure you have a modern browser that supports local storage and JavaScript.

### Running the Project

1. Clone or download the project files.
2. Open `index.html` in your browser to add teams and players.
3. Click the "Output" button to see the scoreboard and chart on `output.html`.

### How to Use

- **Add Teams**: Use the "Add Team" button to create a team.
- **Add Players**: Use the "Add Player" button under each team to add players dynamically.
- **Update Player Stats**: Input kills, deaths, and assists to update the stats.
- **Generate Output**: After entering the data, click the "Output" button to view the final scoreboard with the total kills per team and a chart.

### Technologies Used

- **HTML5**: For the webpage structure.
- **CSS3**: For styling and ensuring a mobile-friendly design.
- **JavaScript**: For adding dynamic interactivity, including adding teams, players, and updating their stats.
- **Chart.js**: For rendering the bar chart showing the total kills for each team.

## License

This project is open-source and available under the MIT License.
