import {FILMS} from "./components/data.js";
import {utils} from "./components/utils.js";
import Search from "./components/search.js";
import User from "./components/user.js";
import Filters from "./components/filters.js";
import ContentContainer from "./components/content-container.js";
import Film from "./components/film.js";
import Footer from "./components/footer.js";
import PopupContainer from "./components/popup-container.js";
import PopupTopContent from "./components/popup-top-content.js";
import PopupUserRating from "./components/popup-user-rating.js";
import PopupComments from "./components/popup-comments.js";
import FilmsListController from "./components/films-list-controller";

const headerElement = document.querySelector(`.header`);
const mainElement = document.querySelector(`.main`);

const searchField = new Search();
utils.render(headerElement, searchField.getElement(), `beforeend`);

const WATCHED_FILMS_NUMBER = 100;
const user = new User(WATCHED_FILMS_NUMBER);
utils.render(headerElement, user.getElement(), `beforeend`);

const filters = new Filters(FILMS);
utils.render(mainElement, filters.getElement(), `beforeend`);

const contentContainer = new ContentContainer();
utils.render(mainElement, contentContainer.getElement(), `beforeend`);

const filmsSectionElement = mainElement.querySelector(`.films`);
const filmsListElement = filmsSectionElement.querySelector(`.films-list`);

const filmsListController = new FilmsListController(filmsListElement, FILMS);
filmsListController.init();

const sortArrayByPropertyDescending = (array, property) => {
  array.sort((a, b) => a[property] < b[property] ? 1 : -1);
};

const topRatedMoviesContainerElement = filmsSectionElement.querySelector(`.top-rated`);
const mostCommentedContainerElement = filmsSectionElement.querySelector(`.most-commented`);

const EXTRA_COUNT_TO_RENDER = 2;

const renderExtraFilmsByProperty = (element, property, count) => {
  let filmsCopy = FILMS.slice(0);
  if (property === `commentsCount`) {
    for (let film of filmsCopy) {
      film.commentsCount = film.comments.length;
    }
  }
  sortArrayByPropertyDescending(filmsCopy, property);
  const length = filmsCopy.length > count ? count : filmsCopy.length;
  for (let i = 0; i < length; i++) {
    const filmCard = new Film(filmsCopy[i]);
    utils.render(element, filmCard.getElement(), `beforeend`);
    filmCard.getElement().id = filmsCopy[i].id;
  }
};

renderExtraFilmsByProperty(topRatedMoviesContainerElement, `rating`, EXTRA_COUNT_TO_RENDER);
renderExtraFilmsByProperty(mostCommentedContainerElement, `commentsCount`, EXTRA_COUNT_TO_RENDER);

const footer = new Footer(FILMS);
utils.render(document.querySelector(`.footer__statistics`), footer.getElement(), `beforeend`);

const mainElementClickHandler = (evt) => {
  if (evt.target.parentElement.className === `film-card`) {
    const filmCardElement = evt.target.parentElement;
    const popupContainer = new PopupContainer();
    utils.render(document.querySelector(`body`), popupContainer.getElement(), `beforeend`);

    const popupTopContent = new PopupTopContent(FILMS[filmCardElement.id]);
    utils.render(popupContainer._element, popupTopContent.getElement(), `beforeend`);

    const popupUserRating = new PopupUserRating(FILMS[filmCardElement.id]);
    utils.render(popupContainer._element, popupUserRating.getElement(), `beforeend`);

    const popupComments = new PopupComments(FILMS[filmCardElement.id]);
    utils.render(popupContainer._element, popupComments.getElement(), `beforeend`);

    const closeBtnElement = popupContainer._element.querySelector(`.film-details__close-btn`);

    const closeBtnElementClickHandler = () => {
      utils.unrender(popupContainer._element);
      closeBtnElement.removeEventListener(`click`, closeBtnElementClickHandler);
    };
    closeBtnElement.addEventListener(`click`, closeBtnElementClickHandler);

    const documentKeydownHandler = (e) => {
      if (e.key === `Escape` || e.key === `Esc`) {
        if (e.target !== popupContainer._element.querySelector(`.film-details__comment-input`)) {
          utils.unrender(popupContainer._element);
          document.removeEventListener(`keydown`, documentKeydownHandler);
        }
      }
    };
    document.addEventListener(`keydown`, documentKeydownHandler);
  }
};

mainElement.addEventListener(`click`, mainElementClickHandler);


