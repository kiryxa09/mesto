import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submiter){
    super (popupSelector);
    this._submiter = submiter;
    this._form = this._popup.querySelector('.popup__form');
    this._inputList = Array.from(this._form.querySelectorAll('.popup__input'));
    this._button = this._popup.querySelector('.popup__button-confirm');
  }

  _getInputValues() {
    const data = {}
    this._inputList.forEach(input => {
      data[input.name] = input.value;
    });
    return data;
  }

  getButtonConfirm() {
    return this._button;
  }

  setEventListeners(){
    super.setEventListeners();
    this._form.addEventListener('submit', (evt)=>{
      this._button.textContent = "Сохранение..."
      evt.preventDefault();
      this._submiter(this._getInputValues());
    })
  }

  close(){
    super.close()
    this._form.reset();
  }

}