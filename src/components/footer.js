import {utils} from "./utils.js";

export default class Footer {
  constructor(filmsArray) {
    this._allFilmsCount = filmsArray.length;
  }

  getElement() {
    if (!this._element) {
      this._element = utils.createElement(this.getTemplate());
    }

    return this._element;
  }

  getTemplate() {
    return `<p>${this._allFilmsCount} movies inside</p>`;
  }
}
