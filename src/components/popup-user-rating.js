export const getUserRatingMarkup = (poster, title, userRating) => (`
<section class="film-details__user-rating-wrap">
  <div class="film-details__user-rating-controls">
    <button class="film-details__watched-reset" type="button">Undo</button>
  </div>

  <div class="film-details__user-score">
    <div class="film-details__user-rating-poster">
      <img src="./images/posters/${poster}" alt="film-poster" class="film-details__user-rating-img">
    </div>

    <section class="film-details__user-rating-inner">
      <h3 class="film-details__user-rating-title">${title}</h3>

      <p class="film-details__user-rating-feelings">How you feel it?</p>

      <div class="film-details__user-rating-score">
      ${Array.of(1, 2, 3, 4, 5, 6, 7, 8, 9).map((score) => `
        <input type="radio" name="score" class="film-details__user-rating-input visually-hidden" value="${score}"
               id="rating-${score}" ${(userRating === score) ? `checked` : ``}>
        <label class="film-details__user-rating-label" for="rating-${score}">${score}</label>
`).join(``)}
      </div>
    </section>
  </div>
</section>
`);
