import CardComponent from "../components/film-card.js";
import FilmDetailComponent from "../components/film-detail.js";
import NewCommentComponent from "../components/create-new-comment.js";
import CommentsComponent from "../components/film-card-comments";

import {generateCountObjects, generateComment, generateFilmDetail} from "../mock/film.js";
import {render, remove, RenderPosition} from "../utils/render.js";

const bodyElement = document.querySelector(`body`);

const popupTargets = [`film-card__poster`, `film-card__title`, `film-card__comments`];

export default class MovieController {
  constructor(container, onDataChange) {
    this._container = container;
    this._onDataChange = onDataChange;

    this._cardComponent = null;
    this._filmDetailComponent = null;
    this._newCommentComponent = null;
    this._commentsComponent = null;

  }
  render(film) {
    const commentsCount = +film.comments;
    this._cardComponent = new CardComponent(film);
    render(this._container, this._cardComponent, RenderPosition.BEFOREEND);

    const filmDetails = generateFilmDetail();

    const activeButton = (element) => {
      if (element.classList.contains(`film-card__controls-item--active`)) {
        element.classList.remove(`film-card__controls-item--active`);
      } else {
        element.classList.add(`film-card__controls-item--active`);
      }
    };

    this._cardComponent.setWatchListButtonClickHandler((event) => {
      event.preventDefault();
      const watchlistButtonActive = this._cardComponent.getElement().querySelector(`.film-card__controls-item--add-to-watchlist`);
      activeButton(watchlistButtonActive);

      this._onDataChange(this, film, Object.assign({}, film, {isWatchList: !film.isWatchList}));
    });

    this._cardComponent.setWatchedButtonClickHandler((event) => {
      event.preventDefault();
      const watchedButtonActive = this._cardComponent.getElement().querySelector(`.film-card__controls-item--mark-as-watched`);
      activeButton(watchedButtonActive);
      this._onDataChange(this, film, Object.assign({}, film, {isWatched: !film.isWatched}));
    });

    this._cardComponent.seFavoriteButtonClickHandler((event) => {
      event.preventDefault();
      const favoriteButtonActive = this._cardComponent.getElement().querySelector(`.film-card__controls-item--favorite`);
      activeButton(favoriteButtonActive);

      this._onDataChange(this, film, Object.assign({}, film, {isFavorite: !film.isFavorite}));
    });


    this._cardComponent.setCardComponentClickHandler(() => {


      this._filmDetailComponent = new FilmDetailComponent(film, commentsCount, filmDetails);
      const comments = generateCountObjects(commentsCount, generateComment);
      this._commentsComponent = comments.map((comment) => new CommentsComponent(comment.author, comment.text, comment.emoji, comment.dayCommented).getElement());
      this._newCommentComponent = new NewCommentComponent().getElement();

      this._filmDetailComponent.setWatchListButtonClickHandler((event) => {
        event.preventDefault();


        this._onDataChange(this, film, Object.assign({}, film, {isWatched: !film.isWatched}));
      });

      this._filmDetailComponent.setWatchedButtonClickHandler((event) => {
        event.preventDefault();
        this._onDataChange(this, film, Object.assign({}, film, {isWatched: !film.isWatched}));
      });

      this._filmDetailComponent.setFavoriteButtonClickHandler((event) => {
        event.preventDefault();
        this._onDataChange(this, film, Object.assign({}, film, {isWatched: !film.isWatched}));
      });

      for (const className of popupTargets) {
        if (className === event.target.className) {

          bodyElement.appendChild(this._filmDetailComponent.getElement());

          this._commentsComponent.forEach((comment) => bodyElement.querySelector(`.film-details__comments-list`).appendChild(comment));

          bodyElement.querySelector(`.film-details__comments-wrap`).appendChild(this._newCommentComponent);
        }
      }

      if (this._filmDetailComponent) {
        const closePopupButton = this._filmDetailComponent.getElement().querySelector(`.film-details__close-btn`);
        closePopupButton.addEventListener(`click`, () => {
          remove(this._filmDetailComponent);
        });
      }
    });
  }

}
