import { Link, withRouter } from "react-router-dom";

const MovieList = ({ movies, location }) => {
  return (
    <ul>
      {movies.map((movie) => (
        <li key={movie.id}>
          <Link
            to={{
              pathname: `/movies/${movie.id}`,
              state: {
                from: location,
              },
            }}
          >
            {movie.name || movie.title}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default withRouter(MovieList);
