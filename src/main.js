import {userProfileTemplate} from './components/profile';
import {mainNavigationMenuTemplate} from './components/navigation';
import {sortBarTemplate} from './components/sorting';
import {filmsListTemplate} from './components/films-lists';
import {filmCardTemplate} from './components/film-card';
import {filmsListContainerTemplate} from './components/films-container';
import {showMoreButtonTemplate} from './components/show-more-button';
import {filmsListExtraTemplate} from './components/films-extra';
import {footerStatisticsTemplate} from './components/footer-statistics';

const CARD_COUNT = 5;
const EXTRA_CARD_COUNT = 2;
const EXTRA_TITLES = [`Top rated`, `Most commented`];


const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const siteFooterElement = document.querySelector(`.footer`);
const footerStatistickElement = siteFooterElement.querySelector(`.footer__statistics`);


render(siteHeaderElement, userProfileTemplate(), `beforeend`);
render(siteMainElement, mainNavigationMenuTemplate(), `beforeend`);
render(siteMainElement, sortBarTemplate(), `beforeend`);
render(siteMainElement, filmsListTemplate(), `beforeend`);

const siteFilmsElement = siteMainElement.querySelector(`.films`);
const filmsListsElement = siteFilmsElement.querySelector(`.films-list`);

render(filmsListsElement, filmsListContainerTemplate(), `beforeend`);

const filmsListsContainerElement = filmsListsElement.querySelector(`.films-list__container`);

for (let i = 0; i < CARD_COUNT; i++) {
  render(filmsListsContainerElement, filmCardTemplate(), `beforeend`);
}

render(filmsListsElement, showMoreButtonTemplate(), `beforeend`);


for (let i = 0; i < EXTRA_CARD_COUNT; i++) {
  render(siteFilmsElement, filmsListExtraTemplate(), `beforeend`);
}

const filmsListExtra = siteFilmsElement.querySelectorAll(`.films-list--extra`);

const renderExtraCard = (element) => {
  for (let i = 0; i < EXTRA_CARD_COUNT; i++) {
    render(element, filmCardTemplate(), `beforeend`);
  }
};

for (let i = 0; i < filmsListExtra.length; i++) {
  filmsListExtra[i].querySelector(`.films-list__title`).textContent = EXTRA_TITLES[i];
  render(filmsListExtra[i], filmsListContainerTemplate(), `beforeend`);
  const extraContainerElement = filmsListExtra[i].querySelector(`.films-list__container`);
  renderExtraCard(extraContainerElement);
}

render(footerStatistickElement, footerStatisticsTemplate(), `beforeend`);


