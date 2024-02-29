import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor({ popupSelector }) {
    super(popupSelector);
    this._popupImage = this._popup.querySelector(".image-modal__img");
    this._popupTitle = this._popup.querySelector(".image-modal__title");
  }

  open({ cardName, cardLink }) {
    this._popupImage.src = "";
    this._popupImage.src = cardLink;
    this._popupImage.alt = cardName;
    this._popupTitle.textContent = cardName;
    super.open();
  }
}
