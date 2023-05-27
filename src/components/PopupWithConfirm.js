import Popup from "./Popup.js";


export default class PopupWithConfirm extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._buttonConfirmDelete = this._popup.querySelector('.popup__button-confirm_delete');
  }

  setActionSubmit(func) {
    this._func = func;
  }

  setEventListeners() {
    super.setEventListeners()

    this._buttonConfirmDelete.addEventListener('click', ()=>{
      this._func();
      console.log(this._func);
    })
  }
  
}