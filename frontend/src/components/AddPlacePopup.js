import React from 'react';
import PopupWithForm from '../components/PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import {CurrentCardsContext}  from '../contexts/CurrentCardsContext'

function AddPlacePopup(props) {

    // Подписка на контекст
    const currentUser = React.useContext(CurrentUserContext);
   // Подписываемся на контекст CurrentCardsContext
    const cardsData = React.useContext(CurrentCardsContext);
   // Стейт, в котором содержится значение инпута
    const [namePlace, setNamePlace] = React.useState('');
    const [linkPlace, setLinkPlace] = React.useState('');
  
    // Обработчик изменения инпута обновляет стейт
    function handleChangeNamePlace(e) {
      setNamePlace(e.target.value);
    }
      
    function handleChangeLinkPlace(e) {
      setLinkPlace(e.target.value);
    }
  
    function handleSubmit(e) {
      // Запрещаем браузеру переходить по адресу формы
      e.preventDefault();
      // Передаём значения управляемых компонентов во внешний обработчик
      props.onAddPlace({
        name: namePlace,
        link: linkPlace
      }, cardsData);
    } 
  
    return(
    <PopupWithForm name='element' title='Новое место' isOpen={props.isOpen}  onClosePopup={props.onClose} onSubmit={handleSubmit} buttonText='Добавить'>
        <input type="text" className="popup__input" name="title" id="element-title" placeholder="Название" minLength={2} maxLength={30} required 
        value={namePlace} onChange={handleChangeNamePlace} />
        <p className="popup__error" id="element-title-error" />
        <input type="url" className="popup__input" name="link" id="element-link" placeholder="Ссылка на картинку" required 
         value={linkPlace} onChange={handleChangeLinkPlace}/>
        <p className="popup__error" id="element-link-error" />
    </PopupWithForm>
    );
  }
  
  export default AddPlacePopup; 