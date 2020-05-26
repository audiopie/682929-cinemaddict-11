import {PROFILE_RATING} from "./mock/const.js";


export const getRandom = (min, max) => {
  return Math.round(Math.random() * (max - min) + min);
};

const FILTER_NAMES = [`All movies`, `Watchlist`, `History`, `Favorites`];


export const generateFilters = () => {
  return FILTER_NAMES.map((it) => {
    return {
      name: it,
      count: Math.floor(Math.random() * 10),
    };
  });
};

export const generateProfile = () => {
  const rating = getRandom(0, 30);
  if (rating > 0 && rating <= 10) {
    return PROFILE_RATING.novice;
  } else if (rating >= 10 && rating <= 20) {
    return PROFILE_RATING.fan;
  } else if (rating >= 21) {
    return PROFILE_RATING.moviebuff;
  }
  return ``;
};

