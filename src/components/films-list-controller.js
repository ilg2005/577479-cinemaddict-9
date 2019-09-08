import {utils} from "./utils.js";
import Film from "./film.js";
import Sort from "./sort.js";
import ShowMoreBtn from "./show-more-btn.js";
import NoMovies from "./no-movies.js";

export default class FilmsListController {
  constructor(container, films) {
    this._filmsListElement = container;
    this._allMoviesContainer = container.querySelector(`.all-movies`);
    this._films = films;
    this.FILMS_PORTION_TO_RENDER = 5;
    this._restFilms = null;
    this._sort = new Sort();
    this._showMoreBtn = new ShowMoreBtn();
  }

  _renderFilmsPortion(filmsArray) {
    const renderFilm = (filmCard) => {
      const film = new Film(filmCard);
      utils.render(this._allMoviesContainer, film.getElement(), `beforeend`);
      film.getElement().id = filmCard.id;
    };
    const filmsArrayClone = filmsArray.slice();
    const filmsToRender = filmsArrayClone.splice(0, this.FILMS_PORTION_TO_RENDER);
    for (let film of filmsToRender) {
      renderFilm(film);
    }
    return filmsArrayClone;
  }

  _implementSorting() {
    const sortElement = this._sort.getElement();
    utils.render(this._filmsListElement, sortElement, `afterbegin`);

    const sortElementClickHandler = (evt) => {
      evt.preventDefault();
      if (evt.target.tagName !== `A`) {
        return;
      }

      sortElement.querySelector(`.sort__button--active`).classList.remove(`sort__button--active`);
      this._allMoviesContainer.innerHTML = ``;

      this._showMoreBtn.getElement().classList.remove(`hide`);
      switch (evt.target.getAttribute(`data-sort`)) {
        case `date`:
          evt.target.classList.add(`sort__button--active`);
          const filmsByDate = this._films.slice().sort((a, b) => b.dateInTimestamp - a.dateInTimestamp);
          this._restFilms = this._renderFilmsPortion(filmsByDate);
          break;
        case `rating`:
          evt.target.classList.add(`sort__button--active`);
          const filmsByRating = this._films.slice().sort((a, b) => b.rating - a.rating);
          this._restFilms = this._renderFilmsPortion(filmsByRating);
          break;
        case `default`:
          evt.target.classList.add(`sort__button--active`);
          this._restFilms = this._renderFilmsPortion(this._films);
          break;
      }
    };

    sortElement.addEventListener(`click`, sortElementClickHandler);
  }

  init() {
    if (!this._films.length) {
      const noMovies = new NoMovies();
      utils.render(this._allMoviesContainer, noMovies.getElement(), `beforeend`);
    } else {
      this._restFilms = this._renderFilmsPortion(this._films);

      if (this._restFilms.length) {
        const showMoreBtnElement = this._showMoreBtn.getElement();
        utils.render(this._filmsListElement, showMoreBtnElement, `beforeend`);
        const showMoreBtnElementClickHandler = () => {
          this._restFilms = this._renderFilmsPortion(this._restFilms);
          if (!this._restFilms.length) {
            showMoreBtnElement.classList.add(`hide`);
          }
        };
        showMoreBtnElement.addEventListener(`click`, showMoreBtnElementClickHandler);
      }

      this._implementSorting();
    }
  }
}
