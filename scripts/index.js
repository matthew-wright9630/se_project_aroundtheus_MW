const initialCards = [
  {
    name: "Goat in a field",
    alt: "Picture of a goat",
    link: "https://images.pexels.com/photos/2414459/pexels-photo-2414459.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    name: "Snowy landscape",
    alt: "Picture of a snowy landscape",
    link: "https://images.unsplash.com/photo-1709403336601-c694b02d04ec?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Coastline ",
    alt: "Picture of a Coastline",
    link: "https://images.unsplash.com/photo-1707343843982-f8275f3994c5?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Galaxy of stars",
    alt: "Picture of stars",
    link: "https://images.unsplash.com/photo-1709403338527-8229912b3a67?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Mount Everest",
    alt: "Picture of a Mount Everest",
    link: "https://images.unsplash.com/photo-1575819719798-83d97dd6949c?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "School of fish",
    alt: "Picture of fish under the sea",
    link: "https://images.unsplash.com/photo-1707327956851-30a531b70cda?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

/* Elements */
// Elements used to open and close the Edit Profile Modal
const profileEditButton = document.querySelector(".profile__edit-button");
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileEditCloseButton = document.querySelector(".modal__close-button");

//Elements used to display the current profile name and description in the edit profile modal
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");
const inputProfileName = document.querySelector("#profile-name");
const inputProfileDescription = document.querySelector("#profile-description");

//Elements used to submit the edit profile modal form
const profileFormElement = document.forms["profile-form"];

//Elements used for photos templates
const photoCardTemplate = document.querySelector("#photos-template").content;
const photoCardList = document.querySelector(".photos__list");

/* Event Listeners */
//Event Listeners for opening and closing the edit profile modal
profileEditButton.addEventListener("click", displayEditProfileModal);
profileEditCloseButton.addEventListener("click", closeEditProfileModal);

//Event Listener for submiting the edit profile modal
profileFormElement.addEventListener("submit", handleProfileFormSubmit);

//Functions
function displayEditProfileModal() {
  inputProfileName.value = profileName.textContent;
  inputProfileDescription.value = profileDescription.textContent;
  profileEditModal.classList.add("modal_opened");
}

function closeEditProfileModal() {
  profileEditModal.classList.remove("modal_opened");
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = inputProfileName.value;
  profileDescription.textContent = inputProfileDescription.value;
  closeEditProfileModal();
}

function createCard(data) {
  const cardElement = photoCardTemplate.cloneNode(true);
  const cardDescription = cardElement.querySelector(".photos__caption");
  const cardImage = cardElement.querySelector(".photos__image");
  cardDescription.textContent = data.name;
  cardImage.src = data.link;
  cardImage.alt = data.alt;

  return cardElement;
}

function getCardElement(data) {
  const cardElement = createCard(data);
  photoCardList.append(cardElement);
}

initialCards.forEach(element => {
  getCardElement(element);
});
