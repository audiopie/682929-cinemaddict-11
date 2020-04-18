import AbstractComponent from "./abstract-component.js";

const mainNavigationMenuTemplate = (filters) => {
  const markup = filters.map((it) => createMaintNavigationItems(it.name, it.count)).join(`\n`);
  return (
    `<nav class="main-navigation">
    <div class="main-navigation__items">
    <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
      ${markup}
    </div>
    <a href="#stats" class="main-navigation__additional">Stats</a>
  </nav>`
  );
};

export const createMaintNavigationItems = (name, count) => {
  return (
    `<a href="#${name}" class="main-navigation__item">${name} <span class="main-navigation__item-count">${count}</span></a>`
  );
};

export default class MainNavigation extends AbstractComponent {
  constructor(filters) {
    super();
    this._filters = filters;
  }

  getTemplate() {
    return mainNavigationMenuTemplate(this._filters);
  }
}

