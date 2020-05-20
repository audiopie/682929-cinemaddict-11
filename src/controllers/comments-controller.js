import CommentsComponent from "../components/comments-list.js";

import {render, RenderPosition} from "../utils/render.js";

export default class CommentsController {
  constructor(container, film) {
    this._container = container;
    this._film = film;
    this._comments = null;
    this._commentsComponent = null;
  }

  render(comments) {
    this._comments = comments;

    this._commentsComponent = new CommentsComponent(this._comments);

    render(this._container, this._commentsComponent, RenderPosition.BEFOREEND);
  }
}
