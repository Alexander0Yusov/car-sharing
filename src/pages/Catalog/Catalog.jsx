import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import css from './Catalog.module.scss';
import Gallery from 'components/Gallery/Gallery';
import Form from 'components/Form/Form';

const LS_KEY = 'carSharingFavorite';

const Catalog = () => {
  const [totalItems, setTotalItems] = useState([]);

  const [responseStatus, setResponseStatus] = useState('');
  const [searchParams] = useSearchParams();
  const [favorites, setFavorites] = useState(() => {
    const localData = localStorage.getItem(LS_KEY);
    if (localData) {
      return JSON.parse(localData);
    }
    return [];
  });

  const filters = {};
  for (const [key, value] of searchParams) {
    filters[key] = value;
  }

  const getData = () => {
    fetch(`https://647bc928c0bae2880ad03fe8.mockapi.io/adverts`)
      .then(res => res.json())
      .then(res => {
        setTotalItems(res);
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
      <Form />

      {totalItems.length !== 0 ? (
        <Gallery
          items={totalItems}
          filters={filters}
          favorites={favorites}
          toggleFavorite={toggleFavorite}
        />
      ) : (
        <p className={css.responseParagraph}>{responseStatus} </p>
      )}
    </>
  );
};

export default Catalog;
