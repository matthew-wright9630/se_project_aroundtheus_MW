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
  }

  setEventListeners() {
    this._closeButton.addEventListener("click", () => {
      this.close();
    });

    document.addEventListener("mousedown", (evt) => {
      if (evt.target.classList.contains("modal")) {
        this.close();
      }
    });

    document.addEventListener("keydown", (evt) => {
      if (evt.key === "Escape") {
        this.close();
      }
    });
  }
}
