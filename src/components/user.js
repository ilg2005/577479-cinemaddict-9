import AbstractComponent from "./abstract-component";

export default class User extends AbstractComponent {
  constructor(watchedFilmsNumber = 0) {
    super();
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

  getTemplate() {
    return `<section class="header__profile profile">
    <p class="profile__rating">${this.getUserTitle()}</p>
    <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
  </section>`;
  }
}

