export class Popup {
  constructor(popupSelector) {
    this._popupElement = document.querySelector(popupSelector);
    this._closeButton = this._popupElement.querySelector(
      ".modal__close-button"
    );
  }

  open() {
    this._popupElement.classList.add("modal_opened");
  }

  close() {
    this._popupElement.classList.remove("modal_opened");
    document.removeEventListener("mousedown", this._closeOnOverlayClick);
    document.removeEventListener("keydown", this._closeOnEscKey);
  }

  _closeOnOverlayClick(evt) {
    if (evt.target.classList.contains("modal_opened")) {
      this.close();
    }
  }

  _closeOnEscKey(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  setEventListeners() {
    this._closeButton.addEventListener("click", () => {
      this.close();
    });

    document.addEventListener("mousedown", (evt) => {
      this._closeOnOverlayClick(evt);
    });

    document.addEventListener("keydown", (evt) => {
      this._closeOnEscKey(evt);
    });
  }
}
