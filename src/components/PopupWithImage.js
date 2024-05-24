import { Popup } from "../components/Popup";

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._imageTitle = this._popupElement.querySelector(".modal__photos-title");
    this._imageLink = this._popupElement.querySelector(".modal__photos-link");
  }

  open({ name, link }) {
    this._imageTitle.textContent = name;
    this._imageLink.src = link;
    this._imageLink.alt = name;

    super.open();
  }
}
