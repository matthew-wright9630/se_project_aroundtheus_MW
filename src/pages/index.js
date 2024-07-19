import {
  initialCards,
  profileEditButton,
  addCardButton,
  photoCardList,
  validationConfig,
  avatarButton,
} from "../utils/constants.js";
import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import "./index.css";
import { Section } from "../components/Section.js";
import { Popup } from "../components/Popup.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { UserInfo } from "../components/UserInfo.js";
import { Api } from "../components/Api.js";

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "b88b770f-9665-4862-bc7a-1a5aa8c4147a",
    "Content-Type": "application/json",
  },
});

const cardSection = new Section(
  {
    items: initialCards,
    renderer: (item, method = "prepend") => {
      const cardElement = createCard(item);
      photoCardList[method](cardElement);
    },
  },
  "#card-add-form"
);

//Getting the list of cards from the server and displaying it on the form
api
  .getInitialCards()
  .then((res) => {
    res.forEach((result) => {
      cardSection.addItem(result);
    });
  })
  .catch((err) => {
    console.error(err);
  });

// Class assignment for all popups
const cardFormPopup = new PopupWithForm(
  "#card-add-modal",
  handleCardFormSubmit
);
cardFormPopup.setEventListeners();

const profileFormPopup = new PopupWithForm(
  "#profile-edit-modal",
  handleProfileFormSubmit
);
profileFormPopup.setEventListeners();

const photoCardPopup = new PopupWithImage("#photos-display-modal");
photoCardPopup.setEventListeners();

const userProfileInformation = new UserInfo(
  ".profile__name",
  ".profile__description",
  ".profile__avatar-picture"
);

const deleteCardPopup = new PopupWithForm("#delete-card-modal");
deleteCardPopup.setEventListeners();

const avatarUpdatePopup = new PopupWithForm(
  "#avatar-update-modal",
  handleAvatarUpdate
);
avatarUpdatePopup.setEventListeners();

//Form validators
const formValidators = {};

const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    const validator = new FormValidator(config, formElement);
    const formName = formElement.getAttribute("id");

    formValidators[formName] = validator;
    validator.enableValidation();
  });
};

enableValidation(validationConfig);

/* Event Listeners */
//Event Listeners for opening and closing the edit profile modal
profileEditButton.addEventListener("click", () => {
  profileFormPopup.setInputValues(userProfileInformation.getUserInfo());
  profileFormPopup.open();
  formValidators["profile-form"].resetValidation();
});

//Event Listeners for opening and closing the add card modal
addCardButton.addEventListener("click", () => {
  cardFormPopup.open();
  formValidators["card-add-form"].resetValidation();
});

//Event Listeners for the Avatar Update modal
avatarButton.addEventListener("click", () => {
  avatarUpdatePopup.open();
  formValidators["avatar-update-form"].resetValidation();
});

//Updating profile information
function handleProfileFormSubmit(inputValues) {
  profileFormPopup.renderLoading(true);
  api
    .updateUserInformation(inputValues)
    .then((userInformation) => {
      userProfileInformation.setUserInfo(userInformation);
      profileFormPopup.close();
      profileFormPopup.reset();
    })
    .catch(console.error)
    .finally(() => {
      profileFormPopup.renderLoading(false);
    });
}

function createCard(element) {
  const card = new Card(
    element,
    "#photos-template",
    handleImageClick,
    handleCardDelete,
    handleLikeCard
  );
  return card.generateCard();
}

function handleImageClick({ name, link }) {
  photoCardPopup.open({ name, link });
}

// Submitting a new card to the server
function handleCardFormSubmit(inputValues) {
  cardFormPopup.renderLoading(true);
  api
    .addCard(inputValues)
    .then((newCard) => {
      renderCard(newCard);
      cardFormPopup.close();
      cardFormPopup.reset();
    })
    .catch(console.error)
    .finally(() => {
      cardFormPopup.renderLoading(false);
    });
}

function renderCard(item, method = "prepend") {
  cardSection.addItem(item);
}

//Delete card
function handleCardDelete(card) {
  const cardId = card.getCardId();
  deleteCardPopup.open();
  deleteCardPopup.setSubmit(() => {
    deleteCardPopup.renderLoading(true);
    api
      .deleteCard(cardId)
      .then(() => {
        card.deleteCard();
        deleteCardPopup.close();
      })
      .catch(console.error)
      .finally(() => {
        deleteCardPopup.renderLoading(false);
      });
  });
}

//handles both like and dislike of cards
function handleLikeCard(card) {
  const cardId = card.getCardId();
  const cardLiked = card.getCardIsLiked();
  if (cardLiked == false) {
    api
      .likeCard(cardId)
      .then(() => {
        card.likeCard();
      })
      .catch(console.error);
  } else {
    api
      .dislikeCard(cardId)
      .then(() => {
        card.dislikeCard();
      })
      .catch(console.error);
  }
}

//updating the avatar
function handleAvatarUpdate({ name: inputValue }) {
  avatarUpdatePopup.renderLoading(true);
  api
    .udpateAvatar(inputValue)
    .then(() => {
      userProfileInformation.setUserAvatar(inputValue);
      avatarUpdatePopup.close();
      avatarUpdatePopup.reset();
    })
    .catch(console.error)
    .finally(() => {
      avatarUpdatePopup.renderLoading(false);
    });
}

// Get user data from the server
api
  .getUser()
  .then((res) => {
    userProfileInformation.setUserInfo(res);
  })
  .catch(console.error);
