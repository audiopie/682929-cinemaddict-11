import AbstractSmartComponent from "./abstract-smart-component.js";

const filmDetailTemplate = (film, count, details) => {
  const {title, rating, filmPublicationDate, duration, genre, img, description, monthPublicationDate, datePublication, isWatchList, isWatched, isFavorite} = film;
  const {actors, director, writers, country, filmDetailsAge} = details;
  return (
    `<section class="film-details">
    <form class="film-details__inner" action="" method="get">
      <div class="form-details__top-container">
        <div class="film-details__close">
          <button class="film-details__close-btn" type="button">close</button>
        </div>
        <div class="film-details__info-wrap">
          <div class="film-details__poster">
            <img class="film-details__poster-img" src="./images/posters/${img}" alt="">
  
            <p class="film-details__age">${filmDetailsAge}</p>
          </div>
  
          <div class="film-details__info">
            <div class="film-details__info-head">
              <div class="film-details__title-wrap">
                <h3 class="film-details__title">${title}</h3>
                <p class="film-details__title-original">Original: ${title}</p>
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
                <td class="film-details__cell">${datePublication} ${monthPublicationDate} ${filmPublicationDate}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Runtime</td>
                <td class="film-details__cell">${duration}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Country</td>
                <td class="film-details__cell">${country}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">${genre.length <= 1 ? `Genres` : `Genre`}</td>
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
          <input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" name="watchlist" ${isWatchList ? `checked` : ``}>
          <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">Add to watchlist</label>
  
          <input type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched" ${isWatched ? `checked` : ``}>
          <label for="watched" class="film-details__control-label film-details__control-label--watched">Already watched</label>
  
          <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" name="favorite" ${isFavorite ? `checked` : ``}>
          <label for="favorite" class="film-details__control-label film-details__control-label--favorite">Add to favorites</label>
        </section>
      </div>
  
      <div class="form-details__bottom-container">
        <section class="film-details__comments-wrap">
        <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${count}</span></h3>
        <ul class="film-details__comments-list">
          </ul>
          </div>
        </section>
      </div>
    </form>
  </section>
  `
  );
};

export default class FilmDetail extends AbstractSmartComponent {
  constructor(film, count, details) {
    super();
    this._film = film;
    this._count = count;
    this._details = details;

    this._watchListButtonClickHandler = null;
    this._watchedButtonClickHandler = null;
    this._favoriteButtonClickHandler = null;
  }

  recoveryListeners() {
    this.setWatchListButtonClickHandler(this._watchListButtonClickHandler);
    this.setWatchedButtonClickHandler(this._watchedButtonClickHandler);
    this.setFavoriteButtonClickHandler(this._favoriteButtonClickHandler);

  }

  rerender() {
    super.rerender();
  }

  getTemplate() {
    return filmDetailTemplate(this._film, this._count, this._details);
  }

  setWatchListButtonClickHandler(handler) {
    this.getElement().querySelector(`#watchlist`)
    .addEventListener(`click`, handler);

    this._watchListButtonClickHandler = handler;

  }

  setWatchedButtonClickHandler(handler) {
    this.getElement().querySelector(`#watched`)
    .addEventListener(`click`, handler);

    this._watchedButtonClickHandler = handler;
  }

  setFavoriteButtonClickHandler(handler) {
    this.getElement().querySelector(`#favorite`)
    .addEventListener(`click`, handler);

    this._favoriteButtonClickHandler = handler;
  }
}

