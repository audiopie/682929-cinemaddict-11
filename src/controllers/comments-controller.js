import CommentApi from "../api-comments.js";
import CommentsComponent from "../components/comments-list.js";
import NewComments from "../components/new-comment.js";

import {render, RenderPosition, remove} from "../utils/render.js";
const AUTHORIZATION = `Basic dxkl29whjdy7zwa=`;

export default class CommentsController {
  constructor(container, film, comments) {
    this._container = container;
    this._film = film;
    this._comments = comments;
    this._commentsComponent = null;
    this._commentsApi = null;
    this._newComment = null;
  }

  render() {
    this._commentsApi = new CommentApi(AUTHORIZATION);
    this._commentsApi.getComments(this._film.id)
    .then((comment) => {
      this._comments.setComment(comment);

      this._commentsComponent = new CommentsComponent(this._comments.getComments());
      this._newComment = new NewComments();
      const commentsWrap = this._commentsComponent.getElement();
      render(this._container, this._commentsComponent, RenderPosition.BEFOREEND);
      render(commentsWrap, this._newComment, RenderPosition.BEFOREEND);

      this._commentsComponent.deleteCommentButtonHandler((commentId) => {
        this._comments.removeComment(commentId);
        // return this._onDataChange(this, this._film, Object.assign({}, this._film, {}));
      });
    });
  }

  destroy() {
    remove(this._commentsComponent);
  }
}

