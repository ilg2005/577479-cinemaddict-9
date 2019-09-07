import {utils} from "./utils.js";
import Film from "./film.js";
import Sort from "./sort.js";
import ShowMoreBtn from "./show-more-btn.js";
import NoMovies from "./no-movies.js";

export default class FilmsListController {
  constructor(allMoviesContainer, films) {
    this._allMoviesContainer = allMoviesContainer;
    this._films = films;
    this._sort = new Sort();
    this._showMoreBtn = new ShowMoreBtn();
  }

  _renderFilms(container, films) {
    const renderFilm = (filmCard) => {
      const film = new Film(filmCard);

      utils.render(container, film.getElement(), `beforeend`);
      film.getElement().id = filmCard.id;
    };

    const filmsLoaderElement = document.querySelector(`.films-list__show-more`);

    const renderFilmsPortion = (filmsArray, initialFilmsArrayLength) => {
      let length = filmsArray.length > FILMS_PORTION_TO_RENDER ? FILMS_PORTION_TO_RENDER : filmsArray.length;
      for (let i = 0; i < length; i++) {
        renderFilm(filmsArray[i]);
      }
      const renderedFilmsCount = container.querySelectorAll(`.film-card`).length;
      if (renderedFilmsCount === initialFilmsArrayLength) {
        filmsLoaderElement.classList.add(`hide`);
        filmsLoaderElement.removeEventListener(`click`, filmsLoaderElementClickHandler);
      } else {
        filmsLoaderElement.classList.remove(`hide`);
      }
    };

    const filmsLoaderElementClickHandler = () => {
      let filmsCopy = films.slice();
      const renderedFilmsCount = container.querySelectorAll(`.film-card`).length;
      filmsCopy.splice(0, renderedFilmsCount);
      renderFilmsPortion(filmsCopy, films.length);
    };

    filmsLoaderElement.addEventListener(`click`, filmsLoaderElementClickHandler);

    const FILMS_PORTION_TO_RENDER = 5;


    renderFilmsPortion(films, films.length);
  }

  init() {
    if (!this._films.length) {
      const noMovies = new NoMovies();
      utils.render(this._allMoviesContainer, noMovies.getElement(), `beforeend`);
    } else {
      utils.render(this._allMoviesContainer.parentElement, this._showMoreBtn.getElement(), `beforeend`);
      this._renderFilms(this._allMoviesContainer, this._films);
      const sortElement = this._sort.getElement();
      utils.render(this._allMoviesContainer.parentElement, sortElement, `afterbegin`);

      const sortElementClickHandler = (evt) => {
        evt.preventDefault();
        if (evt.target.tagName !== `A`) {
          return;
        }

        sortElement.querySelector(`.sort__button--active`).classList.remove(`sort__button--active`);
        this._allMoviesContainer.innerHTML = ``;

        switch (evt.target.getAttribute(`data-sort`)) {
          case `date`:
            evt.target.classList.add(`sort__button--active`);
            const filmsByDate = this._films.slice().sort((a, b) => b.dateInTimestamp - a.dateInTimestamp);
            this._renderFilms(this._allMoviesContainer, filmsByDate);
            break;
          case `rating`:
            evt.target.classList.add(`sort__button--active`);
            const filmsByRating = this._films.slice().sort((a, b) => b.rating - a.rating);
            this._renderFilms(this._allMoviesContainer, filmsByRating);
            break;
          case `default`:
            evt.target.classList.add(`sort__button--active`);
            this._renderFilms(this._allMoviesContainer, this._films);
            break;
        }
      };

      sortElement.addEventListener(`click`, sortElementClickHandler);
    }
  }
}
