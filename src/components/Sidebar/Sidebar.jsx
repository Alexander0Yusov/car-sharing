import css from './Sidebar.module.scss';

const Sidebar = ({ children }) => {
  return <div className={css.sidebar}>{children}</div>;
};

export default Sidebar;
