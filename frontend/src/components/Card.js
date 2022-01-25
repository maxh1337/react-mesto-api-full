import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card(props) {
  // Определяем, являемся ли мы владельцем текущей карточки
  const currentUser = React.useContext(CurrentUserContext)
  const isOwn = props.card.owner._id === currentUser._id;

  // Создаём переменную, которую после зададим в `className` для кнопки удаления
  const cardDeleteButtonClassName = (
  ` ${isOwn ? 'element__trash-button' : 'element__trash-button_visible'}`
  ); 

  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const isLiked = props.card.likes.some(i => i._id === currentUser._id);

  // Создаём переменную, которую после зададим в `className` для кнопки лайка
  const cardLikeButtonClassName = (
    `element__like-button  ${isLiked ? 'element__like-button_active' : ' '}`
  );

  function handleClick() {
    props.onCardClick(props.card);
  } 

  function handleLikeClick()  {
    props.onCardLike(props.card, currentUser,  props.setCards);
  }

  function handleDeleteClick()  {
    props.onCardDelete(props.card,  props.setCards);
  }

  return(
    <li className="element">
        <img  src={props.card.link} alt={props.card.name} className="element__image" onClick={handleClick}/>
        <button type="reset" className={cardDeleteButtonClassName} onClick={handleDeleteClick}></button>
        <div className="element__container">
            <h2 className="element__title">{props.card.name}</h2>
            <div className="element__likes">
                <button type="button" className={cardLikeButtonClassName} onClick={handleLikeClick}></button>
                <p className="element__like-counter">{props.card.likes.length}</p>
            </div>
        </div>
    </li>
  );
}

export default Card; 