import {getSearchMarkup} from "./components/search";
import {getUserProfileMarkup} from "./components/user-profile";
import {getMenuMarkup} from "./components/menu";
import {getSortMarkup} from "./components/sort";
import {getContentContainerMarkup} from "./components/content-container";
import {getFilmCardMarkup} from "./components/card";
import {getShowMoreBtnMarkup} from "./components/show-more-btn";
import {getPopupMarkup} from "./components/popup";

const renderElement = (element, markup, renderingCount = 1) => {
  for (let i = 1; i <= renderingCount; i++) {
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

const filmsListElement = mainElement.querySelector(`.films-list`);
const filmsListContainerElement = filmsListElement.querySelector(`.films-list__container`);
const FILMS_COUNT_TO_RENDER = 5;

renderElement(filmsListContainerElement, getFilmCardMarkup(), FILMS_COUNT_TO_RENDER);
renderElement(filmsListElement, getShowMoreBtnMarkup());

const footerElement = document.querySelector(`.footer`);

renderElement(footerElement, getPopupMarkup());
const popupElement = document.querySelector(`.film-details`);
// popupElement.style.display = `none`;

