import {getSearchMarkup} from "./components/search";

const renderElement = (element, markup, renderingCount = 1) => {
  for (let i = 1; i <= renderingCount; i++) {
    element.insertAdjacentHTML(`beforeend`, markup);
  }
};

const headerElement = document.querySelector(`.header`);

renderElement(headerElement, getSearchMarkup());
