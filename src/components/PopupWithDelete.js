import { Popup } from "../components/Popup";

export class PopupWithDelete extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._popupForm = this._popupElement.querySelector(".modal__container");
  }

  setEventListeners() {
    console.log("popupWithDelete");
    this._popupForm.addEventListener("submit", () => {
      console.log(this._handleFormSubmit, "form sumbit");
      this._handleFormSubmit();
    });

    super.setEventListeners();
  }
}
