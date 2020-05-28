import AbstractSmartComponent from "./abstract-smart-component.js";
import {COMMENT_EMOJI} from "../mock/const";
import {formatToRawDate} from "../utils/common.js";

const emotion = {
  "angry.png": `angry`,
  "puke.png": `puke`,
  "sleeping.png": `sleeping`,
  "smile.png": `smile`,
};

const createCommentsTemplate = (emoji) => {
  const emojiMarkup = emoji ? `<img src ="./images/emoji/${emoji}" alt="" width="55" height="55">` : ``;
  return (
    `<div class="film-details__new-comment">
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
    </div>`
  );
};


export default class NewComments extends AbstractSmartComponent {
  constructor(film, commentsModel) {
    super();
    this._film = film;
    this._comment = commentsModel;
    this._emoji = null;
    this._setCommentHandler = null;

    this._subscribeOnEvents();
  }

  recoveryListeners() {
    this._subscribeOnEvents();
    this.setCommentHandler(this._setCommentHandler);
  }

  getTemplate() {
    return createCommentsTemplate(this._emoji);
  }

  setCommentHandler(handler) {
    this.getElement().querySelector(`.film-details__comment-input`)
    .addEventListener(`keydown`, handler);
    this._setCommentHandler = handler;
  }


  getNewComment(newComment) {
    const date = new Date();
    return {
      author: `Some`,
      text: newComment,
      emoji: emotion[this._emoji],
      dayCommented: formatToRawDate(date),
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
