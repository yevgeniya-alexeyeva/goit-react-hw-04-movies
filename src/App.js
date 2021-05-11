import { lazy, Suspense } from "react";
import { Route, Switch } from "react-router-dom";
import routs from "./routs";
import Loader from "react-loader-spinner";

const HomePage = lazy(() =>
  import("./pages/HomePage" /* webpackChunkName: "home-page" */)
);
const MoviesPage = lazy(() =>
  import("./pages/MoviesPage" /* webpackChunkName: "movies-page" */)
);
const MovieDetailsPage = lazy(() =>
  import(
    "./pages/MovieDetailsPage" /* webpackChunkName: "movie-details-page" */
  )
);
const NotFoundPage = lazy(() =>
  import("./pages/NotFoundPage" /* webpackChunkName: "not-found-page" */)
);

const App = () => (
  <div>
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
        <Route path={routs.HomePage} exact component={HomePage} />
        <Route path={routs.MoviesPage} exact component={MoviesPage} />
        <Route path={routs.MovieDetailsPage} component={MovieDetailsPage} />
        <Route component={NotFoundPage} />
      </Switch>
    </Suspense>
  </div>
);

export default App;
