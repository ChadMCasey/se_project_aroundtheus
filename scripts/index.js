// modal
let modal = document.querySelector(".modal");
let modalForm = modal.querySelector(".modal__form");
let modalCloseButton = modal.querySelector(".modal__close-btn");
let modalSaveButton = modalForm.querySelector(".modal__save-btn");
let modalInputName = modalForm.querySelector(".modal__input_type_name");
let modalInputDescription = modalForm.querySelector(
  ".modal__input_type_description"
);

// profile
let profile = document.querySelector(".profile");
let profileEditButton = profile.querySelector(".profile__edit-button");
let profileName = profile.querySelector(".profile__name");
let profileDescription = document.querySelector(".profile__avocation");

// cards list
let cardsList = document.querySelector(".cards__list");

const initialCards = [
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
  e.preventDefault();
  profileName.textContent = modalInputName.value;
  profileDescription.textContent = modalInputDescription.value;
  modal.classList.remove("modal_opened");
}

function getCardElement(data) {
  let cardTemplate = document.querySelector("#card-template").content;
  let cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  cardElement.querySelector(".card__img").src = data.link;
  cardElement.querySelector(".card__img").alt = data.name;
  cardElement.querySelector(".card__title").textContent = data.name;
  return cardElement;
}

modalCloseButton.addEventListener("click", exitModal);
profileEditButton.addEventListener("click", openModal);
modal.addEventListener("submit", submitModal);

initialCards.forEach((cardObj) => {
  cardsList.append(getCardElement(cardObj));
});
