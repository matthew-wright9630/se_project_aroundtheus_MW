class Card {
  constructor(data, cardSelector, handleImageClick, handleDeleteCard, handleLikeCard) {
    this._cardName = data.name;
    this._cardImage = data.link;
    this._cardAlt = data.name;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
    this._handleDeleteCard = handleDeleteCard;
    this._handleLikeCard = handleLikeCard
    this._id = data._id;
    this._isLiked = false;
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

  getCardId() {
    return this._id;
  }

  getCardIsLiked() {
    return this._isLiked;
  }

  deleteCard() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  likeCard() {
    this._likeButton.classList.add("photos__like-button_active");
    this._isLiked = true;
  }

  dislikeCard() {
    this._likeButton.classList.remove("photos__like-button_active");
    this._isLiked = false;
  }

  _setEventListeners() {
    // this._likeButton.addEventListener("click", () => {
    //   this._handleLikeCard();
    // });

    this._deleteButton.addEventListener("click", () => {
      this._handleDeleteCard(this);
    });

    this._cardImageButton.addEventListener("click", () => {
      this._handleImageClick({ name: this._cardName, link: this._cardImage });
    });

    this._likeButton.addEventListener("click", () => {
      this._handleLikeCard(this);
    })
  }
}

export { Card };
