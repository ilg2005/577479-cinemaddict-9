const MAX_RATING = 9;
export const getUserRatingMarkup = (selectedFilm) => (`
<section class="film-details__user-rating-wrap">
  <div class="film-details__user-rating-controls">
    <button class="film-details__watched-reset" type="button">Undo</button>
  </div>

  <div class="film-details__user-score">
    <div class="film-details__user-rating-poster">
      <img src="./images/posters/${selectedFilm.poster}" alt="film-poster" class="film-details__user-rating-img">
    </div>

    <section class="film-details__user-rating-inner">
      <h3 class="film-details__user-rating-title">${selectedFilm.title}</h3>

      <p class="film-details__user-rating-feelings">How you feel it?</p>

      <div class="film-details__user-rating-score">
      ${new Array(MAX_RATING).fill(``).map((item, index) => `
        <input type="radio" name="score" class="film-details__user-rating-input visually-hidden" value="${index + 1}"
               id="rating-${index + 1}" ${(selectedFilm.yourRate === index + 1) ? `checked` : ``}>
        <label class="film-details__user-rating-label" for="rating-${index + 1}">${index + 1}</label>
`).join(``)}
      </div>
    </section>
  </div>
</section>
`);
