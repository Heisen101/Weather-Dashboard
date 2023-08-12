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
var WheatherDays = `http://api.openweathermap.org/data/2.5/forecast?lat=44.34&lon=10.99&appid=${apiKey}`;
console.log(WheatherDays);
function LongLat(CityName) {
  // will show the city wheather
  let coordinatesUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${CityName}&limit=5&appid=${apiKey}`;
  console.log(coordinatesUrl);
  fetch(coordinatesUrl)
    .then((response) => response.json())
    .then((coorditanates) => {
      if (coorditanates.cod === "404") {
        alert("Location not found. Please enter a different city name.");
        return;
      }
      var lat = coorditanates[0].lat; //will store the lat data by accesing the first city in api object
      var lon = coorditanates[0].lon; //will store the long data by accesing the first city in api object
      localStorage.setItem(CityName, JSON.stringify(coorditanates));
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
}
//this will take the value from input area and put inside funcion parameter when search button pressed
$("#search-form").submit(function (event) {
  event.preventDefault(); //prevents de default behavior of form
  var CityName = inputSearch.val();
  LongLat(CityName);
});
// function for fetching data for next 5 days using lat and long from LongLat function

function WheatherFiveDays(lat, lon) {}

//function for buttons to search arrea and created buttons saved in local storage

function searchHistory() {
  var button = $("<button>")
    .addClass("btn btn-secondary  my-2")
    .css({ height: "40px", width: "250px", borderRadius: "10px" })
    .text(inputSearch.val());

  var div = $("<div>").addClass(" mx-3 my-3").css({});
  div.append(button);
  buttonHistory.append(div);
}
searchButton.on("click", searchHistory);
//function for displaing todays wheather

//function for displaying five days forecast wheather and ellemnts creat
