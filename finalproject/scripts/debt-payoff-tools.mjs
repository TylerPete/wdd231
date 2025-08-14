import { setCopyrightYear } from "./copyright-year.mjs";
import { setUpNavigation } from "./navigation.mjs";

const submitButton = document.querySelector("#submit-button");
const hiddenTimestampInput = document.querySelector("#timestamp");

//Input current year for copyright year
setCopyrightYear();

//Make hamburger button navigation function
setUpNavigation();

submitButton.addEventListener("click", () => {
    const dateTimeNow = new Date();

    // let options = {
    //     month: "long",
    //     day: "numeric",
    //     year: "numeric",
    //     hour: "numeric",
    //     minute: "numeric"
    // }
    // const dateTimeNowString = new Intl.DateTimeFormat("en-us", options).format(dateTimeNow);

    hiddenTimestampInput.value = dateTimeNow.toISOString();
});

function loadPreviousCalculation() {
    const lastParamsJson = window.localStorage.getItem("lastParams");

    if (lastParamsJson) {
        const lastParamsObject = JSON.parse(lastParamsJson);

        const retrievedURLSearchParams = new URLSearchParams(lastParamsObject);
        const theTimestamp = retrievedURLSearchParams.get("timestamp");

        console.log(theTimestamp);

        const lastCalcDateAndTime = new Date(retrievedURLSearchParams.get("timestamp"));

        const previousCalcsDiv = document.querySelector("#previous-calcs-div");
        previousCalcsDiv.innerHTML = `<p>Calculation from ${lastCalcDateAndTime.toString()}</p>`;
    }


}

loadPreviousCalculation();