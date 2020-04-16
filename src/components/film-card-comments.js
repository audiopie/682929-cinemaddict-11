const createComments = (comments) => {
  const commentMarkup = comments.map((it) => createCommentsTemplate(it.author, it.text, it.emoji, it.dayCommented)).join(`\n`);
  return (
    `${commentMarkup}`
  );
};

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

export default class Comments {
  constructor(comments) {
    this._comments = comments;

    this._element = null;
  }

  getTemplate() {
    return createComments(this._comments);
  }

  getElement() {
    if (!this._element) {
      return this.getTemplate();
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}

