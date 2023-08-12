var buttonHistory = $("#history");
var searchButton = $("#search-button");
var inputSearch = $("#search-input");
var searchForm = $("#search-form");
var todayArea = $("#today");
var forecastFive = $("#forecast");
var apiKey = "d312684dbe502497c563af0a35330883";
var units = "metric";
var limit = 5;
//code for API+ url + search +geolocation
function LongLat() {
  // will show the city wheather
  let coordinatesUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${inputSearch.val()}&limit=${limit}&appid=${apiKey}`;
  console.log(coordinatesUrl);
}
LongLat();
//function for buttons to search arrea and created buttons saved in local storage

//function for displaing todays wheather

//function for displaying five days forecast wheather and ellemnts creat
