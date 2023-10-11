import { MdFavorite, MdFavoriteBorder } from 'react-icons/md';
import css from './GalleryItem.module.scss';

const GalleryItem = props => {
  const {
    address,
    img,
    make,
    year,
    type,
    rentalPrice,
    rentalCompany,
    model,
    mileage,
    accessories,
  } = props.restProps;

  return (
    <article className={css.card}>
      <div className={css.thumb}>
        <img src={img} alt={model}></img>
        {props.isFavorite ? (
          <MdFavorite
            className={css.favoriteIcon}
            onClick={props.toggleFavorite}
          />
        ) : (
          <MdFavoriteBorder
            className={css.favoriteBorderIcon}
            onClick={props.toggleFavorite}
          />
        )}
      </div>
      <div className={css.titleWrap}>
        <p className={css.titleMain}>
          {`${make} `}
          <span className={css.titleModel}>{`${model}, `}</span>
          {`${year}`}
        </p>
        <p className={css.titlePrice}>{`${rentalPrice}`}</p>
      </div>
      <p className={css.details}>{`${address
        .split(', ')
        .slice(-2)
        .join(
          ' | '
        )} | ${rentalCompany} | ${type} | ${model} | ${mileage} | ${accessories.join(
        ' | '
      )}`}</p>
      <button className={css.button} onClick={props.toggleModal}>
        Learn more
      </button>
    </article>
  );
};

export default GalleryItem;
