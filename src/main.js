import {FILMS} from "./components/data.js";
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

renderElement(headerElement, getSearchMarkup());
renderElement(headerElement, getUserProfileMarkup());
renderElement(mainElement, getMenuMarkup());
renderElement(mainElement, getSortMarkup());
renderElement(mainElement, getContentContainerMarkup());

const filmsSectionElement = mainElement.querySelector(`.films`);
const filmsListElement = filmsSectionElement.querySelector(`.films-list`);
const allMoviesContainerElement = filmsListElement.querySelector(`.all-movies`);
const topRatedMoviesContainerElement = filmsSectionElement.querySelector(`.top-rated`);
const mostCommentedContainerElement = filmsSectionElement.querySelector(`.most-commented`);

// const FILMS_COUNT_TO_RENDER = 5;

for (const film of FILMS) {
  renderElement(allMoviesContainerElement, getFilmCardMarkup(film.title, film.rating, film.year, film.duration, film.genre, film.description, film.comments, film.poster));
}
renderElement(filmsListElement, getShowMoreBtnMarkup());

const sortArrayByPropertyDescending = (array, property) => {
  array.sort((a, b) => a[property] < b[property] ? 1 : -1);
};

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

// renderElement(document.querySelector(`body`), getPopupMarkup());
