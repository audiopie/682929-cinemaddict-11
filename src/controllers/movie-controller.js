import CardComponent from "../components/film-card.js";
import FilmDetailComponent from "../components/film-detail.js";
import MovieModel from "../models/movie.js";

import CommentsController from "../controllers/comments-controller.js";

import {render, replace, remove, RenderPosition} from "../utils/render.js";

const bodyElement = document.querySelector(`body`);


export default class MovieController {
  constructor(container, onDataChange, onViewChange, commentsModel) {
    this._container = container;
    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;
    this._onCommentChange = this._onCommentChange.bind(this);
    this._commentsModel = commentsModel;
    this._cardComponent = null;
    this._filmDetailComponent = null;
    this._commentsController = null;
    this._onEscKeyDown = this._onEscKeyDown.bind(this);
    // this._resetForm = this._resetForm.bind(this);
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
      // this._resetForm();
      this.setDefaultView();
    }
  }

  // _resetForm() {
  //   this._filmDetailComponent.getElement().querySelector(`.film-details__inner`).reset();
  //   this._filmDetailComponent.getElement().querySelector(`.film-details__add-emoji-label`).innerHTML = ``;
  // }

  destroy() {
    remove(this._cardComponent);
    document.removeEventListener(`keydown`, this._onEscKeyDown);
  }

  _onCommentChange(film) {
    this._onDataChange(this, film, film);
  }

  render(film) {
    const oldFilmComponent = this._cardComponent;
    const oldDetailComponent = this._filmDetailComponent;


    if (this._commentsController) {
      this._commentsController.destroy();
    }

    this._cardComponent = new CardComponent(film);
    this._filmDetailComponent = new FilmDetailComponent(film);

    this._commentsController = new CommentsController(this, this._filmDetailComponent.getElement(), film, this._commentsModel, this._onCommentChange);
    this._commentsController.render();

    if (oldFilmComponent && oldDetailComponent) {
      replace(this._cardComponent, oldFilmComponent);
      replace(this._filmDetailComponent, oldDetailComponent);
    } else {
      render(this._container, this._cardComponent, RenderPosition.BEFOREEND);
    }

    this._cardComponent.setWatchListButtonClickHandler((event) => {
      event.preventDefault();
      const newMovie = MovieModel.clone(film);
      newMovie.isWatchlist = !newMovie.isWatchlist;
      this._onDataChange(this, film, newMovie);
    });

    this._cardComponent.setWatchedButtonClickHandler((event) => {
      event.preventDefault();
      const newMovie = MovieModel.clone(film);
      newMovie.isWatched = !newMovie.isWatched;
      this._onDataChange(this, film, newMovie);
    });

    this._cardComponent.setFavoriteButtonClickHandler((event) => {
      event.preventDefault();
      const newMovie = MovieModel.clone(film);
      newMovie.isFavorite = !newMovie.isFavorite;
      this._onDataChange(this, film, newMovie);
    });

    this._filmDetailComponent.setWatchListButtonClickHandlerDetail((event) => {
      event.preventDefault();
      const newMovie = MovieModel.clone(film);
      newMovie.isWatchlist = !newMovie.isWatchlist;
      this._onDataChange(this, film, newMovie);
    });

    this._filmDetailComponent.setWatchedButtonClickHandlerDetail((event) => {
      event.preventDefault();
      const newMovie = MovieModel.clone(film);
      newMovie.isWatched = !newMovie.isWatched;
      this._onDataChange(this, film, newMovie);
    });

    this._filmDetailComponent.setFavoriteButtonClickHandlerDetail((event) => {
      event.preventDefault();
      const newMovie = MovieModel.clone(film);
      newMovie.isFavorite = !newMovie.isFavorite;
      this._onDataChange(this, film, newMovie);
    });

    this._filmDetailComponent.onCloseButtonHandler(() => {
      // this._resetForm();
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

