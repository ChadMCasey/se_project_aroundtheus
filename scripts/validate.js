const enableValidation = (config) => {
  const forms = Array.from(document.querySelectorAll(config.formSelector));
  forms.forEach((form) => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
    });
    const fieldSetList = Array.from(form.querySelectorAll(config.formFieldset));
    fieldSetList.forEach((fieldset) => {
      setEventListeners(fieldset, config);
    });
  });
};

const setEventListeners = (formFieldset, config) => {
  // form fieldset, works for multi-stage form submission
  const inputList = Array.from(
    formFieldset.querySelectorAll(config.inputSelector)
  );
  const buttonElement = formFieldset.querySelector(config.submitButtonSelector);
  toggleButtonState(inputList, buttonElement);
  inputList.forEach((input) => {
    input.addEventListener("input", () => {
      checkInputValidity(formFieldset, input, config);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

const toggleButtonState = (inputList, buttonElement) => {
  if (hasValidInput(inputList)) {
    buttonElement.disabled = true;
  } else {
    buttonElement.disabled = false;
  }
};

const checkInputValidity = (formFieldset, inputElement, config) => {
  if (!inputElement.validity.valid) {
    showInputError(
      formFieldset,
      inputElement,
      inputElement.validationMessage,
      config
    );
  } else {
    hideInputError(formFieldset, inputElement, config);
  }
};

const hasValidInput = (inputList) => {
  return inputList.some((input) => !input.validity.valid);
};

const showInputError = (formFieldset, inputElement, errorMessage, config) => {
  const errorElement = formFieldset.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(config.inputErrorClass);
  errorElement.classList.add(config.errorTextClass);
  errorElement.textContent = errorMessage;
};

const hideInputError = (formFieldset, inputElement, config) => {
  const errorElement = formFieldset.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(config.inputErrorClass);
  errorElement.classList.remove(config.errorTextClass);
  errorElement.textContent = "";
};

enableValidation({
  // some of these properties were not needed based on my approach
  // some of them were renamed to accord with the names i had used.
  formSelector: ".modal__form",
  formFieldset: ".form__fieldset",
  inputSelector: ".form__input",
  submitButtonSelector: ".form__submit",
  inputErrorClass: "form__input_type_error",
  errorTextClass: "form__input-error_active",
});
