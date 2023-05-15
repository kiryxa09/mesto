
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

  _handleLikeClick() {
    this._likeButton.classList.toggle('element__like_active');
  }

  _handleTrashClick() {
    this._element.remove();
    this._element = null;
  }
  

  _setEventListeners() {
    this._likeButton = this._element.querySelector('.element__like');
    this._likeButton.addEventListener('click', ()=> this._handleLikeClick());

    this._cardImage = this._element.querySelector('.element__image');
    this._cardImage.addEventListener('click', ()=> this._handleCardClick(this._title, this._link)) 
    
    this._trashButton = this._element.querySelector('.element__trash');
    this._trashButton.addEventListener('click', ()=> this._handleTrashClick())    
  }

  generateCard() {
    this._element = this._getTemplate();

    this._setEventListeners();

    this._cardImage.src = this._link;
    this._cardImage.alt = this._title;

    this._cardTitle = this._element.querySelector('.element__title');
    this._cardTitle.textContent = this._title;

    return this._element;
  };
  
};
