import API from "./api.js";
import PageController from "./controllers/page-controller";
import UserProfileComponent from "./components/profile.js";
import FilterController from "./controllers/filter.js";
import MoviesModel from "./models/movies.js";
import FilmListComponent from "./components/films-lists.js";
import FooterStatisticsComponent from "./components/footer-statistics.js";

import {generateProfile} from "./utils.js";
import {render, RenderPosition} from "./utils/render.js";


const AUTHORIZATION = `Basic dxkl29whjdy7zwa=`;

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const siteFooterElement = document.querySelector(`.footer`);
const footerStatistickElement = siteFooterElement.querySelector(`.footer__statistics`);

const api = new API(AUTHORIZATION);
const moviesModel = new MoviesModel();


const filterController = new FilterController(siteMainElement, moviesModel);
filterController.render();

render(siteHeaderElement, new UserProfileComponent(generateProfile()), RenderPosition.BEFOREEND);

const filmListComponent = new FilmListComponent();
const pageController = new PageController(filmListComponent, moviesModel, api);
render(siteMainElement, filmListComponent, RenderPosition.BEFOREEND);
render(footerStatistickElement, new FooterStatisticsComponent(), RenderPosition.BEFOREEND);

api.getMovies()
  .then((movies) => {
    moviesModel.setMovies(movies);
    pageController.render();
  });
