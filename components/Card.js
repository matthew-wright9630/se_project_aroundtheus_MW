class Card {
  constructor(data, cardSelector, handleImageClick) {
    this._cardName = data.name;
    this._cardImage = data.link;
    this._cardAlt = data.name;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
  }

  generateCard() {
    this._setEventListeners();

    this._cardSelector.querySelector(".photos__caption").textContent =
      this._cardName;
    this._cardSelector.querySelector(".photos__image").src = this._cardImage;
    this._cardSelector.querySelector(".photos__image").alt = this._cardAlt;

    return this._cardSelector;
  }

  _setEventListeners() {
    this._cardSelector
      .querySelector(".photos__like-button")
      .addEventListener("click", () => {
        this._handleLikeCard();
      });

    this._cardSelector
      .querySelector(".photos__delete-button")
      .addEventListener("click", () => {
        this._handleDeleteCard();
      });

    this._cardSelector
      .querySelector(".photos__image")
      .addEventListener("click", () => {
        this._handleImageClick({ name: this._cardName, link: this._cardImage });
      });
  }

  _handleDeleteCard() {
    this._cardSelector.remove();
  }

  _handleLikeCard() {
    this._cardSelector
      .querySelector(".photos__like-button")
      .classList.toggle("photos__like-button_active");
  }
}

export { Card };
