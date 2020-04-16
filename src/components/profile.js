import {createElement} from "../utils";

const userProfileTemplate = (name) => {
  return (
    `<section class="header__profile profile">
    <p class="profile__rating">${name}</p>
    <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
  </section>`
  );
};

export default class UserProfile {
  constructor(name) {
    this._name = name;
  }

  getTemplate() {
    return userProfileTemplate(this._name);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }
    return this._element;
  }

  removeElement() {
    this._element = null;
  }

}
