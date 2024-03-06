export default class API {
  constructor(options) {
    this._options = options;
    this._baseURL = options.baseUrl;
    this._headers = options.headers;
    this._authtoken = options.headers.authorization;
    this._contentTypeJSON = options.headers["Content-Type"];
  }

  getUserInformation() {
    return this._request(`${this._baseURL}/users/me`, {
      method: "GET",
      headers: this._headers,
    });
  }

  getAppInfo() {
    return Promise.all([this.getInitalCards(), this.getUserInformation()]);
  }

  patchProfileInformation({ name, about }) {
    return this._request(`${this._baseURL}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name,
        about,
      }),
    });
  }

  addCard({ name, link }) {
    return this._request(`${this._baseURL}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name,
        link,
      }),
    });
  }

  deleteCard(cardId) {
    return this._request(`${this._baseURL}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    });
  }

  likeCard({ cardId, likeBool }) {
    return this._request(`${this._baseURL}/cards/${cardId}/likes`, {
      method: likeBool ? "DELETE" : "PUT",
      headers: this._headers,
    });
  }

  updateProfilePicture(imageURL) {
    return this._request(`${this._baseURL}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: imageURL,
      }),
    });
  }

  getInitalCards() {
    return this._request(`${this._baseURL}/cards`, {
      method: "GET",
      headers: this._headers,
    });
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(res);
  }

  _request(url, options) {
    return fetch(url, options).then(this._checkResponse);
  }
}
