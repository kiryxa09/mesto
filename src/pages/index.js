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
  popupFormAvatar
 
}  from '../utils/constants.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';
import PopupWithConfirm from '../components/PopupWithConfirm.js';

const api = new Api('https://nomoreparties.co/v1/cohort-66', {
  authorization: '7b28846b-6feb-426f-b36e-edc1b9d97b68',
  'Content-Type': 'application/json'
});

let userId = null;

Promise.all([                
  api.getProfileInfo(), 
  api.getInitialCards() 
]) 
.then(([info, initialCards])=>{    
  userId = info._id;    
  section.renderItems(initialCards);
  console.log(initialCards, info);
  userInfo.setUserInfo(info);
  userInfo.setUserAvatar(info);    
}) 
.catch((err)=>{              
console.log(err);
 })

const popupFormElementsValidation = new FormValidator(popupFormElements, validationConfig);
const popupFormProfileValidation = new FormValidator(popupFormProfile, validationConfig);
const popupFormAvatarValidation = new FormValidator(popupFormAvatar, validationConfig);

popupFormElementsValidation.enableValidation();
popupFormProfileValidation.enableValidation();
popupFormAvatarValidation.enableValidation();


const createCard = ({name, link, likes, owner, _id})=> {
  const card = new Card ({
    name, 
    link, 
    likes, 
    owner, 
    _id
  }, 
  '.element-template',
  userId, 
  {
    handleCardClick: (name, link)=> {
      popupWithImage.open( name, link );
    },
    handleTrashClick: (_id)=>{
      popupDelete.open();
      popupDelete.setActionSubmit(()=>{
        api.deleteCard(card._id)
        .then(()=> {
          card.deleteCard()
          popupDelete.close()
        })
        .catch(err => {
          console.log(`Ошибка: ${err}`);
        })
      })
    },
    handleLikeClick: (_id)=>{
      console.log(card._id);
      api.likeCard(card._id)
      .then(res =>{
        card.updateLikeCounter(res)
        card.toggleLike()
      })
      .catch(err => {
        console.log(`Ошибка: ${err}`);
      })
    },
    handleDislikeClick: ()=>{
      console.log(card._id);
      api.dislikeCard(card._id)
      .then(res =>{
        card.updateLikeCounter(res)
        card.toggleLike()
      })
      .catch(err => {
        console.log(`Ошибка: ${err}`);
      })
    } 
  })
  
  return card.generateCard();
}

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
  
  api.patchProfileInfo(name, about)
  .then(()=> {
    userInfo.setUserInfo({
      name: name,
      about: about
    })
    popupEditProfile.close();
  })
  .catch(err => {
    console.log(`Ошибка: ${err}`);
  })
  .finally(()=> {
    popupEditProfile.getButtonConfirm().textContent = 'Сохранить';
  })
}

const adder = ({name, link}) =>{
  api.addNewCard(name, link).then(res => {
    const element = createCard(res);
    section.addItem(element, true);
  })
  .then(()=> {
    popupAddPics.close();
  })
  .catch(err => {
    console.log(`Ошибка: ${err}`);
  })
  .finally(()=> {
    popupAddPics.getButtonConfirm().textContent = 'Создать';
  })
}

const avatarEditer = ({avatar})=>{
  api.patchAvatar(avatar)
  .then(()=> {
    userInfo.setUserAvatar({
      avatar: avatar
    })
    popupAvatar.close();
  })
  .catch(err => {
    console.log(`Ошибка: ${err}`);
  })
  .finally(()=> {
    popupAvatar.getButtonConfirm().textContent = 'Сохранить';
  })
}

const popupDelete = new PopupWithConfirm(popupDeleteSelector);
popupDelete.setEventListeners();

const popupAddPics = new PopupWithForm(popupElementsSelector, adder)
popupAddPics.setEventListeners();

const popupEditProfile = new PopupWithForm(popupProfileSelector, editer);
popupEditProfile.setEventListeners();

const popupWithImage = new PopupWithImage(popupImage);
popupWithImage.setEventListeners();

const popupAvatar = new PopupWithForm(popupAvatarSelector, avatarEditer);
popupAvatar.setEventListeners();

buttonAddElement.addEventListener('click', () => {
  popupFormElementsValidation.hideErrorOpened();
  popupAddPics.open();
})


buttonEditProfile.addEventListener('click',  () => {
  const {name, about} = userInfo.getUserInfo();
  nameInput.value = name;
  aboutInput.value = about;
  popupFormProfileValidation.hideErrorOpened();
  popupEditProfile.open();
});

avatar.addEventListener('click', ()=> {
  popupFormAvatarValidation.hideErrorOpened();
  popupAvatar.open();
})


