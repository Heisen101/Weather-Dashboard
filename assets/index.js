var buttonHistory = $("#history");
var searchButton = $("#search-button");
var inputSearch = $("#search-input");
var searchForm = $("#search-form");
var todayArea = $("#today");
var forecastFive = $("#forecast");
var apiKey = "d312684dbe502497c563af0a35330883";
var units = "metric";
var limit = 5;
var lat, lon;

//code for API+ url + search +geolocation

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
      WheatherFiveDays(lat, lon);
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

var weatherDisplayed = false; // this will make the main card on top to be displayed once only
// function for fetching data for next 5 days using lat and long from LongLat function
function WheatherFiveDays(lat, lon) {
  var WheatherDays = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`;
  //   console.log(WheatherDays);
  fetch(WheatherDays)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      //will show today wheather on ain card

      function todayWheather() {
        if (weatherDisplayed) {
          return; //will check if wheather was displayed and if yes, lower code will not be executed
        }
        var dataToday = data.list[0].dt_txt; //gets todays date from api
        var date = new Date(dataToday); //formats the data in new format
        var city = data.city.name;
        console.log(city);

        // Format the date as needed (e.g., "YYYY-MM-DD"), will extract from new data only year, month and day
        var formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1)
          .toString()
          .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;
        console.log(formattedDate);
        var divToday = $("<div>")
          .addClass("mx-3 my-3")
          .css({ height: "180px", width: "850px", border: "solid 1px" });
        var todayH2 = $("<h3>")
          .addClass("text-start mx-3")
          .css({ fontWeight: "bold" })
          .text(city + ":" + " " + formattedDate);
        divToday.append(todayH2);
        todayArea.append(divToday);
        weatherDisplayed = true; //this makes above condition to be true
      }
      todayWheather();

      //   console.log(data.list[0].main.temp);
      //   data.list[0].forEach(function (entry) {
      //     var temperature = entry.main.temp;
      //     console.log(temperature);
      //   });
    });
}

//function for buttons to search arrea and created buttons saved in local storage

function searchHistory() {
  var button = $("<button>")
    .addClass("btn btn-secondary  my-3")
    .css({ height: "40px", width: "250px", borderRadius: "10px" })
    .text(inputSearch.val());

  var div = $("<div>").addClass(" mx-3 my-3").css({});
  div.append(button);
  buttonHistory.append(div);
}
searchButton.on("click", searchHistory);
//function for displaing todays wheather

//function for displaying five days forecast wheather and ellemnts creat
