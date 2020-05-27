import AbstractSmartComponent from "./abstract-smart-component.js";
import {COMMENT_EMOJI} from "../mock/const";

import {formatCommentDate} from "../utils/common.js";

const createCommentsTemplate = (author, text, emotion, date, id) => {
  const commentDate = formatCommentDate(date);
  return (
    `<li class="film-details__comment">
    <span class="film-details__comment-emoji">
      <img src="./images/emoji/${COMMENT_EMOJI[emotion]}" width="55" height="55" alt="emoji-smile">
    </span>
    <div>
      <p class="film-details__comment-text"> ${text}</p>
      <p class="film-details__comment-info">
        <span class="film-details__comment-author">${author}</span>
        <span class="film-details__comment-day">${commentDate}</span>
        <button class="film-details__comment-delete" data-comment-id="${id}">Delete</button>
      </p>
    </div>
  </li>`
  );
};

const createComments = (comments) => {
  const commentsMarkup = comments.map((comment) => createCommentsTemplate(comment.author, comment.comment, comment.emotion, comment.date, comment.id)).join(`\n`);
  return (
    `<div class="form-details__bottom-container">
    <section class="film-details__comments-wrap">
      <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${comments.length}</span></h3>
      <ul class="film-details__comments-list">
        ${commentsMarkup}
        </ul>
      </section>
      </div>`
  );
};


export default class Comments extends AbstractSmartComponent {
  constructor(commentsModel) {
    super();
    this._comments = commentsModel;
    this._deleteCommentButtonHandler = null;
  }

  recoveryListeners() {
    this.deleteCommentButtonHandler(this._deleteCommentButtonHandler);
  }

  getTemplate() {
    return createComments(this._comments);
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

}

