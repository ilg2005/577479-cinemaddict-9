import {getSearchMarkup} from "./components/search";
import {getUserProfileMarkup} from "./components/user-profile";
import {getMenuMarkup} from "./components/menu";


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
