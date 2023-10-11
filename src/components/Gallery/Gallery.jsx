import { useState, useEffect } from 'react';
import css from './Gallery.module.scss';
import GalleryItem from 'components/GalleryItem/GalleryItem';
import Modal from 'components/Modal/Modal';
import PopupCard from 'components/PopupCard/PopupCard';

const Gallery = ({
  items,
  filters: { brand, price, kmFrom, kmTo },
  favorites,
  toggleFavorite,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState('');
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(0);
  const [isLastPage, setIsLastPage] = useState(false);
  const [moreIndex, setMoreIndex] = useState(8);

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
  }, [page]);

  const toggleModal = id_ => {
    if (id_) {
      const itemToModal = items.find(({ id }) => id === id_);
      setSelectedItem(itemToModal);
    }
    setShowModal(prev => !prev);
  };

  return (
    <>
      <ul className={css.gallery}>
        {items
          .slice(0, moreIndex)
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
          .map(({ id, ...restProps }) => {
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
          <li>
            <button className={css.button} onClick={() => setPage(page + 1)}>
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
