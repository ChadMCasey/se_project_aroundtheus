// edit modal
const profileModal = document.querySelector(".profile-modal");
const profileForm = document.forms["profile-form"];

const profileSaveButton = profileForm.querySelector(".form__submit");
const profileModalInputName = profileForm.querySelector(`[name="name"]`);
const profileModalInputDescription =
  profileForm.querySelector(`[name="description"]`);

// profile
const profile = document.querySelector(".profile");
const profileEditButton = profile.querySelector(".profile__edit-button");
const profileName = profile.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__avocation");
const profileAddButton = document.querySelector(".profile__add-button");

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
  profileModalInputName.value = profileName.textContent;
  profileModalInputDescription.value = profileDescription.textContent;
}

function openAddModal(e) {
  openPopup(addModal);
}

function openImageModal(e) {
  openPopup(imageModal);
  imageModalImg.src = "";
  imageModalImg.src = e.target.src;
  imageModalImg.alt = e.target.alt;
  imageModalTitle.textContent = e.target.alt;
}

function handleProfileFormSubmit(e) {
  profileName.textContent = profileModalInputName.value;
  profileDescription.textContent = profileModalInputDescription.value;
  closePopup(profileModal);
}

function submitAddModal(e) {
  e.submitter.disabled = true;
  const cardElement = getCardElement({
    name: addModalTitleInput.value,
    link: addModalLinkInput.value,
  });
  cardsList.prepend(cardElement);
  e.target.reset();
  closePopup(addModal);
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
  cardHeart.addEventListener("click", () => {
    cardHeart.classList.toggle("card__heart_dark");
  });
  cardTrash.addEventListener("click", () => {
    cardElement.remove();
  });
  cardImage.addEventListener("click", openImageModal);
  return cardElement;
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

// card
initialCards.forEach((cardObj) => {
  cardsList.append(getCardElement(cardObj));
});

// modal edit
profileEditButton.addEventListener("click", openEditModal);
profileForm.addEventListener("submit", handleProfileFormSubmit);
profileAddButton.addEventListener("click", openAddModal);
addModalForm.addEventListener("submit", submitAddModal);
