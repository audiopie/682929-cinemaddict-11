import AbstractComponent from "./abstract-component.js";

const footerStatisticsTemplate = () => {
  return (
    `<p>130 291 movies inside</p>`
  );
};

export default class FooterStatistics extends AbstractComponent {
  getTemplate() {
    return footerStatisticsTemplate();
  }
}
