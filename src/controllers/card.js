import SortComponent, {SortType} from "../components/sort.js";
import CardComponent from "../components/film-card.js";
import FilmDetailComponent from "../components/film-detail.js";
import NewCommentComponent from "../components/create-new-comment.js";
import CommentsComponent from "../components/film-card-comments";
import ShowMoreButtonComponent from "../components/show-more-button.js";
import FilmsListExtraComponent from "../components/films-extra.js";

import {generateCountObjects, generateComment, generateFilmDetail} from "../mock/film.js";
import {render, remove, RenderPosition} from "../utils/render.js";

const SHOWING_CARD_COUNT_ON_START = 5;
const SHOWING_CARD_COUNT_BY_BUTTON = 5;
const EXTRA_TITLES = [`Top rated`, `Most commented`];

const siteFooterElement = document.querySelector(`.footer`);

const popupTargets = [`film-card__poster`, `film-card__title`, `film-card__comments`];
let filmDetail = null;

const renderCard = (film, container) => {
  const commentsCount = +film.comments;
  const cardComponent = new CardComponent(film);
  render(container, cardComponent, RenderPosition.BEFOREEND);

  const filmDetails = generateFilmDetail();

  cardComponent.setCardComponentClickHandler(() => {

    if (filmDetail) {
      remove(filmDetail);
    }

    filmDetail = new FilmDetailComponent(film, commentsCount, filmDetails);
    const comments = generateCountObjects(commentsCount, generateComment);
    const mockComments = comments.map((comment) => new CommentsComponent(comment.author, comment.text, comment.emoji, comment.dayCommented).getElement());
    const newComment = new NewCommentComponent().getElement();

    for (const className of popupTargets) {
      if (className === event.target.className) {

        siteFooterElement.appendChild(filmDetail.getElement());

        mockComments.forEach((comment) => siteFooterElement.querySelector(`.film-details__comments-list`).appendChild(comment));

        siteFooterElement.querySelector(`.film-details__comments-wrap`).appendChild(newComment);
      }
    }

    if (filmDetail) {
      const closePopupButton = filmDetail.getElement().querySelector(`.film-details__close-btn`);
      closePopupButton.addEventListener(`click`, () => {
        remove(filmDetail);
      });
    }
  });
};


const renderExtraCard = (container, allFilms, button) => {
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
    renderCard(it, extraContainer);
  });

  mostComents.slice(0, 2).forEach((it) => {
    const extraContainer = filmsListExtra[1].querySelector(`.films-list__container`);
    renderCard(it, extraContainer);
  });
  const filmListElement = container.querySelector(`.films .films-list`);
  render(filmListElement, button, RenderPosition.BEFOREEND);
};

const renderFilms = (films, container) => {
  films.forEach((film) => {
    renderCard(film, container);
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


export default class PageController {
  constructor(container) {
    this._container = container;
    this._showMoreButton = new ShowMoreButtonComponent();
    this._sortComponent = new SortComponent();
  }

  render(allFilms) {
    const renderShowMoreButton = () => {
      if (showingCardCount >= allFilms.length) {
        return;
      }

      render(mainContainer, this._showMoreButton, RenderPosition.BEFOREEND);

      this._showMoreButton.setClickHandler(() => {
        const prevCardCount = showingCardCount;
        showingCardCount = showingCardCount + SHOWING_CARD_COUNT_BY_BUTTON;
        const sortedFilms = getSortedFilms(allFilms, this._sortComponent.getSortType(), prevCardCount, showingCardCount);

        renderFilms(sortedFilms, mainContainer);
        render(mainContainer, this._showMoreButton, RenderPosition.BEFOREEND);

        if (showingCardCount >= allFilms.length) {
          remove(this._showMoreButton);
        }
      });
    };

    let showingCardCount = SHOWING_CARD_COUNT_ON_START;
    const mainContainer = this._container.getElement().querySelector(`.films-list__container`);

    render(this._container.getElement(), this._sortComponent, RenderPosition.AFTERBEGIN);

    renderFilms(allFilms.slice(0, showingCardCount), mainContainer);


    renderShowMoreButton();

    this._sortComponent.setSortTypeChangeHandler((sortType) => {
      showingCardCount = SHOWING_CARD_COUNT_BY_BUTTON;

      const sortedFilms = getSortedFilms(allFilms, sortType, 0, showingCardCount);

      mainContainer.innerHTML = ``;

      renderFilms(sortedFilms, mainContainer);
      remove(this._showMoreButton);
      renderShowMoreButton();
    });

    renderExtraCard(this._container.getElement(), allFilms, this._showMoreButton);
  }
}

