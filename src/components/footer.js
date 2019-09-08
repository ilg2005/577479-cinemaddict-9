import AbstractComponent from "./abstract-component";

export default class Footer extends AbstractComponent {
  constructor(filmsArray) {
    super();
    this._allFilmsCount = filmsArray.length;
  }

  getTemplate() {
    return `<p>${this._allFilmsCount} movies inside</p>`;
  }
}
