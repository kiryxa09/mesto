import Card from '../components/Card.js';
import './index.css';
import { 
  validationConfig,
  buttonEditProfile,
  popupElementsSelector,
  popupProfileSelector,
  nameInput,
  aboutInput,
  profileNameSelector,
  profileAboutSelector,
  elementsSelector,
  buttonAddElement,
  popupImage,
  popupFormElements,
  popupFormProfile,
  profileAvatarSelector,
  popupDeleteSelector,
  popupAvatarSelector,
  avatar,
  popupFormAvatar,
  buttonConfirmProfile,
  buttonConfirmelements,
  buttonConfirmAvatar
 
}  from '../utils/constants.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';
import PopupWithConfirm from '../components/PopupWithConfirm.js';



const popupDelete = new PopupWithConfirm(popupDeleteSelector);
popupDelete.setEventListeners();


const popupFormElementsValidation = new FormValidator(popupFormElements, validationConfig);
const popupFormProfileValidation = new FormValidator(popupFormProfile, validationConfig);
const popupFormAvatarValidation = new FormValidator(popupFormAvatar, validationConfig)


const createCard = ({name, link, likes, owner, _id})=> {
  const card = new Card ({
    name, 
    link, 
    likes, 
    owner, 
    _id
  }, 
  '.element-template',
  "8f24bc8a8cec8366252c30fd", 
  {
    handleCardClick: (name, link)=> {
      popupWithImage.open( name, link );
    },
    handleTrashClick: (_id)=>{
      popupDelete.open();
      popupDelete.setActionSubmit(()=>{
        card.deleteCard()
        popupDelete.close()
        api.deleteCard(card._id)
      })
    },
    handleLikeClick: (_id)=>{
      console.log(card._id);
      api.likeCard(card._id).then(res =>{
        card.updateLikeCounter(res);
      })
      .catch(err => {
        console.log(`Ошибка: ${err}`);
      })
    },
    handleDislikeClick: ()=>{
      api.dislikeCard(card._id).then(res =>{
        card.updateLikeCounter(res);
      })
      .catch(err => {
        console.log(`Ошибка: ${err}`);
      })
    } 
  })
  
  return card.generateCard();
}


popupFormElementsValidation.enableValidation();
popupFormProfileValidation.enableValidation();
popupFormAvatarValidation.enableValidation();

const section = new Section({
  renderer: (item)=> {
    const element = createCard(item);
    section.addItem(element, false);
  }
}, elementsSelector)




const userInfo = new UserInfo({
  profileNameSelector: profileNameSelector,
  profileAboutSelector: profileAboutSelector,
  profileAvatarSelector: profileAvatarSelector
})

const editer = ({name, about}) =>{
  userInfo.setUserInfo({
    name: name,
    about: about
  })
  api.patchProfileInfo(name, about)
  .finally(()=> {
    buttonConfirmProfile.textContent = 'Сохранить';
  })
}

const adder = ({name, link}) =>{
  api.addNewCard(name, link).then(res => {
    const element = createCard(res);
    section.addItem(element, true);
  })
  .catch(err => {
    console.log(`Ошибка: ${err}`);
  })
  .finally(()=> {
    buttonConfirmelements.textContent = 'Создать';
  })
}

const avatarEditer = ({avatar})=>{
  userInfo.setUserAvatar({
    avatar: avatar
  })
  api.patchAvatar(avatar)
  .finally(()=> {
    buttonConfirmAvatar.textContent = 'Сохранить';
  })
  
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
  const {name, about} = userInfo.getUserInfo();
  nameInput.value = name;
  aboutInput.value = about;
  popupFormProfileValidation.hideErrorOpened();
  popupEditProfile.open();
});


const popupWithImage = new PopupWithImage(popupImage);
popupWithImage.setEventListeners();

const popupAvatar = new PopupWithForm(popupAvatarSelector, avatarEditer);
popupAvatar.setEventListeners();

avatar.addEventListener('click', ()=> {
  popupFormAvatarValidation.hideErrorOpened();
  popupAvatar.open();
})

const api = new Api('https://nomoreparties.co/v1/cohort-66', {
  authorization: '7b28846b-6feb-426f-b36e-edc1b9d97b68',
  'Content-Type': 'application/json'
});

api.getProfileInfo().then(res =>{
  userInfo.setUserInfo(res);
  userInfo.setUserAvatar(res);
  console.log(res);
})
.catch(err => {
  console.log(`Ошибка: ${err}`);
})

api.getInitialCards().then(res =>{
  section.renderItems(res);
  console.log(res); 
})
.catch(err => {
  console.log(`Ошибка: ${err}`);
})
