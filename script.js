const apiKey = "c03d07a82eb04fd690f42624250406";

async function getWeather() {
  const cityInput = document.getElementById("cityInput");
  const city = cityInput.value.trim();

  if (!city) {
    alert("Please enter a city");
    return;
  }

  const url = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${encodeURIComponent(city)}&days=7&aqi=no&alerts=no`;

  try {
    const res = await fetch(url);
    const data = await res.json();

    if (data.error) {
      document.getElementById("weatherResult").innerHTML = "<p>City not found!</p>";
      return;
    }

    const current = data.current;
    const location = data.location;
    const forecast = data.forecast.forecastday;

    let html = `
      <h2>${location.name}, ${location.country}</h2>
      <h3>${current.temp_c}°C</h3>
      <h3>Humidity: ${current.humidity}%</h3>
      <p>${current.condition.text}</p>
      <img src="${current.condition.icon}" alt="${current.condition.text}" />
      <div style="margin-top:20px;"><h3>7-Day Forecast</h3></div>
      <div class="forecast">
    `;

    forecast.forEach(day => {
      html += `
        <div class="day">
          <p>${day.date}</p>
          <img src="${day.day.condition.icon}" alt="${day.day.condition.text}" />
          <p>${day.day.avgtemp_c}°C</p>
          <p>Humidity: ${day.day.avghumidity}%</p>
          <p>${day.day.condition.text}</p>
        </div>
      `;
    });

    html += `</div>`;
    document.getElementById("weatherResult").innerHTML = html;

  } catch (error) {
    document.getElementById("weatherResult").innerHTML = "<p>Error fetching weather data.</p>";
    console.error(error);
  }
}

const searchIcon = document.getElementById("searchIcon");
const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");

searchIcon.addEventListener("click", () => {
  if (!cityInput.classList.contains("visible")) {
    cityInput.classList.add("visible");
    cityInput.focus();
  } else {
    getWeather();
  }
});

searchBtn.addEventListener("click", getWeather);

document.getElementById("toggleMode").addEventListener("click", () => {
  const body = document.body;
  body.classList.toggle("dark");
  body.classList.toggle("light");

  const icon = document.getElementById("toggleMode");
  icon.textContent = body.classList.contains("light") ? "🌙" : "☀️";
});

window.addEventListener("load", () => {
  getWeather();
});
