import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import "../pages/index.css";
import { formValidationConfig, initialCards } from "../utils/constants.js";

// edit modal
const profileModal = document.querySelector(".profile-modal");
const profileForm = document.forms["profile-form"];

// profile
const profile = document.querySelector(".profile");
const profileEditButton = profile.querySelector(".profile__edit-button");
const profileAddButton = document.querySelector(".profile__add-button");

// profile form
const profileSaveButton = profileForm.querySelector(".form__submit");

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

// all modals / popups
const modals = document.querySelectorAll(".modal");

// all forms
const forms = Array.from(document.forms);
const formObjects = {};

// user info manipulation class
const userInfo = new UserInfo({
  nameSelector: ".profile__name",
  jobSelector: ".profile__avocation",
});

// profile modal popup
const profileModalPopup = new PopupWithForm({
  popupSelector: ".profile-modal",
  handleSubmitFunc: (data) => {
    profileModalPopup.close();
    userInfo.setUserInfo({
      name: data.name,
      job: data.job,
    });
  },
});

// add modal popup
const addModalPopup = new PopupWithForm({
  popupSelector: ".add-modal",
  handleSubmitFunc: (data) => {
    const card = {
      name: addModalTitleInput.value,
      link: addModalLinkInput.value,
    };
    const cardObj = createCard(card);
    renderCards.addItem(cardObj);
    addModalPopup.close();
  },
});

// image popup
const imageModalPopup = new PopupWithImage({
  popupSelector: ".image-modal",
});

// create cards via section class
const renderCards = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      renderCards.addItem(createCard(item));
    },
  },
  ".cards__list"
);

forms.forEach((form) => {
  const formObj = new FormValidator(formValidationConfig, form);
  formObjects[form.id] = formObj;
  formObj.enableValidation();
});

function openEditModal() {
  profileModalPopup.open();
  formObjects[profileForm.id].resetValidation();
  const { name, job } = userInfo.getUserInfo();
  profileModalPopup.setInputValues({
    name,
    job,
  });
}

function openImageModal(card) {
  const image = card.getCardImageElement();
  const title = card.getCardText();
  imageModalPopup.open({
    cardName: title.textContent,
    cardLink: image.src,
  });
}

function createCard(item) {
  const cardObj = new Card(
    {
      name: item.name,
      link: item.link,
    },
    ".card-template",
    openImageModal
  );
  return cardObj.generateCard();
}

profileEditButton.addEventListener("click", openEditModal);
profileAddButton.addEventListener("click", () => {
  addModalPopup.open();
});

renderCards.renderItems();
profileModalPopup.setEventListeners();
addModalPopup.setEventListeners();
imageModalPopup.setEventListeners();