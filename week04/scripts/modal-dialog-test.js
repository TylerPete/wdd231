const modal = document.querySelector("#test-modal");
const closeButton = document.querySelector("#close-modal");

modal.showModal();

closeButton.addEventListener("click", () => {
    modal.close();
});