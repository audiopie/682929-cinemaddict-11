import CommentApi from "../api-comments.js";
import CommentsComponent from "../components/comments-list.js";
import NewComments from "../components/new-comment.js";
import Comment from "../models/comment.js";

import {render, RenderPosition, remove} from "../utils/render.js";
const AUTHORIZATION = `Basic dxkl29whjdy7zwa=`;


export default class CommentsController {
  constructor(filmController, container, film, comments, onCommentChange) {
    this._container = container;
    this._film = film;
    this.filmController = filmController;
    this._comments = comments;
    this._commentsComponent = null;
    this.commentChange = onCommentChange;
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
      const innerFormContainer = this._container.querySelector(`.film-details__inner`);

      render(innerFormContainer, this._commentsComponent, RenderPosition.BEFOREEND);
      render(commentsWrap, this._newComment, RenderPosition.BEFOREEND);

      this._commentsComponent.deleteCommentButtonHandler((commentId) => {
        this._comments.removeComment(commentId);
        // return this._onDataChange(this, this._film, Object.assign({}, this._film, {}));
      });

      this._newComment.setCommentHandler((event) => {
        if (event.keyCode === 13 && event.ctrlKey) {
          const form = this._container.querySelector(`.film-details__inner`);
          const formData = new FormData(form);
          const inputComment = formData.get(`comment`);
          const newComment = this._newComment.getNewComment(inputComment);
          const commentToSend = Comment.parseComment(this.toRAW(newComment));
          this._commentsApi.setComment(this._film.id, commentToSend)
            .then((movie) => {
              this.destroy();
              this.commentChange(movie);
            });

        }
      });
    });

  }

  toRAW(commentToRaw) {
    return {
      "comment": commentToRaw.text,
      "date": commentToRaw.dayCommented,
      "emotion": commentToRaw.emoji,
    };
  }

  destroy() {
    remove(this._commentsComponent);
  }
}

