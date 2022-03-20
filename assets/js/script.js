$("#weather-info").hide();
$("#recent-searches").hide();
var date = moment().format('L');


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
        document.querySelector(".city").innerText = name + " " + date;
        document.querySelector(".icon").src = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
        document.querySelector(".temp").innerText = "Temp: " + temp + "°F";
        document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%";
        document.querySelector(".wind").innerText = "Wind: " + speed + " mph";
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
        fetch("http://api.openweathermap.org/data/2.5/forecast?id=" + id + "&cnt=5&appid=" + this.apiKey)
        .then((response) => response.json())
        .then((data) => this.displayWeekForecast(data));
    },

    displayWeekForecast: function(data) {
        
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





