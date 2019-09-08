import AbstractComponent from "./abstract-component";

export default class NoMovies extends AbstractComponent {
  getTemplate() {
    return `<div class="no-result">
        There are no movies in our database
      </div>`;
  }
}
