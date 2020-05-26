import moment from "moment";

export const formatYear = (date) => {
  return moment(date).format(`YYYY`);
};

export const formatRuntime = (date) => {
  return moment().startOf(`day`).add(date, `minutes`).format(`h:mm`);
};
