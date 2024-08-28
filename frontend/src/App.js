


// 1. Import the necessary React hooks and axios
import React, { useState } from 'react';
import axios from 'axios';

function App() {
  // 2. Set up state for weather data and location
  const [data, setData] = useState({});
  const [location, setLocation] = useState('');

  // 3. Define the API URL for fetching weather data from OpenWeatherMap
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=771eadba622edc5eac6d571ff6eada55`;

  // 4. Function to handle searching for the location
  const searchLocation = (event) => {
    if (event.key === 'Enter') {
      axios.get(url).then((response) => {
        // 5. Save the weather data to state
        setData(response.data);
        console.log(response.data);

           // Post weather data to backend
           axios.post('http://localhost:5001/api/weather/save', {
            location: response.data.name,
            temperature: response.data.main.temp,
            description: response.data.weather[0].description,
            humidity: response.data.main.humidity,
            windSpeed: response.data.wind.speed,
            feelsLike: response.data.main.feels_like
          })
          .then(() => {
            console.log('Weather data saved to the database');
          })
          .catch((error) => {
            console.error('Error saving data to the database:', error);
          });
  
        });
        setLocation('');
      }
    }
  return (
    <div className="app">
      <div className="search">
        <input
          value={location}
          onChange={event => setLocation(event.target.value)}
          onKeyPress={searchLocation}
          placeholder='Enter location'
          type="text"
        />
      </div>
      <div className="container">
        <div className="top">
          <div className='location'>
            <p>{data.name}</p>
          </div>
          <div className='temp'>
            {data.main ? <h1>{data.main.temp.toFixed()}°F</h1> : null}
          </div>
          <div className="description">
            {data.weather ? <p>{data.weather[0].main}</p> : null}
          </div>
        </div>

        {data.name !== undefined &&
          <div className="bottom">
            <div className='feels'>
              {data.main ? <p className='bold'>{data.main.feels_like.toFixed()}°F</p> : null}
              <p>Feels Like</p>
            </div>
            <div className='humidity'>
              {data.main ? <p className='bold'>{data.main.humidity}%</p> : null}
              <p>Humidity</p>
            </div>
            <div className='wind'>
              {data.wind ? <p className='bold'>{data.wind.speed.toFixed()}MPH</p> : null}
              <p>Winds</p>
            </div>
          </div>
        }
      </div>
    </div>
  );
}

export default App;

