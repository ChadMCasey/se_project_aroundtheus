import Popup from "./Popup";

export default class PopupDelete extends Popup {
  constructor({ popupSelector, handleSubmitFunc }) {
    super(popupSelector);
    this._handleSubmit = handleSubmitFunc;
    this._submitDelete = this._popup.querySelector(".modal__submit");
    this._submitDeleteText = this._submitDelete.textContent;
  }

  setEventListeners() {
    this._submitDelete.addEventListener("click", () => {
      this._handleSubmit();
    });
    super.setEventListeners();
  }

  renderLoading({ isLoading, loadingText = "Deleting..." }) {
    if (isLoading) {
      this._submitDelete.textContent = loadingText;
    } else {
      this._submitDelete.textContent = this._submitDeleteText;
    }
  }
}
