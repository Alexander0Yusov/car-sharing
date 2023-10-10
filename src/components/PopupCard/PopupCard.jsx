import { MdClose } from 'react-icons/md';
import css from './PopupCard.module.scss';

const PopupCard = props => {
  const { address, img, make, year, type, rentalPrice, rentalCompany, model } =
    props.item;

  return (
    <article className={css.card}>
      <MdClose className={css.closeIcon} onClick={props.onClose} />
      <div className={css.thumb}>
        <img src={img} alt={model}></img>
      </div>
      <div className={css.titleWrap}>
        <p className={css.titleMain}>
          {`${make} `}
          <span className={css.titleModel}>{`${model}, `}</span>
          {`${year}`}
        </p>
        <p className={css.titlePrice}>{`${rentalPrice}`}</p>
      </div>
      <p className={css.details}>{`${address} | ${type} | ${rentalCompany}`}</p>
      <a className={css.button} href="tel:+380730000000">
        <span className={css.buttonContent}>Rental car</span>
      </a>
    </article>
  );
};

export default PopupCard;
