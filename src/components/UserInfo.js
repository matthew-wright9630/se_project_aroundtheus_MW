export class UserInfo {
  constructor(
    profileNameSelector,
    profileDescriptionSelector,
    profileAvatarSelector
  ) {
    this._profileName = document.querySelector(profileNameSelector);
    this._profileDescription = document.querySelector(
      profileDescriptionSelector
    );
    this._profileAvatar = document.querySelector(profileAvatarSelector);
  }

  getUserInfo() {
    return {
      name: this._profileName.textContent,
      about: this._profileDescription.textContent,
      avatar: this._profileAvatar.src,
    };
  }

  setUserInfo({
    name: profileName,
    about: profileDescription,
    avatar: profileAvatar,
  }) {
    this._profileName.textContent = profileName;
    this._profileDescription.textContent = profileDescription;
    this._profileAvatar.src = profileAvatar;
  }

  setUserAvatar(profileAvatar) {
    this._profileAvatar.src = profileAvatar;
  }
}
