import { useEffect, useState } from 'react';
import css from './Favorites.module.scss';
import Gallery from 'components/Gallery/Gallery';

const LS_KEY = 'carSharingFavorite';

const Favorites = () => {
  const [response, setResponse] = useState([]);
  const [responseStatus, setResponseStatus] = useState('');
  const [favorites, setFavorites] = useState(() => {
    const localData = localStorage.getItem(LS_KEY);
    if (localData) {
      return JSON.parse(localData);
    }
    return [];
  });

  const getData = () => {
    fetch(`https://647bc928c0bae2880ad03fe8.mockapi.io/adverts`)
      .then(res => res.json())
      .then(res => {
        setResponse(res);
      })
      .catch(er => setResponseStatus(er.message));
  };

  const toggleFavorite = id => {
    const updatedFavorites = [...favorites];

    if (favorites.includes(id)) {
      const deleteIndex = favorites.indexOf(id);
      updatedFavorites.splice(deleteIndex, 1);
      setFavorites(updatedFavorites);
      return;
    }

    updatedFavorites.push(id);
    setFavorites(updatedFavorites);
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    localStorage.setItem(LS_KEY, JSON.stringify(favorites));
  }, [favorites]);

  return (
    <>
      {response.length !== 0 ? (
        <Gallery
          items={response?.filter(({ id }) => favorites.includes(id))}
          favorites={favorites}
          toggleFavorite={toggleFavorite}
        />
      ) : (
        <p className={css.responseParagraph}>{responseStatus} </p>
      )}
    </>
  );
};

export default Favorites;
