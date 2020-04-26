import CardComponent from "../components/film-card.js";
import FilmDetailComponent from "../components/film-detail.js";
import NewCommentComponent from "../components/create-new-comment.js";
import CommentsComponent from "../components/film-card-comments";

import {generateCountObjects, generateComment, generateFilmDetail} from "../mock/film.js";
import {render, RenderPosition} from "../utils/render.js";

const bodyElement = document.querySelector(`body`);


export default class MovieController {
  constructor(container, onDataChange) {
    this._container = container;
    this._onDataChange = onDataChange;

    this._cardComponent = null;
    this._filmDetailComponent = null;
    this._newCommentComponent = null;
    this._commentsComponent = null;

  }

  _openPopup(film) {
    const commentsCount = +film.comments;
    const filmDetails = generateFilmDetail();

    this._filmDetailComponent = new FilmDetailComponent(film, commentsCount, filmDetails);
    const comments = generateCountObjects(commentsCount, generateComment);
    this._commentsComponent = comments.map((comment) => new CommentsComponent(comment.author, comment.text, comment.emoji, comment.dayCommented).getElement());
    this._newCommentComponent = new NewCommentComponent().getElement();

    bodyElement.appendChild(this._filmDetailComponent.getElement());

    this._commentsComponent.forEach((comment) => bodyElement.querySelector(`.film-details__comments-list`).appendChild(comment));

    bodyElement.querySelector(`.film-details__comments-wrap`).appendChild(this._newCommentComponent);

    this._filmDetailComponent.onCloseButtonHandler(() => {
      bodyElement.removeChild(this._filmDetailComponent.getElement());
    });

  }

  render(film) {
    const oldFilmComponent = this._cardComponent;
    if (this._cardComponent !== null && oldFilmComponent === this._cardComponent) {
      this._cardComponent.rerender();
    } else {
      this._cardComponent = new CardComponent(film);
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

    this._cardComponent.seFavoriteButtonClickHandler((event) => {
      event.preventDefault();
      this._onDataChange(this, film, Object.assign({}, film, {isFavorite: !film.isFavorite}));
    });

    this._cardComponent.onPosterClickHandler(() => {
      this._openPopup(film);
    });

    this._cardComponent.onTitleClickHandler(() => {
      this._openPopup(film);
    });

    this._cardComponent.onCommentsClickHandler(() => {
      this._openPopup(film);
    });

  }

}
