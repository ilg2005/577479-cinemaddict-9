import AbstractComponent from "./abstract-component";

export default class PopupContainer extends AbstractComponent {
  getTemplate() {
    return `<section class="film-details">
  <form class="film-details__inner" action="" method="get">
  </form>
</section>`;
  }
}

