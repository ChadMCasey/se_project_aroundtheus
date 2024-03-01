export default class Card {
  constructor(data, cardSelector, handleImageClick) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;

    this._cardElement = null;
    this._cardImageElement = null;
    this._cardHeartElement = null;
    this._cardTrashElement = null;
    this._cardTextElement = null;
  }

  generateCard() {
    this._cardElement = this._generateCardTemplate();
    this._cardImageElement = this._cardElement.querySelector(".card__img");
    this._cardHeartElement = this._cardElement.querySelector(".card__heart");
    this._cardTrashElement = this._cardElement.querySelector(".card__trash");
    this._cardTextElement = this._cardElement.querySelector(".card__title");

    this._cardTextElement.textContent = this._name;
    this._cardImageElement.src = this._link;
    this._cardImageElement.alt = this._name;

    this._setEventListeners();
    return this._cardElement;
  }

  _generateCardTemplate() {
    return document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
  }

  _setEventListeners() {
    this._cardImageElement.addEventListener("click", (e) => {
      this._handleImageClick(this);
    });
    this._cardTrashElement.addEventListener("click", (e) => {
      this._handleDelete();
    });
    this._cardHeartElement.addEventListener("click", (e) => {
      this._handleLike();
    });
  }

  _handleDelete() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  _handleLike() {
    this._cardHeartElement.classList.toggle("card__heart_dark");
  }

  getCardImageElement() {
    return this._cardImageElement;
  }

  getCardText() {
    return this._cardTextElement;
  }
}