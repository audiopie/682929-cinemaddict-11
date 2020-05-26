const CARD_INFO = {
  MIN_RATING: 1,
  MAX_RATING: 10,
  MIN_COMMENTS: 0,
  MAX_COMMENTS: 5,
  MAX_TITLE_LENGTH: 140,
};

const PROFILE_RATING = {
  novice: `novice`,
  fan: `fan`,
  moviebuff: `movie buff`,
};

const FilterTypes = {
  ALL: `All movies`,
  WATCHLIST: `Watchlist`,
  HISTORY: `History`,
  FAVORITES: `Favorites`,
};

const EMOJI = [
  `angry.png`,
  `puke.png`,
  `sleeping.png`,
  `smile.png`
];

const COMMENT_EMOJI = {
  angry: `angry.png`,
  puke: `puke.png`,
  sleeping: `sleeping.png`,
  smile: `smile.png`,
};

export {
  CARD_INFO,
  FilterTypes,
  COMMENT_EMOJI,
  EMOJI,
  PROFILE_RATING,
};
