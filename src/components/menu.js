export const getMenuMarkup = (filtersArray) => (`
  <nav class="main-navigation">
    <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
    ${filtersArray.map((filter) =>
    `<a href="#${filter.title.toLowerCase()}" class="main-navigation__item">${filter.title} <span class="main-navigation__item-count">${filter.count}</span></a>`).join(``)}
    <a href="#stats" class="main-navigation__item main-navigation__item--additional">Stats</a>
  </nav>
`);
