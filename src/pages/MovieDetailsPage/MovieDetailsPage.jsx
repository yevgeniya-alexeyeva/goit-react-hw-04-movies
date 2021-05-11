import { lazy, Suspense } from "react";
import { Component } from "react";
import { Route, Switch } from "react-router-dom";
import Loader from "react-loader-spinner";
import routs from "../../routs";
import tmdbApi from "../../api/tmdb.api";
import Header from "../../components/Header";
import MovieCard from "../../components/MovieCard";
import styles from "./MovieDetailsPage.module.css";

const Cast = lazy(() =>
  import("../../components/Cast" /* webpackChunkName: "cast" */)
);

const Reviews = lazy(() =>
  import("../../components/Reviews" /* webpackChunkName: "reviews" */)
);

class MovieDetailsPage extends Component {
  state = {
    id: null,
    imgUrl: null,
    title: null,
    userScore: null,
    overview: null,
    genres: null,
  };

  async componentDidMount() {
    try {
      const { data } = await tmdbApi.fetchMovieById(
        this.props.match.params.movieId
      );
      this.setState(() => ({
        id: data.id,
        imgUrl: data.poster_path,
        title: data.title,
        userScore: Math.round(data.popularity),
        overview: data.overview,
        genres: data.genres.flatMap((genre) => genre.name),
      }));
    } catch (error) {
      console.log(error);
    }
  }
  handleGoBack = () => {
    const { location, history } = this.props;
    history.push(location?.state?.from || "/movies");
  };

  render() {
    const { id, imgUrl, title, userScore, overview, genres } = this.state;
    return (
      <>
        <Header />
        <button
          type="button"
          onClick={this.handleGoBack}
          className={styles.button}
        >
          &#x02190; Go back
        </button>

        {this.state.id ? (
          <MovieCard
            id={id}
            imgUrl={imgUrl}
            title={title}
            userScore={Math.round(userScore)}
            overview={overview}
            genres={genres}
          />
        ) : (
          <h2>Movie not found</h2>
        )}
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
          <Switch>
            <Route path={routs.Cast} component={Cast} />
            <Route path={routs.Reviews} component={Reviews} />
          </Switch>
        </Suspense>
      </>
    );
  }
}
export default MovieDetailsPage;
