import {userProfileTemplate} from './components/profile';
import {mainNavigationMenuTemplate} from './components/navigation';
import {sortBarTemplate} from './components/sorting';
import {filmsListTemplate} from './components/films-lists';
import {filmCardTemplate} from './components/film-card';
import {filmsListContainerTemplate} from './components/films-container';
import {showMoreButtonTemplate} from './components/show-more-button';
import {filmsListExtraTemplate} from './components/films-extra';
import {footerStatisticsTemplate} from './components/footer-statistics';
import {filmDetailTemplate} from './components/film-detail.js';
import {createComments} from './components/film-card-comments.js';

import {generateFilters, generateProfile} from './utils.js';
import {generateCountObjects, generateFilm, generateComment, generateFilmDetail} from './mock/film.js';


const CARD_COUNT = 22;
const SHOWING_CARD_COUNT_ON_START = 5;
const SHOWING_CARD_COUNT_BY_BUTTON = 5;
const EXTRA_CARD_COUNT = 2;
const EXTRA_TITLES = [`Top rated`, `Most commented`];


const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const siteFooterElement = document.querySelector(`.footer`);
const footerStatistickElement = siteFooterElement.querySelector(`.footer__statistics`);

const filters = generateFilters();


render(siteHeaderElement, userProfileTemplate(generateProfile()), `beforeend`);
render(siteMainElement, mainNavigationMenuTemplate(filters), `beforeend`);
render(siteMainElement, sortBarTemplate(), `beforeend`);
render(siteMainElement, filmsListTemplate(), `beforeend`);

const siteFilmsElement = siteMainElement.querySelector(`.films`);
const filmsListsElement = siteFilmsElement.querySelector(`.films-list`);

render(filmsListsElement, filmsListContainerTemplate(), `beforeend`);

const filmsListsContainerElement = filmsListsElement.querySelector(`.films-list__container`);

const films = generateCountObjects(CARD_COUNT, generateFilm);
const filmDetails = generateCountObjects(CARD_COUNT, generateFilmDetail);


let showingCardCount = SHOWING_CARD_COUNT_ON_START;

for (let i = 0; i < showingCardCount; i++) {
  render(filmsListsContainerElement, filmCardTemplate(films[i]), `beforeend`);
}

// Раздел открытия/закрытия popup
const popupTargets = [`film-card__poster`, `film-card__title`, `film-card__comments`];
let allFilmsCard = filmsListsContainerElement.querySelectorAll(`.film-card`);


const renderCardDetail = (cards) => {
  for (let i = 0; i < cards.length; i++) {
    let card = films[i];
    cards[i].addEventListener(`click`, (event) => {
      let popupPreviousElement = document.querySelector(`.film-details`);
      if (popupPreviousElement) {
        popupPreviousElement.remove();
      }
      const comments = generateCountObjects(card.comments, generateComment);
      const mockComments = createComments(comments);
      for (const className of popupTargets) {
        if (className === event.target.className) {
          render(siteFooterElement, filmDetailTemplate(card, mockComments, card.comments, filmDetails[i]), `afterend`);
        }
      }
      if (document.querySelector(`.film-details`)) {
        const closePopupButton = document.querySelector(`.film-details__close-btn`);
        closePopupButton.addEventListener(`click`, () => {
          document.querySelector(`.film-details`).remove();
        });
      }
    });
  }
};


renderCardDetail(allFilmsCard);

// Отрисовка фильмов Top rated, Most commented
for (let i = 0; i < EXTRA_CARD_COUNT; i++) {
  render(siteFilmsElement, filmsListExtraTemplate(), `beforeend`);
}

const filmsListExtra = siteFilmsElement.querySelectorAll(`.films-list--extra`);

const renderExtraCard = (element) => {
  for (let i = 0; i < EXTRA_CARD_COUNT; i++) {
    render(element, filmCardTemplate(films[i]), `beforeend`);
  }
};

for (let i = 0; i < filmsListExtra.length; i++) {
  filmsListExtra[i].querySelector(`.films-list__title`).textContent = EXTRA_TITLES[i];
  render(filmsListExtra[i], filmsListContainerTemplate(), `beforeend`);
  const extraContainerElement = filmsListExtra[i].querySelector(`.films-list__container`);
  renderExtraCard(extraContainerElement);
}

// Рендеринг статистики
render(footerStatistickElement, footerStatisticsTemplate(), `beforeend`);

// Рендеринг кнопки ShowMore
render(filmsListsElement, showMoreButtonTemplate(), `beforeend`);
const showMoreButton = filmsListsElement.querySelector(`.films-list__show-more`);

showMoreButton.addEventListener(`click`, () => {
  const prevCardCount = showingCardCount;
  showingCardCount = showingCardCount + SHOWING_CARD_COUNT_BY_BUTTON;
  films.slice(prevCardCount, showingCardCount).forEach((card) => render(filmsListsContainerElement, filmCardTemplate(card),
      `beforeend`));

  if (showingCardCount >= films.length) {
    showMoreButton.remove();
  }
  allFilmsCard = filmsListsContainerElement.querySelectorAll(`.film-card`);
  renderCardDetail(allFilmsCard);
});


