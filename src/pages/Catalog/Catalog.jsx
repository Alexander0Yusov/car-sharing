import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import css from './Catalog.module.scss';
import Gallery from 'components/Gallery/Gallery';
import Form from 'components/Form/Form';

const LS_KEY = 'carSharingFavorite';

const Catalog = () => {
  const [totalItems, setTotalItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [responseStatus, setResponseStatus] = useState('');
  const [searchParams] = useSearchParams();
  const [favorites, setFavorites] = useState(() => {
    const localData = localStorage.getItem(LS_KEY);
    if (localData) {
      return JSON.parse(localData);
    }
    return [];
  });

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
    const getData = () => {
      fetch(`https://647bc928c0bae2880ad03fe8.mockapi.io/adverts`)
        .then(res => res.json())
        .then(res => {
          setTotalItems(res);
        })
        .catch(er => setResponseStatus(er.message));
    };
    getData();
  }, []);

  useEffect(() => {
    localStorage.setItem(LS_KEY, JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    const filters = {};
    for (const [key, value] of searchParams) {
      filters[key] = value;
    }
    const { brand, price, kmFrom, kmTo } = filters;

    setFilteredItems(
      totalItems
        .filter(({ make }) => {
          if (!brand) return true;
          return make.toLowerCase() === brand.toLowerCase();
        })
        .filter(({ rentalPrice }) => {
          if (!price) return true;
          return Number(rentalPrice.split('$')[1]) <= Number(price);
        })
        .filter(({ mileage }) => {
          if (!kmFrom) return true;
          return Number(mileage) >= Number(kmFrom);
        })
        .filter(({ mileage }) => {
          if (!kmTo) return true;
          return Number(mileage) <= Number(kmTo);
        })
    );
  }, [searchParams, totalItems]);

  return (
    <>
      <Form />

      {totalItems.length !== 0 ? (
        <Gallery
          items={filteredItems}
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
