const initialCards = [
  {
    name: "Goat in a field",
    alt: "Picture of a goat",
    link: "https://images.unsplash.com/photo-1506076177893-89d54794ef41?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
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
const profileEditCloseButton = profileEditModal.querySelector(
  ".modal__close-button"
);
const profileAddCardButton = document.querySelector(".profile__add-button");
const profileAddCardModal = document.querySelector("#card-add-modal");
const profileAddCardCloseButton = profileAddCardModal.querySelector(
  "#close-add-card-modal"
);
const cardImageDisplay = document.querySelector("#photos-display-modal");
const cardImageDisplayCloseButton = cardImageDisplay.querySelector(
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
profileEditCloseButton.addEventListener("click", () => {
  closeModal(profileEditModal);
});

//Event Listeners for opening and closing the add card modal
profileAddCardButton.addEventListener("click", () => {
  openModal(profileAddCardModal);
});
profileAddCardCloseButton.addEventListener("click", () => {
  closeModal(profileAddCardModal);
});

cardImageDisplayCloseButton.addEventListener("click", () => {
  closeModal(cardImageDisplay);
});

//Event Listener for submiting the edit profile modal
profileFormElement.addEventListener("submit", handleProfileFormSubmit);
profileAddCardFormElement.addEventListener("submit", handleCardFormSubmit);

//Functions
function openModal(modal) {
  modal.classList.add("modal_opened");

  closeModalOnOverlayClick(modal);
  closeModalOnEscapeKey(modal);
}

function closeModal(modal) {
  modal.classList.remove("modal_opened");
}

function closeModalOnOverlayClick(modal) {
  modal.addEventListener("mousedown", (evt) => {
    console.log("evt", evt);
    if (evt.target.classList.contains("modal")) {
      closeModal(modal);
      modal.removeEventListener("mousedown", closeModalOnOverlayClick);
    }
  });
}

function closeModalOnEscapeKey(modal) {
  document.addEventListener("keydown", function (evt) {
    if (evt.key === "Escape") {
      console.log()
      closeModal(modal);
    }
  });
}

function fillProfileInputFields() {
  inputProfileName.value = profileName.textContent;
  inputProfileDescription.value = profileDescription.textContent;
}

function displayEditProfileModal() {
  fillProfileInputFields();
  openModal(profileEditModal);
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = inputProfileName.value;
  profileDescription.textContent = inputProfileDescription.value;
  closeModal(profileEditModal);
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
    cardImageDisplayName.textContent = data.name;
    cardImageDisplayLink.src = data.link;
    cardImageDisplayLink.alt = data.alt;
    openModal(cardImageDisplay);
  });

  return cardElement;
}

initialCards.forEach((element) => {
  const cardElement = createCard(element);
  photoCardList.append(cardElement);
});

function handleCardFormSubmit(evt) {
  evt.preventDefault();
  const cardElement = createCard({
    link: inputCardLink.value,
    name: inputCardTitle.value,
    alt: inputCardTitle.value,
  });
  photoCardList.prepend(cardElement);
  closeModal(profileAddCardModal);
  profileAddCardFormElement.reset();
}
