export const FILMS = [];
const FILMS_COUNT = 18;

const BEST_MOVIES_2018 = [`Mandy`, `Annihilation`, `Love After Love`, `The Rider`, `Cold War`, `You Were Never Really Here`, `First Reformed`, `Zama`, `Eighth Grade`, `Thunder Road`, `A Private War`, `Shoplifters`, `24 Frames`, `The Ballad of Buster Scruggs`, `Filmworker`];

const POSTERS = [`made-for-each-other.png`, `popeye-meets-sinbad.png`, `sagebrush-trail.jpg`, `santa-claus-conquers-the-martians.jpg`, `the-dance-of-life.jpg`, `the-great-flamarion.jpg`, `the-man-with-the-golden-arm.jpg`];

const TEXT_FOR_DESCRIPTION = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`;

const MIN_SENTENCES_COUNT = 1;
const MAX_SENTENCES_COUNT = 3;
const MIN_RATING = 1;
const MAX_RATING = 9;

const FIRST_YEAR = 1929;
const LAST_YEAR = 2018;

const MIN_COMMENTS_NUMBER = 0;
const MAX_COMMENTS_NUMBER = 100;

const DURATIONS = [96, 70, 45, 132, 80, 104, 110, 90, 60];
const MINUTES_PER_HOUR = 60;

const GENRES = [`Action`, `Adventure`, `Comedy`, `Crime`, `Drama`, `Horror`, `Epic`, `Family`, `Fantasy`, `Western`];

const getRandomElementFromArray = (array) => array[Math.floor(Math.random() * array.length)];
const getRandomInRange = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const getSeparateSentences = (text) => {
  let sentences = text.split(`.`);
  return sentences.map((sentence) => `${sentence}.`);
};

const getDescription = (text) => getSeparateSentences(text).slice(0, getRandomInRange(MIN_SENTENCES_COUNT, MAX_SENTENCES_COUNT)).join(` `);

const getRating = (min, max) => {
  const ratings = [];
  let i = min;
  while (i <= max) {
    ratings.push(i);
    i += 0.1;
  }
  return getRandomElementFromArray(ratings);
};

const getFormattedDuration = (time) => (time >= MINUTES_PER_HOUR) ? `${Math.floor(time / MINUTES_PER_HOUR)}h ${time % MINUTES_PER_HOUR}m` : `0h ${time}m`;

const getFilm = () => (
  {
    title: getRandomElementFromArray(BEST_MOVIES_2018),
    poster: getRandomElementFromArray(POSTERS),
    description: getDescription(TEXT_FOR_DESCRIPTION),
    rating: getRating(MIN_RATING, MAX_RATING).toFixed(1),
    year: getRandomInRange(FIRST_YEAR, LAST_YEAR),
    duration: getFormattedDuration(getRandomElementFromArray(DURATIONS)),
    genre: getRandomElementFromArray(GENRES),
    comments: getRandomInRange(MIN_COMMENTS_NUMBER, MAX_COMMENTS_NUMBER),
    isWatchList: Boolean(Math.round(Math.random())),
    isWatched: Boolean(Math.round(Math.random())),
    isFavorite: Boolean(Math.round(Math.random())),
  }
);

const getFilmsData = () => {
  for (let i = 0; i < FILMS_COUNT; i++) {
    FILMS.push(getFilm());
  }
};

getFilmsData();
