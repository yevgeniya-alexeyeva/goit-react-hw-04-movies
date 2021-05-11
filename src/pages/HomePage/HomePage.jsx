import { Component } from "react";
import tmdbApi from "../../api/tmdb.api";
import Header from "../../components/Header";
import MovieList from "../../components/MovieList";

class HomePage extends Component {
  state = {
    trendingMovies: [],
    isDataLoaded: false,
  };

  async componentDidMount() {
    try {
      const { data } = await tmdbApi.fetchTrending();
      this.setState(() => ({
        trendingMovies: data.results,
      }));
    } catch (error) {
      console.log(error);
    } finally {
      this.setState(() => ({ isDataLoaded: true }));
    }
  }

  render() {
    const { trendingMovies } = this.state;

    return (
      <>
        <Header />
        <div>
          <h1>Trending today</h1>
          <MovieList movies={trendingMovies} />
        </div>
      </>
    );
  }
}
export default HomePage;
