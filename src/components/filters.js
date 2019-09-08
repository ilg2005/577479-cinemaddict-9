import AbstractComponent from "./abstract-component";

export default class Filters extends AbstractComponent {
  constructor(filmsArray) {
    super();
    this._filtersCounts = this.getCountsForFilters(filmsArray);
  }

  getCountsForFilters(filmsArray) {
    let countWatchList = 0;
    let countHistory = 0;
    let countFavorite = 0;
    for (const film of filmsArray) {
      if (film.isFavorite) {
        countFavorite++;
      }
      if (film.isWatched) {
        countHistory++;
      }
      if (film.isWatchList) {
        countWatchList++;
      }
    }
    return {
      Watchlist: countWatchList,
      History: countHistory,
      Favorites: countFavorite,
    };
  }

  getTemplate() {
    return `<nav class="main-navigation">
    <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
    ${Object.entries(this._filtersCounts).map(([title, count]) =>
    `<a href="#${title.toLowerCase()}" class="main-navigation__item">${title} <span class="main-navigation__item-count">${count}</span></a>`).join(``)}
    <a href="#stats" class="main-navigation__item main-navigation__item--additional">Stats</a>
  </nav>`;
  }
}
