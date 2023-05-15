export default class Popup {
  constructor (popupSelector){
    this._popup = document.querySelector(popupSelector);
  }

  _handleEscClose = (evt) =>{
    if (evt.key === 'Escape') {
      this.close();
    }
  } 

  open() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown',this._handleEscClose)
  }

  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
  }

  setEventListeners() {
    const popupOverlay = this._popup.querySelector('.popup__overlay'); 
    popupOverlay.addEventListener('click', () => { 
      this.close(); 
    })
    const buttonClose = this._popup.querySelector('.popup__button-close');
    buttonClose.addEventListener('click', ()=>{
      this.close()
    })
  }

    

}
