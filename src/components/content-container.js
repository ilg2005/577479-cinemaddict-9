import AbstractComponent from "./abstract-component.js";

export default class ContentContainer extends AbstractComponent {
  getTemplate() {
    return `<section class="films">
    <section class="films-list">
      <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>

      <div class="films-list__container all-movies">
      </div>
    </section>
    <section class="films-list--extra">
      <h2 class="films-list__title">Top rated</h2>

      <div class="films-list__container top-rated">
      </div>
    </section>
    <section class="films-list--extra">
      <h2 class="films-list__title">Most commented</h2>

      <div class="films-list__container most-commented">
      </div>
    </section>

  </section>`;
  }
}
