import { useState } from 'react';

import css from './Form.module.scss';

const Form = ({ addUser, toggleModal }) => {
  const [brand, setBrand] = useState('');
  const [price, setPrice] = useState(0);
  const [kmFrom, setKmFrom] = useState('');
  const [kmTo, setKmTo] = useState('');

  const handlerSubmit = e => {
    e.preventDefault();
    // const modelId = nanoid();
    // addUser({ id: modelId, name: name, number: number, url: url });
    // toggleModal();
  };

  const handlerChangeBrand = e => {
    setBrand(e.currentTarget.value);
  };

  const handlerChangePrice = e => {
    setPrice(e.currentTarget.value);
  };

  const handlerChangeKmFrom = e => {
    setKmFrom(e.currentTarget.value);
  };

  const handlerChangeKmTo = e => {
    setKmTo(e.currentTarget.value);
  };

  return (
    <form onSubmit={handlerSubmit} className={css.form} autoComplete="off">
      <label className={`${css.label} ${css.labelBrand}`}>
        Car brand
        <select
          name="brand"
          value={brand}
          onChange={handlerChangeBrand}
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
          onChange={handlerChangePrice}
          className={css.input}
        >
          <option value={0} disabled>
            To &
          </option>
          <option value={30}>30</option>
          <option value={40}>40</option>
          <option value={50}>50</option>
        </select>
      </label>

      <label className={`${css.label} ${css.labelDistance}`}>
        Car mileage / km
        <div className={css.inputsWrap}>
          <input
            type="text"
            name="kmFrom"
            title="title"
            value={kmFrom}
            onChange={handlerChangeKmFrom}
            className={`${css.input} ${css.inputDistanceLeft}`}
            placeholder="Enter the text"
          />
          <input
            type="text"
            name="kmTo"
            title="title"
            value={kmTo}
            onChange={handlerChangeKmTo}
            className={`${css.input} ${css.inputDistanceRight}`}
            placeholder="Enter the text"
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
