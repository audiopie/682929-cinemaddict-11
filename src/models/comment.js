export default class Comment {
  constructor(data) {
    this.author = data[`author`];
    this.comment = data[`comment`];
    this.date = data[`date`];
    this.emotion = data[`emotion`];
    this.id = data[`id`];
  }

  static parseComment(data) {
    return new Comment(data);
  }

  static parseComments(data) {
    return data.map(Comment.parseComment);
  }
}
