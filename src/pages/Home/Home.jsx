import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import css from './Home.module.scss';

const Home = () => {
  const [dayTrends, setDayTrends] = useState('');
  const location = useLocation();

  useEffect(() => {
    const getTrends = () => {
      fetch(
        'https://api.themoviedb.org/3/trending/all/day?api_key=225e339996bc91260b33199c383c8881'
      )
        .then(res => res.json())
        .then(res => {
          // console.log(res.results);
          const needed = res.results.map(({ id, title, name }) => {
            return { id, title: name || title };
          });
          setDayTrends(needed);
          // console.log(needed);
        })
        .catch(er => console.log(er.message));
    };

    getTrends();
  }, []);

  return (
    <div className={css.home}>
      <h3 className={css.title}>Trending today</h3>
      {dayTrends && 'Here are trends'}
    </div>
  );
};

export default Home;
