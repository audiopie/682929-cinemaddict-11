import AbstractComponent from "./abstract-component.js";

const createFilmCardTemplate = (film) => {
  const {title, rating, filmPublicationDate, duration, genre, img, description, comments, maxTitleLength, isWatchlist, isWatched, isFavorite} = film;

  return (
    `<article class="film-card">
      <h3 class="film-card__title">${title}</h3>
      <p class="film-card__rating">${rating}</p>
      <p class="film-card__info">
        <span class="film-card__year">${filmPublicationDate}</span>
        <span class="film-card__duration">${duration}</span>
        <span class="film-card__genre">${genre}</span>
      </p>
      <img src="./images/posters/${img}" alt="" class="film-card__poster">
      <p class="film-card__description">${description.length > maxTitleLength ? description.slice(0, maxTitleLength) + `...` : description}</p>
      <a class="film-card__comments">${comments} comments</a>
      <form class="film-card__controls">
        <button class="film-card__controls-item button film-card__controls-item${isWatchlist ? `--add-to-watchlist film-card__controls-item--active` : `--add-to-watchlist`} ">Add to watchlist</button>
        <button class="film-card__controls-item button film-card__controls-item${isWatched ? `--mark-as-watched film-card__controls-item--active` : `--mark-as-watched`}">Mark as watched</button>
        <button class="film-card__controls-item button film-card__controls-item${isFavorite ? `--favorite film-card__controls-item--active` : `--favorite`}">Mark as favorite</button>
      </form>
    </article>`
  );
};

export default class Card extends AbstractComponent {
  constructor(film) {
    super();
    this._film = film;
  }

  getTemplate() {
    return createFilmCardTemplate(this._film);
  }

  setCardComponentClickHandler(handler) {
    this.getElement().addEventListener(`click`, handler);
  }
}

