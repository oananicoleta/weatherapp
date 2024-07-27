const showWeatherBtn = document.getElementById("show-weather");
const cityInput = document.getElementById("city");
const weatherContainer = document.getElementById("weather-container");
const showForecastBtn = document.getElementById("show-forecast");
const weatherForecast = document.getElementById("weather-forecast");

showWeatherBtn.addEventListener("click", showWeather);
showForecastBtn.addEventListener("click", showForecast);

const URL_CURRENT_WEATHER =
  "https://api.openweathermap.org/data/2.5/weather?appid=69518b1f8f16c35f8705550dc4161056&units=metric&q=";
const URL_FORECAST_WEATHER =
  "https://api.openweathermap.org/data/2.5/forecast?appid=69518b1f8f16c35f8705550dc4161056&units=metric&q=";

async function showWeather() {
  const city = cityInput.value;
  const response = await fetch(`${URL_CURRENT_WEATHER}${city}`);
  const weather = await response.json();

  const iconCode = weather.weather[0].icon;
  const iconImageUrl = `http://openweathermap.org/img/w/${iconCode}.png`;

  weatherContainer.innerHTML = `
    <div class="weather-container bg-dark shadow grid rel">
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

async function showForecast() {
  const city = cityInput.value;
  const response = await fetch(`${URL_FORECAST_WEATHER}${city}`);
  const forecast = await response.json();

  forecast.list.forEach((forecast) => {
    const dateTime = new Date(forecast.dt * 1000);
    const day = dateTime.toLocaleDateString("en", { weekday: "long" });
    const time = dateTime.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    const temp = forecast.main.temp;
    const description = forecast.weather[0].description;
    const iconCode = forecast.weather[0].icon;
    const iconImageUrl = `http://openweathermap.org/img/w/${iconCode}.png`;

    const forecastItem = document.createElement("div");
    forecastItem.innerHTML = `
      <div class="forecast-container grid rel bg-dark shadow">
        <img src=${iconImageUrl} />
        <p>${day}</p>
        <p>Hour: ${time}</p>
        <p>Temperature: ${temp} °C</p>
        <p>Description: ${description}</p>
      </div>
    `;
    weatherForecast.appendChild(forecastItem);
  });
}
