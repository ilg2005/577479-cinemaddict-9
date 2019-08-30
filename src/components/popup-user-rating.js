import {utils} from "./utils.js";

export default class PopupUserRating {
  constructor(selectedFilm) {
    this._MAX_RATING = 9;
    this._title = selectedFilm.title;
    this._titleOriginal = selectedFilm.titleOriginal;
    this._poster = selectedFilm.poster;
    this._yourRate = selectedFilm.yourRate;
  }

  getElement() {
    if (!this._element) {
      this._element = utils.createElement(this.getTemplate());
    }

    return this._element;
  }

  getTemplate() {
    return `<section class="film-details__user-rating-wrap">
  <div class="film-details__user-rating-controls">
    <button class="film-details__watched-reset" type="button">Undo</button>
  </div>

  <div class="film-details__user-score">
    <div class="film-details__user-rating-poster">
      <img src="./images/posters/${this._poster}" alt="film-poster" class="film-details__user-rating-img">
    </div>

    <section class="film-details__user-rating-inner">
      <h3 class="film-details__user-rating-title">${this._title}</h3>

      <p class="film-details__user-rating-feelings">How you feel it?</p>

      <div class="film-details__user-rating-score">
      ${new Array(this._MAX_RATING).fill(``).map((item, index) => `
        <input type="radio" name="score" class="film-details__user-rating-input visually-hidden" value="${index + 1}"
               id="rating-${index + 1}" ${(this._yourRate === index + 1) ? `checked` : ``}>
        <label class="film-details__user-rating-label" for="rating-${index + 1}">${index + 1}</label>
`).join(``)}
      </div>
    </section>
  </div>
</section>`;
  }
}
