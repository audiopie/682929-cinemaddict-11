import Comment from "./models/comment.js";

const checkStatus = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    throw new Error(`${response.status}: ${response.statusText}`);
  }
};


const CommentApi = class {
  constructor(authorization) {
    this._authorization = authorization;
  }

  getComments(id) {
    const headers = new Headers();
    headers.append(`Authorization`, this._authorization);

    return fetch(`https://11.ecmascript.pages.academy/cinemaddict/comments/${id}`, {headers})
    .then((checkStatus))
    .then((response) => response.json())
    .then(Comment.parseComments);
  }
};

export default CommentApi;
