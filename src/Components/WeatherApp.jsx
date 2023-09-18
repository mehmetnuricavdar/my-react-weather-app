import React, { useState, useEffect, useRef } from "react";

const WeatherApp = ({ searchValue }) => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const apiKey = "03ae8b17b6c4b51c61fc70d6434a0fa0"; // Replace with your OpenWeatherMap API key

  // Create a ref to store the timeout ID
  const typingTimeoutRef = useRef(null);

  useEffect(() => {
    if (!searchValue) return;

    // Clear the previous timeout if it exists
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    // Set a new timeout to fetch data after a delay (e.g., 1500 milliseconds)
    typingTimeoutRef.current = setTimeout(() => {
      const fetchWeather = async (city) => {
        setLoading(true);

        try {
          const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
          );
          const data = await response.json();
          console.log(data);
          setWeatherData(data);
          setLoading(false);
        } catch (error) {
          console.error(error);
          setLoading(false);
        }
      };

      fetchWeather(searchValue);
    }, 1500); // Adjust the delay time as needed (e.g., 1500 milliseconds for 1.5 seconds)

    // Cleanup the timeout when the component unmounts or when searchValue changes
    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    };
  }, [searchValue]);

  useEffect(() => {
    console.log(searchValue);
    if (weatherData) {
      console.log(weatherData); // This will log the temperature when weatherData is available
    }
  }, [searchValue, weatherData]);

  return (
    <>
      <div>Loading...</div>
    </>
  );
};

export default WeatherApp;
