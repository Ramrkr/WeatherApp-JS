const url = "https://api.openweathermap.org/data/2.5/weather";
const apiKey = "f00c38e0279b7bc85480c3fe775d518c";

async function weatherFn() {
    const cityName = document.getElementById("inp-city").value;
    console.log(cityName);
    
    const temp = `${url}?q=${cityName}&appid=${apiKey}&units=metric`;
    try {
        const res = await fetch(temp);
        const data = await res.json();
        if (res.ok) {
            weatherShowFn(data);
            console.log(data);
        }
        else if (!cityName) {
            alert("Please enter a city !!!");
        }
        else {
            alert("City not found. Please try again.");
        }
    } catch (error) {
        console.error("Error fetching weather data:", error);
    }
}
var now = new Date();
var hours = now.getHours();
var amORpm = hours > 12 ? "PM" : "AM";

function weatherShowFn(data) {
    var imgele = document.getElementById("dispimg");
    document.getElementById("reply").style.display = "block";
    if (data.weather[0].main == "Mist") {
        imgele.src = "icons8-mist-100.png";
    } else if (data.weather[0].main == "Clouds" && amORpm == 'AM') {
        imgele.src = "icons8-cloudy-100.png";
    }
    else if (data.weather[0].main == "Clouds" && amORpm == 'PM') {
        imgele.src = "icons8-cloudy-64.png";
    }
    else if (data.weather[0].main == "Clear") {
        imgele.src = "icons8-sky-50.png";
    }
    
    else if (data.weather[0].main == "Rain") {
        imgele.src = "icons8-rain-80.png";
    } else if (data.weather[0].main == "Snow") {
        imgele.src = "icons8-snow-40.png";
    }

    document.getElementById("city-name").textContent = data.name;
    document.getElementById(
        "cur-temp"
    ).textContent = `temperature : ${data.main.temp}°C`;
    document.getElementById(
        "cur-humidity"
    ).textContent = `Humidity : ${data.main.humidity}%`;
    document.getElementById(
        "windspeed"
    ).innerHTML = `windspeed : ${data.wind.speed}Km/s`;
}

