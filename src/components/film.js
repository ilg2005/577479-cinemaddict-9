import {utils} from "./utils.js";

export default class Film {
  constructor(filmCard) {
    this._title = filmCard.title;
    this._titleOriginal = filmCard.titleOriginal;
    this._poster = filmCard.poster;
    this._description = filmCard.description;
    this._rating = filmCard.rating;
    this._yourRate = filmCard.yourRate;
    this._filmDirector = filmCard.filmDirector;
    this._writers = filmCard.writers;
    this._actors = filmCard.actors;
    this._date = filmCard.date;
    this._country = filmCard.country;
    this._duration = filmCard.duration;
    this._genres = filmCard.genres;
    this._age = filmCard.age;
    this._comments = filmCard.comments;
    this._isWatchList = filmCard.isWatchList;
    this._isWatched = filmCard.isWatched;
    this._isFavorite = filmCard.isFavorite;
  }

  getShortenedDescription(text = ``) {
    const CHARS_TO_SHOW = 139;
    return (text.length > CHARS_TO_SHOW) ? `${text.substr(0, CHARS_TO_SHOW)}...` : text;
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
    return `<article class="film-card">
          <h3 class="film-card__title">${this._title}</h3>
          <p class="film-card__rating">${this._rating}</p>
          <p class="film-card__info">
            <span class="film-card__year">${new Date(this._date).getFullYear()}</span>
            <span class="film-card__duration">${this._duration}</span>
            <span class="film-card__genre">${this._genres}</span>
          </p>
          <img src="./images/posters/${this._poster}" alt="" class="film-card__poster">
          <p class="film-card__description">${this.getShortenedDescription(this._description)}</p>
          <a class="film-card__comments">${this._comments.length} comments</a>
          <form class="film-card__controls">
            <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist">Add to watchlist</button>
            <button class="film-card__controls-item button film-card__controls-item--mark-as-watched">Mark as watched</button>
            <button class="film-card__controls-item button film-card__controls-item--favorite">Mark as favorite</button>
          </form>
        </article>`;
  }
}

