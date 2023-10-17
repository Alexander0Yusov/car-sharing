import { useState, useEffect } from 'react';
import css from './Gallery.module.scss';
import GalleryItem from 'components/GalleryItem/GalleryItem';
import Modal from 'components/Modal/Modal';
import PopupCard from 'components/PopupCard/PopupCard';

const LS_KEY = 'carSharingFavorite';

const Gallery = ({ items: items_, isFavorite }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState('');
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(0);
  const [isLastPage, setIsLastPage] = useState(false);
  const [moreIndex, setMoreIndex] = useState(8);
  const [items, setItems] = useState([]);

  const [favorites, setFavorites] = useState(() => {
    const localData = localStorage.getItem(LS_KEY);
    if (localData) {
      return JSON.parse(localData);
    }
    return [];
  });

  useEffect(() => {
    setItems(
      items_.filter(({ id }) => (isFavorite ? favorites.includes(id) : true))
    );
  }, [isFavorite, favorites, items_]);

  useEffect(() => {
    const pagesCount = () => {
      const full = Math.trunc(items.length / 8);
      const rest = items.length % 8 > 0;
      if (full && rest) return full + 1;
      if (full && !rest) return full;
      if (!full && rest) return 1;
      if (!full && !rest) return 0;
    };
    setPages(pagesCount());
  }, [items]);

  useEffect(() => {
    if (page < pages) {
      setIsLastPage(false);
    } else {
      setIsLastPage(true);
    }
  }, [page, pages]);

  useEffect(() => {
    if (page >= 1 && !isLastPage) {
      setMoreIndex(page * 8);
    }
    if (isLastPage) {
      setMoreIndex(items.length);
    }
  }, [page, isLastPage, items.length]);

  useEffect(() => {
    localStorage.setItem(LS_KEY, JSON.stringify(favorites));
  }, [favorites]);

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

  const toggleModal = id_ => {
    if (id_) {
      const itemToModal = items.find(({ id }) => id === id_);
      setSelectedItem(itemToModal);
    }
    setShowModal(prev => !prev);
  };

  const incrementPage = () => setPage(prev => prev + 1);

  return (
    <>
      <ul className={css.gallery}>
        {items.slice(0, moreIndex).map(({ id, ...restProps }) => {
          return (
            <li key={id} className={css.galleryItem}>
              <GalleryItem
                restProps={restProps}
                isFavorite={favorites.includes(id)}
                toggleFavorite={() => toggleFavorite(id)}
                toggleModal={() => toggleModal(id)}
              />
            </li>
          );
        })}
        {!isLastPage && (
          <li className={css.galleryItem}>
            <button className={css.button} onClick={incrementPage}>
              Load more
            </button>
          </li>
        )}
      </ul>

      {showModal && (
        <Modal onClose={toggleModal}>
          <PopupCard item={selectedItem} onClose={toggleModal} />
        </Modal>
      )}
    </>
  );
};

export default Gallery;
