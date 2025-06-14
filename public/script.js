document.getElementById('searchBtn').addEventListener('click', async () => {
  const city = document.getElementById('cityInput').value;
  const res = await fetch(`/api/weather?city=${city}`);
  const data = await res.json();

  if (data.error) {
    document.getElementById('weatherResult').textContent = 'Topilmadi';
    return;
  }

  document.getElementById('weatherResult').innerHTML = `
    <h3>${data.location.name}</h3>
    <p>${data.current.temp_c}°C</p>
    <p>${data.current.condition.text}</p>
  `;
});
