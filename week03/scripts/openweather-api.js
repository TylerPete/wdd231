const currentTempInTrier = document.querySelector("#current-temp");
const weatherIconImg = document.querySelector("#weather-icon");
const figCaptionDescription = document.querySelector("figcaption");

const url = "https://api.openweathermap.org/data/2.5/weather?lat=49.75&lon=6.64&units=imperial&appid=1e39b8f71c9501c6b14ff392dc8ac7b4";

async function apiFetch() {
    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            console.log(data);
            displayResults(data);
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.log(error);
    }
}

apiFetch();

function displayResults(data) {
    const temp = `${data.main.temp}&deg;F`;
    currentTempInTrier.innerHTML = temp;
    let description = data.weather[0].description;
    figCaptionDescription.textContent = description;
    weatherIconImg.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    weatherIconImg.alt = description;
}