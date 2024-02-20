// edit modal
const modal = document.querySelector(".modal");
const modalForm = document.forms["modal-form"];
const modalCloseButton = modal.querySelector(".modal__close-btn");
const modalSaveButton = modalForm.querySelector(".modal__save-btn");
const modalInputName = modalForm.querySelector(".modal__input_type_name");
const modalInputDescription = modalForm.querySelector(
  ".modal__input_type_description"
);

// profile
const profile = document.querySelector(".profile");
const profileEditButton = profile.querySelector(".profile__edit-button");
const profileName = profile.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__avocation");
const profileAddButton = document.querySelector(".profile__add-button");

// add modal
const addModal = document.querySelector(".add-modal");
const addForm = document.forms["add-form"];
const addModalCloseButton = addModal.querySelector(".add-form__button-close");
const addModalCreateButton = addModal.querySelector(".add-form__button-create");
const addModalTitleInput = addModal.querySelector(".add-form__input-title");
const addModalLinkInput = addModal.querySelector(".add-form__input-link");
const addModalForm = addModal.querySelector(".add-form");

// cards
const cardsList = document.querySelector(".cards__list");
const cardTemplate = document.querySelector("#card-template").content;

// images modal
const imageModal = document.querySelector(".image-modal");
const imageModalImg = imageModal.querySelector(".image-modal__img");
const imageModalClose = imageModal.querySelector(".image-modal__button-close");
const imageModalTitle = imageModal.querySelector(".image-modal__title");

let initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

function exitModal(e) {
  e.preventDefault();
  modal.classList.remove("modal_opened");
}

function exitAddModal(e) {
  e.preventDefault();
  addModal.classList.remove("add-modal_visible");
}

function exitImageModal(e) {
  imageModal.classList.remove("image-modal_opened");
}

function openEditModal(e) {
  modal.classList.add("modal_opened");
  modalInputName.value = profileName.textContent;
  modalInputDescription.value = profileDescription.textContent;
}

function openAddModal(e) {
  addModal.classList.add("add-modal_visible");
}

function openImageModal(e) {
  imageModal.classList.add("image-modal_opened");
  imageModalImg.src = "";
  imageModalImg.src = e.target.src;
  imageModalTitle.textContent = e.target.alt;
}

function submitModal(e) {
  profileName.textContent = modalInputName.value;
  profileDescription.textContent = modalInputDescription.value;
  exitModal(e);
}

function submitAddModal(e) {
  // if someone tries to add an image with no name or link, simply exit the modal
  // without making a card and return.
  if (addModalTitleInput.value === "" || addModalLinkInput.value === "") {
    exitAddModal(e);
    return;
  }
  let cardElement = getCardElement({
    name: addModalTitleInput.value,
    link: addModalLinkInput.value,
  });
  cardsList.prepend(cardElement);
  exitAddModal(e);
}

function getCardElement(data) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__img");
  const cardTitle = cardElement.querySelector(".card__title");
  const cardHeart = cardElement.querySelector(".card__heart");
  const cardTrash = cardElement.querySelector(".card__trash");
  cardTitle.textContent = data.name;
  cardImage.src = data.link;
  cardImage.alt = data.name;
  cardTrash.src = "../images/trash.svg"; // render after (on top of) the card image
  cardHeart.addEventListener("click", () => {
    cardHeart.classList.toggle("card__heart_dark");
  });
  cardTrash.addEventListener("click", () => {
    cardTrash.closest(".card").remove();
  });
  cardImage.addEventListener("click", openImageModal);
  return cardElement;
}

// modal edit
modalCloseButton.addEventListener("click", exitModal);
profileEditButton.addEventListener("click", openEditModal);
modalForm.addEventListener("submit", submitModal);
profileAddButton.addEventListener("click", openAddModal);

// modal add
addModalCloseButton.addEventListener("click", exitAddModal);
addModalForm.addEventListener("submit", submitAddModal);

// image modal
imageModalClose.addEventListener("click", exitImageModal);

// card
initialCards.forEach((cardObj) => {
  cardsList.append(getCardElement(cardObj));
});
