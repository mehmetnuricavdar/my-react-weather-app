/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from "react";

const WeatherApp = ({ searchValue }) => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const apiKey = process.env.REACT_APP_API_KEY;
  const typingTimeoutRef = useRef(null);

  useEffect(() => {
    if (!searchValue) return;

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    typingTimeoutRef.current = setTimeout(() => {
      const fetchWeather = async (city) => {
        setLoading(true);

        try {
          const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
          );
          const data = await response.json();
          setWeatherData(data);
          setLoading(false);
        } catch (error) {
          console.error(error);
          setLoading(false);
        }
      };

      fetchWeather(searchValue);
    }, 1500);

    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    };
  }, [searchValue]);

  useEffect(() => {
    if (weatherData) {
      // Updating background imagedsad
      document.body.style.backgroundImage = `url('https://source.unsplash.com/1600x1080/?${weatherData.name}')`;
    }
  }, [weatherData]);

  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : weatherData ? (
        <div className="weather">
          <h1 className="city">Weather in {weatherData.name}</h1>
          <img
            src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`}
            alt="Weather Icon"
            className="icon"
          />
          <div className="description">
            {weatherData.weather[0].description}
          </div>
          <h1 className="temp">{Math.floor(weatherData.main.temp)} °C</h1>
          <div className="humidity">Humidity: {weatherData.main.humidity}%</div>
          <div className="wind">
            Wind speed: {Math.floor(weatherData.wind.speed)} km/h
          </div>
          <div className="sunrise">
            Sunrise:{" "}
            {new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString(
              "en-US"
            )}
          </div>
          <div className="sunset">
            Sunset:{" "}
            {new Date(weatherData.sys.sunset * 1000).toLocaleTimeString(
              "en-US"
            )}
          </div>
        </div>
      ) : null}{" "}
    </>
  );
};

export default WeatherApp;
