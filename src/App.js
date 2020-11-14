import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [city, setCity] = useState("");
  const [icon, setIcon] = useState("");
  const [weather, setWeather] = useState(null);
  const API_KEY = "80756e28d64b76871c2302454e31f47a";
  const base_url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;
  const icon_url = `http://openweathermap.org/img/w/${icon}.png`;
  useEffect(() => {
    weather && setIcon(weather.weather[0].icon);
  }, [weather]);

  const submitHandler = (e) => {
    e.preventDefault();
    axios
      .get(base_url)
      .then((res) => res.data)
      .then((data) => setWeather(data))
      .catch((err) => console.log(err));
    setCity("");
  };

  return (
    <div className="app">
      <form onSubmit={submitHandler} className="app-form">
        <input
          type="text"
          placeholder="city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      {weather && (
        <div className="hero-container">
          <div className="place">{weather.name}</div>
          <div className="main-weather">
            <img src={icon_url} alt={weather.weather[0].main} />
            <h1>{weather.weather[0].main}</h1>
          </div>
          <div className="container">
            <p className="temp">Temperature: {weather.main.temp}°C</p>
            <p className="humidity">Humidity: {weather.main.humidity}</p>
            <p className="pressure">Pressure: {weather.main.pressure}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
