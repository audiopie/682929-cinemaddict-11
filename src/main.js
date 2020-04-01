/* eslint-disable new-cap */
'use strict';

const CARD_COUNT = 5;
const EXTRA_CARD_COUNT = 2;
const EXTRA_TITLES = [`Top rated`, `Most commented`];

const UserProfileTemplate = () => {
  return (
    `<section class="header__profile profile">
    <p class="profile__rating">Movie Buff</p>
    <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
  </section>`
  );
};

const MainNavigationMenuTemplate = () => {
  return (
    `<nav class="main-navigation">
    <div class="main-navigation__items">
      <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
      <a href="#watchlist" class="main-navigation__item">Watchlist <span class="main-navigation__item-count">13</span></a>
      <a href="#history" class="main-navigation__item">History <span class="main-navigation__item-count">4</span></a>
      <a href="#favorites" class="main-navigation__item">Favorites <span class="main-navigation__item-count">8</span></a>
    </div>
    <a href="#stats" class="main-navigation__additional">Stats</a>
  </nav>`
  );
};

const SortBarTemplate = () => {
  return (
    ` <ul class="sort">
    <li><a href="#" class="sort__button sort__button--active">Sort by default</a></li>
    <li><a href="#" class="sort__button">Sort by date</a></li>
    <li><a href="#" class="sort__button">Sort by rating</a></li>
  </ul>`
  );
};

const FilmsListTemplate = () => {
  return (
    `<section class="films">
    <section class="films-list">
      <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>
    </section>`
  );
};

const FilmsListContainerTemplate = () => {
  return (
    `<div class="films-list__container"></div>`
  );
};

const FilmCardTemplate = () => {
  return (
    `<article class="film-card">
      <h3 class="film-card__title">The Dance of Life</h3>
      <p class="film-card__rating">8.3</p>
      <p class="film-card__info">
        <span class="film-card__year">1929</span>
        <span class="film-card__duration">1h 55m</span>
        <span class="film-card__genre">Musical</span>
      </p>
      <img src="./images/posters/the-dance-of-life.jpg" alt="" class="film-card__poster">
      <p class="film-card__description">Burlesque comic Ralph "Skid" Johnson (Skelly), and specialty dancer Bonny Lee King (Carroll), end up together on a cold, rainy night at a tr…</p>
      <a class="film-card__comments">5 comments</a>
      <form class="film-card__controls">
        <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist">Add to watchlist</button>
        <button class="film-card__controls-item button film-card__controls-item--mark-as-watched">Mark as watched</button>
        <button class="film-card__controls-item button film-card__controls-item--favorite">Mark as favorite</button>
      </form>
    </article>`
  );
};

const ShowMoreButtonTemplate = () => {
  return (
    `<button class="films-list__show-more">Show more</button>`
  );
};

const FilmsListExtraTemplate = () => {
  return (
    `<section class="films-list--extra">
    <h2 class="films-list__title"></h2>
    </section>`
  );
};

const FooterStatisticsTemplate = () => {
  return (
    `<p>130 291 movies inside</p>`
  );
};


const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const siteFooterElement = document.querySelector(`.footer`);
const footerStatistickElement = siteFooterElement.querySelector(`.footer__statistics`);


render(siteHeaderElement, UserProfileTemplate(), `beforeend`);
render(siteMainElement, MainNavigationMenuTemplate(), `beforeend`);
render(siteMainElement, SortBarTemplate(), `beforeend`);
render(siteMainElement, FilmsListTemplate(), `beforeend`);

const siteFilmsElement = siteMainElement.querySelector(`.films`);
const filmsListsElement = siteFilmsElement.querySelector(`.films-list`);

render(filmsListsElement, FilmsListContainerTemplate(), `beforeend`);

const filmsListsContainerElement = filmsListsElement.querySelector(`.films-list__container`);

for (let i = 0; i < CARD_COUNT; i++) {
  render(filmsListsContainerElement, FilmCardTemplate(), `beforeend`);
}

render(filmsListsElement, ShowMoreButtonTemplate(), `beforeend`);


for (let i = 0; i < EXTRA_CARD_COUNT; i++) {
  render(siteFilmsElement, FilmsListExtraTemplate(), `beforeend`);
}

const filmsListExtra = siteFilmsElement.querySelectorAll(`.films-list--extra`);

const renderExtraCard = (element) => {
  for (let i = 0; i < EXTRA_CARD_COUNT; i++) {
    render(element, FilmCardTemplate(), `beforeend`);
  }
};

for (let i = 0; i < filmsListExtra.length; i++) {
  filmsListExtra[i].querySelector(`.films-list__title`).textContent = EXTRA_TITLES[i];
  render(filmsListExtra[i], FilmsListContainerTemplate(), `beforeend`);
  const extraContainerElement = filmsListExtra[i].querySelector(`.films-list__container`);
  renderExtraCard(extraContainerElement);
}

render(footerStatistickElement, FooterStatisticsTemplate(), `beforeend`);


