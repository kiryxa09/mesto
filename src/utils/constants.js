export const popupList = Array.from(document.querySelectorAll('.popup'));
export const buttoCloseList = Array.from(document.querySelectorAll('.popup__button-close'));
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
export const aboutInput = document.querySelector('.popup__input_value_about');
export const profileNameSelector = '.profile__name';
export const profileAboutSelector = '.profile__about';
export const elementsSelector = '.elements';
export const buttonAddElement = document.querySelector('.profile__add-button');
export const popupImage = '.popup_block_image';
export const popupFormElements = document.querySelector('.popup__form_block_elements');
export const popupFormProfile = document.querySelector('.popup__form_block_profile');
export const profileAvatarSelector = '.profile__avatar';
export const popupDeleteSelector = '.popup_block_delete';
export const popupAvatarSelector =  '.popup_block_avatar';
export const avatar = document.querySelector('.profile__avatar-container');
export const popupFormAvatar = document.querySelector('.popup__form_avatar');
export const buttonConfirmProfile = document.querySelector('.popup__button-confirm_profile')
export const buttonConfirmelements = document.querySelector('.popup__button-confirm_elements')
export const buttonConfirmAvatar = document.querySelector('.popup__button-confirm_avatar')