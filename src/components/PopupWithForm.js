import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor({ popupSelector, handleSubmitFunc }) {
    super(popupSelector);
    this._handleSubmit = handleSubmitFunc;
    this._popUpForm = this._popup.querySelector(".form");
    this._inputList = this._popup.querySelectorAll(".form__input");
    this._popupSubmit = this._popup.querySelector(".modal__submit");
    this._popupSubmitText = this._popupSubmit.textContent;
  }

  _getInputValues() {
    const valuesObj = {};
    this._inputList.forEach((input) => (valuesObj[input.name] = input.value));
    return valuesObj;
  }

  setInputValues(data) {
    this._inputList.forEach((input) => {
      input.value = data[input.name];
    });
  }

  setEventListeners() {
    this._popup.addEventListener("submit", (e) => {
      e.preventDefault();
      this._handleSubmit(this._getInputValues());
    });
    super.setEventListeners();
  }

  renderLoading({ isLoading, loadingText = "Saving..." }) {
    if (isLoading) {
      this._popupSubmit.textContent = loadingText;
    } else {
      this._popupSubmit.textContent = this._popupSubmitText;
    }
  }

  getForm() {
    return this._popUpForm;
  }
}
