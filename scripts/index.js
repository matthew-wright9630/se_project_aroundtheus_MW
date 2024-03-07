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

/* Elements */
const profileEditButton = document.querySelector(".profile__edit-button");
const profileEditModal = document.querySelector("#profile-edit-modal");

/* Event Listeners */
profileEditButton.addEventListener("click", () => {
  profileEditModal.classList.add("modal_opened");
});
profileEditModal.addEventListener("click", () => {
  profileEditModal.classList.remove("modal_opened");
});

/*
function showModalView() {
  modalView.classList.add("modal_opened");
}

function closeModalView() {
  modalView.classList.remove("modal_opened");
  preventDefault();
}

console.log(initialCards);*/
