export default class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
    this._popupSelectorNoPeriod = popupSelector.replace(".", "");
    this._popup = document.querySelector(popupSelector);
    this._popupClose = this._popup.querySelector(".modal__close");
  }

  open() {
    this._popup.classList.add("modal_opened");
    document.addEventListener("keydown", this._handleEscClose);
  }

  close() {
    this._popup.classList.remove("modal_opened");
    document.removeEventListener("keydown", this._handleEscClose);
  }

  _handleEscClose = (e) => {
    e.key === "Escape" && this.close();
  };

  setEventListeners() {
    this._popupClose.addEventListener("click", () => {
      this.close();
    });

    // click outside modal
    this._popup.addEventListener("click", (e) => {
      if (e.target.classList.contains(this._popupSelectorNoPeriod)) {
        this.close();
      }
    });
  }
}
