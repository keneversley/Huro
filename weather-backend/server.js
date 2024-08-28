const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// MySQL connection setup
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root', 
  password: 'China1200!!', 
  database: 'weather_db;'
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    process.exit(1);
  }
  console.log('Connected to MySQL');
});

// Endpoint to save weather data
app.post('/api/weather/save', (req, res) => {
  const { location, temperature, description, humidity, windSpeed, feelsLike } = req.body;

  const query = `INSERT INTO weather_info (location, temperature, description, humidity, windSpeed, feelsLike) VALUES (?, ?, ?, ?, ?, ?);`;
  db.query(query, [location, temperature, description, humidity, windSpeed, feelsLike], (err, results) => {
    if (err) {
      console.error('Error saving weather info:', err);
      res.status(500).send('Error saving weather info');
    } else {
      res.send('Weather info saved!');
    }
  });
});

// Endpoint to retrieve weather info
app.get('/api/weather', (req, res) => {
  const query = 'SELECT * FROM weather_info';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error retrieving weather info:', err);
      res.status(500).send('Error retrieving weather info');
    } else {
      res.json(results);
    }
  });
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

