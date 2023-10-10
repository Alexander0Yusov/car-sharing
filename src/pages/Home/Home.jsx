import css from './Home.module.scss';

const Home = () => {
  return (
    <div className={css.home}>
      <h3 className={css.title}>Trend to be free</h3>
      <p className={css.subTitle}>Trust the professionals</p>
    </div>
  );
};

export default Home;
