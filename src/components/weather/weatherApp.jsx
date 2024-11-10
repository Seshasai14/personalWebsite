import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'tailwindcss/tailwind.css';
const WeatherApp = () => {
  const WEATHER_API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState([]);
  const [location, setLocation] = useState('Visakhapatnam');
  const [searchInput, setSearchInput] = useState('Visakhapatnam');
  const [sunData, setSunData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch current weather data
        const weatherResponse = await axios.get(`https://api.tomorrow.io/v4/weather/realtime?location=${location.toLowerCase()}&apikey=${WEATHER_API_KEY}`);
        setWeatherData(weatherResponse.data);

        // Fetch forecast data
        const forecastResponse = await axios.get(`https://api.tomorrow.io/v4/weather/forecast?location=${location.toLowerCase()}&apikey=${WEATHER_API_KEY}`);
        setForecastData(forecastResponse.data.timelines.daily.slice(0, 5)); // Get 5-day forecast

        // Fetch sunrise and sunset data
        // Note: You'll need to get the latitude and longitude for the location
        // This is a placeholder, you should implement geocoding to get accurate coordinates
        const sunResponse = await axios.get(`https://api.sunrisesunset.io/json?lat=38.907192&lng=-77.036873`);
        setSunData(sunResponse.data.results);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };
    fetchData();
  }, [location]);

  const handleSearch = (e) => {
    e.preventDefault();
    setLocation(searchInput);
  };

  const getWeatherIcon = (weatherCode, precipitationProbability) => {
    if (precipitationProbability > 30) {
      return "🌧️"; // Rain icon
    }
    switch(weatherCode) {
      case 1000: return "☀️"; // Clear, Sunny
      case 1100: case 1101: case 1102: return "🌤️"; // Mostly Clear, Partly Cloudy
      case 1001: return "☁️"; // Cloudy
      case 2000: case 2100: return "🌫️"; // Fog
      case 4000: case 4001: case 4200: return "🌧️"; // Rain
      case 5000: case 5001: case 5100: return "🌨️"; // Snow
      case 6000: case 6200: return "🌧️🌨️"; // Freezing Rain
      case 7000: case 7101: case 7102: return "🌨️"; // Ice
      case 8000: return "🌩️"; // Thunderstorm
      default: return "❓"; // Unknown
    }
  };

  const formatDate = (dateString) => {
    const options = { weekday: 'short', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <div className="m-5 grid grid-cols-3 bg-zinc-100 rounded shadow-2xl p-5">
      <div className="col-span-1 bg-white rounded-lg shadow p-5">
        <form onSubmit={handleSearch} className="mb-4">
          <input
            type="text"
            placeholder="Enter location"
            className="w-full p-2 border rounded"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <button type="submit" className="mt-2 w-full bg-blue-500 text-white p-2 rounded">Search</button>
        </form>
        <h1 className="text-3xl font-bold mb-2">{location}</h1>
        <div className="text-6xl mb-4">
          {getWeatherIcon(
            weatherData?.data?.values?.weatherCode,
            weatherData?.data?.values?.precipitationProbability
          )}
        </div>
        <h2 className="text-4xl font-semibold mb-2">
          {weatherData?.data?.values?.temperature}°C
        </h2>
        <p>{weatherData?.data?.values?.precipitationProbability > 30 ? 'Chance of rain' : 'No rain expected'}</p>
        <p>{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
      </div>

      <div className="col-span-2 bg-white rounded-lg shadow p-5 ml-5">
        <h3 className="text-xl font-semibold mb-4">5-Day Forecast</h3>
        <div className="grid grid-cols-5 gap-4">
          {forecastData.map((day, index) => (
            <div key={index} className="text-center">
              <p className="font-medium">{formatDate(day.time)}</p>
              <div className="text-3xl my-2">
                {getWeatherIcon(day.values.weatherCodeMax, day.values.precipitationProbabilityAvg)}
              </div>
              <p>{day.values.temperatureAvg}°C</p>
              <p className="text-sm">{day.values.precipitationProbabilityAvg > 30 ? 'Rain likely' : 'No rain'}</p>
            </div>
          ))}
        </div>

        <h3 className="text-xl font-semibold mt-8 mb-4">Today's Highlights</h3>
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-blue-100 p-4 rounded">
            <h4 className="font-medium">Humidity</h4>
            <p className="text-2xl">{weatherData?.data?.values?.humidity || 'N/A'}%</p>
          </div>
          <div className="bg-yellow-100 p-4 rounded">
            <h4 className="font-medium">Wind Speed</h4>
            <p className="text-2xl">{weatherData?.data?.values?.windSpeed || 'N/A'} km/h</p>
          </div>
          <div className="bg-green-100 p-4 rounded">
            <h4 className="font-medium">Visibility</h4>
            <p className="text-2xl">{weatherData?.data?.values?.visibility || 'N/A'} km</p>
          </div>
          <div className="bg-purple-100 p-4 rounded col-span-2">
            <h4 className="font-medium">Sunrise & Sunset</h4>
            <p>Sunrise: {sunData?.sunrise || 'N/A'}</p>
            <p>Sunset: {sunData?.sunset || 'N/A'}</p>
          </div>
          <div className="bg-red-100 p-4 rounded">
            <h4 className="font-medium">UV Index</h4>
            <p className="text-2xl">{weatherData?.data?.values?.uvIndex || 5}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WeatherApp;
