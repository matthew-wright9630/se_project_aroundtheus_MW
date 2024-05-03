const initialCards = [
  {
    name: "Goat in a field",
    link: "https://images.unsplash.com/photo-1506076177893-89d54794ef41?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Snowy landscape",
    link: "https://images.unsplash.com/photo-1709403336601-c694b02d04ec?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Coastline ",
    link: "https://images.unsplash.com/photo-1707343843982-f8275f3994c5?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Galaxy of stars",
    link: "https://images.unsplash.com/photo-1709403338527-8229912b3a67?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Mount Everest",
    link: "https://images.unsplash.com/photo-1575819719798-83d97dd6949c?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "School of fish",
    link: "https://images.unsplash.com/photo-1707327956851-30a531b70cda?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";

/* Elements */
// Elements used to open and close the Edit Profile Modal and Card Add Modal
const profileEditButton = document.querySelector(".profile__edit-button");
const profileEditModal = document.querySelector("#profile-edit-modal");

const addCardButton = document.querySelector(".profile__add-button");
const addCardModal = document.querySelector("#card-add-modal");

const cardImageDisplay = document.querySelector("#photos-display-modal");

const closeButtons = document.querySelectorAll(".modal__close-button");

//Elements used to display the current profile name and description in the edit profile modal
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");
const inputProfileName = document.querySelector("#profile-name");
const inputProfileDescription = document.querySelector("#profile-description");

//Elements used to submit the edit profile modal form
const profileFormElement = document.forms["profile-form"];
const addCardFormElement = document.forms["card-add-form"];

//Elements used for photos templates
const photoCardList = document.querySelector(".photos__list");
const photoCardTemplate = document
  .querySelector("#photos-template")
  .content.querySelector(".photos__card");

//Elements used for adding cards
const inputCardTitle = document.querySelector("#card-title");
const inputCardLink = document.querySelector("#card-image-link");

const cardImageDisplayLink = cardImageDisplay.querySelector(
  ".modal__photos-link"
);
const cardImageDisplayName = cardImageDisplay.querySelector(
  ".modal__photos-title"
);

const validationConfig = {
  formSelector: ".modal__container",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__submit-button",
  inactiveButtonClass: "modal__submit-button_inactive",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__input-error_active",
  fieldsetSelector: ".modal__fieldset",
};

const formValidators = {}

const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector))
  formList.forEach((formElement) => {
    const validator = new FormValidator(config, formElement)
    const formName = formElement.getAttribute('id')

    formValidators[formName] = validator;
   validator.enableValidation();
  });
};

enableValidation(validationConfig);

/* Event Listeners */
//Event Listeners for opening and closing the edit profile modal
profileEditButton.addEventListener("click", displayEditProfileModal);

//Event Listeners for opening and closing the add card modal
addCardButton.addEventListener("click", () => {
  openModal(addCardModal);
});

closeButtons.forEach((button) => {
  const popup = button.closest('.modal');
  button.addEventListener('click', () => closeModal(popup));
});

//Event Listener for submiting the edit profile modal
profileFormElement.addEventListener("submit", handleProfileFormSubmit);
addCardFormElement.addEventListener("submit", handleCardFormSubmit);

//Functions
function openModal(modal) {
  modal.classList.add("modal_opened");

  document.addEventListener("mousedown", closeModalOnOverlayClick);
  document.addEventListener("keydown", closeModalOnEscapeKey);
}

function closeModal(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("mousedown", closeModalOnOverlayClick);
  document.removeEventListener("keydown", closeModalOnEscapeKey);
}

function closeModalOnOverlayClick(evt) {
  if (evt.target.classList.contains("modal")) {
    closeModal(evt.target);
  }
}

function closeModalOnEscapeKey(evt) {
  if (evt.key === "Escape") {
    const openedModal = document.querySelector(".modal_opened");
    closeModal(openedModal);
  }
}

function fillProfileInputFields() {
  inputProfileName.value = profileName.textContent;
  inputProfileDescription.value = profileDescription.textContent;
}

function displayEditProfileModal() {
  fillProfileInputFields();
  formValidators['profile-form'].resetValidation();
  console.log("modal is opened and validation should be reset");
  openModal(profileEditModal);
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = inputProfileName.value;
  profileDescription.textContent = inputProfileDescription.value;
  closeModal(profileEditModal);
}

function createCard(element) {
  // const cardElement = photoCardTemplate.cloneNode(true);
  const card = new Card(element, "#photos-template", handleImageClick);
  return card.generateCard();
}

initialCards.forEach((data) => {
  renderCard(data, "append");
  // photoCardList.append(card);
  // renderCard(card, "append");
})

function handleImageClick({ name, link }) {
  cardImageDisplayName.textContent = name;
  cardImageDisplayLink.src = link;
  cardImageDisplayLink.alt = name;
  openModal(cardImageDisplay);
}

function handleCardFormSubmit(evt) {
  evt.preventDefault();
  renderCard({link: inputCardLink.value, name: inputCardTitle.value});
  // photoCardList.prepend(cardEl);
  // renderCard(cardEl, "prepend");
  closeModal(addCardModal);
  addCardFormElement.reset();
  formValidators['card-add-form'].resetValidation()
}

function renderCard(item, method = "prepend") {
  const cardElement = createCard(item);
  photoCardList[ method ](cardElement);
}

