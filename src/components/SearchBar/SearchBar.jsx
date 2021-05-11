import { useRef } from "react";
import styles from "./Searchbar.module.css";
import PropTypes from "prop-types";

const Searchbar = ({ onSubmit }) => {
  const ref = useRef(null);
  return (
    <form
      className={styles.SearchForm}
      onSubmit={(e) => onSubmit(e, ref.current.value)}
    >
      <input
        ref={ref}
        className={styles.SearchFormInput}
        type="text"
        autoComplete="off"
        autoFocus
        placeholder="Search movies"
      />
      <button type="submit" className={styles.SearchFormButton}>
        Search
      </button>
    </form>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;
