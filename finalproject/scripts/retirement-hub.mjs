import { setCopyrightYear } from "./copyright-year.mjs";
import { setUpNavigation } from "./navigation.mjs";
import { getAccountTypeData, displayCards, filterAccountTypes } from "./retirement-account-cards.mjs";


//Input current year for copyright year
setCopyrightYear();

//Make hamburger button navigation function
setUpNavigation();

//meow testing
getAccountTypeData();

const theFilterForm = document.querySelector(".filter-div");
theFilterForm.addEventListener("submit", function (event) {
    event.preventDefault();

    filterAccountTypes();
});