import Search from "./components/search/search";
import "./App.css";
import CurrentWeather from "./components/current-weather/weather";
import { WEATHER_API_URL, WEATHER_API_KEY } from "./api";
import { useState } from "react";
import Forecast from "./components/forecast/forecast";
import { PHOTO_API_URL, PHOTO_API_KEY } from "./api";
import Photo from "./components/city-photos/city-photos";

function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [photo, setPhoto] = useState(null);

  const handleOnSearchChange = (searchData) => {
    const [lat, lon] = searchData.value.split(" ");

    const currentWeatherFetch = fetch(
      `${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    );
    const forecastFetch = fetch(
      ` ${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    );
    const photoFetch = fetch(`${PHOTO_API_URL}?query=Bucharest`, {
        headers: {
          Authorization: PHOTO_API_KEY,
        },
      });  

    Promise.all([currentWeatherFetch, forecastFetch, photoFetch])
      .then(async (response) => {
        const weatherResponse = await response[0].json();
        const forecastResponse = await response[1].json();
        const photoResponse = await response[2].json();
        setCurrentWeather({ city: searchData.label, ...weatherResponse });
        setForecast({ city: searchData.label, ...forecastResponse });
        setPhoto({city: searchData.label, ...photoResponse});
      })
      .catch((err) => console.log(err));
  };

  console.log(currentWeather);
  console.log(forecast);
  console.log(photo);

  return (
    <div id="root">
      <Search onSearchChange={handleOnSearchChange} />
      {currentWeather && <CurrentWeather data={currentWeather} />}
      {forecast && <Forecast data={forecast}/>}
      {photo && <Photo data={photo}/>}
    </div>
  );
}

export default App;
