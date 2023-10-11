import css from './Section.module.scss';

const Section = ({ children }) => {
  return <div className={css.container}>{children}</div>;
};

export default Section;
