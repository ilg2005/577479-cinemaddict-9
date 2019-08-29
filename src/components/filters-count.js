import {FILMS} from "./data.js";

const getCountsForFilters = (filmsArray) => {
  let countWatchList = 0; let countHistory = 0; let countFavorite = 0;
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
    countFavorite,
    countHistory,
    countWatchList,
  };
};

const filterCounts = getCountsForFilters(FILMS);

export const FILTERS = [
  {
    title: `Watchlist`,
    count: filterCounts.countWatchList
  },
  {
    title: `History`,
    count: filterCounts.countHistory
  },
  {
    title: `Favorites`,
    count: filterCounts.countFavorite
  },
];

