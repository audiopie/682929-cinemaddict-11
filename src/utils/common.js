import moment from "moment";

export const formatYear = (date) => {
  return moment(date).format(`YYYY`);
};

export const formatRuntime = (date) => {
  return moment().startOf(`day`).add(date, `minutes`).format(`h:mm`);
};

export const formatCommentDate = (date) => {
  return moment(date).format(`YYYY/MM/DD, h:mm`);
};

export const formatToRawDate = (date) => {
  return moment(date).format();
};

