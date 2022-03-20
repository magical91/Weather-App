$("#weather-info").hide();
$("#recent-searches").hide();


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
    }
};


// on click event to search city
$("#searchBtn").on("click", function(event) {
    event.preventDefault();
    $("#weather-info").show();
    $("#recent-searches").show();

    var searchedCityEl = $("searchedCity").val();
    if (searchedCityEl === "") {
        return;
    }
})



