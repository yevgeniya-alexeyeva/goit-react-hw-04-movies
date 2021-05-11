import { NavLink } from "react-router-dom";
import routs from "../../routs";
import styles from "./Header.module.css";

const Header = () => {
  return (
    <header className={styles.header}>
      <nav>
        <ul className={styles.nav}>
          <li className={styles.navLink}>
            <NavLink
              exact
              to={routs.HomePage}
              className={styles.navLink}
              activeClassName={styles.navLinkActive}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to={routs.MoviesPage}
              className={styles.navLink}
              activeClassName={styles.navLinkActive}
            >
              Movies
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};
export default Header;
