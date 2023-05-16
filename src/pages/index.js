import Card from '../components/Card.js';
import './index.css';
import { 
  initialCards,
  validationConfig,
  buttonEditProfile,
  popupElementsSelector,
  popupProfileSelector,
  nameInput,
  descriptionInput,
  profileNameSelector,
  profileDescriptionSelector,
  elementsSelector,
  buttonAddElement,
  popupImage,
  popupFormElements,
  popupFormProfile
 
}  from '../utils/constants.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';







const popupFormElementsValidation = new FormValidator(popupFormElements, validationConfig);
const popupFormProfileValidation = new FormValidator(popupFormProfile, validationConfig);

const createCard = (item)=> {
  const card = new Card ({
    title: item.title,
    link: item.link
  }, '.element-template', {
    handleCardClick: (title, link)=> {
      popupWithImage.open( title, link );
    }
  })
  return card.generateCard();
}


popupFormElementsValidation.enableValidation();
popupFormProfileValidation.enableValidation();

const section = new Section({
  renderer: (item)=> {
    const element = createCard(item);
    section.addItem(element, false);
  }
}, elementsSelector)

section.renderItems(initialCards);


const userInfo = new UserInfo({
  profileNameSelector: profileNameSelector,
  profileDescriptionSelector: profileDescriptionSelector
})

const editer = ({name, description}) =>{
  userInfo.setUserInfo({
    name: name,
    description: description
  })
}

const adder = ({title, link}) =>{
  const element = createCard({title, link});
  section.addItem(element, true);
}
  




const popupAddPics = new PopupWithForm(popupElementsSelector, adder)
popupAddPics.setEventListeners();

buttonAddElement.addEventListener('click', () => {
  popupFormElementsValidation.hideErrorOpened();
  popupAddPics.open();
})

const popupEditProfile = new PopupWithForm(popupProfileSelector, editer);
popupEditProfile.setEventListeners(); 


buttonEditProfile.addEventListener('click',  () => {
  const {name, description} = userInfo.getUserInfo();
  nameInput.value = name;
  descriptionInput.value = description;
  popupFormProfileValidation.hideErrorOpened();
  popupEditProfile.open();
});


const popupWithImage = new PopupWithImage(popupImage);
popupWithImage.setEventListeners();

