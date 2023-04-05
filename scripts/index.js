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
const formInputProfile = document.querySelector('.popup__form_block_profile');
const formInputElements = document.querySelector('.popup__form_block_elements');
const elements = document.querySelector('.elements');
const buttonAddElement = document.querySelector('.profile__add-button');
const popupInputLink = document.querySelector('.popup__input_value_link');
const popupInputTitle = document.querySelector('.popup__input_value_title');
const popupImage = document.querySelector('.popup_block_image');
const elementTemplate = document.querySelector('#element-template').content;
const imagePopupImage = document.querySelector('.popup__image');
const descriptionPopupImage = document.querySelector('.popup__image-description');
const popupList = Array.from(document.querySelectorAll('.popup'));


function openPopup(popup) {
  popup.classList.add('popup_opened');
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

function handleOpenProfilePopup() {
  nameInput.value = profileName.textContent;
  descriptionInput.value = profileDescription.textContent;
}

function handleFormSubmit(evt) {
  evt.preventDefault(); 
  profileName.textContent = nameInput.value;
  profileDescription.textContent = descriptionInput.value;
  closePopup(popupProfile);
}

initialCards.forEach(item =>{
  elements.append(createCard(item));
})

function addCard(evt) {
  evt.preventDefault();

  elements.prepend(createCard({
    link: popupInputLink.value,
    name: popupInputTitle.value
  }));
  closePopup(popupElements);
  popupInputLink.value = '';
  popupInputTitle.value = '';
}

function createCard(item) {
  const element = elementTemplate.querySelector('.element').cloneNode(true);
  const trashButton = element.querySelector('.element__trash');
  const likeButton = element.querySelector('.element__like');
  const elementImage = element.querySelector('.element__image');
  const elementTitle = element.querySelector('.element__title');

  elementImage.src = item.link;
  elementTitle.textContent = item.name;
  elementImage.alt = item.name;
  
  likeButton.addEventListener('click', ()=>{
  likeButton.classList.toggle('element__like_active');
  });

  trashButton.addEventListener('click', ()=>{
    element.remove();
  });

  elementImage.addEventListener('click', ()=>{
    openPopup(popupImage);
    imagePopupImage.src = item.link;
    imagePopupImage.alt = item.name;
    descriptionPopupImage.textContent = item.name;
  });

  return element;
}

buttonAddElement.addEventListener('click', () => {
  openPopup(popupElements);
})

buttonEditProfile.addEventListener('click',  () => {
  handleOpenProfilePopup();
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

formInputProfile.addEventListener('submit', handleFormSubmit);
formInputElements.addEventListener('submit', addCard);


popupList.forEach(popup => {
  const popupOverlay = popup.querySelector('.popup__overlay');
  popupOverlay.addEventListener('click', () => {
    closePopup(popup);
  });
  window.addEventListener('keydown', function (evt) {
    if (evt.key === 'Escape') {
      closePopup(popup);
    }
  });
});

