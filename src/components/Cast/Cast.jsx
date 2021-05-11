import { Component } from "react";
import tmdbApi from "../../api/tmdb.api";
import posterNotFound from "../../images/posterNotFound.png";
import styles from "./Cast.module.css";

class Cast extends Component {
  state = {
    cast: [],
  };
  async componentDidMount() {
    const id = this.props.match.params.movieId;
    try {
      const { data } = await tmdbApi.fetchCast(id);

      this.setState(() => ({ cast: data.cast }));
    } catch (error) {
      console.log(error);
    }
  }
  render() {
    const { cast } = this.state;
    return cast.length ? (
      <ul className={styles.actorList}>
        {cast.map((item) => (
          <li className={styles.actorCard} key={item.id}>
            {item.profile_path ? (
              <img
                className={styles.poster}
                src={`https://image.tmdb.org/t/p/w500/${item.profile_path}`}
                alt="actor"
              />
            ) : (
              <img src={posterNotFound} alt="poster" style={{ width: 250 }} />
            )}
            <h4>{item.name}</h4>
            <p>{`Character: ${item.character}`}</p>
          </li>
        ))}
      </ul>
    ) : (
      <span>We don't have any information about cast.</span>
    );
  }
}
export default Cast;
