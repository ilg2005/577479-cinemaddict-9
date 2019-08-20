import {FILMS} from "./components/data.js";
import {FILTERS} from "./components/filters-count.js";
import {getSearchMarkup} from "./components/search.js";
import {getUserProfileMarkup} from "./components/user-profile.js";
import {getMenuMarkup} from "./components/menu.js";
import {getSortMarkup} from "./components/sort.js";
import {getContentContainerMarkup} from "./components/content-container.js";
import {getFilmCardMarkup} from "./components/card.js";
import {getShowMoreBtnMarkup} from "./components/show-more-btn.js";
import {getPopupContainerMarkup} from "./components/popup-container.js";
import {getPopupContentMarkup} from "./components/popup-top-content.js";
import {getUserRatingMarkup} from "./components/popup-user-rating.js";
import {getCommentsMarkup} from "./components/popup-comments.js";

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
        renderElement(allMoviesContainerElement, getFilmCardMarkup(film.title, film.rating, film.date, film.duration, film.genres, film.description, film.comments.length, film.poster));
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
      renderElement(element, getFilmCardMarkup(film.title, film.rating, film.year, film.duration, film.genres, film.description, film.comments.length, film.poster));
    }
  };

  renderExtraFilmsByProperty(topRatedMoviesContainerElement, `rating`, EXTRA_COUNT_TO_RENDER);
  renderExtraFilmsByProperty(mostCommentedContainerElement, `comments.length()`, EXTRA_COUNT_TO_RENDER);

  renderElement(document.querySelector(`.footer__statistics`), `<p>${FILMS.length} movies inside</p>`);

  renderElement(document.querySelector(`body`), getPopupContainerMarkup());

  const popupTopContainerElement = document.querySelector(`.form-details__top-container`);
  const popupMiddleContainerElement = document.querySelector(`.form-details__middle-container`);
  const popupBottomContainerElement = document.querySelector(`.form-details__bottom-container`);

  renderElement(popupTopContainerElement, getPopupContentMarkup(FILMS[0].poster, FILMS[0].age, FILMS[0].title, FILMS[0].titleOriginal, FILMS[0].rating, FILMS[0].yourRate, FILMS[0].filmDirector, FILMS[0].writers, FILMS[0].actors, FILMS[0].date, FILMS[0].duration, FILMS[0].country, FILMS[0].genres, FILMS[0].description, FILMS[0].isWatched));
  renderElement(popupMiddleContainerElement, getUserRatingMarkup(FILMS[0].poster, FILMS[0].title, FILMS[0].yourRate));
  renderElement(popupBottomContainerElement, getCommentsMarkup(FILMS[0].comments.length));
}
