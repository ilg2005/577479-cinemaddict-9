import {FILMS} from "./components/data.js";
import {utils} from "./components/utils.js";
import Search from "./components/search.js";
import User from "./components/user.js";
import Filters from "./components/filters.js";
import Sort from "./components/sort.js";
import ContentContainer from "./components/content-container.js";
import Film from "./components/film.js";
import ShowMoreBtn from "./components/show-more-btn.js";
import Footer from "./components/footer.js";
import PopupContainer from "./components/popup-container.js";
import PopupTopContent from "./components/popup-top-content.js";
import PopupUserRating from "./components/popup-user-rating.js";
import PopupComments from "./components/popup-comments.js";

const renderElement = (element, markup, renderingCount = 1) => {
  for (let i = 0; i < renderingCount; i++) {
    element.insertAdjacentHTML(`beforeend`, markup);
  }
};

const headerElement = document.querySelector(`.header`);
const mainElement = document.querySelector(`.main`);

const searchField = new Search();
utils.render(headerElement, searchField.getElement(), `beforeend`);

const WATCHED_FILMS_NUMBER = 100;
const user = new User(WATCHED_FILMS_NUMBER);
utils.render(headerElement, user.getElement(), `beforeend`);

const filters = new Filters(FILMS);
utils.render(mainElement, filters.getElement(), `beforeend`);

const sort = new Sort();
utils.render(mainElement, sort.getElement(), `beforeend`);

const contentContainer = new ContentContainer();
utils.render(mainElement, contentContainer.getElement(), `beforeend`);

const filmsSectionElement = mainElement.querySelector(`.films`);
const filmsListElement = filmsSectionElement.querySelector(`.films-list`);
const allMoviesContainerElement = filmsListElement.querySelector(`.all-movies`);

if (!FILMS.length) {
  renderElement(allMoviesContainerElement, `<p>There are no movies in our database</p>`);
} else {
  const showMoreBtn = new ShowMoreBtn();
  utils.render(filmsListElement, showMoreBtn.getElement(), `beforeend`);

  const renderFilm = (filmCard) => {
    const film = new Film(filmCard);

    utils.render(allMoviesContainerElement, film.getElement(), `beforeend`);
    film.getElement().id = filmCard.id;
  };

  const filmsLoaderElement = filmsListElement.querySelector(`.films-list__show-more`);

  const renderFilmsPortion = (filmsArray, initialFilmsArrayLength) => {
    let length = filmsArray.length > FILMS_PORTION_TO_RENDER ? FILMS_PORTION_TO_RENDER : filmsArray.length;
    for (let i = 0; i < length; i++) {
      renderFilm(filmsArray[i]);
    }
    const renderedFilmsCount = allMoviesContainerElement.querySelectorAll(`.film-card`).length;
    if (renderedFilmsCount === initialFilmsArrayLength) {
      filmsLoaderElement.classList.add(`hide`);
      filmsLoaderElement.removeEventListener(`click`, filmsLoaderElementClickHandler);
    }
  };

  const filmsLoaderElementClickHandler = () => {
    let filmsCopy = FILMS.slice(0);
    const renderedFilmsCount = allMoviesContainerElement.querySelectorAll(`.film-card`).length;
    filmsCopy.splice(0, renderedFilmsCount);
    renderFilmsPortion(filmsCopy, FILMS.length);
  };

  filmsLoaderElement.addEventListener(`click`, filmsLoaderElementClickHandler);

  const FILMS_PORTION_TO_RENDER = 5;


  renderFilmsPortion(FILMS, FILMS.length);

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

      const popupTopContainerElement = document.querySelector(`.form-details__top-container`);
      const popupMiddleContainerElement = document.querySelector(`.form-details__middle-container`);
      const popupBottomContainerElement = document.querySelector(`.form-details__bottom-container`);

      const popupTopContent = new PopupTopContent(FILMS[filmCardElement.id]);
      utils.render(popupTopContainerElement, popupTopContent.getElement(), `beforeend`);

      const popupUserRating = new PopupUserRating(FILMS[filmCardElement.id]);
      utils.render(popupMiddleContainerElement, popupUserRating.getElement(), `beforeend`);

      const popupComments = new PopupComments(FILMS[filmCardElement.id]);
      utils.render(popupBottomContainerElement, popupComments.getElement(), `beforeend`);
    }
  };

  mainElement.addEventListener(`click`, mainElementClickHandler);

}
