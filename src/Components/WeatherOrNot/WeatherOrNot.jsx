import React, { useState } from 'react'
import './WeatherOrNot.css'

import searchicon from '../Assets/search.png';
import sunicon from '../Assets/sun.png';
import cloudicon from '../Assets/cloud.png';
import drizzleicon from '../Assets/drizzle.png';
import rainicon from '../Assets/rain.png';
import snowicon from '../Assets/snow.png';
import windicon from '../Assets/wind.png';
import humidityicon from '../Assets/humidity.png';


const WeatherOrNot = () => {

    let api_key = "";
    const[wicon,setWicon] = useState(cloudicon);

    const search = async () => {
      //fetch data from api
      const element = document.getElementsByClassName("cityInput");
      if(element[0].value===""){
        return 0;
      }
      let url =`http://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=Metric&APPID=${api_key}`;

      let response = await fetch (url);
      //pass to data into JSON
      let data = await response.json();
      const humidity = document.getElementsByClassName("humidity-percent");
      const wind = document.getElementsByClassName("wind-rate")
      const temperature = document.getElementsByClassName("weather-temp")
      const location = document.getElementsByClassName("weather-location")

      humidity[0].innerHTML = data.main.humidity+"%";
      wind[0].innerHTML = Math.floor(data.wind.speed)+ " km/h";
      temperature[0].innerHTML = Math.floor(data.main.temp)+ " °C";
      location[0].innerHTML = data.name;

      if(data.weather[0].icon==="01d" || data.weather[0].icon==="01n"){
        setWicon(sunicon);
      } else if(data.weather[0].icon==="02d" || data.weather[0].icon==="02n"){
        setWicon(cloudicon);
      } else if(data.weather[0].icon==="03d" || data.weather[0].icon==="03n"){
        setWicon(drizzleicon);
      } else if(data.weather[0].icon==="04d" || data.weather[0].icon==="04n"){
        setWicon(drizzleicon);
      } else if(data.weather[0].icon==="09d" || data.weather[0].icon==="09n"){
        setWicon(rainicon);
      } else if(data.weather[0].icon==="010d" || data.weather[0].icon==="010n"){
        setWicon(rainicon);
      } else if(data.weather[0].icon==="13d" || data.weather[0].icon==="13n"){
        setWicon(snowicon);
      } else {
        setWicon(sunicon);
      }

    }

  return (
    <div className='container'>
      <div className="top-bar">

        <input type="text" className="cityInput" placeholder='Search' />
        <div className="search-icon" onClick={()=>{search()}}>
            <img src={searchicon} alt="" />
        </div>
      </div>
      <div className="weather-image">
        <img src={wicon} alt="" />
      </div>
      <div className="weather-temp"></div>
      <div className="weather-location"></div>
      <div className="data-container">
        <div className="element">
          <img src={humidityicon} alt="" className='icon'/>
          <div className="data">
            <div className="humidity-percent"></div>
            <div className="text">Humidity</div>
          </div>
        </div>

        <div className="element">
          <img src={windicon} alt="" className='icon' />
          <div className="data">
            <div className="wind-rate"></div>
            <div className="text">Wind Speed</div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default WeatherOrNot
