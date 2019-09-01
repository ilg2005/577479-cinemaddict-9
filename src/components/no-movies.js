import {utils} from "./utils.js";

export default class NoMovies {
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
    return `<div class="no-result">
        There are no movies in our database
      </div>`;
  }
}
