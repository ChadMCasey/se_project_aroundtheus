export default class FormValidator {
  constructor(config, form) {
    this._config = config;
    this._form = form;

    this._formInputs = null; // make these easily accessible throughout the class
    this._formButton = null; // to avoid passing them through method calls
  }

  enableValidation() {
    this._formInputs = Array.from(
      this._form.querySelectorAll(this._config.inputSelector)
    );
    this._formButton = this._form.querySelector(
      this._config.submitButtonSelector
    );
    this._setEventListener();
  }

  _setEventListener() {
    this._form.addEventListener("submit", (e) => {
      e.preventDefault();
      this._resetForm();
    });
    this._formInputs.forEach((input) => {
      input.addEventListener("input", () => {
        this._checkInputValidity(input);
        this._toggleButtonState();
      });
    });
    this._resetForm(); // on load disable button (the edit profile modal overrides this within index.js on line 90)
  }

  _checkInputValidity(input) {
    if (!input.validity.valid) {
      this._showInputError(input);
    } else {
      this._hideInputError(input);
    }
  }

  _showInputError(input) {
    const errorElement = this._form.querySelector(`.${input.id}-error`);
    input.classList.add(this._config.inputErrorClass);
    errorElement.classList.add(this._config.errorTextClass);
    errorElement.textContent = input.validationMessage;
  }

  _hideInputError(input) {
    const errorElement = this._form.querySelector(`.${input.id}-error`);
    input.classList.remove(this._config.inputErrorClass);
    errorElement.classList.remove(this._config.errorTextClass);
    errorElement.textContent = "";
  }

  _hasValidInput() {
    return this._formInputs.every((input) => {
      return input.validity.valid;
    });
  }

  _toggleButtonState() {
    if (this._hasValidInput()) {
      this._formButton.disabled = false;
    } else {
      this._formButton.disabled = true;
    }
  }

  _resetForm() {
    this._formInputs.forEach((input) => {
      this._hideInputError(input);
    });
    this._formButton.disabled = true;
  }
}
