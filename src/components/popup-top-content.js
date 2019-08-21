export const getPopupContentMarkup = (selectedFilm) => (`
      <div class="film-details__close">
        <button class="film-details__close-btn" type="button">close</button>
      </div>
      <div class="film-details__info-wrap">
        <div class="film-details__poster">
          <img class="film-details__poster-img" src="./images/posters/${selectedFilm.poster}" alt="">

          <p class="film-details__age">${selectedFilm.age}</p>
        </div>

        <div class="film-details__info">
          <div class="film-details__info-head">
            <div class="film-details__title-wrap">
              <h3 class="film-details__title">${selectedFilm.title}</h3>
              <p class="film-details__title-original">Original: ${selectedFilm.titleOriginal}</p>
            </div>

            <div class="film-details__rating">
              <p class="film-details__total-rating">${selectedFilm.rating}</p>
              <p class="film-details__user-rating">Your rate ${selectedFilm.yourRate}</p>
            </div>
          </div>

          <table class="film-details__table">
            <tr class="film-details__row">
              <td class="film-details__term">Director</td>
              <td class="film-details__cell">${selectedFilm.filmDirector}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Writers</td>
              <td class="film-details__cell">${selectedFilm.writers}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Actors</td>
              <td class="film-details__cell">${selectedFilm.actors}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Release Date</td>
              <td class="film-details__cell">${selectedFilm.date}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Runtime</td>
              <td class="film-details__cell">${selectedFilm.duration}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Country</td>
              <td class="film-details__cell">${selectedFilm.country}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Genre${(selectedFilm.genres.length > 1) ? `s` : ``}</td>
              <td class="film-details__cell">
              ${selectedFilm.genres.map((genre) => `
                <span class="film-details__genre">${genre}</span>`).join(` `)}
            </tr>
          </table>

          <p class="film-details__film-description">
            ${selectedFilm.description}
          </p>
        </div>
      </div>

      <section class="film-details__controls">
        <input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" name="watchlist">
        <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">Add to watchlist</label>

        <input type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched" ${selectedFilm.isWatched ? `checked` : ``}>
        <label for="watched" class="film-details__control-label film-details__control-label--watched">Already watched</label>

        <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" name="favorite">
        <label for="favorite" class="film-details__control-label film-details__control-label--favorite">Add to favorites</label>
      </section>
    </div>
`);
