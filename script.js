console.log('Hello, World!');
let editButton = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let popupContainer = document.querySelector('.popup__container');
let closeButton = document.querySelector('.popup__button-close');


function popupOpen() {
  popup.classList.add('popup__background');
  popupContainer.classList.add('popup__opened');
}

function popupClose() {
  popup.classList.remove('popup__background');
  popupContainer.classList.remove('popup__opened');
}

editButton.addEventListener('click', popupOpen);
closeButton.addEventListener('click', popupClose);

let nameInput = popupContainer.querySelector('.popup__input-name');
let descriptionInput = popupContainer.querySelector('.popup__input-description');
let profileName = document.querySelector('.profile__name');
let profileDescription = document.querySelector('.profile__description');
nameInput.value = profileName.textContent;
descriptionInput.value = profileDescription.textContent;

// Обработчик «отправки» формы, хотя пока
let buttonSave = popupContainer.querySelector('.popup__button-save');
// она никуда отправляться не будет
function handleFormSubmit (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                                                // Так мы можем определить свою логику отправки.
                                                // О том, как это делать, расскажем позже.
    // Получите значение полей jobInput и nameInput из свойства value
    profileName.textContent = nameInput.value;
    // Выберите элементы, куда должны быть вставлены значения полей
    profileDescription.textContent = descriptionInput.value;
    // Вставьте новые значения с помощью textContent
    popupClose();
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
buttonSave.addEventListener('click', handleFormSubmit);
