import { Component } from "react";
import tmdbApi from "../../api/tmdb.api";
import Header from "../../components/Header";
import SearchBar from "../../components/SearchBar";
import MovieList from "../../components/MovieList";

class MoviesPage extends Component {
  state = {
    query: null,
    movies: null,
  };

  componentDidMount() {
    const {
      location: { search },
    } = this.props;
    const searchParams = new URLSearchParams(search);
    const savedQuery = searchParams.get("query");
    savedQuery && this.setState(() => ({ query: savedQuery }));
  }

  async componentDidUpdate(prevProps, prevState) {
    const { query } = this.state;
    if (prevState.query !== query) {
      try {
        const { data } = await tmdbApi.fetchMovieByQuery(query);
        this.setState(() => ({ movies: data.results }));
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
        {movies && <MovieList movies={movies} />}
      </>
    );
  }
}

export default MoviesPage;
