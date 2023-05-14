import Popup from "./Popup.js";
import { 
  imagePopupImage,
  descriptionPopupImage
 } from "../utils/constants.js";

export default class PopupWithImage extends Popup {
  open(title, link){
    super.open()
    imagePopupImage.src = link;
    imagePopupImage.alt = title;
    descriptionPopupImage.textContent = title;
  }
}