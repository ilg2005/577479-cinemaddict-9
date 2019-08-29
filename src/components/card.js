const CHARS_TO_SHOW = 139;
const getShortenedDescription = (text = ``) => (text.length > CHARS_TO_SHOW) ? `${text.substr(0, CHARS_TO_SHOW)}...` : text;

export const getFilmCardMarkup = (film) => (`
        <article class="film-card">
          <h3 class="film-card__title">${film.title}</h3>
          <p class="film-card__rating">${film.rating}</p>
          <p class="film-card__info">
            <span class="film-card__year">${new Date(film.date).getFullYear()}</span>
            <span class="film-card__duration">${film.duration}</span>
            <span class="film-card__genre">${film.genres}</span>
          </p>
          <img src="./images/posters/${film.poster}" alt="" class="film-card__poster">
          <p class="film-card__description">${getShortenedDescription(film.description)}</p>
          <a class="film-card__comments">${film.comments.length} comments</a>
          <form class="film-card__controls">
            <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist">Add to watchlist</button>
            <button class="film-card__controls-item button film-card__controls-item--mark-as-watched">Mark as watched</button>
            <button class="film-card__controls-item button film-card__controls-item--favorite">Mark as favorite</button>
          </form>
        </article>
`);
