import {
  initialCards,
  profileEditButton,
  addCardButton,
  inputProfileName,
  inputProfileDescription,
  photoCardList,
  inputCardTitle,
  inputCardLink,
  cardImageDisplayLink,
  cardImageDisplayName,
} from "../utils/constants.js";
import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import "./index.css";
import { Section } from "../components/Section.js";
// import { Popup } from "../components/Popup.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { UserInfo } from "../components/UserInfo.js";

const cardFormPopup = new PopupWithForm(
  "#card-add-modal",
  handleCardFormSubmit
);
const profileFormPopup = new PopupWithForm(
  "#profile-edit-modal",
  handleProfileFormSubmit
);
const photoCardPopup = new PopupWithImage("#photos-display-modal");
const userProfileInformation = new UserInfo(
  ".profile__name",
  ".profile__description"
);

profileFormPopup.setEventListeners();
cardFormPopup.setEventListeners();
photoCardPopup.setEventListeners();

const validationConfig = {
  formSelector: ".modal__container",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__submit-button",
  inactiveButtonClass: "modal__submit-button_inactive",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__input-error_active",
  fieldsetSelector: ".modal__fieldset",
};

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
  ({ name: inputProfileName.value, about: inputProfileDescription.value } =
    userProfileInformation.getUserInfo());
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
  cardImageDisplayName.textContent = name;
  cardImageDisplayLink.src = link;
  cardImageDisplayLink.alt = name;

  photoCardPopup.open({ name, link });
}

function handleCardFormSubmit() {
  renderCard({ link: inputCardLink.value, name: inputCardTitle.value });
  cardFormPopup.close();
  formValidators["card-add-form"].toggleButtonState();
}

function renderCard(item, method = "prepend") {
  const cardElement = createCard(item);
  photoCardList[method](cardElement);
}

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
