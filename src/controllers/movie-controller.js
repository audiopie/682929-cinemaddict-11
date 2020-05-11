import CardComponent from "../components/film-card.js";
import FilmDetailComponent from "../components/film-detail.js";
import CommentsModel from "../models/comments.js";

import {render, replace, remove, RenderPosition} from "../utils/render.js";
import {generateCountObjects, generateComment} from "../mock/film.js";

const bodyElement = document.querySelector(`body`);


export default class MovieController {
  constructor(container, onDataChange, onViewChange) {
    this._container = container;
    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;
    this._commentsModel = new CommentsModel();
    this._cardComponent = null;
    this._filmDetailComponent = null;
    this._onEscKeyDown = this._onEscKeyDown.bind(this);
  }

  _openPopup() {
    this._onViewChange();
    bodyElement.appendChild(this._filmDetailComponent.getElement());
  }

  setDefaultView() {
    this._filmDetailComponent.getElement().remove();
  }

  _onEscKeyDown(evt) {
    if (evt.key === `Escape` || evt.key === `Ecs`) {
      this.setDefaultView();
    }
  }

  destroy() {
    remove(this._cardComponent);
    document.removeEventListener(`keydown`, this._onEscKeyDown);
  }


  render(film) {
    const oldFilmComponent = this._cardComponent;
    const oldDetailComponent = this._filmDetailComponent;

    this._cardComponent = new CardComponent(film);
    this._comments = generateCountObjects(film.comments, generateComment);
    this._commentsModel.setComments(this._comments);
    this._filmDetailComponent = new FilmDetailComponent(film, this._commentsModel.getComments());


    if (oldFilmComponent && oldDetailComponent) {
      replace(this._cardComponent, oldFilmComponent);
      replace(this._filmDetailComponent, oldDetailComponent);
    } else {
      render(this._container, this._cardComponent, RenderPosition.BEFOREEND);
    }

    this._cardComponent.setWatchListButtonClickHandler((event) => {
      event.preventDefault();
      this._onDataChange(this, film, Object.assign({}, film, {isWatchList: !film.isWatchList}));
    });

    this._cardComponent.setWatchedButtonClickHandler((event) => {
      event.preventDefault();
      this._onDataChange(this, film, Object.assign({}, film, {isWatched: !film.isWatched}));
    });

    this._cardComponent.setFavoriteButtonClickHandler((event) => {
      event.preventDefault();
      this._onDataChange(this, film, Object.assign({}, film, {isFavorite: !film.isFavorite}));
    });

    this._filmDetailComponent.setWatchListButtonClickHandlerDetail((event) => {
      event.preventDefault();
      this._onDataChange(this, film, Object.assign({}, film, {isWatchList: !film.isWatchList}));
    });

    this._filmDetailComponent.setWatchedButtonClickHandlerDetail((event) => {
      event.preventDefault();
      this._onDataChange(this, film, Object.assign({}, film, {isWatched: !film.isWatched}));
    });

    this._filmDetailComponent.setFavoriteButtonClickHandlerDetail((event) => {
      event.preventDefault();
      this._onDataChange(this, film, Object.assign({}, film, {isFavorite: !film.isFavorite}));
    });

    this._filmDetailComponent.deleteCommentButtonHandler((commentId) => {
      const currentArray = this._commentsModel.removeComment(commentId);
      this._onDataChange(this, film, Object.assign({}, film, {comments: currentArray.length}));
    });

    this._filmDetailComponent.setCommentHandler((event) => {
      if (event.keyCode === 13 && event.ctrlKey) {
        const form = this._filmDetailComponent.getElement().querySelector(`.film-details__inner`);
        const formData = new FormData(form);
        const comment = formData.get(`comment`);
        const newComment = this._filmDetailComponent.getNewComment(comment);
        const currentArray = this._commentsModel.addComment(newComment);
        this._onDataChange(this, film, Object.assign({}, film, {comments: currentArray.length}));
      }
    });

    this._filmDetailComponent.onCloseButtonHandler(() => {
      this.setDefaultView();
      document.removeEventListener(`keydown`, this._onEscKeyDown);
    });


    this._cardComponent.onPosterClickHandler(() => {
      this._openPopup();
      document.addEventListener(`keydown`, this._onEscKeyDown);
    });

    this._cardComponent.onTitleClickHandler(() => {
      this._openPopup();
      document.addEventListener(`keydown`, this._onEscKeyDown);
    });

    this._cardComponent.onCommentsClickHandler(() => {
      this._openPopup();
      document.addEventListener(`keydown`, this._onEscKeyDown);
    });

  }
}

