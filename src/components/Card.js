class Card {
  constructor(data, cardSelector, handleImageClick, deleteButtonBtnClick) {
    this._cardName = data.name;
    this._cardImage = data.link;
    this._cardAlt = data.name;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
    this._deleteButtonBtnClick = deleteButtonBtnClick;
  }

  _getView() {
    this._cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".photos__card")
      .cloneNode(true);
    this._likeButton = this._cardElement.querySelector(".photos__like-button");
    this._deleteButton = this._cardElement.querySelector(
      ".photos__delete-button"
    );
    this._cardImageButton = this._cardElement.querySelector(".photos__image");
    this._cardElementName = this._cardElement.querySelector(".photos__caption");
    this._cardElementImage = this._cardElement.querySelector(".photos__image");
  }

  // _handleDeleteCard() {
  //   this._cardElement.remove();
  //   this._cardElement = null;
  // }

  _handleLikeCard() {
    this._likeButton.classList.toggle("photos__like-button_active");
  }

  _setCardData() {
    this._cardElementName.textContent = this._cardName;
    this._cardElementImage.src = this._cardImage;
    this._cardElementImage.alt = this._cardName;
  }

  getCardElement() {
    return this._cardElement;
  }

  generateCard() {
    this._getView();
    this._setEventListeners();
    this._setCardData();

    return this._cardElement;
  }

  _setEventListeners() {
    this._likeButton.addEventListener("click", () => {
      this._handleLikeCard();
    });

    this._deleteButton.addEventListener("click", () => {
      console.log(this._deleteButtonBtnClick);
      this._deleteButtonBtnClick();
    });

    this._cardImageButton.addEventListener("click", () => {
      this._handleImageClick({ name: this._cardName, link: this._cardImage });
    });
  }
}

export { Card };
