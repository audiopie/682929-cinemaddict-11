import SortComponent, {SortType} from "../components/sort.js";
import ShowMoreButtonComponent from "../components/show-more-button.js";
import FilmsListExtraComponent from "../components/films-extra.js";
import MovieController from "./movie-controller.js";

import {render, remove, RenderPosition} from "../utils/render.js";

const SHOWING_CARD_COUNT_ON_START = 5;
const SHOWING_CARD_COUNT_BY_BUTTON = 5;
const EXTRA_TITLES = [`Top rated`, `Most commented`];


const renderFilms = (films, container, onDataChange, onViewChange) => {
  return films.map((film) => {
    const filmController = new MovieController(container, onDataChange, onViewChange);

    filmController.render(film);

    return filmController;
  });
};


const getSortedFilms = (allFilms, sortType, from, to) => {
  let sortedFilms = [];
  const showingFilms = allFilms.slice();

  switch (sortType) {
    case SortType.DATE_UP:
      sortedFilms = showingFilms.sort((a, b) => b.filmPublicationDate - a.filmPublicationDate);
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

const renderExtraCard = (container, allFilms) => {
  const top = allFilms.slice().sort((a, b) => b.rating - a.rating);
  const mostComents = allFilms.slice().sort((a, b) => b.comments - a.comments);
  top.slice(0, 2).forEach(() => {
    render(container, new FilmsListExtraComponent(), RenderPosition.BEFOREEND);
  });

  const filmsListExtra = container.querySelectorAll(`.films-list--extra`);

  [...filmsListExtra].forEach((element, i) => {
    element.querySelector(`.films-list__title`).textContent = EXTRA_TITLES[i];
  });

  top.slice(0, 2).forEach((it) => {
    const extraContainer = filmsListExtra[0].querySelector(`.films-list__container`);
    new MovieController(extraContainer).render(it);
  });

  mostComents.slice(0, 2).forEach((it) => {
    const extraContainer = filmsListExtra[1].querySelector(`.films-list__container`);
    new MovieController(extraContainer).render(it);
  });
  const filmListElement = container.querySelector(`.films .films-list`);
  render(filmListElement, RenderPosition.BEFOREEND);
};


export default class PageController {
  constructor(container) {
    this._container = container;

    this._allfilms = [];
    this._showedFilmControllers = [];
    this._showingFilmsCount = SHOWING_CARD_COUNT_ON_START;
    this._showingCardCount = null;
    this._showMoreButton = new ShowMoreButtonComponent();
    this._sortComponent = new SortComponent();

    this._onDataChange = this._onDataChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
    this._onSortTypeChange = this._onSortTypeChange.bind(this);

    this._sortComponent.setSortTypeChangeHandler(this._onSortTypeChange);
  }

  render(allFilms) {
    this._allFilms = allFilms;

    const mainContainer = this._container.getElement().querySelector(`.films-list__container`);

    render(this._container.getElement(), this._sortComponent, RenderPosition.AFTERBEGIN);

    const newFilms = renderFilms(this._allFilms.slice(0, this._showingFilmsCount), mainContainer, this._onDataChange, this._onViewChange);

    this._showedFilmControllers = this._showedFilmControllers.concat(newFilms);

    this._renderShowMoreButton();

    renderExtraCard(this._container.getElement(), this._allFilms);
  }

  _renderShowMoreButton() {
    if (this._showingFilmsCount >= this._allFilms.length) {
      return;
    }

    const mainContainer = this._container.getElement().querySelector(`.films-list__container`);
    render(mainContainer, this._showMoreButton, RenderPosition.BEFOREEND);

    this._showMoreButton.setClickHandler(() => {
      const prevCardCount = this._showingCardCount;
      this._showingCardCount = this._showingCardCount + SHOWING_CARD_COUNT_BY_BUTTON;
      const sortedFilms = getSortedFilms(this._allFilms, this._sortComponent.getSortType(), prevCardCount, this._showingCardCount);

      const newFilms = renderFilms(sortedFilms, mainContainer, this._onDataChange, this._onViewChange);
      this._showedFilmControllers = this._showedFilmControllers.concat(newFilms);
      render(mainContainer, this._showMoreButton, RenderPosition.BEFOREEND);

      if (this._showingCardCount >= this._allFilms.length) {
        remove(this._showMoreButton);
      }
    });
  }

  _onDataChange(filmController, oldData, newData) {
    const index = this._allFilms.findIndex((it) => it === oldData);
    if (index === -1) {
      return;
    }

    this._allFilms = [].concat(this._allFilms.slice(0, index), newData, this._allFilms.slice(index + 1));
    filmController.render(this._allFilms[index]);
  }

  _onViewChange() {
    this._showedFilmControllers.forEach((it) => it.setDefaultView());
  }

  _onSortTypeChange(sortType) {
    this._showingCardCount = SHOWING_CARD_COUNT_ON_START;

    const sortedFilms = getSortedFilms(this._allFilms, sortType, 0, this._showingCardCount);
    const mainContainer = this._container.getElement().querySelector(`.films-list__container`);

    mainContainer.innerHTML = ``;

    const newFilms = renderFilms(sortedFilms, mainContainer, this._onDataChange, this._onViewChange);
    this._showedFilmControllers = newFilms;
    remove(this._showMoreButton);
    this._renderShowMoreButton();
  }
}


