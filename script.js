const apiKey = "c03d07a82eb04fd690f42624250406";

async function getWeather() {
  const city = document.getElementById("cityInput").value;
  const url = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=7&aqi=no&alerts=no`;
  const res = await fetch(url);
  const data = await res.json();

  if (data.error) {
    document.getElementById("weatherResult").innerHTML = "City not found!";
    return;
  }

  let current = data.current;
  let location = data.location;
  let forecast = data.forecast.forecastday;

  let html = `
    <h2>${location.name}, ${location.country}</h2>
    <h3>${current.temp_c}°C</h3>
    <p>${current.condition.text}</p>
    <img src="${current.condition.icon}" alt="">
    <div style="margin-top:20px;"><h3>7-Day Forecast</h3></div>
    <div class="forecast">
  `;

  forecast.forEach(day => {
    html += `
      <div class="day">
        <p>${day.date}</p>
        <img src="${day.day.condition.icon}" alt="">
        <p>${day.day.avgtemp_c}°C</p>
        <p>${day.day.condition.text}</p>
      </div>
    `;
  });

  html += `</div>`;
  document.getElementById("weatherResult").innerHTML = html;
}

window.onload = function () {
  getWeather();
};

document.getElementById("toggleMode").addEventListener("click", () => {
  const body = document.body;
  body.classList.toggle("dark");
  body.classList.toggle("light");

  const icon = document.getElementById("toggleMode");
  icon.textContent = body.classList.contains("light") ? "🌙" : "☀️";
});
