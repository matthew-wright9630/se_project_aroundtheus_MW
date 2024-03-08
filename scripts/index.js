const initialCards = [
  {
    name: "goatPicture",
    link: "https://unsplash.com/photos/a-ram-standing-on-top-of-a-large-rock-G8_JBLFMWTg",
  },
  {
    name: "snowyPicture",
    link: "https://unsplash.com/photos/a-black-and-white-photo-of-water-and-rocks-raJ-tYfylhU",
  },
  {
    name: "coastLinePicture",
    link: "https://unsplash.com/photos/an-aerial-view-of-a-body-of-water-D1jr0Mevs-c",
  },
  {
    name: "staryPicture",
    link: "https://unsplash.com/photos/two-very-large-objects-in-the-sky-with-stars-ZsJuNhJSiR4",
  },
  {
    name: "mountainPicture",
    link: "https://unsplash.com/photos/a-lone-tree-in-the-middle-of-a-desert-n70vrh_E0Ss",
  },
  {
    name: "underseaPicture",
    link: "https://unsplash.com/photos/a-large-group-of-fish-swimming-over-a-coral-reef-bOMVTvE2QFU",
  },
];

/* 
 const profileFormElement = // Use the querySelector() method

// find the form fields in the DOM
const nameInput = // Use querySelector()
const jobInput = // Use querySelector()

// find the profile elements in the DOM
const profileName = // Use querySelector()
const profileJob = // Use querySelector()

// the form submission handler. Note that its name 
// starts with a verb and concisely describes what it does
function handleProfileFormSubmit(evt) {
  evt.preventDefault(); 
 
  // get the values of each field from the value property 
  // of the corresponding input element

  // insert new values into the textContent property of the 
  // corresponding profile elements
}

// connect the handler to the form:
// it will watch the submit event
formElement.addEventListener('submit', handleProfileFormSubmit);

*/

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

function closeEditProfileModal() {
  profileEditModal.classList.remove("modal_opened");
  //event.preventDefault();
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = inputProfileName.value;
  profileDescription.textContent = inputProfileDescription.value;
  closeEditProfileModal();
}

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
