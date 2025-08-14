import { setCopyrightYear } from "./copyright-year.mjs";
import { setUpNavigation } from "./navigation.mjs";

const resultsDiv = document.querySelector("#results-div");
let numPaymentsAccelerated;

//Input current year for copyright year
setCopyrightYear();

//Make hamburger button navigation function
setUpNavigation();

function getDataFromURL() {
    let params = new URLSearchParams(window.location.search);

    return params;
}

// timestamp=%222025-08-14T19%3A03%3A27.809Z%22

export function calculateMortgagePayoff(params, paymentScheduleArray) {

    let loanAmount = Number(params.get("loan-amount"));

    let currentBalance = Number(params.get("current-balance"));

    let extraMonthlyPayment = Number(params.get("extra-monthly-payment-amount"));

    let monthlyRate = Number(params.get("interest-rate")) / 100 / 12;

    let totalNumPayments = Number(params.get("original-term-length")) * 12;

    let standardPayment = (loanAmount * monthlyRate) / (1 - ((1 + monthlyRate) ** (-1 * totalNumPayments)));

    let asOfDate = new Date(JSON.parse(params.get("timestamp")));
    let origDate = new Date(params.get("origination-date"));

    let monthsElapsed = ((asOfDate.getFullYear() - origDate.getFullYear()) * 12) + (asOfDate.getMonth() - origDate.getMonth());
    if (asOfDate.getDate() < origDate.getDate()) {
        monthsElapsed -= 1;
    }

    let lastPaymentDate = new Date(origDate);
    lastPaymentDate.setMonth(lastPaymentDate.getMonth() + monthsElapsed);

    let nextPaymentDate = new Date(origDate);
    nextPaymentDate.setMonth(nextPaymentDate.getMonth() + monthsElapsed + 1);

    let daysSinceLastPayment = asOfDate.getDate() - lastPaymentDate.getDate();
    let daysInPeriod = Math.floor((nextPaymentDate.getTime() - lastPaymentDate.getTime()) / (1000 * 60 * 60 * 24));

    let daysUntilNextPayment = Math.floor((nextPaymentDate.getTime() - asOfDate.getTime()) / (1000 * 60 * 60 * 24));

    let accrued_interest = currentBalance * (Number(params.get("interest-rate")) / 365) * daysUntilNextPayment;
    let balance_projected = currentBalance + accrued_interest;

    let paymentNumbers = [];
    let paymentDates = [];
    let beginningBalances = [];
    let monthlyInterests = [];
    let principalPayments = [];
    let endingBalances = [];
    let cumulativeInterest = [];

    let i = 1;

    currentBalance = balance_projected;
    let currentDate = new Date(nextPaymentDate);
    while (currentBalance > 0.005) {
        paymentNumbers.push(i);

        paymentDates.push(currentDate.toDateString());

        let monthlyInterest = (currentBalance * monthlyRate);
        monthlyInterests.push(monthlyInterest);

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

        currentDate.setMonth(currentDate.getMonth() + 1);
        i++;
    }

    if (paymentScheduleArray) {
        paymentScheduleArray.push(paymentNumbers);
        paymentScheduleArray.push(beginningBalances);
        paymentScheduleArray.push(monthlyInterests);
        paymentScheduleArray.push(principalPayments);
        paymentScheduleArray.push(endingBalances);
        paymentScheduleArray.push(cumulativeInterest);
    }

    return cumulativeInterest.at(-1);
}


let interestSaved = calculateInterestSavings();
console.log(`Interest savings: ${interestSaved}`);

export function calculateInterestSavings() {
    let params = getDataFromURL();

    let alteredParams = getDataFromURL();
    alteredParams.set("extra-monthly-payment-amount", "0");

    let interestWouldHavePaid = calculateMortgagePayoff(alteredParams);

    let paymentScheduleArray = [];
    let interestActuallyPaid = calculateMortgagePayoff(params, paymentScheduleArray);

    console.log(paymentScheduleArray);

    return interestWouldHavePaid - interestActuallyPaid;
}

export function displayResults() {

}