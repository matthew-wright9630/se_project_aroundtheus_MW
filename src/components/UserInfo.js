export class UserInfo {
  constructor(profileNameSelector, profileDescriptionSelector) {
    this._profileName = document.querySelector(profileNameSelector);
    this._profileDescription = document.querySelector(
      profileDescriptionSelector
    );
  }

  getUserInfo() {
    return {
      name: this._profileName.textContent,
      about: this._profileDescription.textContent,
    };
  }

  setUserInfo({ name: profileName, about: profileDescription }) {
    this._profileName.textContent = profileName;
    this._profileDescription.textContent = profileDescription;
  }
}
