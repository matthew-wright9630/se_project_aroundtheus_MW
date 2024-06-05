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
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { UserInfo } from "../components/UserInfo.js";

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
cardSection.renderItems();

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
});

//Event Listeners for opening and closing the add card modal
addCardButton.addEventListener("click", () => {
  
  cardFormPopup.open();
});

function handleProfileFormSubmit(inputValues) {
  userProfileInformation.setUserInfo(inputValues);
  profileFormPopup.close();
}

function createCard(element) {
  const card = new Card(element, "#photos-template", handleImageClick);
  return card.generateCard();
}

function handleImageClick({ name, link }) {
  photoCardPopup.open({ name, link });
}

function handleCardFormSubmit(inputValues) {
  renderCard(inputValues);
  cardFormPopup.close();
  formValidators["card-add-form"].toggleButtonState();
}

function renderCard(item, method = "prepend") {
  cardSection.addItem(item);
}
