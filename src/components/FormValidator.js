export default class FormValidator {
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

   this._form.addEventListener('submit', ()=> {
      this._disableSubmitButton();
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

  _checkInputValidity (inputElement)  {
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

  hideErrorOpened() {
    const inputList = Array.from(this._form.querySelectorAll(this._inputSelector));
    inputList.forEach(input => {
      this._hideInputError(input);
    })
    this._toggleButtonState();
  }



  enableValidation () {
    this._setEventListeners();  
  };
};