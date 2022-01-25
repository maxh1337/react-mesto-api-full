import { baseUrl, headers } from "../utils/constants";

// класс для работы с сервером
 class API {

  constructor(url,headers) {
    this._url = url;
    this._headers = headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Что-то пошло не так: ${res.status}`);
  }
  // метод инициализации карточек
  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      method: 'GET',
      credentials: 'include',
      headers: this._headers,
    }).then(this._checkResponse)
  }

    // метод инициализации данных пользователя
  getUserData() {
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      credentials: 'include',
      headers: this._headers,
    }).then(this._checkResponse)
  }

    // сохранение на сервере отредактированных данных пользователя
  setUserData({name, about}) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({name, about})
    }).then(this._checkResponse)
  }

    // добавление на сервере новой карточки
  postCard(data) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })
    }).then(this._checkResponse) 
  }

  // метод удаления карточек
  deleteCard(idCard) {
    return fetch(`${this._url}/cards/${idCard}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: this._headers,
    }).then(this._checkResponse)
  }

  // ставим лайк карточке
  changeLikeCardStatus(idCard,like){
    return fetch(`${this._url}/cards/likes/${idCard}`, {
      method: like ? 'DELETE' : 'PUT',
      credentials: 'include',
      headers: this._headers,
    }).then(this._checkResponse)
  }

  // метод получения данных карточки
  getCard(idCard) {
    return fetch(`${this._url}/cards/${idCard}`, {
      method: 'GET',
      credentials: 'include',
      headers: this._headers,
    }).then(this._checkResponse)
  }

  // метод для обновления аватара пользователя
  patchAvatar(data) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.avatar
      })
    }).then(this._checkResponse)
  }
}

// экземпляр класса для работы с сервером
// API для получение данных
export const apiData = new API(baseUrl,headers);
