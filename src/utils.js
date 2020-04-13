import {FILTER_NAMES, MONTHS, PROFILE_RATING} from "./mock/const.js";


export const getRandom = (min, max) => {
  return Math.round(Math.random() * (max - min) + min);
};

export const getRandomRating = (min, max) => {
  return ((Math.random() * (max - min)) + min).toFixed(1);
};

export const getItemFromArray = (array) => {
  return getRandom(0, array.length - 1);
};

export const getRandomDate = {
  beginDate: new Date(1895, 0, 1),
  nowDate: new Date(),
  getReleaseYear() {
    return getRandom(this.beginDate.getFullYear(), this.nowDate.getFullYear());
  },
  getReleaseMonth() {
    return getItemFromArray(MONTHS);
  },
  getReleaseDate() {
    return getRandom(this.nowDate.getDate(), this.nowDate.getDate());
  },
  getDurationTime() {
    const durationHour = Math.ceil(Math.random() * this.nowDate.getHours());
    const durationTime = Math.ceil(Math.random() * this.nowDate.getMinutes());
    return `${durationHour}h ${durationTime}m`;
  },
};


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


