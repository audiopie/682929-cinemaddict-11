import SortComponent, {SortType} from "../components/sort.js";
import ShowMoreButtonComponent from "../components/show-more-button.js";
// import FilmsListExtraComponent from "../components/films-extra.js";
import MovieController from "./movie-controller.js";
import CommentsModel from "../models/comments.js";

import {formatYear} from "../utils/common.js";
import {render, remove, RenderPosition} from "../utils/render.js";

const SHOWING_CARD_COUNT_ON_START = 5;
const SHOWING_CARD_COUNT_BY_BUTTON = 5;
// const EXTRA_TITLES = [`Top rated`, `Most commented`];


const renderFilms = (films, container, onDataChange, onViewChange) => {
  return films.map((film) => {
    const commentsModel = new CommentsModel();
    const filmController = new MovieController(container, onDataChange, onViewChange, commentsModel);
    filmController.render(film);
    return filmController;
  });
};


const getSortedFilms = (allFilms, sortType, from, to) => {
  let sortedFilms = [];
  const showingFilms = allFilms.slice();

  switch (sortType) {
    case SortType.DATE_UP:
      sortedFilms = showingFilms.sort((a, b) => formatYear(b.dateRelease) - formatYear(a.dateRelease));
      break;
    case SortType.RATE:
      sortedFilms = showingFilms.sort((a, b) => b.rating - a.rating);
      break;
    case SortType.DEFAULT:
      sortedFilms = showingFilms;
      break;
  }

  return sortedFilms.slice(from, to);
};

// const renderExtraCard = (container, allFilms) => {
//   const top = allFilms.slice().sort((a, b) => b.rating - a.rating);
//   const mostComents = allFilms.slice().sort((a, b) => b.comments - a.comments);
//   top.slice(0, 2).forEach(() => {
//     render(container, new FilmsListExtraComponent(), RenderPosition.BEFOREEND);
//   });

//   const filmsListExtra = container.querySelectorAll(`.films-list--extra`);

//   [...filmsListExtra].forEach((element, i) => {
//     element.querySelector(`.films-list__title`).textContent = EXTRA_TITLES[i];
//   });

//   top.slice(0, 2).forEach((it) => {
//     const extraContainer = filmsListExtra[0].querySelector(`.films-list__container`);
//     new MovieController(extraContainer).render(it);
//   });

//   mostComents.slice(0, 2).forEach((it) => {
//     const extraContainer = filmsListExtra[1].querySelector(`.films-list__container`);
//     new MovieController(extraContainer).render(it);
//   });
//   const filmListElement = container.querySelector(`.films .films-list`);
//   render(filmListElement, RenderPosition.BEFOREEND);
// };


export default class PageController {
  constructor(container, moviesModel) {
    this._container = container;
    this._moviesModel = moviesModel;
    this._showedFilmControllers = [];
    this._showingFilmsCount = SHOWING_CARD_COUNT_ON_START;
    this._showingCardCount = null;
    this._showMoreButton = new ShowMoreButtonComponent();
    this._sortComponent = new SortComponent();

    this._onShowMoreButtonClick = this._onShowMoreButtonClick.bind(this);
    this._onDataChange = this._onDataChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);
    this._onSortTypeChange = this._onSortTypeChange.bind(this);

    this._sortComponent.setSortTypeChangeHandler(this._onSortTypeChange);
    this._moviesModel.setFilterChangeHandler(this._onFilterChange);
  }

  render() {
    const movies = this._moviesModel.getMovies();
    render(this._container.getElement(), this._sortComponent, RenderPosition.AFTERBEGIN);
    this._renderMovies(movies.slice(0, this._showingFilmsCount));
    this._renderShowMoreButton();
    // renderExtraCard(this._container.getElement(), movies);
  }

  _removeMovies() {
    this._showedFilmControllers.forEach((filmController) => filmController.destroy());
    this._showedFilmControllers = [];
  }

  _renderMovies(movies) {
    const mainContainer = this._container.getElement().querySelector(`.films-list__container`);
    const newFilms = renderFilms(movies, mainContainer, this._onDataChange, this._onViewChange);
    this._showedFilmControllers = this._showedFilmControllers.concat(newFilms);
    this._showingCardCount = this._showedFilmControllers.length;
  }

  _renderShowMoreButton() {

    remove(this._showMoreButton);

    if (this._showingCardCount >= this._moviesModel.getMovies().lenght) {
      return;
    }

    const mainContainer = this._container.getElement().querySelector(`.films-list__container`);
    render(mainContainer, this._showMoreButton, RenderPosition.BEFOREEND);

    this._showMoreButton.setClickHandler(this._onShowMoreButtonClick);
  }


  _onShowMoreButtonClick() {
    const mainContainer = this._container.getElement().querySelector(`.films-list__container`);
    const prevCardCount = this._showingCardCount;
    const movies = this._moviesModel.getMovies();
    this._showingCardCount = this._showingCardCount + SHOWING_CARD_COUNT_BY_BUTTON;
    const sortedFilms = getSortedFilms(movies, this._sortComponent.getSortType(), prevCardCount, this._showingCardCount);

    const newFilms = renderFilms(sortedFilms, mainContainer, this._onDataChange, this._onViewChange);
    this._showedFilmControllers = this._showedFilmControllers.concat(newFilms);
    render(mainContainer, this._showMoreButton, RenderPosition.BEFOREEND);

    if (this._showingCardCount >= movies.length) {
      remove(this._showMoreButton);
    }
  }

  _updateMovies(count) {
    this._removeMovies();
    this._renderMovies(this._moviesModel.getMovies().slice(0, count));
    this._renderShowMoreButton();
  }

  _onDataChange(filmController, oldData, newData) {
    const isSuccess = this._moviesModel.updateMovie(oldData.id, newData);
    if (isSuccess) {
      filmController.render(newData);
    }
  }

  _onViewChange() {
    this._showedFilmControllers.forEach((it) => it.setDefaultView());
  }

  _onSortTypeChange(sortType) {
    this._showingCardCount = SHOWING_CARD_COUNT_ON_START;

    const sortedFilms = getSortedFilms(this._moviesModel.getMovies(), sortType, 0, this._showingCardCount);

    this._removeMovies();
    this._renderMovies(sortedFilms);
    this._renderShowMoreButton();
  }

  _onFilterChange() {
    this._updateMovies(SHOWING_CARD_COUNT_ON_START);
  }
}


