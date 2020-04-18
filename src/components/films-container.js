import AbstractComponent from "./abstract-component.js";

const filmsListContainerTemplate = () => {
  return (
    `<div class="films-list__container"></div>`
  );
};

export default class ListContainer extends AbstractComponent {
  getTemplate() {
    return filmsListContainerTemplate();
  }
}
