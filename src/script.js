
function formatDate() {
  let now = new Date();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday"
  ];
  let hours = now.getHours();
  let minutes = now.getMinutes();
  if (minutes < 10) minutes = "0" + minutes;
  if (hours < 10) hours = "0" + hours;
  let day = days[now.getDay()];
  let currentDate = `${day} ${hours}:${minutes}`;
  return currentDate;
}
let showTime = document.querySelector(".show-time");
showTime.innerHTML = formatDate(new Date());

function enterLocation(event) {
  event.preventDefault();
  let locationInput = document.querySelector("#search-input");
  let currentLocation = document.querySelector("#location-name");
  locationInput.value = locationInput.value[0].toUpperCase() + locationInput.value.substring(1);

  currentLocation.innerHTML = `${locationInput.value}`;

  let apiKey = "5dae726f6a3325128a4f162c5b01cfa9";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiUrl = `${apiEndpoint}?q=${locationInput.value}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showTemperature);
}

function showTemperature(response) {
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#location-humidity");
  let windElement = document.querySelector("#wind-speed");
  let iconElement = document.querySelector("#icon");
  let temperature = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector("#location-temp");

celsiusTemperature =  response.data.main.temp;

  temperatureElement.innerHTML = `${temperature}`;
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  iconElement.setAttribute("src",`http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
  iconElement.setAttribute("alt", response.data.weather[0].description);
}
function showFahrenheitTemperature(event) {
  event.preventDefault();

  let temperatureElement = document.querySelector("#location-temp");

  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");

  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function showCelsiusTemperature(event) {
  event.preventDefault();

  let temperatureElement = document.querySelector("#location-temp");

  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");

  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let searchForm = document.querySelector("#form-input");
searchForm.addEventListener("submit", enterLocation);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", showFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", showCelsiusTemperature);