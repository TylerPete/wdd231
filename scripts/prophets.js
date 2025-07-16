const url = "https://byui-cse.github.io/cse-ww-program/data/latter-day-prophets.json";
const cards = document.querySelector("#cards");

async function getProphetData() {
    const response = await fetch(url);  //request
    const data = response.json();       //parse the JSON data
    console.table(data);
}

getProphetData();