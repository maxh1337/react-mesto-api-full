import React from 'react';
import PopupWithForm from '../components/PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup(props) {

  // Стейт, в котором содержится значение инпута
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');
  // Подписка на контекст
  const currentUser = React.useContext(CurrentUserContext);

  // После загрузки текущего пользователя из API
  // его данные будут использованы в управляемых компонентах.
  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, props.isOpen]); 

  // Обработчик изменения инпута обновляет стейт
  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();
    // Передаём значения управляемых компонентов во внешний обработчик
    props.onUpdateUser({
      name,
      about: description,
    });
  } 

  return(
    <PopupWithForm name='profile' title='Редактировать профиль' isOpen={props.isOpen}  onClosePopup={props.onClose} onSubmit={handleSubmit} onUpdateUser={props.onUpdateUser} buttonText="Сохранить">
        <input type="text" autoComplete="name" autoCapitalize="words" className="popup__input" name="name" id="profile-name" placeholder="Имя" minLength={2} maxLength={40} required 
        onChange={handleChangeName} value={name || ''}/>
        <p className="popup__error" id="profile-name-error" />
        <input type="text" className="popup__input" name="job" id="profile-job" placeholder="О себе" minLength={2} maxLength={200} required 
        onChange={handleChangeDescription} value={description || ''}/>
        <p className="popup__error" id="profile-job-error" />
  </PopupWithForm>
  );
}

export default EditProfilePopup; 