import { Popup } from "../components/Popup";

export class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;

    this._submitButton = this._popupElement.querySelector(
      ".modal__submit-button"
    );
    this._popupForm = this._popupElement.querySelector(".modal__container");
    this._popupArray = this._popupElement.querySelectorAll(".modal__input");
    this._inputList = Array.from(this._popupArray);
    
  }

  _getInputValue() {
    const inputValues = {};
    this._inputList.forEach((input) => {
      inputValues[input.name] = input.value;
    });
    return inputValues;
  }

  setInputValues(data) {
    this._inputList.forEach((input) => {
      input.value = data[input.name];
    });
  }

  close() {
    super.close();
  }

  setEventListeners() {
    console.log(this._popupElement);
    this._submitButton.addEventListener("click", () => {
      this._handleFormSubmit(this._getInputValue());
      this._popupForm.reset();
    });

    super.setEventListeners();
  }
}
