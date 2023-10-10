import { useState } from 'react';
import css from './Gallery.module.scss';
import GalleryItem from 'components/GalleryItem/GalleryItem';
import Modal from 'components/Modal/Modal';
import PopupCard from 'components/PopupCard/PopupCard';

const Gallery = ({
  items,
  filters: { brand, price, kmFrom, kmTo },
  favorites,
  toggleFavorite,
  nextPage,
  isLastPage,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState('');

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
            <button className={css.button} onClick={nextPage}>
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
