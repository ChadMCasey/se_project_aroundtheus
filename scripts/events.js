let modalCloseButton = document.querySelector(".modal__close-btn");
let profileEditButton = document.querySelector(".profile__edit-button");
let modal = document.querySelector(".modal");

function exitModal(e) {
  e.preventDefault();
  modal.classList.remove("modal_opened");
}

function profileEditOpenModal(e) {
  modal.classList.add("modal_opened");
}

modalCloseButton.addEventListener("click", (e) => {
  exitModal(e);
});
profileEditButton.addEventListener("click", (e) => {
  profileEditOpenModal(e);
});
