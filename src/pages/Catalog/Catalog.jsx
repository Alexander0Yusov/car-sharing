import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import css from './Catalog.module.scss';
import Gallery from 'components/Gallery/Gallery';
import Form from 'components/Form/Form';

const LS_KEY = 'carSharingFavorite';

const Catalog = () => {
  const [totalItems, setTotalItems] = useState([]);
  const [showingItems, setShowingItems] = useState([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(0);
  const [isLastPage, setIsLastPage] = useState(false);

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
        setShowingItems(res.slice(0, 8));
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

  useEffect(() => {
    const pagesCount = () => {
      const full = Math.trunc(totalItems.length / 8);
      const rest = totalItems.length % 8 > 0;
      if (full && rest) return full + 1;
      if (full && !rest) return full;
      if (!full && rest) return 1;
      if (!full && !rest) return 0;
    };
    setPages(pagesCount());

    if (page < pages) {
      setIsLastPage(false);
    } else {
      setIsLastPage(true);
    }
  }, [page, pages, totalItems]);

  useEffect(() => {
    if (page !== 1 && !isLastPage) {
      console.log('not_last');
      setShowingItems([
        ...showingItems,
        ...totalItems.slice(page * 8 - 8, page * 8),
      ]);
    }
    if (page !== 1 && isLastPage) {
      console.log('last');
      setShowingItems([
        ...showingItems,
        ...totalItems.slice(page * 8 - 8, totalItems.length - (page * 8 - 8)),
      ]);
    }
    // eslint-disable-next-line
  }, [page, isLastPage, totalItems]);

  return (
    <>
      <Form />

      {showingItems.length !== 0 ? (
        <Gallery
          items={showingItems}
          filters={filters}
          favorites={favorites}
          toggleFavorite={toggleFavorite}
          nextPage={() => setPage(page + 1)}
          isLastPage={isLastPage}
        />
      ) : (
        <p className={css.responseParagraph}>{responseStatus} </p>
      )}
    </>
  );
};

export default Catalog;
