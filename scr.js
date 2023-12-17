window.onload=function(){
    let forecastData;

    function refreshWeather (response){
        let temperatureElement = document.querySelector("#temperature");
        let temperature = response.data.temperature.current;
        let cityElement = document.querySelector("#city");
        let descriptionElement = document.querySelector("#description");
        let humidityElement = document.querySelector("#humidity");
        let windSpeedElement = document.querySelector("#wind-speed");
        let timeElement = document.querySelector("#time");
        let date = new Date(response.data.time * 1000);
        let iconElement = document.querySelector("#icon");

        cityElement.innerHTML = response.data.city;
        timeElement.innerHTML = formatDate(date);
        descriptionElement.innerHTML = response.data.condition.description;
        humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
        windSpeedElement.innerHTML = `${response.data.wind.speed}km/h`;
        temperatureElement.innerHTML = Math.round(temperature);
        iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-app-icon" />`;

        getForecast(response.data.city);
    }
    function formatDate(date){
        let minutes = date.getMinutes();
        let hours = date.getHours();
        let days = [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
        ];
        let day = days[date.getDay()];

        if (minutes < 10) {
            minutes = `0${minutes}`;
        }

        return `${day} ${hours}:${minutes}`;
    }
    function searchCity(city) {
        let apiKey = "e2cbf24aafdo2e69311a33etb41012ad";
        let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
        axios.get(apiUrl).then(refreshWeather);
    }
    function handleSearchSubmit(event) {
        event.preventDefault();
        let searchInput = document.querySelector("#city-input");

        searchCity(searchInput.value);
    }
    function formatDay(timestamp) {
        let date = new Date(timestamp * 1000);
        let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

        return days[date.getDay()];
    }

    function getForecast(city) {
        let apiKey = "e2cbf24aafdo2e69311a33etb41012ad";
        let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
        axios(apiUrl).then(displayForecast);
    }
    function displayForecast(response) {
    let forecastHtml = "";

    response.data.daily.forEach(function (day, index) {
        if (index < 6) {
        forecastHtml =
            forecastHtml +
            `
            <div class="weather-forecast-day">
                <div class="weather-forecast-date">${formatDay(day.time)}</div>

                <img src="${day.condition.icon_url}" class="weather-forecast-icon" />
                <div class="weather-forecast-temperatures">
                <div class="weather-forecast-temperature">
                    <strong>${Math.round(day.temperature.maximum)}ºC</strong>
                </div>
                <div class="weather-forecast-temperature">${Math.round(
                    day.temperature.minimum
                )}ºC</div>
                </div>
            </div>
        `;
        }
    });

    let forecastElement = document.querySelector(".forecast");
    forecastElement.innerHTML = forecastHtml;
    }
    let searchFormElement = document.querySelector("#search-form");
    searchFormElement.addEventListener("submit", handleSearchSubmit);

    searchCity("Paris");
}

// document.addEventListener("DOMContentLoaded", function () {
//     const subscribeLink = document.getElementById("subscribe-link");
//     const subscribePopup = document.getElementById("subscribe-popup");
//     const closePopup = document.getElementById("close-popup");
//     const subscribeForm = document.getElementById("subscribe-form");
//     const emailInput = document.getElementById("email");
//     const successMessage = document.getElementById("success-message");
    
//         subscribeLink.addEventListener("click", function () {
//             subscribePopup.style.display = "block";
//             successMessage.style.display = "none";
//         });

//         closePopup.addEventListener("click", function () {
//             subscribePopup.style.display = "none";
//             successMessage.style.display = "none";
//         });

//         subscribeForm.addEventListener("submit", function (event) {
//             event.preventDefault();
//             const emailValue = emailInput.value;

//             if (!isValidEmail(emailValue)) {
//                 alert("Please enter a valid email address.");
//                 return;
//             }
//             successMessage.style.display = "block";
//             subscribeForm.reset();

//             setTimeout(function () {
//                 subscribePopup.style.display = "none";
//             }, 3000);
//         });
//         function isValidEmail(email) {
//             const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//             return emailRegex.test(email);
//         }
//         // const subscribeForm = document.getElementById("subscribe-form");
//         // subscribeForm.addEventListener("submit", function (event) {
//         //     event.preventDefault();
//         //     const emailInput = document.getElementById("email").value;
//         //     console.log("Email submitted:", emailInput);
//         //     subscribePopup.style.display = "none";
//         // });
    
// });
