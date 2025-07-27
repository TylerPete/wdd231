// const membersDiv = document.querySelector(".members-div");

// gridRadio.addEventListener("change", () => {
//     if (gridRadio.checked) {
//         gridDisplay = true;
//     }
//     getMembers();
// });

// listRadio.addEventListener("change", () => {
//     if (listRadio.checked) {
//         gridDisplay = false;
//     }
//     getMembers();
// });


// Copyright year and last modification

const currentYear = document.querySelector("#current-year");
const lastModified = document.querySelector("#last-modified");

const today = new Date();
currentYear.textContent = today.getFullYear();

const lastModifiedDate = new Date(document.lastModified);
lastModified.textContent = `${new Intl.DateTimeFormat("en-US",
    {
        dateStyle: "short", timeStyle: "medium"
    }).format(lastModifiedDate)}`;

// Navigation/hamburger button functionality
const navBar = document.querySelector("#nav-bar");
const hamburger = document.querySelector("#ham-btn");

hamburger.addEventListener("click", () => {
    navBar.classList.toggle("show");
});


//OpenWeatherAPI calls and stuff
const tempElement = document.querySelector("#temp");
const descElement = document.querySelector("#desc");
const highElement = document.querySelector("#high");
const lowElement = document.querySelector("#low");
const humidElement = document.querySelector("#humidity");
const riseElement = document.querySelector("#sunrise");
const setElement = document.querySelector("#sunset");
const imgElement = document.querySelector("#weather-icon");

const weatherURL = "https://api.openweathermap.org/data/2.5/weather?lat=42.06&lon=-93.88&units=imperial&appid=1e39b8f71c9501c6b14ff392dc8ac7b4";
const forecastURL = "https://api.openweathermap.org/data/2.5/forecast?lat=42.06&lon=-93.88&units=imperial&appid=1e39b8f71c9501c6b14ff392dc8ac7b4";

async function weatherApiFetch() {
    try {
        const response = await fetch(weatherURL);

        if (response.ok) {
            const data = await response.json();

            displayCurrentResults(data);
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.log(error);
    }
}

function displayCurrentResults(data) {
    tempElement.innerHTML = `${data.main.temp.toFixed(0)}&deg; F`;
    descElement.textContent = `${data.weather[0].description}`;
    highElement.innerHTML = `High: ${data.main.temp_max.toFixed(1)}&deg;`;
    lowElement.innerHTML = `Low: ${data.main.temp_min.toFixed(1)}&deg;`;
    humidElement.textContent = `${data.main.humidity}%`;

    let sunriseUnixTimestamp = data.sys.sunrise;
    let sunsetUnixTimestamp = data.sys.sunset;
    const sunriseDate = new Date(sunriseUnixTimestamp * 1000);
    const sunsetDate = new Date(sunsetUnixTimestamp * 1000);

    riseElement.textContent = `Sunrise: ${sunriseDate.toLocaleTimeString().slice(0, -6)} ${sunriseDate.toLocaleTimeString().slice(-2)}`;
    setElement.textContent = `Sunset: ${sunsetDate.toLocaleTimeString().slice(0, -6)} ${sunsetDate.toLocaleTimeString().slice(-2)}`;
    imgElement.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
}

async function forecastApiFetch() {
    try {
        const response = await fetch(forecastURL);

        if (response.ok) {
            const data = await response.json();
            console.log(data);

            displayForecastResults(data);
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.log(error);
    }
}

function displayForecastResults(data) {
    //code here -- read through documentation of Forecast part of WeatherAPI


}

weatherApiFetch();
forecastApiFetch();




// Fetching of the CoC members data


// const path = "./data/members.json";

// async function getMembers() {
//     try {
//         const response = await fetch(path);
//         const data = await response.json();
//         console.log(data); //TEMPORARY
//         displayMembers(data);

//     } catch (error) {
//         console.error("Error fetching members data:", error);
//     }
// }

// function displayMembers(data) {
//     if (gridDisplay) {
//         membersDiv.classList.remove("list");
//         membersDiv.classList.add("grid");
//         membersDiv.replaceChildren();

//         data.forEach(function (member) {
//             const memberDiv = document.createElement("div");
//             memberDiv.classList.add("member-div");
//             memberDiv.classList.add("grid");

//             const h2 = document.createElement("h2");
//             const span = document.createElement("span");
//             const img = document.createElement("img");
//             const address = document.createElement("p");
//             const phone = document.createElement("p");
//             const url = document.createElement("p");
//             const opened = document.createElement("p");

//             h2.textContent = member.name;
//             let memberPrefix = "";
//             switch (member.membershipLevel) {
//                 case 2:
//                     memberPrefix = "Silver ";
//                     break;
//                 case 3:
//                     memberPrefix = "Gold ";
//                     break;
//                 default:
//                     memberPrefix = "";
//             }
//             span.textContent = `${memberPrefix}Member`;
//             img.src = member.imageFile;
//             img.width = 144;
//             img.height = 72;
//             img.alt = `${member.name} logo`;
//             img.loading = "lazy";
//             address.textContent = `ADDRESS: ${member.address}`;
//             phone.textContent = `PHONE: ${member.phone}`;
//             url.textContent = `URL: ${member.url}`;
//             opened.textContent = `OPENED: ${member.opened}`;

//             memberDiv.appendChild(h2);
//             memberDiv.appendChild(span);
//             memberDiv.appendChild(img);
//             memberDiv.appendChild(address);
//             memberDiv.appendChild(phone);
//             memberDiv.appendChild(url);
//             memberDiv.appendChild(opened);

//             membersDiv.appendChild(memberDiv);
//         });

//     } else {
//         membersDiv.classList.add("list");
//         membersDiv.classList.remove("grid");
//         membersDiv.replaceChildren();

//         data.forEach(function (member) {
//             const h2 = document.createElement("h2");
//             const memberDiv = document.createElement("div");
//             memberDiv.classList.add("member-div");
//             memberDiv.classList.add("list");

//             const address = document.createElement("p");
//             const phone = document.createElement("p");
//             const url = document.createElement("p");
//             const opened = document.createElement("p");

//             let memberPrefix = "";
//             switch (member.membershipLevel) {
//                 case 2:
//                     memberPrefix = "Silver ";
//                     break;
//                 case 3:
//                     memberPrefix = "Gold ";
//                     break;
//                 default:
//                     memberPrefix = "";
//             }

//             h2.textContent = `${member.name} - ${memberPrefix}Member`;
//             address.textContent = `ADDRESS: ${member.address}`;
//             phone.textContent = `PHONE: ${member.phone}`;
//             url.textContent = `URL: ${member.url}`;
//             opened.textContent = `OPENED: ${member.opened}`;

//             memberDiv.appendChild(address);
//             memberDiv.appendChild(phone);
//             memberDiv.appendChild(url);
//             memberDiv.appendChild(opened);

//             membersDiv.appendChild(h2);
//             membersDiv.appendChild(memberDiv);
//         });
//     }
// }

// window.addEventListener("DOMContentLoaded", () => {
//     getMembers();
// });