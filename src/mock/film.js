import {getItemFromArray, getRandomRating, getRandom, getRandomDate} from '../utils.js';
import {FILMS_TITLES, GENRES, POSTERS, CARD_INFO, DESCRIPTIONS, MONTHS, COMMENTED_DAY, COMMENT_EMOJI, COMMENT_AUTHOR, COMMENT_TEXT, DIRECTION, ACTORS, WRITERS, COUNTRY, ageRate} from "./const.js";


const generateFilm = () => {
  return {
    title: FILMS_TITLES[getItemFromArray(FILMS_TITLES)],
    rating: getRandomRating(CARD_INFO.MIN_RATING, CARD_INFO.MAX_RATING),
    filmPublicationDate: getRandomDate.getReleaseYear(),
    monthPublicationDate: MONTHS[getRandomDate.getReleaseMonth()],
    datePublication: getRandomDate.getReleaseDate(),
    duration: getRandomDate.getDurationTime(),
    genre: GENRES[getItemFromArray(GENRES)],
    img: POSTERS[getItemFromArray(POSTERS)],
    description: DESCRIPTIONS[getItemFromArray(DESCRIPTIONS)],
    comments: getRandom(CARD_INFO.MIN_COMMENTS, CARD_INFO.MAX_COMMENTS),
    maxTitleLength: CARD_INFO.MAX_TITLE_LENGTH,
    isWatchlist: Math.random() > 0.5,
    isWatched: Math.random() > 0.5,
    isFavorite: Math.random() > 0.5,
  };
};


const generateFilmDetail = () => {
  return {
    filmDetailsAge: ageRate[getItemFromArray(ageRate)],
    director: DIRECTION[getItemFromArray(DIRECTION)],
    writers: [...WRITERS],
    actors: [...ACTORS],
    country: COUNTRY[getItemFromArray(COUNTRY)],
  };
};


const generateCountObjects = (count, array) => {
  return new Array(count)
  .fill(``)
  .map(array);
};

const generateComment = () => {
  return {
    author: COMMENT_AUTHOR[getItemFromArray(COMMENT_AUTHOR)],
    text: COMMENT_TEXT[getItemFromArray(COMMENT_TEXT)],
    emoji: COMMENT_EMOJI[getItemFromArray(COMMENT_EMOJI)],
    dayCommented: COMMENTED_DAY[getItemFromArray(COMMENTED_DAY)]
  };
};


export {generateFilm, generateCountObjects, generateComment, generateFilmDetail};
