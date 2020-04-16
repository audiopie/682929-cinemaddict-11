import {createElement} from '../utils.js';

const footerStatisticsTemplate = () => {
  return (
    `<p>130 291 movies inside</p>`
  );
};

export default class FooterStatistics {
  constructor() {
    this._element = null;
  }
  getTemplate() {
    return footerStatisticsTemplate();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }
    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
