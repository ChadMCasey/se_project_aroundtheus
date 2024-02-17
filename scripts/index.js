// modal
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

// cards list
const cardsList = document.querySelector(".cards__list");

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

function openModal(e) {
  modal.classList.add("modal_opened");
  modalInputName.value = profileName.textContent;
  modalInputDescription.value = profileDescription.textContent;
}
function submitModal(e) {
  profileName.textContent = modalInputName.value;
  profileDescription.textContent = modalInputDescription.value;
  exitModal(e);
}

function getCardElement(data) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__img");
  cardElement.querySelector(".card__title").textContent = data.name;
  cardImage.src = data.link;
  cardImage.alt = data.name;
  return cardElement;
}

modalCloseButton.addEventListener("click", exitModal);
profileEditButton.addEventListener("click", openModal);
modalForm.addEventListener("submit", submitModal);

initialCards.forEach((cardObj) => {
  cardsList.append(getCardElement(cardObj));
});
