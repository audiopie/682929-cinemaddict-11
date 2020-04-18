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
const showMoreButton = new ShowMoreButtonComponent();

const renderFilmsList = (container, cards) => {
  const allFilms = cards;
  let showingCardCount = SHOWING_CARD_COUNT_ON_START;
  const mainContainer = container.getElement().querySelector(`.films-list__container`);

  cards.slice(0, showingCardCount).forEach((film) => {
    renderCard(film, mainContainer);
  });

  showMoreButton.setClickHandler(() => {
    const prevCardCount = showingCardCount;
    showingCardCount = showingCardCount + SHOWING_CARD_COUNT_BY_BUTTON;

    allFilms.slice(prevCardCount, showingCardCount).forEach((card) => renderCard(card, mainContainer));

    if (showingCardCount >= allFilms.length) {
      remove(showMoreButton);
    }
  });
  renderExtraCard(container.getElement(), allFilms);
};

const popupTargets = [`film-card__poster`, `film-card__title`, `film-card__comments`];
let filmdetail = null;


const renderCard = (film, container) => {
  const commentsCount = +film.comments;
  const cardComponent = new CardComponent(film);
  render(container, cardComponent, RenderPosition.BEFOREEND);

  const filmDetails = generateFilmDetail();

  cardComponent.setCardComponentClickHandler(() => {

    if (filmdetail) {
      remove(filmdetail);
    }

    filmdetail = new FilmDetailComponent(film, commentsCount, filmDetails);
    const comments = generateCountObjects(commentsCount, generateComment);
    const mockComments = comments.map((comment) => new CommentsComponent(comment.author, comment.text, comment.emoji, comment.dayCommented).getElement());
    const newComment = new NewCommentComponent().getElement();

    for (const className of popupTargets) {
      if (className === event.target.className) {

        siteFooterElement.appendChild(filmdetail.getElement());

        mockComments.forEach((comment) => siteFooterElement.querySelector(`.film-details__comments-list`).appendChild(comment));

        siteFooterElement.querySelector(`.film-details__comments-wrap`).appendChild(newComment);
      }
    }

    if (filmdetail) {
      const closePopupButton = filmdetail.getElement().querySelector(`.film-details__close-btn`);
      closePopupButton.addEventListener(`click`, () => {
        remove(filmdetail);
      });
    }
  });
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
    renderCard(it, extraContainer);
  });

  mostComents.slice(0, 2).forEach((it) => {
    const extraContainer = filmsListExtra[1].querySelector(`.films-list__container`);
    renderCard(it, extraContainer);
  });
  const filmListElement = container.querySelector(`.films .films-list`);
  render(filmListElement, showMoreButton, RenderPosition.BEFOREEND);
};


export default class PageController {
  constructor(container) {
    this._container = container;
  }

  render(allFilms) {
    renderFilmsList(this._container, allFilms);
  }
}

