import {FILMS} from "./components/data.js";
import {FILTERS} from "./components/filters-count.js";
import {getSearchMarkup} from "./components/search.js";
import {getUserProfileMarkup} from "./components/user-profile.js";
import {getMenuMarkup} from "./components/menu.js";
import {getSortMarkup} from "./components/sort.js";
import {getContentContainerMarkup} from "./components/content-container.js";
import {getFilmCardMarkup} from "./components/card.js";
import {getShowMoreBtnMarkup} from "./components/show-more-btn.js";
// import {getPopupMarkup} from "./components/popup";

const renderElement = (element, markup, renderingCount = 1) => {
  for (let i = 0; i < renderingCount; i++) {
    element.insertAdjacentHTML(`beforeend`, markup);
  }
};

const headerElement = document.querySelector(`.header`);
const mainElement = document.querySelector(`.main`);

const WATCHED_FILMS = 1500;
const getUserTitle = (filmsWatched) => {
  let userTitle;
  if (filmsWatched >= 1 && filmsWatched <= 10) {
    userTitle = `Novice`;
  } else if (filmsWatched >= 11 && filmsWatched <= 20) {
    userTitle = `Fan`;
  } else if (filmsWatched >= 21) {
    userTitle = `Movie Buff`;
  } else {
    userTitle = ``;
  }
  return userTitle;
};

renderElement(headerElement, getSearchMarkup());
renderElement(headerElement, getUserProfileMarkup(getUserTitle(WATCHED_FILMS)));
renderElement(mainElement, getMenuMarkup(FILTERS));
renderElement(mainElement, getSortMarkup());
renderElement(mainElement, getContentContainerMarkup());

const filmsSectionElement = mainElement.querySelector(`.films`);
const filmsListElement = filmsSectionElement.querySelector(`.films-list`);
const allMoviesContainerElement = filmsListElement.querySelector(`.all-movies`);

if (!FILMS.length) {
  renderElement(allMoviesContainerElement, `<p>There are no movies in our database</p>`);
} else {
  renderElement(filmsListElement, getShowMoreBtnMarkup());
  const filmsLoaderElement = filmsListElement.querySelector(`.films-list__show-more`);

  const filmsLoaderElementClickHandler = () => {
    let filmsCopy = FILMS.slice();
    const renderedFilmsCount = allMoviesContainerElement.querySelectorAll(`.film-card`).length;
    filmsCopy.splice(0, renderedFilmsCount);
    renderFilmsPortion(filmsCopy);
  };

  filmsLoaderElement.addEventListener(`click`, filmsLoaderElementClickHandler);

  const FILMS_PORTION_TO_RENDER = 5;

  const renderFilmsPortion = (filmsArray) => {
    let i = 0;
    for (const film of filmsArray) {
      if (i < FILMS_PORTION_TO_RENDER) {
        renderElement(allMoviesContainerElement, getFilmCardMarkup(film.title, film.rating, film.year, film.duration, film.genre, film.description, film.comments, film.poster));
        i++;
      } else {
        break;
      }
    }
    const renderedFilmsCount = allMoviesContainerElement.querySelectorAll(`.film-card`).length;
    if (renderedFilmsCount === FILMS.length) {
      filmsLoaderElement.classList.add(`hide`);
      filmsLoaderElement.removeEventListener(`click`, filmsLoaderElementClickHandler);
    }
  };

  renderFilmsPortion(FILMS);

  const sortArrayByPropertyDescending = (array, property) => {
    array.sort((a, b) => a[property] < b[property] ? 1 : -1);
  };

  const topRatedMoviesContainerElement = filmsSectionElement.querySelector(`.top-rated`);
  const mostCommentedContainerElement = filmsSectionElement.querySelector(`.most-commented`);

  const EXTRA_COUNT_TO_RENDER = 2;

  const renderExtraFilmsByProperty = (element, property, count) => {
    let [...filmsCopy] = FILMS;
    sortArrayByPropertyDescending(filmsCopy, property);

    for (const film of filmsCopy.slice(0, count)) {
      renderElement(element, getFilmCardMarkup(film.title, film.rating, film.year, film.duration, film.genre, film.description, film.comments, film.poster));
    }
  };

  renderExtraFilmsByProperty(topRatedMoviesContainerElement, `rating`, EXTRA_COUNT_TO_RENDER);
  renderExtraFilmsByProperty(mostCommentedContainerElement, `comments`, EXTRA_COUNT_TO_RENDER);

  renderElement(document.querySelector(`.footer__statistics`), `<p>${FILMS.length} movies inside</p>`);
// renderElement(document.querySelector(`body`), getPopupMarkup());
}
