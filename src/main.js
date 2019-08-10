import {getSearchMarkup} from "./components/search";
import {getUserProfileMarkup} from "./components/user-profile";
import {getMenuMarkup} from "./components/menu";
import {getSortMarkup} from "./components/sort";
import {getContentContainerMarkup} from "./components/content-container";
import {getFilmCardMarkup} from "./components/card";
import {getShowMoreBtnMarkup} from "./components/show-more-btn";
import {getPopupMarkup} from "./components/popup";
import {getTopRatedFilmsMarkup} from "./components/top-rated";
import {getMostCommentedFilmsMarkup} from "./components/most-commented";

const renderElement = (element, markup, renderingCount = 1) => {
  for (let i = 1; i <= renderingCount; i++) {
    element.insertAdjacentHTML(`beforeend`, markup);
  }
};

const headerElement = document.querySelector(`.header`);
const mainElement = document.querySelector(`.main`);
const footerElement = document.querySelector(`.footer`);

renderElement(headerElement, getSearchMarkup());
renderElement(headerElement, getUserProfileMarkup());
renderElement(mainElement, getMenuMarkup());
renderElement(mainElement, getSortMarkup());
renderElement(mainElement, getContentContainerMarkup());

const filmsSectionElement = mainElement.querySelector(`.films`);
const filmsListElement = filmsSectionElement.querySelector(`.films-list`);
const filmsListContainerElement = filmsListElement.querySelector(`.films-list__container`);
const FILMS_COUNT_TO_RENDER = 5;

renderElement(filmsListContainerElement, getFilmCardMarkup(), FILMS_COUNT_TO_RENDER);
renderElement(filmsListElement, getShowMoreBtnMarkup());
renderElement(filmsSectionElement, getTopRatedFilmsMarkup());
renderElement(filmsSectionElement, getMostCommentedFilmsMarkup());

renderElement(footerElement, getPopupMarkup());
const popupElement = document.querySelector(`.film-details`);
popupElement.style.display = `none`;

