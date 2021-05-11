import { Component, lazy, Suspense } from "react";
import { Route } from "react-router-dom";
import routs from "../../routs";
import tmdbApi from "../../api/tmdb.api";
import Header from "../../components/Header";
import SearchBar from "../../components/SearchBar";
import PropTypes from "prop-types";

import Loader from "react-loader-spinner";

const MovieList = lazy(() => import("../../components/MovieList"));

class MoviesPage extends Component {
  state = {
    query: null,
    movies: null,
  };
  componentDidMount() {
    const savedMovies = JSON.parse(localStorage.getItem("movies"));

    savedMovies && this.setState(() => ({ movies: savedMovies }));
  }

  async componentDidUpdate(prevProps, prevState) {
    const { query } = this.state;

    if (prevState.query !== query) {
      try {
        const { data } = await tmdbApi.fetchMovieByQuery(query);
        this.setState(() => ({ movies: data.results }));

        localStorage.setItem("movies", JSON.stringify(this.state.movies));
      } catch (error) {
        console.log(error);
      }
    }
  }

  getQuery = (e, query) => {
    e.preventDefault();
    this.setState({ query: query.trim().split(" ").join("+") });
    e.currentTarget.reset();

    this.props.history.push({ pathname: "/movies", search: `?query=${query}` });
  };

  render() {
    const { movies } = this.state;
    return (
      <>
        <Header />
        <SearchBar onSubmit={this.getQuery} />
        <Suspense
          fallback={
            <Loader
              type="ThreeDots"
              color="#3f51b5"
              height={100}
              width={100}
              timeout={2000}
            />
          }
        >
          <Route
            path={routs.SearchList}
            render={(props) => {
              <MovieList {...props} movies={movies} />;
            }}
          />
        </Suspense>
      </>
    );
  }
}

export default MoviesPage;

Route.propTypes = {
  path: PropTypes.string,
  exact: PropTypes.bool,

  render: PropTypes.func,
};
