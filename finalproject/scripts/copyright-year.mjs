//Input current year for copyright year
export function setCopyrightYear() {
    const year = document.querySelector("#currentyear");
    const today = new Date();
    year.textContent = today.getFullYear();
}