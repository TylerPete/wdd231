import { setCopyrightYear } from "./copyright-year.mjs";
import { setUpNavigation } from "./navigation.mjs";

const resultsDiv = document.querySelector("#results-div");
let params;

//Input current year for copyright year
setCopyrightYear();

//Make hamburger button navigation function
setUpNavigation();

function getDataFromURL() {
    params = new URLSearchParams(window.location.search);
}

// timestamp

export function calculateMortgagePayoff(params) {
    let loanAmount = Number(params.get("loan-amount"));

    let currentBalance = Number(params.get("current-balance"));

    let extraMonthlyPayment = Number(params.get("extra-monthly-payment-amount"));

    let monthlyRate = Number(params.get("interest-rate")) / 100 / 12;

    let totalNumPayments = Number(params.get("original-term-length")) * 12;

    let standardPayment = (loanAmount * monthlyRate) / (1 - ((1 + monthlyRate) ** (-1 * totalNumPayments)));
    console.log(`Standard monthly payment: ${standardPayment}`);

    let paymentNumbers = [];
    let beginningBalances = [];
    let monthlyInterests = [];
    let principalPayments = [];
    let endingBalances = [];
    let cumulativeInterest = [];

    let i = 1;
    while (currentBalance > 0.005) {
        paymentNumbers.push(i);

        let monthlyInterest = (currentBalance * monthlyRate);
        monthlyInterests.push(monthlyInterest);
        //

        let totalPayment = standardPayment + extraMonthlyPayment;

        if (totalPayment > currentBalance + monthlyInterest) {
            totalPayment = currentBalance + monthlyInterest;
        }

        beginningBalances.push(currentBalance);

        let principalPayment = totalPayment - monthlyInterest;
        principalPayments.push(principalPayment);

        let endingBalance = (currentBalance - principalPayment);
        endingBalances.push(endingBalance);

        currentBalance = endingBalance;
        cumulativeInterest.push(monthlyInterest + (cumulativeInterest.at(-1) || 0));

        // console.log(`Ending balance after payment #${i}: $${endingBalance.toFixed(2)}`);
        i++;
    }

    return cumulativeInterest.at(-1);
}

//Additional function calls
getDataFromURL();
let interestPaid = calculateMortgagePayoff(params);
console.log(`Total interest paid: ${interestPaid}`);

let interestSaved = calculateInterestSavings();
console.log(`Interest savings: ${interestSaved}`);

export function calculateInterestSavings() {
    let alteredParams = new URLSearchParams(window.location.search);

    alteredParams.set("extra-monthly-payment-amount", "0");

    let interestWouldHavePaid = calculateMortgagePayoff(alteredParams);
    let interestActuallyPaid = calculateMortgagePayoff(params)

    return interestWouldHavePaid - interestActuallyPaid;
}

export function displayResults() {

}