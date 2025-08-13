import { setCopyrightYear } from "./copyright-year.mjs";
import { setUpNavigation } from "./navigation.mjs";
import { getAccountTypeData, displayCards } from "./retirement-account-cards.mjs";


//Input current year for copyright year
setCopyrightYear();

//Make hamburger button navigation function
setUpNavigation();

//meow testing
getAccountTypeData();

const traditionalCheckbox = document.querySelector("#traditional");
const rothCheckbox = document.querySelector("#roth");
const otherCheckbox = document.querySelector("#other");

const employerYesRadio = document.querySelector("#employer-yes");
const employerNoRadio = document.querySelector("#employer-no");
const employerEitherRadio = document.querySelector("#employer-either");

