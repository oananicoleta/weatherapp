const showWeatherBtn = document.getElementById("show-weather");
const cityInput = document.getElementById("city");
const weatherContainer = document.getElementById("weather-container");

showWeatherBtn.addEventListener("click", showWeather);

const URL_CURRENT_WEATHER =
  "https://api.openweathermap.org/data/2.5/weather?appid=69518b1f8f16c35f8705550dc4161056&units=metric&q=";

async function showWeather() {
  const city = cityInput.value;
  const response = await fetch(`${URL_CURRENT_WEATHER}${city}`);
  const weather = await response.json();

  console.log(weather);

  const iconCode = weather.weather[0].icon;
  const iconImageUrl = `http://openweathermap.org/img/w/${iconCode}.png`;

  weatherContainer.innerHTML = `
    <div>
        <img src=${iconImageUrl} />
        <p>Description: ${weather.weather[0].description}</p>
        <p>Humidity: ${weather.main.humidity}% </p>
        <p>Pressure: ${weather.main.pressure} Pa</p>
        <p>Current Temperature: ${weather.main.temp} °C</p>
        <p>Min: ${weather.main.temp_min} °C</p>
        <p>Max: ${weather.main.temp_max} °C</p>
    </div>
    `;
}
