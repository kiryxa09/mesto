import { Card } from './Card.js';
import { initialCards } from './InitialCards.js';
import { FormValidator } from './FormValidator.js';
export{ openPopup, imagePopupImage, popupImage, descriptionPopupImage, elements, popupInputLink, popupInputTitle};


const buttonEditProfile = document.querySelector('.profile__edit-button');
const popupElements = document.querySelector('.popup_block_elements');
const popupProfile = document.querySelector('.popup_block_profile');
const buttonClosePopupProfile = document.querySelector('.popup__button-close_block_profile');
const buttonClosePopupElements = document.querySelector('.popup__button-close_block_elements');
const buttonClosePopupImage = document.querySelector('.popup__button-close_block_image');
const nameInput = document.querySelector('.popup__input_value_name');
const descriptionInput = document.querySelector('.popup__input_value_description');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const elements = document.querySelector('.elements');
const buttonAddElement = document.querySelector('.profile__add-button');
const popupInputLink = document.querySelector('.popup__input_value_link');
const popupInputTitle = document.querySelector('.popup__input_value_title');
const popupImage = document.querySelector('.popup_block_image');
const imagePopupImage = document.querySelector('.popup__image');
const descriptionPopupImage = document.querySelector('.popup__image-description');
const popupList = Array.from(document.querySelectorAll('.popup'));
const popupFormElements = document.querySelector('.popup__form_block_elements');
const popupFormProfile = document.querySelector('.popup__form_block_profile');

const validationConfig = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
}

const popupFormElementsValidation = new FormValidator(popupFormElements, validationConfig);
const popupFormProfileValidation = new FormValidator(popupFormProfile, validationConfig);

nameInput.value = profileName.textContent;
descriptionInput.value = profileDescription.textContent;

popupFormElementsValidation.enableValidation();
popupFormProfileValidation.enableValidation();


function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupByEsc);
};

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupByEsc);
};


function handleProfileFormSubmit(evt) {
  evt.preventDefault(); 
  profileName.textContent = nameInput.value;
  profileDescription.textContent = descriptionInput.value;
  closePopup(popupProfile);
}




function closePopupByEsc(evt) {
  if (evt.key === 'Escape') {
    const popupOpened = document.querySelector('.popup_opened');
    closePopup(popupOpened);
  }
};

buttonAddElement.addEventListener('click', () => {
  openPopup(popupElements);
})

buttonEditProfile.addEventListener('click',  () => {
  openPopup(popupProfile);
});

buttonClosePopupProfile.addEventListener('click', () => 
  closePopup(popupProfile));

buttonClosePopupElements.addEventListener('click', () => {
  closePopup(popupElements);
});

buttonClosePopupImage.addEventListener('click', () => {
  closePopup(popupImage);
});

function createPrototype(data) {
  const card = new Card (data, '.element-template');
  return card.createCard();
}

popupFormProfile.addEventListener('submit', handleProfileFormSubmit);
popupFormElements.addEventListener('submit', (evt)=>{
  evt.preventDefault();
  const data = {
    name: popupInputTitle.value,
    link: popupInputLink.value
  }
  const cardElement = createPrototype(data);
  elements.prepend(cardElement);
  closePopup(popupElements);
  popupFormElements.reset();
});



popupList.forEach(popup => { 
  const popupOverlay = popup.querySelector('.popup__overlay'); 
  popupOverlay.addEventListener('click', () => { 
    closePopup(popup); 
  });
});

const renderCards = () => {
  initialCards.forEach(item =>{
    const cardElement = createPrototype(item);
    elements.append(cardElement);
  });
};

renderCards();
