export default class Movie {
  constructor(data) {
    this.id = data[`id`];
    this.title = data.film_info[`title`];
    this.alternativeTitle = data.film_info[`alternative_title`];
    this.description = data.film_info[`description`];
    this.actors = data.film_info[`actors`];
    this.ageRating = data.film_info[`age_rating`];
    this.director = data.film_info[`director`];
    this.genre = data.film_info[`genre`];
    this.poster = data.film_info[`poster`];
    this.dateRelease = data.film_info[`release`][`date`];
    this.releaseCountry = data.film_info[`release`][`release_country`];
    this.runtime = data.film_info[`runtime`];
    this.rating = data.film_info[`total_rating`];
    this.writers = data.film_info[`writers`];
    this.isWatched = data.user_details[`already_watched`];
    this.isFavorite = data.user_details[`favorite`];
    this.watchingDate = data.user_details[`watching_date`];
    this.isWatchlist = data.user_details[`watchlist`];
    this.comments = data[`comments`];
  }

  toRAW() {
    return {
      "id": this.id,
      "title": this.title,
      "alternative_title": this.alternativeTitle,
      "description": this.description,
      "actors": this.actors,
      "age_rating": this.ageRating,
      "director": this.director,
      "genre": this.genre,
      "poster": this.poster,
      "date": this.dateRelease,
      "runtime": this.runtime,
      "total_rating": this.total_rating,
      "writers": this.writers,
      "already_watched": this.isWatched,
      "favorite": this.isFavorite,
      "watching_date": this.watchingDate,
      "watchlist": this.isWatchlist,
      "comments": this.comments,
    };
  }

  static parseMovie(data) {
    return new Movie(data);
  }

  static parseMovies(data) {
    return data.map(Movie.parseMovie);
  }
}

