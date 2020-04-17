import UserProfileComponent from "./components/profile.js";
import MainNavigation from "./components/navigation.js";
import SortComponent from "./components/sort.js";
import FilmListComponent from "./components/films-lists.js";
import CardComponent from "./components/film-card.js";
import FilmDetailComponent from "./components/film-detail.js";
import NewCommentComponent from "./components/create-new-comment.js";
import CommentsComponent from "./components/film-card-comments";
import ShowMoreButtonComponent from "./components/show-more-button.js";
import FilmsListExtraComponent from "./components/films-extra.js";
import FooterStatisticsComponent from "./components/footer-statistics.js";

import {generateFilters, generateProfile} from "./utils.js";
import {generateCountObjects, generateFilm, generateComment, generateFilmDetail} from "./mock/film.js";
import {render, RenderPosition} from "./utils.js";


const CARD_COUNT = 22;
const SHOWING_CARD_COUNT_ON_START = 5;
const SHOWING_CARD_COUNT_BY_BUTTON = 5;
const EXTRA_TITLES = [`Top rated`, `Most commented`];

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const siteFooterElement = document.querySelector(`.footer`);
const footerStatistickElement = siteFooterElement.querySelector(`.footer__statistics`);

const filters = generateFilters();

render(siteHeaderElement, new UserProfileComponent(generateProfile()).getElement(), RenderPosition.BEFOREEND);
render(siteMainElement, new MainNavigation(filters).getElement(), RenderPosition.BEFOREEND);
render(siteMainElement, new SortComponent().getElement(), RenderPosition.BEFOREEND);
render(siteMainElement, new FilmListComponent().getElement(), RenderPosition.BEFOREEND);
render(footerStatistickElement, new FooterStatisticsComponent().getElement(), RenderPosition.BEFOREEND);

const films = generateCountObjects(CARD_COUNT, generateFilm);

const filmMainElement = siteMainElement.querySelector(`.films`);
const filmListElement = siteMainElement.querySelector(`.films .films-list`);
const filmsContainerElement = filmListElement.querySelector(`.films .films-list .films-list__container`);

render(filmListElement, new ShowMoreButtonComponent().getElement(), RenderPosition.BEFOREEND);
const showMoreButton = filmListElement.querySelector(`.films-list__show-more`);


const renderFilmsList = (cards) => {
  let showingCardCount = SHOWING_CARD_COUNT_ON_START;
  cards.slice(0, showingCardCount).forEach((film) => {
    renderCard(film, filmsContainerElement);
  });

  showMoreButton.addEventListener(`click`, () => {
    const prevCardCount = showingCardCount;
    showingCardCount = showingCardCount + SHOWING_CARD_COUNT_BY_BUTTON;

    films.slice(prevCardCount, showingCardCount).forEach((card) => renderCard(card, filmsContainerElement));

    if (showingCardCount >= films.length) {
      showMoreButton.remove();
    }
  });
};

const popupTargets = [`film-card__poster`, `film-card__title`, `film-card__comments`];

const renderCard = (film, container) => {
  const commentsCount = +film.comments;
  const cardComponent = new CardComponent(film).getElement();
  render(container, cardComponent, RenderPosition.BEFOREEND);

  const filmDetail = generateFilmDetail();

  cardComponent.addEventListener(`click`, (event) => {
    let popupPreviousElement = document.querySelector(`.film-details`);
    if (popupPreviousElement) {
      popupPreviousElement.remove();
    }

    const comments = generateCountObjects(commentsCount, generateComment);
    const mockComments = new CommentsComponent(comments).getElement();
    const newComment = new NewCommentComponent().getElement();

    for (const className of popupTargets) {
      if (className === event.target.className) {
        siteFooterElement.appendChild(new FilmDetailComponent(film, mockComments, commentsCount, filmDetail).getElement());

        siteFooterElement.querySelector(`.film-details__comments-wrap`).appendChild(newComment);
      }
    }
    if (document.querySelector(`.film-details`)) {
      const closePopupButton = document.querySelector(`.film-details__close-btn`);
      closePopupButton.addEventListener(`click`, () => {
        document.querySelector(`.film-details`).remove();
      });
    }
  });
};

renderFilmsList(films);

const renderExtraCard = () => {
  const top = films.slice().sort((a, b) => b.rating - a.rating);
  const mostComents = films.slice().sort((a, b) => b.comments - a.comments);
  top.slice(0, 2).forEach(() => {
    render(filmMainElement, new FilmsListExtraComponent().getElement(), RenderPosition.BEFOREEND);
  });

  const filmsListExtra = filmMainElement.querySelectorAll(`.films-list--extra`);

  [...filmsListExtra].forEach((element, i) => {
    element.querySelector(`.films-list__title`).textContent = EXTRA_TITLES[i];
  });

  top.slice(0, 2).forEach((it) => {
    const container = filmsListExtra[0].querySelector(`.films-list__container`);
    renderCard(it, container);
  });

  mostComents.slice(0, 2).forEach((it) => {
    const container = filmsListExtra[1].querySelector(`.films-list__container`);
    renderCard(it, container);
  });
};

renderExtraCard();

