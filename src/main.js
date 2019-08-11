import {getSearchMarkup} from "./components/search";
import {getUserProfileMarkup} from "./components/user-profile";
import {getMenuMarkup} from "./components/menu";
import {getSortMarkup} from "./components/sort";
import {getContentContainerMarkup} from "./components/content-container";
import {getFilmCardMarkup} from "./components/card";
import {getShowMoreBtnMarkup} from "./components/show-more-btn";
import {getPopupMarkup} from "./components/popup";

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

const FILMS_COUNT_TO_RENDER = 5;
const FILMS_COUNT_TO_RENDER_EXTRA = 2;

renderElement(allMoviesContainerElement, getFilmCardMarkup(), FILMS_COUNT_TO_RENDER);
renderElement(filmsListElement, getShowMoreBtnMarkup());
renderElement(topRatedMoviesContainerElement, getFilmCardMarkup(), FILMS_COUNT_TO_RENDER_EXTRA);
renderElement(mostCommentedContainerElement, getFilmCardMarkup(), FILMS_COUNT_TO_RENDER_EXTRA);

renderElement(document.querySelector(`body`), getPopupMarkup());

