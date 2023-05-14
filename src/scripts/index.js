import Card from '../components/Card.js';
import '../pages/index.css';
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



popupFormElementsValidation.enableValidation();
popupFormProfileValidation.enableValidation();


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
  const section = new Section({
    items: {title, link},
    renderer: (item)=> {
      const card = new Card ({
        title: item.title,
        link: item.link
      }, '.element-template', {
        handleCardClick: (title, link)=> {
          popupWithImage.open( title, link );
        }
      })
      const element = card.createCard(popupWithImage);
      cardList.setItem(element, true);
    }
  }, elementsSelector)
   section.renderItem();
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


const cardList = new Section({
  items: initialCards,
  renderer: (item)=> {
    const card = new Card ({
      title: item.title,
      link: item.link
    }, '.element-template', {
      handleCardClick: ( title, link)=> {
        popupWithImage.open( title, link );
      }
    })
    const element = card.createCard(popupWithImage);
    cardList.setItem(element, false);
  }
}, elementsSelector)
 cardList.renderItems();


