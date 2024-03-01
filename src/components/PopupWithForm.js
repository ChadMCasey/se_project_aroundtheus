import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor({ popupSelector, handleSubmitFunc }) {
    super(popupSelector);
    this._handleSubmit = handleSubmitFunc;
    this._popUpForm = this._popup.querySelector(".form");
    this._inputList = this._popup.querySelectorAll(".form__input");
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
      this._popUpForm.reset();
    });
    super.setEventListeners();
  }
}