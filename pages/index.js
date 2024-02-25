import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";

// edit modal
const profileModal = document.querySelector(".profile-modal");
const profileForm = document.forms["profile-form"];

// profile
const profile = document.querySelector(".profile");
const profileEditButton = profile.querySelector(".profile__edit-button");
const profileName = profile.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__avocation");
const profileAddButton = document.querySelector(".profile__add-button");

// profile form
const profileSaveButton = profileForm.querySelector(".form__submit");
const profileModalInputName = profileForm.querySelector(`[name="name"]`);
const profileModalInputDescription =
  profileForm.querySelector(`[name="description"]`);

// add modal
const addModal = document.querySelector(".add-modal");
const addModalForm = document.forms["add-form"];
const addModalTitleInput = addModalForm.querySelector("[name='location']");
const addModalLinkInput = addModalForm.querySelector("[name='imageURL");

// cards
const cardsList = document.querySelector(".cards__list");
const cardTemplate = document.querySelector("#card-template").content;

// images modal
const imageModal = document.querySelector(".image-modal");
const imageModalImg = imageModal.querySelector(".image-modal__img");
const imageModalTitle = imageModal.querySelector(".image-modal__title");

// all modals / popups
const modals = document.querySelectorAll(".modal");

// all forms
const forms = Array.from(document.forms);

// constant values section
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
const formValidationConfig = {
  formSelector: ".modal__form",
  formFieldset: ".form__fieldset",
  inputSelector: ".form__input",
  submitButtonSelector: ".form__submit",
  inputErrorClass: "form__input_type_error",
  errorTextClass: "form__input-error_active",
};

function closePopup(popup) {
  popup.classList.remove("modal_opened");
  document.removeEventListener("keydown", closeEscapeModal);
}

function openPopup(popup) {
  popup.classList.add("modal_opened");
  document.addEventListener("keydown", closeEscapeModal);
}

function openEditModal(e) {
  openPopup(profileModal);
}

function openAddModal(e) {
  openPopup(addModal);
}

function openImageModal(card) {
  const image = card.getCardImageElement();
  const title = card.getCardText();
  imageModalImg.src = "";
  imageModalImg.src = image.src;
  imageModalImg.alt = image.alt;
  imageModalTitle.textContent = title.textContent;
  openPopup(imageModal);
}

function handleProfileFormSubmit(e) {
  profileName.textContent = profileModalInputName.value;
  profileDescription.textContent = profileModalInputDescription.value;
  profileModalInputName.value = "";
  profileModalInputDescription.value = "";
  closePopup(profileModal);
}

function submitAddModal(e) {
  e.submitter.disabled = true;
  const cardObj = new Card(
    {
      name: addModalTitleInput.value,
      link: addModalLinkInput.value,
    },
    ".card-template",
    openImageModal
  );
  cardsList.prepend(cardObj.generateCard());
  e.target.reset();
  closePopup(addModal);
}

const closeEscapeModal = (e) => {
  if (e.key === "Escape") {
    modals.forEach((modal) => {
      if (modal.classList.contains("modal_opened")) {
        closePopup(modal);
      }
    });
  }
};

modals.forEach((modal) => {
  modal.addEventListener("mousedown", (e) => {
    if (e.target.classList.contains("modal_opened")) {
      closePopup(modal);
    }
    if (e.target.classList.contains("modal__close")) {
      closePopup(modal);
    }
  });
});

// card class instatiation
initialCards.forEach((card) => {
  const cardObj = new Card(card, ".card-template", openImageModal);
  const cardHTML = cardObj.generateCard();
  cardsList.append(cardHTML);
});

// form validation class instatiation
forms.forEach((form) => {
  const formObj = new FormValidator(formValidationConfig, form);
  formObj.enableValidation();
});

// modal edit
profileEditButton.addEventListener("click", openEditModal);
profileForm.addEventListener("submit", handleProfileFormSubmit);
profileAddButton.addEventListener("click", openAddModal);
addModalForm.addEventListener("submit", submitAddModal);
