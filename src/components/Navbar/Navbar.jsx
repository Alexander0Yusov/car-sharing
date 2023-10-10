import { NavLink } from 'react-router-dom';

import css from './Navbar.module.scss';

const Navbar = () => {
  const navbarLink = ({ isActive }) =>
    isActive ? css.isActive : css.navbarLink;
  return (
    <>
      <ul className={css.navbarUl}>
        <li className={css.navbarLi}>
          <NavLink to="/" className={navbarLink} data-navigate="home">
            Home
          </NavLink>
        </li>
        <li className={css.navbarLi}>
          <NavLink to="catalog" className={navbarLink} data-navigate="catalog">
            Catalog
          </NavLink>
        </li>
        <li className={css.navbarLi}>
          <NavLink
            to="favorites"
            className={navbarLink}
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
