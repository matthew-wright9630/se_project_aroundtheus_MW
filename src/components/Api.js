class Api {
  constructor(options) {
    this._options = options;
    // ({ baseUrl: this._baseUrl, headers: this._headers } = options);
    this._baseUrl = options.baseUrl;
    this._authToken = options.headers.authorization;
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: {
        authorization: this._authToken,
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    });
  }

  getUserInformation() {
    return Promise.all([this.getUser(), this.getInitialCards()]);
  }

  getUser() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: {
        authorization: this._authToken,
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    });
  }

  updateUserInformation(userInformation) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: {
        authorization: this._authToken,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: userInformation.name,
        about: userInformation.about,
      }),
    });
  }

  addCard(element) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: {
        authorization: this._authToken,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: element.name,
        link: element.link,
      }),
    });
  }

  deleteCard(card) {
    return fetch(`${this._baseUrl}/cards/${card._id}`, {
      method: "DELETE",
      headers: {
        authorization: this._authToken,
        "Content-Type": "application/json",
      },
    });
  }
}

export { Api };
