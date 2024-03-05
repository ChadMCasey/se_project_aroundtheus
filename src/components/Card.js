export default class Card {
  constructor(
    data,
    cardSelector,
    handleImageClick,
    openDeleteModal,
    handleCardLike
  ) {
    this._name = data.name;
    this._link = data.link;
    this._id = data.id;
    this._isLiked = data.isLiked;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
    this._handleCardLike = handleCardLike;
    this._openDeleteModal = openDeleteModal;

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
    this.setIsLiked(this._isLiked);
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
      this._handleDelete(e);
    });
    this._cardHeartElement.addEventListener("click", (e) => {
      this._handleLike(e);
    });
  }

  _handleDelete(e) {
    this._openDeleteModal(this);
  }

  _handleLike(e) {
    this._handleCardLike(this);
  }

  getCardImageElement() {
    return this._cardImageElement;
  }

  getCardText() {
    return this._cardTextElement;
  }

  getID() {
    return this._id;
  }

  getCardElement() {
    return this._cardElement;
  }

  getIsLiked() {
    return this._isLiked;
  }

  setIsLiked(bool) {
    this._isLiked = bool;
    this._isLiked
      ? this._cardHeartElement.classList.add("card__heart_dark")
      : this._cardHeartElement.classList.remove("card__heart_dark");
  }
}
