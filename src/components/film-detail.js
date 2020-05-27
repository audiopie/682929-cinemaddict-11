import AbstractSmartComponent from "./abstract-smart-component.js";

import {formatYear, formatRuntime} from "../utils/common.js";

const filmDetailTemplate = (film) => {
  const {title, writers, rating, alternativeTitle, releaseCountry, actors, ageRating, director, genre, poster, description, isWatchlist, isWatched, isFavorite} = film;
  const release = formatYear(film.dateRelease);
  const time = formatRuntime(film.runtime);
  return (
    `<section class="film-details">
    <form class="film-details__inner" action="" method="get">
      <div class="form-details__top-container">
        <div class="film-details__close">
          <button class="film-details__close-btn" type="button">close</button>
        </div>
        <div class="film-details__info-wrap">
          <div class="film-details__poster">
            <img class="film-details__poster-img" src="./${poster}" alt="">
  
            <p class="film-details__age">${ageRating}</p>
          </div>
  
          <div class="film-details__info">
            <div class="film-details__info-head">
              <div class="film-details__title-wrap">
                <h3 class="film-details__title">${title}</h3>
                <p class="film-details__title-original">Original: ${alternativeTitle}</p>
              </div>
  
              <div class="film-details__rating">
                <p class="film-details__total-rating">${rating}</p>
              </div>
            </div>
  
            <table class="film-details__table">
              <tr class="film-details__row">
                <td class="film-details__term">Director</td>
                <td class="film-details__cell">${director}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Writers</td>
                <td class="film-details__cell">${writers}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Actors</td>
                <td class="film-details__cell">${actors}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Release Date</td>
                <td class="film-details__cell">${release}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Runtime</td>
                <td class="film-details__cell">${time}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Country</td>
                <td class="film-details__cell">${releaseCountry}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">${genre.length > 1 ? `Genres` : `Genre`}</td>
                <td class="film-details__cell">
                  <span class="film-details__genre">${genre}</span>

              </tr>
            </table>
  
            <p class="film-details__film-description">
            ${description}
            </p>
          </div>
        </div>
  
        <section class="film-details__controls">
          <input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" name="watchlist" ${isWatchlist ? `checked` : ``}>
          <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">Add to watchlist</label>
  
          <input type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched" ${isWatched ? `checked` : ``}>
          <label for="watched" class="film-details__control-label film-details__control-label--watched">Already watched</label>
  
          <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" name="favorite" ${isFavorite ? `checked` : ``}>
          <label for="favorite" class="film-details__control-label film-details__control-label--favorite">Add to favorites</label>
        </section>
      </div>
    </form>
  </section>
  `
  );
};

export default class FilmDetail extends AbstractSmartComponent {
  constructor(film) {
    super();
    this._film = film;
    this._closeButtonHandler = null;
    this._setWatchListDetailHandler = null;
    this._setWatchedDetailHandler = null;
    this._setFavoriteDetailHandler = null;

  }

  recoveryListeners() {
    this.onCloseButtonHandler(this._closeButtonHandler);
    this.setWatchListButtonClickHandlerDetail(this._setWatchListDetailHandler);
    this.setWatchedButtonClickHandlerDetail(this._setWatchedDetailHandler);
    this.setFavoriteButtonClickHandlerDetail(this._setFavoriteDetailHandler);
  }

  getTemplate() {
    return filmDetailTemplate(this._film);
  }

  onCloseButtonHandler(handler) {
    this.getElement().querySelector(`.film-details__close-btn`).
    addEventListener(`click`, handler);

    this._closeButtonHandler = handler;
  }

  setWatchListButtonClickHandlerDetail(handler) {
    this.getElement().querySelector(`#watchlist`)
    .addEventListener(`click`, handler);
    this._setWatchListDetailHandler = handler;
  }

  setWatchedButtonClickHandlerDetail(handler) {
    this.getElement().querySelector(`#watched`)
    .addEventListener(`click`, handler);

    this._setWatchedDetailHandler = handler;
  }

  setFavoriteButtonClickHandlerDetail(handler) {
    this.getElement().querySelector(`#favorite`)
    .addEventListener(`click`, handler);

    this._setFavoriteDetailHandler = handler;
  }
}
