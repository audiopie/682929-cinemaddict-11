import AbstractSmartComponent from "./abstract-smart-component.js";

import {formatYear, formatRuntime} from "../utils/common.js";

const createFilmCardTemplate = (film) => {
  const {title, comments, rating, genre, poster, description} = film;
  const release = formatYear(film.dateRelease);
  const time = formatRuntime(film.runtime);
  const watchListButton = createButtonMarkup(`Add to watchlist`, `add-to-watchlist`, film.isWatchlist);
  const watchedButton = createButtonMarkup(`Mark as watched`, `mark-as-watched`, film.isWatched);
  const favoriteButton = createButtonMarkup(`Mark as favorite`, `favorite`, film.isFavorite);

  return (
    `<article class="film-card">
      <h3 class="film-card__title">${title}</h3>
      <p class="film-card__rating">${rating}</p>
      <p class="film-card__info">
        <span class="film-card__year">${release}</span>
        <span class="film-card__duration">${time}</span>
        <span class="film-card__genre">${genre}</span>
      </p>
      <img src="./${poster}" alt="" class="film-card__poster">
      <p class="film-card__description">${description.length > 140 ? description.slice(0, 140) + `...` : description}</p>
      <a class="film-card__comments">${comments.length} comments</a>
      <form class="film-card__controls">
        ${watchListButton}
        ${watchedButton}
        ${favoriteButton}
      </form>
    </article>`
  );
};

const createButtonMarkup = (buttonName, itemName, isActive) => {
  const activeItem = isActive ? `--${itemName} film-card__controls-item--active` : `--${itemName}`;
  return (
    `<button class="film-card__controls-item button 
    film-card__controls-item${activeItem}">${buttonName}</button>`
  );
};


export default class Card extends AbstractSmartComponent {
  constructor(film) {
    super();
    this._film = film;
    this._setWatchListHandler = null;
    this._setWatchedHandler = null;
    this._setFavorite = null;
  }

  getTemplate() {
    return createFilmCardTemplate(this._film);
  }

  recoveryListeners() {
    this.setWatchListButtonClickHandler(this._setWatchListHandler);
    this.setWatchedButtonClickHandler(this._setWatchedHandler);
    this.setFavoriteButtonClickHandler(this._setFavorite);
  }

  onPosterClickHandler(handler) {
    this.getElement().querySelector(`.film-card__poster`).addEventListener(`click`, handler);

  }

  onTitleClickHandler(handler) {
    this.getElement().querySelector(`.film-card__title`).addEventListener(`click`, handler);
  }

  onCommentsClickHandler(handler) {
    this.getElement().querySelector(`.film-card__comments`).addEventListener(`click`, handler);
  }


  setWatchListButtonClickHandler(handler) {
    this.getElement().querySelector(`.film-card__controls-item--add-to-watchlist`)
    .addEventListener(`click`, handler);
    this._setWatchListHandler = handler;
  }

  setWatchedButtonClickHandler(handler) {
    this.getElement().querySelector(`.film-card__controls-item--mark-as-watched`)
    .addEventListener(`click`, handler);
    this._setWatchedHandler = handler;
  }

  setFavoriteButtonClickHandler(handler) {
    this.getElement().querySelector(`.film-card__controls-item--favorite`)
    .addEventListener(`click`, handler);
    this._setFavorite = handler;
  }
}
