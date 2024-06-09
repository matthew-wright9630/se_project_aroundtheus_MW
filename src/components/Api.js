class Api {
  constructor(options) {
    this._options = options;
    ({ baseUrl: this._baseUrl, headers: this._headers } = options);
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: {
        authorization: this._headers.authorization,
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
        authorization: this._headers.authorization,
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
      headers: this._headers,
      body: JSON.stringify({
        name: userInformation.name,
        about: userInformation.about,
      }),
    });
  }

  addCard(element) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: element.name,
        link: element.link,
      }),
    });
  }
}

export { Api };
