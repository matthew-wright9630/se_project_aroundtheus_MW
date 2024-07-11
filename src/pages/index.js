import {
  initialCards,
  profileEditButton,
  addCardButton,
  photoCardList,
  validationConfig,
} from "../utils/constants.js";
import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import "./index.css";
import { Section } from "../components/Section.js";
import { Popup } from "../components/Popup.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { PopupWithDelete } from "../components/PopupWithDelete.js";
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
      // console.log(photoCardList);
    },
  },
  "#card-add-form"
);
// cardSection.renderItems();

api
  .getInitialCards()
  .then((result) => {
    return result;
  })
  .then((res) => {
    res.forEach((result) => {
      renderCard(result);
    });
  })
  .catch((err) => {
    console.error(err);
  });

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

const userProfileInformation = new UserInfo(
  ".profile__name",
  ".profile__description"
);
photoCardPopup.setEventListeners();

const deleteCardPopup = new PopupWithForm("#delete-card-modal");
deleteCardPopup.setEventListeners();

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

function handleProfileFormSubmit(inputValues) {
  // profileFormPopup.setSubmit(() => {
    // profileFormPopup.setLoading(true);
    api
      .updateUserInformation(inputValues)
      .then((result) => {
        return result.json();
      })
      .then((userInformation) => {
        userProfileInformation.setUserInfo(userInformation);
        // profileFormPopup.close();
        // profileFormPopup.setLoading(false);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(profileFormPopup.close());
  // });
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

// function createCard(element) {
//   api.addCard(element)
//     .then(result => {
//       // console.log(result);
//       return result;
//     })
//     .then(res => {
//       const card = new Card(
//             res,
//             "#photos-template",
//             handleImageClick,
//             handleDeleteBtnClick
//           );
//           console.log(card);
//           return card.generateCard();
//     })
//     .catch(err => {
//       console.error(err);
//     })
// }

function handleImageClick({ name, link }) {
  photoCardPopup.open({ name, link });
}

function handleCardFormSubmit(inputValues) {
  // cardFormPopup.setSubmit(() => {
  //   cardFormPopup.setLoading(true);
  console.log(inputValues);
  api
    .addCard(inputValues)
    .then((result) => result.json())
    .then((newCard) => {
      renderCard(newCard);
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(cardFormPopup.close());
  // });
}

function renderCard(item, method = "prepend") {
  cardSection.addItem(item);
}

function handleCardDelete(card) {
  const cardId = card.getCardId();
  deleteCardPopup.open();
  deleteCardPopup.setSubmit(() => {
    deleteCardPopup.setLoading(true);
    api
      .deleteCard(cardId)
      .then(() => {
        console.log(card, "Card deleted successfully");
        card.deleteCard();
        deleteCardPopup.close();
        deleteCardPopup.setLoading(false);
      })
      .catch((error) => {
        console.error("Error in deleting card:", error);
      });
  });
}

function handleLikeCard(card) {
  console.log("====");
  console.log(card);
  const cardId = card.getCardId();
  const cardLiked = card.getCardIsLiked();
  console.log(cardLiked, "like status");
  if (cardLiked == false) {
    api
      .likeCard(cardId)
      .then(() => {
        console.log("card is liked");
        card.likeCard();
      })
      .catch((error) => {
        console.error("Error in liking card:", error);
      });
  } else {
    api
      .dislikeCard(cardId)
      .then(() => {
        console.log("card is disliked");
        card.dislikeCard();
      })
      .catch((error) => {
        console.error("Error in disliking card: ", error);
      });
  }
}

api
  .getUser()
  .then((result) => {
    console.log(result);
  })
  .catch((err) => {
    console.error(err);
  });

api.getUserInformation();
