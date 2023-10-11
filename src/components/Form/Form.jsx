import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import css from './Form.module.scss';

const Form = () => {
  const [brand, setBrand] = useState('');
  const [price, setPrice] = useState('');
  const [kmFrom, setKmFrom] = useState('');
  const [kmTo, setKmTo] = useState('');

  const [setSearchParams] = useSearchParams();

  const setters = {
    brand: setBrand,
    price: setPrice,
    kmFrom: setKmFrom,
    kmTo: setKmTo,
  };

  const handlerChange = e => {
    const { name, value } = e.currentTarget;
    setters[name](value);
  };

  const handlerSubmit = e => {
    e.preventDefault();

    const filter = {};
    if (brand) filter.brand = brand;
    if (price) filter.price = price;
    if (kmTo) filter.kmTo = kmTo;
    if (kmFrom) filter.kmFrom = kmFrom;

    setSearchParams(filter);
  };

  return (
    <form onSubmit={handlerSubmit} className={css.form} autoComplete="off">
      <label className={`${css.label} ${css.labelBrand}`}>
        Car brand
        <select
          name="brand"
          value={brand}
          onChange={handlerChange}
          className={css.input}
        >
          <option value={''} disabled>
            Enter the text
          </option>
          <option value="Buick">Buick</option>
          <option value="Volvo">Volvo</option>
          <option value="Hummer">Hummer</option>
        </select>
      </label>

      <label className={`${css.label} ${css.labelPrice}`}>
        Price/ 1 hour
        <select
          name="price"
          value={price}
          onChange={handlerChange}
          className={`${css.input}  ${css.inputPrice}`}
        >
          <option value={''}>To $</option>
          <option value={'30'}>30</option>
          <option value={'40'}>40</option>
          <option value={'50'}>50</option>
        </select>
        {price && <div className={css.subInput}>{`To ${price} $`}</div>}
      </label>

      <label className={`${css.label} ${css.labelDistance}`}>
        Car mileage / km
        <div className={css.inputsWrap}>
          <input
            type="text"
            name="kmFrom"
            value={kmFrom}
            onChange={handlerChange}
            className={`${css.input} ${css.inputDistanceLeft}`}
            placeholder="From"
          />
          <input
            type="text"
            name="kmTo"
            value={kmTo}
            onChange={handlerChange}
            className={`${css.input} ${css.inputDistanceRight}`}
            placeholder="To"
          />
        </div>
      </label>

      <button className={css.button} type="submit">
        Search
      </button>
    </form>
  );
};

export default Form;
