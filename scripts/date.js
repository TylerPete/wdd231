const year = document.querySelector("#currentyear");
const modifiedParagraph = document.querySelector("#lastModified");

today = new Date();

lastModifiedDate = document.lastModified;

year.textContent = today.getFullYear();
modifiedParagraph.textContent = `Last Modified: ${new Intl.DateTimeFormat("en-US",
    {
        dateStyle: "short", timeStyle: "medium"
    }).format(lastModifiedDate)}`;