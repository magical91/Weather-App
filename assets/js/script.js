$("#weather-info").hide();
$("#recent-searches").hide();
var currentDate = moment().format('L');


let weather = {
    "apiKey": "b41dfd6635a9cbc6a27f2bc778fcecf5",
    fetchWeather: function(city) {
        fetch("https://api.openweathermap.org/data/2.5/weather?q=" 
        + city + "&units=imperial&appid=" 
        + this.apiKey
        )
        .then((response) => response.json())
        .then((data) => this.displayWeather(data));
    },
    displayWeather: function(data) {
        const { name } = data;
        const { icon } = data.weather[0];
        const { temp, humidity } = data.main;
        const { speed } = data.wind;
        const { lon, lat } = data.coord;
        const { id } = data;
        document.querySelector(".city").innerText = name + " " + currentDate;
        document.querySelector(".icon").src = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
        document.querySelector(".temp").innerText = "Temp: " + temp + "°F";
        document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%";
        document.querySelector(".wind").innerText = "Wind: " + speed + " MPH";
        this.fetchUVIndex(lat, lon)
        this.fetchWeekForecast(id)
    },
    "apiKey": "dabd7c25e91b1eb7eb72fee9a490fe03",
    fetchUVIndex: function(lat, lon) {
        fetch("https://api.openweathermap.org/data/2.5/onecall?lat=" 
        + lat 
        + "&lon=" 
        + lon 
        + "&units=imperial&appid=" 
        + this.apiKey
        )
        .then((response) => response.json())
        .then((data) => this.displayUVIndex(data));
    },

    displayUVIndex: function(data) {
        const { uvi } = data.current;
        if (uvi <= 2.0) {
            document.querySelector(".index").innerText = uvi;
            document.querySelector(".index").classList = ("badge badge-success");
        } else if (uvi > 2.0 && uvi <= 5.0) {
            document.querySelector(".index").innerText = uvi;
            document.querySelector(".index").classList = ("badge badge-warning");
        } else if (uvi > 5.0 && uvi <= 10.0) {
            document.querySelector(".index").innerText = uvi;
            document.querySelector(".index").classList = ("badge badge-danger");
        }
    },

    "apiKey": "17ff6c9a0c05f29340ecc08ff3599a7e",
    fetchWeekForecast: function(id) {
        fetch("http://api.openweathermap.org/data/2.5/forecast?id=" + id + "&cnt=5&units=imperial&appid=" + this.apiKey)
        .then((response) => response.json())
        .then((data) => this.displayWeekForecast(data));
    },

    displayWeekForecast: function(data) {
        var cardHTML = "";
        for (var i = 0; i < data.list.length; i++) {
            var weatherIcon = data.list[i].weather[0].icon;console.log(dateStrArr)
		    var dateStr = data.list[i].dt_txt;console.log(dateStr)
		    var dateStrArr = dateStr.split(" ");
		    var date = dateStrArr[0];
		    var dateArr = date.split("-");
		    var newDate = dateArr[1] + "/" + dateArr[2] + "/" + dateArr[0];
            cardHTML += `
			    <div class="card text-white bg-info p-1 mr-3">
				    <div class="card-header text-center font-weight-bold">${newDate}</div>
				    <div class="card-body">
				        <p class="card-text text-center">
					        <img id="weather-icon" src="https://openweathermap.org/img/wn/${weatherIcon}.png"/>
				        </p>
				        <p class="card-text">
					        Temp: ${data.list[i].main.temp} °F
				        </p>
                        <p class="card-text">
                            Wind: ${data.list[i].wind.speed} MPH
                        </p>
				        <p class="card-text">
					        Humidity: ${data.list[i].main.humidity}%
				        </p>
				    </div>
			    </div>`;
  
		    document.querySelector(".city-week-forecast").innerHTML = cardHTML;
        }
    },

    search: function() {
        this.fetchWeather(document.querySelector(".searched-city").value);
    },
};





document.querySelector(".search-btn").addEventListener("click", function(event) {
    event.preventDefault();
    $("#weather-info").show();
    $("#recent-searches").show();
    weather.search();
});





