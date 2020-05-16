import AbstractSmartComponent from "./abstract-smart-component.js";
import {generateFilmDetail} from "../mock/film.js";
import {COMMENT_EMOJI} from "../mock/const";


const createCommentsTemplate = (author, text, emoji, dayCommented, commentId) => {
  return (
    `<li class="film-details__comment">
    <span class="film-details__comment-emoji">
      <img src="./images/emoji/${emoji}" width="55" height="55" alt="emoji-smile">
    </span>
    <div>
      <p class="film-details__comment-text"> ${text}</p>
      <p class="film-details__comment-info">
        <span class="film-details__comment-author">${author}</span>
        <span class="film-details__comment-day">${dayCommented}</span>
        <button class="film-details__comment-delete" data-comment-id="${commentId}">Delete</button>
      </p>
    </div>
  </li>`
  );
};


const filmDetailTemplate = (film, emoji, comments) => {
  const {title, rating, filmPublicationDate, duration, genre, img, description, monthPublicationDate, datePublication, isWatchList, isWatched, isFavorite} = film;
  const {actors, director, writers, country, filmDetailsAge} = generateFilmDetail();
  const emojiMarkup = emoji ? `<img src ="./images/emoji/${emoji}" alt="" width="55" height="55">` : ``;
  const commentsMarkup = comments.map((comment) => createCommentsTemplate(comment.author, comment.text, comment.emoji, comment.dayCommented, comment.id)).join(`\n`);
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
        <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${film.comments.length}</span></h3>
        <ul class="film-details__comments-list">
          ${commentsMarkup}

          <div class="film-details__new-comment">
    <div for="add-emoji" class="film-details__add-emoji-label">
    ${emojiMarkup}
    <input type="hidden" name="add-emoji" value="">
    </div>

    <label class="film-details__comment-label">
      <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
    </label>

    <div class="film-details__emoji-list">
      <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile">
      <label class="film-details__emoji-label" for="emoji-smile">
        <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
      </label>

      <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping">
      <label class="film-details__emoji-label" for="emoji-sleeping">
        <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
      </label>

      <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke">
      <label class="film-details__emoji-label" for="emoji-puke">
        <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
      </label>

      <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry">
      <label class="film-details__emoji-label" for="emoji-angry">
        <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
      </label>
    </div>
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
  constructor(film) {
    super();
    this._film = film;
    this._comments = film.comments;
    this._closeButtonHandler = null;
    this._setWatchListDetailHandler = null;
    this._setWatchedDetailHandler = null;
    this._setFavoriteDetailHandler = null;
    this._deleteCommentButtonHandler = null;
    this._setCommentHandler = null;
    this._getNewComment = null;
    this._emoji = null;

    this._subscribeOnEvents();

  }

  recoveryListeners() {
    this.onCloseButtonHandler(this._closeButtonHandler);
    this.setWatchListButtonClickHandlerDetail(this._setWatchListDetailHandler);
    this.setWatchedButtonClickHandlerDetail(this._setWatchedDetailHandler);
    this.setFavoriteButtonClickHandlerDetail(this._setFavoriteDetailHandler);
    this.deleteCommentButtonHandler(this._deleteCommentButtonHandler);
    this.setCommentHandler(this._setCommentHandler);
    this._subscribeOnEvents();
  }

  getTemplate() {
    return filmDetailTemplate(this._film, this._emoji, this._comments);
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

  deleteCommentButtonHandler(handler) {
    this.getElement().querySelectorAll(`.film-details__comment-delete`).forEach((it) => {
      it.addEventListener(`click`, (event) => {
        event.preventDefault();
        const currentID = it.getAttribute(`data-comment-id`);
        handler(+currentID);
      });
      this._deleteCommentButtonHandler = handler;
    });
  }

  setCommentHandler(handler) {
    this.getElement().querySelector(`.film-details__comment-input`)
    .addEventListener(`keydown`, handler);
    this._setCommentHandler = handler;
  }

  getNewComment(newComment) {
    return {
      author: `Some`,
      text: newComment,
      emoji: this._emoji,
      dayCommented: `today`,
      id: new Date().getSeconds() + Math.random(),
    };
  }


  _subscribeOnEvents() {
    const element = this.getElement();

    element.querySelector(`.film-details__emoji-list`).addEventListener(`click`, (event) => {
      if (event.target.value in COMMENT_EMOJI) {
        this._emoji = COMMENT_EMOJI[event.target.value];
        this.rerender();
      }
    });
  }
}
