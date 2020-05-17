import Comment from "./models/comment.js";

const CommentApi = class {
  constructor(authorization) {
    this._authorization = authorization;
  }

  getComments(id) {
    const headers = new Headers();
    headers.append(`Authorization`, this._authorization);

    return fetch(`https://11.ecmascript.pages.academy/cinemaddict/comments/${id}`, {headers}).then((response) => response.json())
    .then(Comment.parseComments);
  }
};

export default CommentApi;
