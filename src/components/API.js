export default class API {
  constructor(options) {
    this._options = options;
    this._baseURL = options.baseUrl;
    this._authtoken = options.headers.authorization;
    this._contentTypeJSON = options.headers["Content-Type"];
  }

  getInitalCards() {
    return fetch(`${this._baseURL}/cards`, {
      method: "GET",
      headers: {
        authorization: this._authtoken,
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(res);
      })
      .catch((err) => {
        console.error(`Error Loading Cards: ${err.status}`);
      });
  }

  getUserInformation() {
    return fetch(`${this._baseURL}/users/me`, {
      method: "GET",
      headers: {
        authorization: this._authtoken,
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(res);
      })
      .catch((err) => {
        console.error(`Error Loading Cards: ${err.status}`);
      });
  }

  renderCardsValidator() {
    return Promise.all([this.getInitalCards(), this.getUserInformation()]);
  }

  patchProfileInformation({ name, about }) {
    return fetch(`${this._baseURL}/users/me`, {
      method: "PATCH",
      headers: {
        authorization: this._authtoken,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        about,
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(res);
      })
      .catch((err) => {
        console.error(`Error Patching Profile Information: ${err.status}`);
      });
  }

  addCard({ name, link }) {
    return fetch(`${this._baseURL}/cards`, {
      method: "POST",
      headers: {
        authorization: this._authtoken,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        link,
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(res);
      })
      .catch((err) => {
        console.error(`Error Addding Cards: ${err.status}`);
      });
  }

  deleteCard(cardId) {
    // the card id is found in the respective json object
    return fetch(`${this._baseURL}/cards/${cardId}`, {
      method: "DELETE",
      headers: {
        authorization: this._authtoken,
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(res);
      })
      .catch((err) => {
        console.error(`Error Deleting Cards: ${err.status}`);
      });
  }

  likeCard({ cardId, likeBool }) {
    return fetch(`${this._baseURL}/cards/${cardId}/likes`, {
      method: likeBool ? "DELETE" : "PUT",
      headers: {
        authorization: this._authtoken,
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .catch((err) => {
        console.error(`Error Liking Card: ${err.status}`);
      });
  }

  updateProfilePicture(imageURL) {
    return fetch(`${this._baseURL}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        authorization: this._authtoken,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        avatar: imageURL,
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(res);
      })
      .catch((err) => {
        console.error(`Error Updating Profile Picture: ${err.status}`);
      });
  }
}
