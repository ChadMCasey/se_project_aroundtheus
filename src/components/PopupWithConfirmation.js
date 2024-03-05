import Popup from "./Popup";

export default class PopupDelete extends Popup {
  constructor({ popupSelector, handleSubmitFunc }) {
    super(popupSelector);
    this._handleSubmit = handleSubmitFunc;
    this._submitDelete = this._popup.querySelector(".modal__submit");
    this._popupSubmit = this._popup.querySelector(".modal__submit");
    this._popupSumbitText = this._popupSubmit.textContent;
  }

  setEventListeners() {
    this._submitDelete.addEventListener("click", () => {
      this._handleSubmit();
    });
    super.setEventListeners();
  }

  // not all popups have submits (so i couldnt put this in the parent class)
  toggleSubmitText(bool) {
    this._popupSubmit.textContent = bool ? "Saving..." : this._popupSumbitText;
  }
}
