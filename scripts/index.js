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
let popupInputLink = document.querySelector('.popup__input_value_link');
let popupInputTitle = document.querySelector('.popup__input_value_title');
const popupImage = document.querySelector('.popup_block_image');
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
  popupImage.classList.remove('popup_opened');
}

function addElement(evt) {
  evt.preventDefault(); 
  const elementTemplate = document.querySelector('#element-template').content;
  const element = elementTemplate.querySelector('.element').cloneNode(true);
  const trashButton = element.querySelector('.element__trash');
  const likeButton = element.querySelector('.element__like');

  element.querySelector('.element__image').src = popupInputLink.value;
  element.querySelector('.element__title').textContent = popupInputTitle.value;
  
  likeButton.addEventListener('click', ()=>{
    likeButton.classList.toggle('element__like_active');
  });

  trashButton.addEventListener('click', ()=>{
    element.remove();
  });

  elements.prepend(element);
  popupClose();
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
  const trashButton = element.querySelector('.element__trash');
  const likeButton = element.querySelector('.element__like');
  const elementImage = element.querySelector('.element__image');
  const elementTitle = element.querySelector('.element__title');

  element.querySelector('.element__image').src = item.link;
  element.querySelector('.element__title').textContent = item.name;


  likeButton.addEventListener('click', ()=>{
    likeButton.classList.toggle('element__like_active');
  });

  trashButton.addEventListener('click', ()=>{
    element.remove();
  });

  elementImage.addEventListener('click', ()=>{
    popupImage.classList.add('popup_opened');
    popupImage.querySelector('.popup__image').src = elementImage.getAttribute('src');
    popupImage.querySelector('.popup__image-description').textContent = elementTitle.textContent;
  });

  elements.append(element);
})

addButton.addEventListener('click', popupOpenElements)
editButton.addEventListener('click', popupOpenProfile);
closeButton[0].addEventListener('click', popupClose);
closeButton[1].addEventListener('click', popupClose);
closeButton[2].addEventListener('click', popupClose);
formInput[0].addEventListener('submit', handleFormSubmit);
formInput[1].addEventListener('submit', addElement);