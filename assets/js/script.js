var searchButton = document.querySelector(".btn")
var weatherInfo = document.querySelector(".weather-info")
var searchHistory = document.querySelector(".search")

searchButton.addEventListener("click", displayContent);

function displayContent() {
    event.preventDefault()
    weatherInfo.classList.remove("hide");
    searchHistory.classList.remove("hide");
}
