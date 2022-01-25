import React from 'react';
import PopupWithForm from '../components/PopupWithForm';

function EditAvatarPopup(props) {
  // avatar должна быть объявлена здесь, чтобы реф мог иметь к ней доступ
  const avatarLink = React.useRef(null);

  function handleSubmit(e) {
    e.preventDefault();
    
    props.onUpdateAvatar({
      avatar: avatarLink.current.value,
    });
  } 

  return(
    <PopupWithForm name='avatar' title='Обновить аватар' isOpen={props.isOpen}  onClosePopup={props.onClose} onSubmit={handleSubmit} onUpdateAvatar={props.onUpdateAvatar} buttonText="Обновить">
        <input ref={avatarLink} type="url" className="popup__input" name="link" id="profile-avatar" placeholder="Ссылка на картинку" required />
        <p className="popup__error" id="profile-avatar-error" />
    </PopupWithForm>
  );
}

export default EditAvatarPopup; 