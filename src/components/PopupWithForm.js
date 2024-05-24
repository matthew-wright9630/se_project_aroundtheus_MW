import { Popup } from "../components/Popup";

export class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;

    this._submitButton = this._popupElement.querySelector(
      ".modal__submit-button"
    );
    this._popupForm = this._popupElement.querySelector(".modal__container");
  }

  _getInputValue() {
    const inputList = Array.from(
      this._popupElement.querySelectorAll(".modal__input")
    );
    const inputValues = {};
    inputList.forEach((input) => {
      inputValues[input.name] = input.value;
    });
    return inputValues;
  }

  close() {
    this._popupForm.reset();
    super.close();
  }

  setEventListeners() {
    this._submitButton.addEventListener("click", () => {
      this._handleFormSubmit(this._getInputValue());
    });

    super.setEventListeners();
  }
}
