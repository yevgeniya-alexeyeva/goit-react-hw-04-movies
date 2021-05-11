import axios from "axios";

const BASE_URL = "https://api.themoviedb.org/";

const apiKey = "4d7b4d33eacb1bb30d220e810a09c60f";
// const accessKey =
//   "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0ZDdiNGQzM2VhY2IxYmIzMGQyMjBlODEwYTA5YzYwZiIsInN1YiI6IjYwNjQ4MGM5NDZmMzU0MDA1MzVjM2VjZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.LsGZsQ3fTH_5IyOW00-GUe3zasBGHYPiA8YzbURMTtI";

const tmdbApi = {
  fetchTrending() {
    return axios.get(`${BASE_URL}3/trending/all/day?api_key=${apiKey}`);
  },
  fetchMovieByQuery(query) {
    return axios.get(
      `${BASE_URL}3/search/movie?api_key=${apiKey}&query=${query}&page=1`
    );
  },
  fetchMovieById(id) {
    return axios.get(
      `${BASE_URL}3/movie/${id}?api_key=${apiKey}&external_source=imdb_id`
    );
  },
  fetchReviews(id) {
    return axios.get(
      `${BASE_URL}3/movie/${id}/reviews?api_key=${apiKey}&external_source=imdb_id`
    );
  },
  fetchCast(id) {
    return axios.get(
      `${BASE_URL}3/movie/${id}/credits?api_key=${apiKey}&external_source=imdb_id`
    );
  },
};

export default tmdbApi;
