const showInputError = (
  modalElement,
  inputElement,
  errorMessage,
  validationConfig
) => {
  const errorElement = modalElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(validationConfig.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(validationConfig.errorClass);
};

const hideInputError = (modalElement, inputElement, validationConfig) => {
  const errorElement = modalElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(validationConfig.inputErrorClass);
  errorElement.classList.remove(validationConfig.errorClass);
  errorElement.textContent = "";
};

const checkInputValidity = (modalElement, inputElement, validationConfig) => {
  if (!inputElement.validity.valid) {
    showInputError(
      modalElement,
      inputElement,
      inputElement.validationMessage,
      validationConfig
    );
  } else {
    hideInputError(modalElement, inputElement, validationConfig);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const toggleButtonState = (inputList, buttonElement, validationConfig) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(
      validationConfig.inactiveButtonClass,
    );
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(validationConfig.inactiveButtonClass);
    buttonElement.disabled = false;
  }
};

const setEventListeners = (modalElement, validationConfig) => {
  const inputList = Array.from(
    modalElement.querySelectorAll(validationConfig.inputSelector)
  );
  const buttonElement = modalElement.querySelector(
    validationConfig.submitButtonSelector
  );
  toggleButtonState(inputList, buttonElement, validationConfig);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(modalElement, inputElement, validationConfig);
      toggleButtonState(inputList, buttonElement, validationConfig);
    });
  });
};

const enableValidation = (validationConfig) => {
  const modalList = Array.from(
    document.querySelectorAll(validationConfig.formSelector)
  );
  modalList.forEach((modalElement) => {
    modalElement.addEventListener("submit", function (evt) {
      evt.preventDefault();
    });

    const modalFieldsetList = Array.from(
      modalElement.querySelectorAll(validationConfig.fieldsetSelector)
    );

    modalFieldsetList.forEach((modalFieldsetElement) => {
      setEventListeners(modalFieldsetElement, validationConfig);
    });
  });
};

enableValidation({
  formSelector: ".modal__container",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__submit-button",
  inactiveButtonClass: "modal__submit-button_inactive",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__input-error_active",
  fieldsetSelector: ".modal__fieldset",
});
