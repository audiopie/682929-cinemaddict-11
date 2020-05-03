import {FilterTypes} from "../mock/const.js";

export const getWatchlistMovies = (movies) => {
  return movies.filter((movie) => movie.isWatchlist);
};

export const getHistoryMovies = (movies) => {
  return movies.filter((movie) => movie.isWatched);
};

export const getFavoritesMovies = (movies) => {
  return movies.filter((movie) => movie.isFavorite);
};

export const getMoviesByFilter = (movies, FilterType) => {

  switch (FilterType) {
    case FilterTypes.All:
      return movies;
    case FilterTypes.WATCHLIST:
      return getWatchlistMovies(movies);
    case FilterTypes.HISTORY:
      return getHistoryMovies(movies);
    case FilterTypes.FAVORITES:
      return getFavoritesMovies(movies);
  }
  return movies;
};

