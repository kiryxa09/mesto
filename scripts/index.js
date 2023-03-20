let editButton = document.querySelector('.profile__edit-button');
let popupElements = document.querySelector('.popup_block_elements');
let popupProfile = document.querySelector('.popup_block_profile');
let closeButtons = document.querySelectorAll('.popup__button-close');
const closeButton = Array.from(closeButtons , function(a) { return a })
let nameInput = document.querySelector('.popup__input_value_name');
let descriptionInput = document.querySelector('.popup__input_value_description');
let profileName = document.querySelector('.profile__name');
let profileDescription = document.querySelector('.profile__description');
let formInputs = document.querySelectorAll('.popup__form');
const formInput = Array.from(formInputs , function(a) { return a })
let elements = document.querySelector('.elements');
const addButton = document.querySelector('.profile__add-button');
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

function popupOpenProfile() {
  nameInput.value = profileName.textContent;
  descriptionInput.value = profileDescription.textContent;
  popupProfile.classList.add('popup_opened');
}

function popupOpenElements() {
  popupElements.classList.add('popup_opened');
}

function popupClose() {
  popupElements.classList.remove('popup_opened');
  popupProfile.classList.remove('popup_opened');
}

function handleFormSubmit(evt) {
  evt.preventDefault(); 
  profileName.textContent = nameInput.value;
  profileDescription.textContent = descriptionInput.value;
  popupClose();
}

initialCards.forEach(item =>{
  const elementTemplate = document.querySelector('#element-template').content;
  const element = elementTemplate.querySelector('.element').cloneNode(true);

  element.querySelector('.element__image').src = item.link;
  element.querySelector('.element__title').textContent = item.name;
  elements.append(element);
})

addButton.addEventListener('click', popupOpenElements)
editButton.addEventListener('click', popupOpenProfile);
console.log(closeButton[0], closeButton[1], closeButton);

closeButton[0].addEventListener('click', popupClose);
closeButton[1].addEventListener('click', popupClose);
formInput[0].addEventListener('submit', handleFormSubmit);
