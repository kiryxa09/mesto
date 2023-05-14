import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submiter){
    super (popupSelector);
    this._submiter = submiter;
    this._form = this._popup.querySelector('.popup__form');
    this._inputList = Array.from(this._form.querySelectorAll('.popup__input'));
  }

  _getInputValues() {
    const data = {}
    this._inputList.forEach(input => {
      data[input.name] = input.value;
    });
    return data;
  }

  setEventListeners(){
    super.setEventListeners();
    this._form.addEventListener('submit', (evt)=>{
      evt.preventDefault();
      this._submiter(this._getInputValues());
      this.close();
    })
  }

  close(){
    super.close()
    this._form.reset();
  }

}