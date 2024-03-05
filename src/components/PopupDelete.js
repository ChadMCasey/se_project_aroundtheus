import Popup from "./Popup";

export default class PopupDelete extends Popup {
  constructor({ popupSelector, handleSubmitFunc }) {
    super(popupSelector);
    this._handleSubmit = handleSubmitFunc;
    this._submitDelete = this._popup.querySelector(".modal__submit");
  }

  setEventListeners() {
    this._submitDelete.addEventListener("click", () => {
      this._handleSubmit();
    });
    super.setEventListeners();
  }
}
