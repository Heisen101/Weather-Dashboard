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
var zeroKelvin = -273.15;

//code for API+ url + search +geolocation

function LongLat(CityName) {
  // will show the city wheather
  let coordinatesUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${CityName}&limit=5&appid=${apiKey}`;
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
      //   localStorage.setItem(CityName, JSON.stringify(coorditanates));
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

      //   var forecastDisplay = false;
      //extract whether from api, pushe in an array of nested arrays, then used to create html elements to display data in html

      function forecastWheather(city) {
        var extractedWheather = [];

        var checkRightDay = {}; //created an object
        for (let i = 0; i < data.list.length; i++) {
          var wheatherD = data.list[i];
          var date = new Date(wheatherD.dt_txt);
          var day = date.getDate(); //take date day from data object
          if (!checkRightDay[day]) {
            //cheks if day with that date is created in object than will not create it, if wasn't then will create one
            checkRightDay[day] = [];
          }
          checkRightDay[day].push(wheatherD);
        }
        //extracts wheather based on the day,
        for (const day in checkRightDay) {
          var dailyWeather = checkRightDay[day];
          var firstWeatherOfDay = dailyWeather[0];
          var date = new Date(firstWeatherOfDay.dt_txt);
          var formatDate = `${date.getFullYear()}-${(date.getMonth() + 1)
            .toString()
            .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;

          var humidity = firstWeatherOfDay.main.humidity + " %";
          var temperature =
            (firstWeatherOfDay.main.temp + zeroKelvin).toFixed(1) + "°C";
          var windSpeed = firstWeatherOfDay.wind.speed + " KPH";

          var nestedArray = [formatDate, humidity, temperature, windSpeed];
          extractedWheather.push(nestedArray);
        }
        var slicedWheather = extractedWheather.slice(1);
        var h5 = $("<h4>")
          .css({ fontWeight: "bold", marginLeft: "20px" })
          .text("5-Day Forecast: " + $(inputSearch).val().toUpperCase());
        forecastFive.append(h5);
        for (let i = 0; i < slicedWheather.length; i++) {
          var dayData = slicedWheather[i];
          var div = $("<div>").addClass("card mx-3 my-3").css({
            width: "18rem",
            height: "200px",
            color: "white",
            border: "solid 2px grey",
          });
          var iconCode = data.list[i].weather[0].icon;
          console.log(iconCode);
          var iconUrl = `https://openweathermap.org/img/w/${iconCode}.png`;

          var iconImg = $("<img>")
            .attr("src", iconUrl)
            .addClass("weather-icon");

          //html elements created based on information stored in array
          var cardBody = $("<div>").addClass("card-body");

          var h4 = $("<h5>")
            .css({ color: "antiquewhite" })
            .text("Date: " + dayData[0]);
          h4.append(iconImg);
          cardBody.append(h4);
          cardBody.append($("<p>").text("Humidity: " + dayData[1]));
          cardBody.append($("<p>").text("Temperature: " + dayData[2]));
          cardBody.append($("<p>").text("Wind Speed: " + dayData[3]));
          div.append(cardBody);
          forecastFive.append(div);
        }

        localStorage.setItem(city, JSON.stringify(slicedWheather));
      }

      forecastWheather(data.city.name);

      // ------------------------------------------

      //today wheather displays on main card
      function todayWheather(data) {
        if (weatherDisplayed) {
          return; //will check if wheather was displayed and if yes, lower code will not be executed
        }
        var dataToday = data.list[0].dt_txt; //gets todays date from api
        var date = new Date(dataToday); //formats the data in new format
        var city = data.city.name;

        var ArrayList = [];

        // Format the date as needed (e.g., "YYYY-MM-DD"), will extract from new data only year, month and day
        var formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1)
          .toString()
          .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;

        var divToday = $("<div>")
          .addClass("mx-3 my-3")
          .css({ height: "220px", width: "850px", border: "solid 1px" });
        var todayH2 = $("<h3>")
          .addClass("text-start mx-3")
          .css({ fontWeight: "bold" })
          .text(city + ":" + " " + formattedDate);
        var temperature =
          "Temperature: " +
          (data.list[0].main.temp + zeroKelvin).toFixed(1) +
          "°C";
        var wind = "Wind: " + data.list[0].wind.speed + " MPH";
        var humidity = "Humidity: " + data.list[0].main.humidity + "%";
        ArrayList.push(temperature, wind, humidity);

        // Create and append the weather icon image
        var iconCode = data.list[0].weather[0].icon;
        console.log(iconCode);
        var iconUrl = `https://openweathermap.org/img/w/${iconCode}.png`;

        var iconImg = $("<img>").attr("src", iconUrl).addClass("weather-icon");
        todayH2.append(iconImg);

        divToday.append(todayH2);
        todayArea.append(divToday);
        // For loop to iterate through created array that stores data of humidity, temp and wind, and will create li to be displayed inside todays area
        for (let i = 0; i < ArrayList.length; i++) {
          var unlistedList = $("<ul>");
          var listedL = $("<li>").text(ArrayList[i]);
          unlistedList.append(listedL);
          divToday.append(unlistedList);
        }
        weatherDisplayed = true; //this makes above condition to be true
      }
      todayWheather(data);

      ///new data to be displayed
    });
}

//function for buttons to search arrea and created buttons saved in local storage

function searchHistory() {
  var CityName = inputSearch.val();
  var button = $("<button>")
    .addClass("btn btn-secondary  my-2")
    .css({ height: "40px", width: "250px", borderRadius: "10px" })
    .text(CityName)
    .attr("data-city", CityName);

  buttonHistory.append(button);
}

searchButton.on("click", searchHistory);
