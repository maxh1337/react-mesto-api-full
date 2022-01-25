import React from 'react';
import '../index.css'
import Footer from './Footer';
import Header from './Header';
import Main from './Main';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import  {apiData}  from '../utils/Api';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup'
import AddPlacePopup from './AddPlacePopup'
import { Route, Switch, BrowserRouter, useHistory} from 'react-router-dom'
import Login from './Login';
import Register from './Register';
import * as auth from '../utils/auth';
import ProtectedRoute from './ProtectedRoute';
import InfoTooltip from './InfoTooltip'

function App() {
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [loggedIn, setLoggedIn] = React.useState(false)
  const history = useHistory();
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [email, setEmail] = React.useState('')
  
  function handleCardClick(card){
    setSelectedCard(card);
  }

  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true);
  };
  
  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
  };
  
  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true);
  };

  function closeAllPopups() {
    setEditAvatarPopupOpen(false);
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setSelectedCard(null)
    setIsInfoTooltipOpen(false);
  };

  function handleUpdateUser(user) {
    apiData.setUserData(user)
    .then((res) => {
      setCurrentUser(res);
      closeAllPopups();
    })
    .catch((err) => {
      console.log(err);
      return [];
    })
  };

  function handleUpdateAvatar(avatar) {
    apiData.patchAvatar(avatar)
    .then((res) => {
      setCurrentUser(res);
      closeAllPopups();
    })
    .catch((err) => {
      console.log(err);
      return [];
    })
  };
  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    // Отправляем запрос в API и получаем обновлённые данные карточки
    apiData.changeLikeCardStatus(card._id, isLiked, setCards)
    .then((newCard) => {
      setCards((cardsData) => cardsData.map((c) => c._id === card._id ? newCard : c));
    })
    .catch((err) => {
      console.log(err);
      return [];
    });
    
  } 
  function handleCardDelete(deletedCard) {
    // Отправляем запрос в API
    apiData.deleteCard(deletedCard._id)
    .then(() => {
      setCards((cardsData) => cardsData.filter((c) => {return c._id !== deletedCard._id }));
    })
    .catch((err) => {
      console.log(err);
      return [];
    });
  } 
  function handleAddPlaceSubmit(newCard) {
    apiData.postCard(newCard)
    .then((res) => {
      // Создадаем экземпляр карточки
      setCards([res, ...cards]); 
      closeAllPopups();
    })
    .catch((err) => {
      console.log(err);
      return [];
    });
  } 
  React.useEffect(() => {
    // запрос в API за пользовательскими данными
    Promise.all([ 
    apiData.getUserData(),
    apiData.getInitialCards()
    ])
    .then((res) => {
      setCurrentUser(res[0]);
      setCards(res[1])
    })
    .catch((err) => {
      console.log(err);
      return [];
    })
  }, []);

  function handleRegistration(email, password) {
    auth.register(email, password)
    .then(() => {
      setIsSuccess(true);
      history.push('/sign-in');
    })
    .catch((err) => {
      console.log(err);
      setIsSuccess(false);
    })
    .finally(() => {
      setIsInfoTooltipOpen(true);
    });
  };

  function handleAuthorization(email, password) {
    auth.authorize(email, password)
    .then((res) => {
      setLoggedIn(true);
      history.push('/');
      localStorage.setItem('token', res.token);
    })
    .catch((err) => {
      console.log(err);
    });
  };

  React.useEffect(() => {
    function handleTokenCheck() {
      const token = localStorage.getItem('token');
      if (token) {
        auth.checkToken(token)
        .then((res) => {
          if (res) {
            setEmail(res.data.email);
            setLoggedIn(true);
            history.push('/');
          };
        })
        .catch((err) => {
          console.log(err);
        });
      } else {
        history.push('/sign-in')
      }
    };
    handleTokenCheck();
  }, [history]);

  function handleSignOut() {
    localStorage.removeItem('token');
    history.push('/sign-in');
    setLoggedIn(false);
  };

  return (
  <CurrentUserContext.Provider value={currentUser}>
      <Header loggedIn={loggedIn} email={email} onSignOut={handleSignOut}/>
        <Switch> 
          <Route path="/sign-in">
            <Login onAuthorization={handleAuthorization}/>
          </Route>
          <Route path="/sign-up">
            <Register onRegistration={handleRegistration}/>
          </Route>
          <ProtectedRoute 
          path="/" loggedIn={loggedIn} component={Main} onEditProfile={handleEditProfileClick} onCardClick={handleCardClick}  
          onAddPlace={handleAddPlaceClick} cards={cards}  onCardDelete={handleCardDelete}
          onEditAvatar={handleEditAvatarClick} onCardLike={handleCardLike}
          />
        </Switch>
        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar}/> 
        <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit}/>
        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser}/>
        <PopupWithForm name='delete-confirmation' title='Вы уверены?' buttonName='Да' onClosePopup={closeAllPopups}/>
        <ImagePopup card={selectedCard} onClosePopup={closeAllPopups}/>
        <InfoTooltip isOpen={isInfoTooltipOpen} onClose={closeAllPopups} onState={isSuccess} />
    <Footer />
  </CurrentUserContext.Provider>
  )};
export default App;
