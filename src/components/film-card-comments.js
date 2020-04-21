import AbstractComponent from "./abstract-component.js";

const createCommentsTemplate = (author, text, emoji, dayCommented) => {
  return (
    `<li class="film-details__comment">
    <span class="film-details__comment-emoji">
      <img src="./images/emoji/${emoji}" width="55" height="55" alt="emoji-smile">
    </span>
    <div>
      <p class="film-details__comment-text"> ${text}</p>
      <p class="film-details__comment-info">
        <span class="film-details__comment-author"> ${author}</span>
        <span class="film-details__comment-day"> ${dayCommented}</span>
        <button class="film-details__comment-delete">Delete</button>
      </p>
    </div>
  </li>`
  );
};

export default class Comments extends AbstractComponent {
  constructor(commentAuthor, commentText, commentEmoji, commentDayCommented) {
    super();
    this._commentAuthor = commentAuthor;
    this._commentText = commentText;
    this._commentEmoji = commentEmoji;
    this._commentDayCommented = commentDayCommented;
  }

  getTemplate() {
    return createCommentsTemplate(this._commentAuthor, this._commentText, this._commentEmoji, this._commentDayCommented);
  }

}

