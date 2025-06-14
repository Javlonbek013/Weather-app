const apiKey = "e35b1741ccbb485f8c8131031250506";
const cityInput = document.getElementById("cityInput");
const searchIcon = document.getElementById("searchIcon");
const searchBtn = document.getElementById("searchBtn");
const toggleMode = document.getElementById("toggleMode");

searchIcon.addEventListener("click", () => {
  if (!cityInput.classList.contains("visible")) {
    cityInput.classList.add("visible");
    cityInput.focus();
  } else {
    getWeather();
  }
});

searchBtn.addEventListener("click", getWeather);

toggleMode.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  document.body.classList.toggle("light");
  toggleMode.textContent = document.body.classList.contains("light") ? "🌙" : "☀️";
});

async function getWeather() {
  const city = cityInput.value.trim();
  if (!city) return alert("Enter a city");

  const url = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=7&aqi=no&alerts=no`;

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
      <h3>Wind: ${current.wind_kph} km/h</h3>
      <p>${current.condition.text}</p>
      <img src="${current.condition.icon}" alt="${current.condition.text}" />
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

    html += "</div>";
    document.getElementById("weatherResult").innerHTML = html;

  } catch (error) {
    console.error("API Error", error);
    document.getElementById("weatherResult").innerHTML = "<p>Something went wrong!</p>";
  }
}

window.addEventListener("load", getWeather);
