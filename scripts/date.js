const year = document.querySelector("#currentyear");
const modifiedParagraph = document.querySelector("#lastModified");

today = new Date();

const lastModifiedDate = new Date(document.lastModified);

year.textContent = today.getFullYear();
modifiedParagraph.textContent = `Last Modified: ${new Intl.DateTimeFormat("en-US",
    {
        dateStyle: "short", timeStyle: "medium"
    }).format(lastModifiedDate)}`;