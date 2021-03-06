import AbstractComponent from "./abstract-component.js";

const filmsListExtraTemplate = () => {
  return (
    `<section class="films-list--extra">
    <h2 class="films-list__title"></h2>
    <div class="films-list__container"></div>
    </section>`
  );
};

export default class FilmsListExtra extends AbstractComponent {
  getTemplate() {
    return filmsListExtraTemplate();
  }
}
