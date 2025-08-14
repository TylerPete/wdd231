import { setCopyrightYear } from "./copyright-year.mjs";
import { setUpNavigation } from "./navigation.mjs";

const submitButton = document.querySelector("#submit-button");
const hiddenTimestampInput = document.querySelector("#timestamp");

//Input current year for copyright year
setCopyrightYear();

//Make hamburger button navigation function
setUpNavigation();



//CHANGE THIS FOR EASIER RECREATION OF A DATE OBJECT WHEN READING 
// URLSearchParams on the results page!!! Need to implement Date math to
// determine the date of the next payment, add a "Payment Dates" array into
// the calculation, 
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

    hiddenTimestampInput.value = JSON.stringify(dateTimeNow);
});