export const FILMS = [];
const FILMS_COUNT = 18;

const BEST_MOVIES_2018 = [`Mandy`, `Annihilation`, `Love After Love`, `The Rider`, `Cold War`, `You Were Never Really Here`, `First Reformed`, `Zama`, `Eighth Grade`, `Thunder Road`, `A Private War`, `Shoplifters`, `24 Frames`, `The Ballad of Buster Scruggs`, `Filmworker`];

const FILM_DIRECTORS = [`David Lynch`, `Martin Scorsese`, `Steven Soderbergh`, `Hayao Miyazaki`, `Pedro Almodovar`];

const SCENARISTS = [`Quentin Tarantino`, `Christopher Nolan`, `Joel Coen`, `Wes Anderson`];

const ACTORS = [`Leonardo DiCaprio`, `Robert De Niro`, `Matt Damon`, `Edward Norton`];

const POSTERS = [`made-for-each-other.png`, `popeye-meets-sinbad.png`, `sagebrush-trail.jpg`, `santa-claus-conquers-the-martians.jpg`, `the-dance-of-life.jpg`, `the-great-flamarion.jpg`, `the-man-with-the-golden-arm.jpg`];

const TEXT_FOR_DESCRIPTION = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`;

const AGE_REQIREMENTS = [`7+`, `12+`, `18+`];

const MIN_SENTENCES_COUNT = 1;
const MAX_SENTENCES_COUNT = 3;
const MIN_RATING = 1;
const MAX_RATING = 9;

const RELEASE_DATES = [`01 April 1995`, `02 April 2000`, `03 April 2010`, `04 April 2015`];
const COUNTRIES = [`USA`, `Russia`, `China`];

const DURATIONS = [96, 70, 45, 132, 80, 104, 110, 90, 60];
const MINUTES_PER_HOUR = 60;

const GENRES = [`Action`, `Adventure`, `Comedy`, `Crime`];

const COMMENTS = [`Interesting setting and a good cast`, `Booooooooooring`, `Very very old. Meh`, `Almost two hours? Seriously?`, `Definitely can recommend!`, `Great!`];

const getRandomElementFromArray = (array) => array[Math.floor(Math.random() * array.length)];
const getRandomInRange = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
};

const getComments = (commentsArray) => {
  const shuffledArray = shuffleArray(commentsArray);
  const randomCommentsCount = getRandomInRange(0, shuffledArray.length);
  return shuffledArray.slice(0, randomCommentsCount);
};

const getSeparateSentences = (text) => {
  let sentences = text.split(`.`);
  return sentences.map((sentence) => `${sentence}.`);
};

const getDescription = (text) => getSeparateSentences(text).slice(0, getRandomInRange(MIN_SENTENCES_COUNT, MAX_SENTENCES_COUNT)).join(` `);

const getRating = (min, max) => {
  const ratings = [];
  for (let i = min; i <= max; i += 0.1) {
    ratings.push(i);
  }
  return getRandomElementFromArray(ratings);
};

const getFormattedDuration = (time) => (time >= MINUTES_PER_HOUR) ? `${Math.floor(time / MINUTES_PER_HOUR)}h ${time % MINUTES_PER_HOUR}m` : `0h ${time}m`;

const getGenres = (genresArray) => {
  const genresCount = getRandomInRange(0, genresArray.length);
  return genresArray.splice(0, genresCount);
};

const getFilm = () => (
  {
    title: getRandomElementFromArray(BEST_MOVIES_2018),
    titleOriginal: getRandomElementFromArray(BEST_MOVIES_2018),
    poster: getRandomElementFromArray(POSTERS),
    description: getDescription(TEXT_FOR_DESCRIPTION),
    rating: getRating(MIN_RATING, MAX_RATING).toFixed(1),
    yourRate: getRandomInRange(0, MAX_RATING),
    filmDirector: getRandomElementFromArray(FILM_DIRECTORS),
    writers: SCENARISTS.join(`, `),
    actors: ACTORS.join(`, `),
    date: getRandomElementFromArray(RELEASE_DATES),
    country: getRandomElementFromArray(COUNTRIES),
    duration: getFormattedDuration(getRandomElementFromArray(DURATIONS)),
    genres: getGenres(GENRES),
    age: getRandomElementFromArray(AGE_REQIREMENTS),
    comments: getComments(COMMENTS),
    isWatchList: Boolean(Math.round(Math.random())),
    isWatched: Boolean(Math.round(Math.random())),
    isFavorite: Boolean(Math.round(Math.random())),
  }
);

const getFilmsData = (filmsArray, filmsCount) => {
  for (let i = 0; i < filmsCount; i++) {
    filmsArray.push(getFilm());
  }
};

getFilmsData(FILMS, FILMS_COUNT);
