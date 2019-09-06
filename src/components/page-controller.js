import Film from "./film.js";
import {utils} from "./utils.js";

export default class PageController {
  constructor(allMoviesContainer, films) {
    this._allMoviesContainer = allMoviesContainer;
    this._films = films;
  }

  init() {
    const renderFilm = (filmCard) => {
      const film = new Film(filmCard);

      utils.render(this._allMoviesContainer, film.getElement(), `beforeend`);
      film.getElement().id = filmCard.id;
    };

    const filmsLoaderElement = document.querySelector(`.films-list__show-more`);

    const renderFilmsPortion = (filmsArray, initialFilmsArrayLength) => {
      let length = filmsArray.length > FILMS_PORTION_TO_RENDER ? FILMS_PORTION_TO_RENDER : filmsArray.length;
      for (let i = 0; i < length; i++) {
        renderFilm(filmsArray[i]);
      }
      const renderedFilmsCount = this._allMoviesContainer.querySelectorAll(`.film-card`).length;
      if (renderedFilmsCount === initialFilmsArrayLength) {
        filmsLoaderElement.classList.add(`hide`);
        filmsLoaderElement.removeEventListener(`click`, filmsLoaderElementClickHandler);
      }
    };

    const filmsLoaderElementClickHandler = () => {
      let filmsCopy = this._films.slice(0);
      const renderedFilmsCount = this._allMoviesContainer.querySelectorAll(`.film-card`).length;
      filmsCopy.splice(0, renderedFilmsCount);
      renderFilmsPortion(filmsCopy, this._films.length);
    };

    filmsLoaderElement.addEventListener(`click`, filmsLoaderElementClickHandler);

    const FILMS_PORTION_TO_RENDER = 5;


    renderFilmsPortion(this._films, this._films.length);
  }
}
