export {FormValidator}
class FormValidator {
  constructor (
    form,
    {
      inputSelector,
      submitButtonSelector,
      inactiveButtonClass,
      inputErrorClass,
      errorClass
    }
  ) {
    this._form = form;
    this._inputSelector = inputSelector;
    this._submitButtonSelector = submitButtonSelector;
    this._inactiveButtonClass = inactiveButtonClass;
    this._inputErrorClass = inputErrorClass;
    this._errorClass = errorClass;
  }

  _setEventListeners() {
    this._inputList = Array.from(this._form.querySelectorAll(this._inputSelector));
    this._buttonElement = this._form.querySelector(this._submitButtonSelector);
    
    this._toggleButtonState();
    
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  };

  _toggleButtonState () {
    if(this._hasInvalidInput()){
      this._disableSubmitButton();
    } else {
      this._enableSubmitButton();
    }; 
  };

  _enableSubmitButton ()  {
    this._buttonElement.classList.remove(this._inactiveButtonClass);
    this._buttonElement.removeAttribute("disabled");
  };
  
  _disableSubmitButton () {
    this._buttonElement.classList.add(this._inactiveButtonClass);
    this._buttonElement.setAttribute("disabled", true);
  };

  _hasInvalidInput () {
    return this._inputList.some(inputElement =>{
      return !inputElement.validity.valid;
    })
  };

  _checkInputValidity(inputElement)  {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  };    

  _showInputError (inputElement) {
    this._errorElement = this._form.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    this._errorElement.textContent = inputElement.validationMessage;
    this._errorElement.classList.add(this._errorClass);
  };
  
  _hideInputError (inputElement){
    this._errorElement = this._form.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    this._errorElement.classList.remove(this._errorClass);
    this._errorElement.textContent = '';
  };

  enableValidation() {
    this._setEventListeners();  
  };
};


/*
const showInputError = (formElement, inputElement, errorMessage, {inputErrorClass, errorClass}) => {
  this._errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(inputErrorClass);
  this._errorElement.textContent = errorMessage;
  this._errorElement.classList.add(errorClass);
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
  
  toggleButtonState(inputList, buttonElement, rest);
  
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement, rest);
      toggleButtonState(inputList, buttonElement, rest);
    });
  });

  formElement.addEventListener('submit', () => {
    toggleButtonState(inputList, buttonElement, rest);
  });
};

const enableSubmitButton = (buttonElement, {inactiveButtonClass}) => {
  buttonElement.classList.remove(inactiveButtonClass);
  buttonElement.removeAttribute("disabled");
};

const disableSubmitButton = (buttonElement, {inactiveButtonClass}) => {
  buttonElement.classList.add(inactiveButtonClass);
  buttonElement.setAttribute("disabled", true);
};

const toggleButtonState = (inputList, buttonElement, {inactiveButtonClass}) => {
  if(hasInvalidInput(inputList)){
    disableSubmitButton(buttonElement, {inactiveButtonClass});
  } else {
    enableSubmitButton(buttonElement, {inactiveButtonClass});
  }; 
};

const hasInvalidInput = (inputList) => {
  return inputList.some(inputElement =>{
    return !inputElement.validity.valid;
  })
};

function enableValidation({formSelector, ...rest}) {
  const formList = Array.from(document.querySelectorAll(form));
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
*/