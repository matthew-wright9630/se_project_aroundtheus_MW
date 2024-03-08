const initialCards = [
  {
    name: "goatPicture",
    alt: "Picture of a goat",
    link: "https://unsplash.com/photos/a-ram-standing-on-top-of-a-large-rock-G8_JBLFMWTg",
  },
  {
    name: "snowyPicture",
    alt: "Picture of snow",
    link: "https://unsplash.com/photos/a-black-and-white-photo-of-water-and-rocks-raJ-tYfylhU",
  },
  {
    name: "coastLinePicture",
    alt: "Picture of a coatline",
    link: "https://unsplash.com/photos/an-aerial-view-of-a-body-of-water-D1jr0Mevs-c",
  },
  {
    name: "staryPicture",
    alt: "Picture of the stars",
    link: "https://unsplash.com/photos/two-very-large-objects-in-the-sky-with-stars-ZsJuNhJSiR4",
  },
  {
    name: "mountainPicture",
    alt: "Picture of a mountain",
    link: "https://unsplash.com/photos/a-lone-tree-in-the-middle-of-a-desert-n70vrh_E0Ss",
  },
  {
    name: "underseaPicture",
    alt: "Picture of fish under the sea",
    link: "https://unsplash.com/photos/a-large-group-of-fish-swimming-over-a-coral-reef-bOMVTvE2QFU",
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
const profileFormElement = document.querySelector("#profile-edit-modal");

//Elements used for photos templates
const photoCardTemplate = document.querySelector("#photos-template").content;
const photoCardList = document.querySelector("photos__list");

/* Event Listeners */
//Event Listeners for opening and closing the edit profile modal
profileEditButton.addEventListener("click", displayEditProfileModal);
profileEditCloseButton.addEventListener("click", closeEditProfileModal);

//Event Listener for submiting the edit profile modal
profileFormElement.addEventListener("submit", handleProfileFormSubmit);

//Functions
function displayEditProfileModal(event) {
  inputProfileName.value = profileName.textContent;
  inputProfileDescription.value = profileDescription.textContent;
  profileEditModal.classList.add("modal_opened");
  event.preventDefault();
}

function closeEditProfileModal(event) {
  profileEditModal.classList.remove("modal_opened");
  event.preventDefault();
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = inputProfileName.value;
  profileDescription.textContent = inputProfileDescription.value;
  profileEditModal.classList.remove("modal_opened");
}

function getCardElement(data) {
  for (let i = 0; i < data.length; i++) {
    const cardElement = photoCardTemplate.cloneNode(true);
    const cardDescriptionEl = cardElement.querySelector(".photos__caption");
    const cardImageLinkEl = cardElement.querySelector(".photos__image");
    cardDescriptionEl.textContent = data[i].name;
    cardImageLinkEl.textContent = data[i].link;

    photoCardList.append(cardElement); 
  }
}

getCardElement(initialCards);

/* This will use the event listener without a callback. Or at least, it does not call a function elsewhere at least.
profileEditButton.addEventListener("click", () => {
  profileEditModal.classList.add("modal_opened");
  event.preventDefault();
});
profileEditModal.addEventListener("click", () => {
  profileEditModal.classList.remove("modal_opened");
  console.log("hello");
  event.preventDefault();
});
*/

/*
function showModalView() {
  modalView.classList.add("modal_opened");
}

function closeModalView() {
  modalView.classList.remove("modal_opened");
  preventDefault();
}

console.log(initialCards);*/
