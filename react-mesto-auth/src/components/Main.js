import React from 'react'; 
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import {CurrentCardsContext}  from '../contexts/CurrentCardsContext'

function Main(props) {

   // Подписываемся на контекст CurrentUserContext
   const userData = React.useContext(CurrentUserContext);
   // Подписываемся на контекст CurrentCardsContext
   const cardsData = React.useContext(CurrentCardsContext);

    return(
        <main className="content">
        <section className="profile">
          <div onClick={props.onEditAvatar} className="profile__avatar-container">
            <img src={userData.avatar} alt={userData.name} className="profile__avatar"/>
          </div>
          <div className="profile__info">
            <h1 className="profile__name">{userData.name}</h1>
            <p className="profile__description">{userData.about}</p>
            <button onClick={props.onEditProfile} type="button" className="profile__edit-button" />
          </div>
          <button onClick={props.onAddPlace} type="button" className="profile__add-button"/>
        </section>
          <ul className="elements__list">
          {props.cards.map((card) => (
          <Card 
            setCards={props.setCards}
            key={card._id}
            card={card}
            onCardClick={props.onCardClick}
            onCardLike={props.onCardLike}
            onCardDelete={props.onCardDelete}
          />
        ))};
          </ul>
      </main>
    )
}
export default Main;