const showInputError = (formElement, inputElement, errorMessage, {inputErrorClass, errorClass}) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(errorClass);
};

const hideInputError = (formElement, inputElement, {inputErrorClass, errorClass}) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(inputErrorClass);
  errorElement.classList.remove(errorClass);
  errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement, {inputErrorClass, errorClass}) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, {inputErrorClass, errorClass});
  } else {
    hideInputError(formElement, inputElement, {inputErrorClass, errorClass});
  }
};

const setEventListeners = (formElement, {inputSelector, submitButtonSelector, ...rest}) => {
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  const buttonElement = formElement.querySelector(submitButtonSelector);
  inputList.forEach((inputElement) => {
  toggleButtonState(inputList, buttonElement, rest);
    buttonEditProfile.addEventListener('click',  () => {
      hideInputError(formElement, inputElement, rest);
      toggleButtonState(inputList, buttonElement, rest);
    });

    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement, rest);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

const toggleButtonState = (inputList, buttonElement, enableValidation) => {
  if(hasInvalidInput(inputList)){
    buttonElement.classList.add(enableValidation.inactiveButtonClass);
  } else {
    buttonElement.classList.remove(enableValidation.inactiveButtonClass);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some(inputElement =>{
    return !inputElement.validity.valid;
  })
};

function enableValidation({formSelector, ...rest}) {
  let formList = Array.from(document.querySelectorAll(formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
  setEventListeners(formElement, rest);  
  });
};


enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
}); 
