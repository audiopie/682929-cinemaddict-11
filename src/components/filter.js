import AbstractComponent from "./abstract-component.js";

const ANCHOR_PREFIX = `#`;

const filterTemplate = (filters) => {
  const markup = filters.map((it, i) => createFilterItems(it.name, it.count, i === 0)).join(`\n`);
  return (
    `<nav class="main-navigation">
    <div class="main-navigation__items">
      ${markup}
    </div>
    <a href="#stats" class="main-navigation__additional">Stats</a>
  </nav>`
  );
};

export const createFilterItems = (name, count, isChecked) => {
  return (
    `<a href="#${name}" class="main-navigation__item ${isChecked ? `main-navigation__item--active` : ``}">${name} <span class="main-navigation__item-count">${count}</span></a>`
  );
};

export default class Filter extends AbstractComponent {
  constructor(filters) {
    super();
    this._filters = filters;
  }

  getTemplate() {
    return filterTemplate(this._filters);
  }

  setFilterChangeHandler(handler) {
    this.getElement().addEventListener(`click`, (evt) => {
      event.preventDefault();
      const anc = evt.target.getAttribute(`href`);
      const filter = anc.substring(ANCHOR_PREFIX.length);
      handler(filter);
    });
  }
}

