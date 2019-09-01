import {utils} from "./utils";

export default class User {
  constructor(watchedFilmsNumber = 0) {
    this._filmsWatched = watchedFilmsNumber;
  }

  getUserTitle() {
    let userTitle = ``;
    if (this._filmsWatched >= 1 && this._filmsWatched <= 10) {
      userTitle = `Novice`;
    } else if (this._filmsWatched >= 11 && this._filmsWatched <= 20) {
      userTitle = `Fan`;
    } else if (this._filmsWatched >= 21) {
      userTitle = `Movie Buff`;
    }
    return userTitle;
  }

  getElement() {
    if (!this._element) {
      this._element = utils.createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }

  getTemplate() {
    return `<section class="header__profile profile">
    <p class="profile__rating">${this.getUserTitle()}</p>
    <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
  </section>`;
  }
}

