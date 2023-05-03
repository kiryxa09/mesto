export{ Card };
import{ openPopup, imagePopupImage, popupImage, descriptionPopupImage } from './index.js';

class Card {
  constructor(data, templateSelector) {
    this._templateSelector = templateSelector;
    this._title = data.name;
    this._image = data.link;
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
      this._element = null;
    })

    this._element.querySelector('.element__image').addEventListener('click', ()=>{
      openPopup(popupImage);
      imagePopupImage.src = this._image;
      imagePopupImage.alt = this._title;
      descriptionPopupImage.textContent = this._title;
    })
  }

  createCard() {
    this._element = this._getTemplate();

    this._setEventListeners();

    this._element.querySelector('.element__image').src = this._image;
    this._element.querySelector('.element__image').alt = this._title;
    this._element.querySelector('.element__title').textContent = this._title;
    
    return this._element;
  };
  
};
