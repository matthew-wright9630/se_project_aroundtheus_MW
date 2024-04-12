const showInputError = ((modalElement, inputElement, errorMessage) => {
    const errorElement = modalElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add("modal__input_type_error");
    errorElement.textContent = errorMessage;
    errorElement.classList.add("modal__input-error_active");
  });
  
  const hideInputError = (modalElement, inputElement) => {
    const errorElement = modalElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove("modal__input_type_error");
    errorElement.classList.remove("modal__input-error_active");
    errorElement.textContent = "";
  };
  
  const checkInputValidity = (modalElement, inputElement) => {
    if (!inputElement.validity.valid) {
      showInputError(modalElement, inputElement, inputElement.validationMessage);
    } else {
      hideInputError(modalElement, inputElement);
    }
  };
  
  const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  };
  
  const toggleButtonState = (inputList, buttonElement) => {
    if ((hasInvalidInput(inputList))) {
      buttonElement.classList.add("modal__submit-button_inactive");
    } else {
      buttonElement.classList.remove("modal__submit-button_inactive");
    }
  };
  
  const setEventListeners = (modalElement) => {
    const inputList = Array.from(modalElement.querySelectorAll(".modal__input"));
    const buttonElement = modalElement.querySelector(".modal__submit-button");
    toggleButtonState(inputList, buttonElement);
  
    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", function () {
        checkInputValidity(modalElement, inputElement);
        toggleButtonState(inputList, buttonElement);
      });
    });
  };
  
  const enableValidation = () => {
    const modalList = Array.from(document.querySelectorAll(".modal__container"));
    modalList.forEach((modalElement) => {
      modalElement.addEventListener("submit", function (evt) {
        evt.preventDefault();
      });
  
      const modalFieldsetList = Array.from(modalElement.querySelectorAll(".modal__fieldset"));
  
      modalFieldsetList.forEach((modalFieldsetElement) => {
        setEventListeners(modalFieldsetElement);
      });
    });
  };

  enableValidation( {
  formSelector: ".modal__container",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__submit-button",
  inactiveButtonClass: "modal__submit-button_inactive",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__input-error_active"
  });