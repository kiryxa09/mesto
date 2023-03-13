let editButton = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let closeButton = document.querySelector('.popup__button-close');
let nameInput = document.querySelector('.popup__input_value_name');
let descriptionInput = document.querySelector('.popup__input_value_description');
let profileName = document.querySelector('.profile__name');
let profileDescription = document.querySelector('.profile__description');
let formInput = document.querySelector('.popup__form');

function popupOpen() {
  nameInput.value = profileName.textContent;
  descriptionInput.value = profileDescription.textContent;
  popup.classList.add('popup__opened');
}

function popupClose() {
  popup.classList.remove('popup__opened');
}

function handleFormSubmit(evt) {
  evt.preventDefault(); 
  profileName.textContent = nameInput.value;
  profileDescription.textContent = descriptionInput.value;
  popupClose();
}

editButton.addEventListener('click', popupOpen);
closeButton.addEventListener('click', popupClose);
formInput.addEventListener('submit', handleFormSubmit);
