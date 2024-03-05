import Card from "../components/Card.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupDelete from "../components/PopupWithConfirmation.js";

import API from "../components/API.js";
import "../pages/index.css";
import { formValidationConfig, initialCards } from "../utils/constants.js";

// edit modal
const profileForm = document.forms["profile-form"];

// profile
const profile = document.querySelector(".profile");
const profileEditButton = profile.querySelector(".profile__edit-button");
const profileAddButton = document.querySelector(".profile__add-button");

// const profile image edit buttton
const profileImageButton = document.querySelector(".profile__image-edit");

// all forms
const forms = Array.from(document.forms);
const formObjects = {};

// hold card to delete
let cardToDelete = null;

const api = new API({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "3352b458-30c6-41be-9a42-00c52b81b385",
    "Content-Type": "application/json",
  },
});

// user info manipulation class
const userInfo = new UserInfo({
  nameSelector: ".profile__name",
  jobSelector: ".profile__avocation",
  photoSelector: ".profile__avatar",
});

// profile modal popup
const profileModalPopup = new PopupWithForm({
  popupSelector: ".profile-modal",
  handleSubmitFunc: (data) => {
    profileModalPopup.toggleSubmitText(true);
    api
      .patchProfileInformation({
        name: data.name,
        about: data.job,
      })
      .then((res) => {
        profileModalPopup.close();
        userInfo.setUserInfo({
          name: data.name,
          job: data.job,
        });
        profileModalPopup.toggleSubmitText(false);
      });
  },
});

// add modal popup
const addModalPopup = new PopupWithForm({
  popupSelector: ".add-modal",
  handleSubmitFunc: (data) => {
    addModalPopup.toggleSubmitText(true);
    api
      .addCard({
        name: data.name,
        link: data.link,
      })
      .then((res) => {
        const cardObj = createCard({
          name: res.name,
          link: res.link,
          id: res._id,
          isLiked: res.isLiked,
        });
        renderCards.addItem(cardObj);
        addModalPopup.close();
        addModalPopup.toggleSubmitText(false);
      });
  },
});

// edit profile image popup
const editProfileImagePopup = new PopupWithForm({
  popupSelector: ".profile-image-modal",
  handleSubmitFunc: (data) => {
    editProfileImagePopup.toggleSubmitText(true);
    api.updateProfilePicture(data.avatar).then((res) => {
      userInfo.setUserPhoto(data);
      editProfileImagePopup.close();
      editProfileImagePopup.toggleSubmitText(false);
    });
  },
});

// image popup
const imageModalPopup = new PopupWithImage({
  popupSelector: ".image-modal",
});

// delete card popup
const deleteModalPopup = new PopupDelete({
  popupSelector: ".delete-modal",
  handleSubmitFunc: () => {
    deleteModalPopup.toggleSubmitText(true);
    api.deleteCard(cardToDelete.getID()).then((res) => {
      cardToDelete.getCardElement().remove();
      cardToDelete = null;
      deleteModalPopup.close();
      deleteModalPopup.toggleSubmitText(false);
    });
  },
});

// create cards via section class
const renderCards = new Section(".cards__list");

forms.forEach((form) => {
  const formObj = new FormValidator(formValidationConfig, form);
  formObjects[form.id] = formObj;
  formObj.enableValidation();
});

function toggleSaving() {}

function openEditModal() {
  profileModalPopup.open();
  formObjects[profileForm.id].resetValidation();
  const { name, job } = userInfo.getUserInfo();
  profileModalPopup.setInputValues({
    name,
    job,
  });
}

function openDeleteModal(card) {
  cardToDelete = card;
  deleteModalPopup.open();
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
      id: item.id,
      isLiked: item.isLiked,
    },
    ".card-template",
    openImageModal,
    openDeleteModal,
    handleCardLike
  );
  return cardObj.generateCard();
}

function handleCardLike(card) {
  api
    .likeCard({
      cardId: card.getID(),
      likeBool: card.getIsLiked(),
    })
    .then((res) => {
      card.setIsLiked(res.isLiked);
    });
}

// on load render preexisting cards
api.renderCardsValidator().then((res) => {
  // sort the cards on the creation date date before we render them.
  const sortedCards = res[0].sort((a, b) => {
    return new Date(a.createdAt) - new Date(b.createdAt);
  });
  sortedCards.forEach((card) => {
    const cardObj = createCard({
      name: card.name,
      link: card.link,
      id: card._id,
      isLiked: card.isLiked,
    });
    renderCards.addItem(cardObj);
  });
});

// on load set user information
api.getUserInformation().then((res) => {
  userInfo.setUserInfo({
    name: res.name,
    job: res.about,
  });
  userInfo.setUserPhoto({
    avatar: res.avatar,
  });
});

profileEditButton.addEventListener("click", openEditModal);
profileAddButton.addEventListener("click", () => {
  addModalPopup.open();
});
profileImageButton.addEventListener("click", () => {
  editProfileImagePopup.open();
});

addModalPopup.setEventListeners();
imageModalPopup.setEventListeners();
deleteModalPopup.setEventListeners();
profileModalPopup.setEventListeners();
editProfileImagePopup.setEventListeners();
