//date & time---------------------------------------------------------------------------------
function formatDateTime(date) {
  //date
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let day = days[now.getDay()];
  //time
  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
    //we need to do this because if the hours are less than 10, they would show as, for example "3" instead of "03"
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
    //we need to do this because if the minutes are less than 10, they would show as, for example "3" instead of "03"
  }
  //date & time statement
  return `${day} ${hours}:${minutes}`;
}
let now = new Date();
let dateTime = document.querySelector("#date-time");
dateTime.innerHTML = formatDateTime(now);

//temperature------------------------------------------------------------------------------------
//fahrenheit
let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

function convertToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = 66;
}
//celcius
let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertToCelsius);

function convertToCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = 19;
}

//---------------------------week 5 hw
function showWeather(response) {
  document.querySelector("#city-element").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#weather-description").innerHTML =
    response.data.weather[0].main;
}
function findCity(city) {
  let apiKey = "f43e87505c78f4b7859080149fe4a760";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

function whenSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  findCity(city);
}

function searchLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "f43e87505c78f4b7859080149fe4a760";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let searchForm = document.querySelector("#search-query");
searchForm.addEventListener("submit", whenSubmit);
let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

findCity("Detroit, MI");
