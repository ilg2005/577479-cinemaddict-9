import {utils} from "./utils.js";

export default class PopupContainer {
  getElement() {
    if (!this._element) {
      this._element = utils.createElement(this.getTemplate());
    }

    return this._element;
  }

  getTemplate() {
    return `<section class="film-details">
  <form class="film-details__inner" action="" method="get">
    <div class="form-details__top-container">
    </div>

    <div class="form-details__middle-container">
    </div>

    <div class="form-details__bottom-container">
    </div>
  </form>
</section>`;
  }
}

