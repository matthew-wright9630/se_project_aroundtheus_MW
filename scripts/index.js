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
// Elements used to open and close the Edit Profile Modal and Card Add Modal
const profileEditButton = document.querySelector(".profile__edit-button");
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileEditCloseButton = document.querySelector(".modal__close-button");
const profileAddCardButton = document.querySelector(".profile__add-button");
const profileAddCardModal = document.querySelector("#card-add-modal");
const profileAddCardCloseButton = document.querySelector(
  "#close-add-card-modal"
);
const cardImageDisplay = document.querySelector("#photos-display-modal");
const cardImageDisplayCloseButton = document.querySelector(
  "#close-photo-display-modal"
);

//Elements used to display the current profile name and description in the edit profile modal
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");
const inputProfileName = document.querySelector("#profile-name");
const inputProfileDescription = document.querySelector("#profile-description");

//Elements used to submit the edit profile modal form
const profileFormElement = document.forms["profile-form"];
const profileAddCardFormElement = document.forms["card-add-form"];

//Elements used for photos templates
const photoCardList = document.querySelector(".photos__list");
const photoCardTemplate = document
  .querySelector("#photos-template")
  .content.querySelector(".photos__card");

//Elements used for adding cards
const inputCardTitle = document.querySelector("#card-title");
const inputCardLink = document.querySelector("#card-image-link");

/* Event Listeners */
//Event Listeners for opening and closing the edit profile modal
profileEditButton.addEventListener("click", displayEditProfileModal);
profileEditCloseButton.addEventListener("click", closeEditProfileModal);

//Event Listeners for opening and closing the add card modal
profileAddCardButton.addEventListener("click", displayCardAddModal);
profileAddCardCloseButton.addEventListener("click", closeCardAddModal);

cardImageDisplayCloseButton.addEventListener("click", () => {
  cardImageDisplay.classList.remove("modal_opened");
});

//Event Listener for submiting the edit profile modal
profileFormElement.addEventListener("submit", handleProfileFormSubmit);
profileAddCardFormElement.addEventListener("submit", handleCardFormSubmit);

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
  console.log(inputProfileDescription.value);
  profileName.textContent = inputProfileName.value;
  profileDescription.textContent = inputProfileDescription.value;
  closeEditProfileModal();
}

function createCard(data) {
  const cardElement = photoCardTemplate.cloneNode(true);
  const cardDescription = cardElement.querySelector(".photos__caption");
  const cardImage = cardElement.querySelector(".photos__image");
  const cardLikeButton = cardElement.querySelector(".photos__like-button");
  const cardDeleteButton = cardElement.querySelector(".photos__delete-button");
  const cardImageDisplayLink = document.querySelector(".modal__photos-link");
  const cardImageDisplayName = document.querySelector(".modal__photos-title");

  cardLikeButton.addEventListener("click", () => {
    cardLikeButton.classList.toggle("photos__like-button_active");
  });
  cardDeleteButton.addEventListener("click", () => {
    cardElement.remove();
  });

  cardDescription.textContent = data.name;
  cardImage.src = data.link;
  cardImage.alt = data.alt;

  cardImage.addEventListener("click", () => {
    console.log(data.name);
    cardImageDisplayName.textContent = data.name;
    cardImageDisplayLink.src = data.link;
    cardImageDisplayLink.alt = data.alt;
    cardImageDisplay.classList.add("modal_opened");
  });

  return cardElement;
}

function getCardElement(data) {
  const cardElement = createCard(data);

  return cardElement;
  // photoCardList.append(cardElement);
}

initialCards.forEach((element) => {
  const cardElement = getCardElement(element);
  photoCardList.append(cardElement);
});

function displayCardAddModal() {
  profileAddCardModal.classList.add("modal_opened");
}

function closeCardAddModal() {
  profileAddCardModal.classList.remove("modal_opened");
}

function handleCardFormSubmit(evt) {
  evt.preventDefault();
  const cardElement = getCardElement({
    link: inputCardLink.value,
    name: inputCardTitle.value,
    alt: inputCardTitle.value,
  });
  closeCardAddModal();
  photoCardList.prepend(cardElement);
  console.log("point 3");
}

function openImageModal() {}

// const cardLikeButtons = document.querySelectorAll(".photos__like-button");
// console.log(cardLikeButtons);

// cardLikeButtons.forEach((likeButton) => {
//   likeButton.addEventListener("click", () => {
//     likeButton.classList.toggle("photos__like-button_active");
//   });
// });
