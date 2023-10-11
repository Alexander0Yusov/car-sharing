import { useEffect, useState } from 'react';
import css from './Favorites.module.scss';
import Gallery from 'components/Gallery/Gallery';

const Favorites = () => {
  const [response, setResponse] = useState([]);
  const [responseStatus, setResponseStatus] = useState('');

  useEffect(() => {
    const getData = () => {
      fetch(`https://647bc928c0bae2880ad03fe8.mockapi.io/adverts`)
        .then(res => res.json())
        .then(res => {
          setResponse(res);
        })
        .catch(er => setResponseStatus(er.message));
    };
    getData();
  }, []);

  return (
    <>
      {response.length !== 0 ? (
        <Gallery items={response} isFavorite={true} />
      ) : (
        <p className={css.responseParagraph}>{responseStatus} </p>
      )}
    </>
  );
};

export default Favorites;
