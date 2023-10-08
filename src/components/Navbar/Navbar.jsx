import { NavLink } from 'react-router-dom';

import css from './Navbar.module.scss';

const Navbar = () => {
  return (
    <>
      <ul className={css.navbarUl}>
        <li className={css.navbarLi}>
          <NavLink to="/" className={css.navLink} data-navigate="home">
            Home
          </NavLink>
        </li>
        <li className={css.navbarLi}>
          <NavLink to="catalog" className={css.navLink} data-navigate="catalog">
            Catalog
          </NavLink>
        </li>
        <li className={css.navbarLi}>
          <NavLink
            to="favorites"
            className={css.navLink}
            data-navigate="favorites"
          >
            Favorites
          </NavLink>
        </li>
      </ul>
    </>
  );
};

export default Navbar;
