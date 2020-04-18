import PageController from "./controllers/card.js";
import UserProfileComponent from "./components/profile.js";
import MainNavigation from "./components/navigation.js";
import SortComponent from "./components/sort.js";
import FilmListComponent from "./components/films-lists.js";
import FooterStatisticsComponent from "./components/footer-statistics.js";

import {generateFilters, generateProfile} from "./utils.js";
import {generateCountObjects, generateFilm} from "./mock/film.js";
import {render, RenderPosition} from "./utils/render.js";


const CARD_COUNT = 22;

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const siteFooterElement = document.querySelector(`.footer`);
const footerStatistickElement = siteFooterElement.querySelector(`.footer__statistics`);

const filters = generateFilters();
const films = generateCountObjects(CARD_COUNT, generateFilm);

render(siteHeaderElement, new UserProfileComponent(generateProfile()), RenderPosition.BEFOREEND);
render(siteMainElement, new MainNavigation(filters), RenderPosition.BEFOREEND);
render(siteMainElement, new SortComponent(), RenderPosition.BEFOREEND);
render(footerStatistickElement, new FooterStatisticsComponent(), RenderPosition.BEFOREEND);


const filmListComponent = new FilmListComponent();
const pageController = new PageController(filmListComponent);
render(siteMainElement, filmListComponent, RenderPosition.BEFOREEND);
pageController.render(films);
