import { Component } from "react";
import tmdbApi from "../../api/tmdb.api";

class Reviews extends Component {
  state = {
    reviewList: [],
  };
  async componentDidMount() {
    const id = this.props.match.params.movieId;
    try {
      const { data } = await tmdbApi.fetchReviews(id);

      this.setState(() => ({ reviewList: data.results }));
    } catch (error) {
      console.log(error);
    }
  }
  render() {
    const { reviewList } = this.state;
    return reviewList.length ? (
      <ul>
        {reviewList.map((item) => (
          <li key={item.id}>
            <h4>{`Author: ${item.author}`}</h4>
            <p>{item.content}</p>
          </li>
        ))}
      </ul>
    ) : (
      <span>We don't have any reviews for this movie.</span>
    );
  }
}
export default Reviews;
