
export default class Card {
  constructor({title, link}, templateSelector, {handleCardClick}) {
    this._templateSelector = templateSelector;
    this._title = title;
    this._link = link;
    this._handleCardClick = handleCardClick 
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
    this._element.querySelector('.element__image').addEventListener('click', ()=>{
      this._handleCardClick(this._title, this._link);
    }) 
      
    this._element.querySelector('.element__trash').addEventListener('click', ()=>{
      this._element.remove();
      this._element = null;
    })

    
  }

  createCard() {
    this._element = this._getTemplate();

    this._setEventListeners();

    this._element.querySelector('.element__image').src = this._link;
    this._element.querySelector('.element__image').alt = this._title;
    this._element.querySelector('.element__title').textContent = this._title;

    return this._element;
  };
  
};
