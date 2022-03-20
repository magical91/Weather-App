$("#weather-info").hide();
$("#recent-searches").hide();
var date = moment().format('L');
        

let weather = {
    "apiKey": "b41dfd6635a9cbc6a27f2bc778fcecf5",
    fetchWeather: function(city) {
        fetch("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + this.apiKey)
        .then((response) => response.json())
        .then((data) => this.displayWeather(data));
    },
    displayWeather: function(data) {
        const { name } = data;
        const { icon, description } = data.weather[0];
        const { temp, humidity } = data.main;
        const { speed } = data.wind;
        console.log(name,icon,description,temp,humidity,speed)
        document.querySelector(".city").innerText = name + " " + date;
        document.querySelector(".icon").src = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
        document.querySelector(".temp").innerText = "Temp: " + temp + "°F";
        document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%";
        document.querySelector(".wind").innerText = "Wind: " + speed + " mph";
        document.querySelector(".index")
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





