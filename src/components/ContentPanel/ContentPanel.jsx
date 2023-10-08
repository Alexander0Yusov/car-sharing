import css from './ContentPanel.module.scss';

const ContentPanel = ({ children }) => {
  return <div className={css.content}>{children}</div>;
};

export default ContentPanel;
