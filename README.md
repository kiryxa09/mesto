Проектная работа "Mesto"
https://kiryxa09.github.io/mesto/

Функционал проекта:
1. Верификация полей ввода.
2. Добавление карточек с картинками. Возможность лайкать, отслеживать количествой лайков, удалять свои картинки.
3. Редактирвание профиля. Смена аватарки, полей имя и о себе.

В данной проектной работе используется ряд технологий. 
1. БЭМ (Блок, Элемент, Модификатор) — компонентный подход к веб-разработке. В его основе лежит принцип разделения интерфейса на независимые блоки. Он позволяет легко и быстро разрабатывать интерфейсы любой сложности и повторно использовать существующий код, избегая «Copy-Paste».
2. Используется технология адаптивной верстки с помощью директивы @media. Ограничено использование значений в px.
3. Используются сетка при помощи grid layout.
4. Используются нестандартный шрифт Inter, подгружаемый локально.
5. Применяется метод querySelector для поиска элементов в DOM дереве. Свойства textContent и value используются для изменения содержимого элемента или поля ввода.
6. addEventListener применен как обработчик событий.
7. Реализована технология добавления новых картинок. Испльзованы методы массивов forEach, append, prepend.
8. Реализованы функции закрытия попапов по клику на оверлей и при нажатии на клавишу Esc.
9. Реализована валидация полей ввода через js с использованием параметра .validityState, а также встроенной браузерной проверки условий minlength, maxlength и required.
10. Код реализован в парадигме ООП. Каждый отдельный класс отвечает за выполнение отдельной задачи.
11. Реализована асинхронность при выполнении запросов к серверу для загрузки и добавления карточек, изменения профиля и тд. 

Планы по доработке проекта
1. Сделать многостраничный сайт. Добавить информацию о личных путешествиях.
