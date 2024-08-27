import React, {useState} from 'react';
import axios from 'axios';

function App() {
 // const url =`https://api.openweathermap.org/data/2.5/weather?q=miami&appid=771eadba622edc5eac6d571ff6eada55`

  

  return (
    <div className="app">
      <div className="container">
        <div className="top">
          <div className='location'>
            <p>Miami</p>
          </div>
          <div className='temp'>
            <h1>90°F</h1>
          </div>
          <div className="description">
            <p>Clouds</p>
          </div>
        </div>
        <div className="bottom">
          <div className='feels'>
            <p>105°F</p>
          </div>
          <div className='humidity'>
            <p>40%</p>
          </div>
          <div className='wind'>
            <p>5%</p>
          </div>
        </div>
      </div> 
    </div>
  );
}

export default App;
