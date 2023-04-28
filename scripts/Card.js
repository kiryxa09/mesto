export{ NewCard };
import{ openPopup, imagePopupImage, popupImage, descriptionPopupImage, elements, popupInputLink, popupInputTitle } from './index.js';
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

class Card {
  constructor(templateSelector) {
    this._templateSelector = templateSelector;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.element')
      .cloneNode(true);

    return cardElement;
  }

  _setEventListeners() {
    this._element.querySelector('.element__like').addEventListener('click', ()=>{
      this._element.querySelector('.element__like').classList.toggle('element__like_active');
    })
      
    this._element.querySelector('.element__trash').addEventListener('click', ()=>{
      this._element.remove();
    })

    this._element.querySelector('.element__image').addEventListener('click', ()=>{
      openPopup(popupImage);
      imagePopupImage.src = this._image;
      imagePopupImage.alt = this._title;
      descriptionPopupImage.textContent = this._title;
    })
  }
  
  
};

class InitialCard extends Card {
  constructor(data, templateSelector) {
    super(templateSelector);
    this._title = data.name;
    this._image = data.link;
  }
  createCard() {
    this._element = super._getTemplate();

    super._setEventListeners();

    this._element.querySelector('.element__image').src = this._image;
    this._element.querySelector('.element__image').alt = this._title;
    this._element.querySelector('.element__title').textContent = this._title;
    
    return this._element;
  };
};

class NewCard extends Card {
  constructor(templateSelector){
    super(templateSelector);
  }
  addCard() {
    this._image = popupInputLink.value;
    this._title = popupInputTitle.value;
    
    this._element = super._getTemplate();

    super._setEventListeners();

    this._element.querySelector('.element__image').src = this._image;
    this._element.querySelector('.element__image').alt = this._title;
    this._element.querySelector('.element__title').textContent = this._title;
    
    return this._element;
  }
};

const renderCards = () => {
  initialCards.forEach(item =>{
    const card = new InitialCard(item, '.element-template');
    const cardElement = card.createCard();
    elements.append(cardElement);
  });
};

renderCards();


