import { NavLink } from "react-router-dom";
import styles from "./MovieCard.module.css";
import posterNotFound from "../../images/posterNotFound.png";
import PropTypes from "prop-types";

const MovieCard = ({ id, imgUrl, title, userScore, overview, genres }) => {
  return (
    <section className={styles.movieCard}>
      <div className={styles.descrHolder}>
        {imgUrl ? (
          <img
            className={styles.moviePoster}
            src={`https://image.tmdb.org/t/p/w500/${imgUrl}`}
            alt="Movie poster"
          />
        ) : (
          <img src={posterNotFound} alt="poster" style={{ width: 250 }} />
        )}
        <div>
          <h2>{title}</h2>
          <p>{`User Score: ${userScore}`}</p>
          <h3>Overview</h3>
          <p>{overview}</p>
          <h3>Genres</h3>
          <ul className={styles.genres}>
            {genres &&
              genres.map((genre) => (
                <li className={styles.genre} key={genre}>
                  {genre}
                </li>
              ))}
          </ul>
        </div>
      </div>
      <div>
        <h3>Additional information</h3>
        <ul>
          <li>
            <NavLink
              className={styles.navLink}
              activeClassName={styles.navLinkActive}
              to={`/movies/${id}/cast`}
            >
              Cast
            </NavLink>
          </li>
          <li>
            <NavLink
              className={styles.navLink}
              activeClassName={styles.navLinkActive}
              to={`/movies/${id}/reviews`}
            >
              Reviews
            </NavLink>
          </li>
        </ul>
      </div>
    </section>
  );
};
export default MovieCard;

MovieCard.propTypes = {
  id: PropTypes.number.isRequired,
  imgUrl: PropTypes.string,
  title: PropTypes.string,
  userScore: PropTypes.number,
  overview: PropTypes.string,
  genres: PropTypes.arrayOf(PropTypes.string),
};
