export const initialCards = [
  {
    title: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    title: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    title: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    title: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    title: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    title: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

export const popupList = Array.from(document.querySelectorAll('.popup'));
export const buttoCloseList = Array.from(document.querySelectorAll('.popup__button-close'));
export const imagePopupImage = document.querySelector('.popup__image');
export const descriptionPopupImage = document.querySelector('.popup__image-description');
export const validationConfig = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
}
export const buttonEditProfile = document.querySelector('.profile__edit-button');
export const popupElementsSelector = '.popup_block_elements';
export const popupProfileSelector = '.popup_block_profile';
export const nameInput = document.querySelector('.popup__input_value_name');
export const descriptionInput = document.querySelector('.popup__input_value_description');
export const profileNameSelector = '.profile__name';
export const profileDescriptionSelector = '.profile__description';
export const elementsSelector = '.elements';
export const buttonAddElement = document.querySelector('.profile__add-button');
export const popupImage = '.popup_block_image';
export const popupFormElements = document.querySelector('.popup__form_block_elements');
export const popupFormProfile = document.querySelector('.popup__form_block_profile');