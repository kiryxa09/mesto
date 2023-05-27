
export default class Card {
  constructor({name, link, likes, owner, _id}, templateSelector, userId, {handleCardClick, handleTrashClick, handleLikeClick, handleDislikeClick }) {
    this._templateSelector = templateSelector;
    this._name = name;
    this._link = link;
    this._handleCardClick = handleCardClick;
    this._likes = likes; 
    this._handleTrashClick = handleTrashClick;
    this._owner = owner;
    this._id = _id;
    this._handleLikeClick = handleLikeClick;
    this._handleDislikeClick = handleDislikeClick;
    this._userId = userId;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.element')
      .cloneNode(true);

    return cardElement;
  }

  _toggleLike() {
    this._likeButton.classList.toggle('element__like_active');
  }

  deleteCard() {
    this._element.remove();
    this._element = null;
  }

  updateLikeCounter(res) {
    this._likeCounter.textContent = res.likes.length;
  }

  _setEventListeners() {
    this._likeButton = this._element.querySelector('.element__like');
    this._likeButton.addEventListener('click', ()=>{
      this._toggleLike();
      if(this._likeButton.classList.contains('element__like_active')) {
        this._handleLikeClick();
        
      } else {
        this._handleDislikeClick();
      }
    })
    
    

    this._cardImage = this._element.querySelector('.element__image');
    this._cardImage.addEventListener('click', ()=> this._handleCardClick(this._name, this._link)) 
    
    this._trashButton = this._element.querySelector('.element__trash');
    this._trashButton.addEventListener('click', ()=> this._handleTrashClick())

  }

  generateCard() {
    this._element = this._getTemplate();

    this._setEventListeners();

    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;

    
      if (this._owner._id === this._userId) {
        this._trashButton.classList.add("element__trash_active");
      }

      if (this._likes.find(item => item._id == this._userId)) {
        this._toggleLike();
      }

    this._cardName = this._element.querySelector('.element__title');
    this._cardName.textContent = this._name;

    this._likeCounter = this._element.querySelector('.element__like-counter');
    this._likeCounter.textContent = this._likes.length;

    return this._element;
  };
  
};
