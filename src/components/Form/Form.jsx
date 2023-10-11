import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Select from 'react-select';

import css from './Form.module.scss';

const Form = () => {
  const [brand, setBrand] = useState('');
  const [price, setPrice] = useState('');
  const [kmFrom, setKmFrom] = useState('');
  const [kmTo, setKmTo] = useState('');

  const [_, setSearchParams] = useSearchParams();
  console.log(_);

  const setters = {
    brand: setBrand,
    price: setPrice,
    kmFrom: setKmFrom,
    kmTo: setKmTo,
  };

  const options = [
    { value: 'Buick', label: 'Buick' },
    { value: 'Volvo', label: 'Volvo' },
    { value: 'Hummer', label: 'Hummer' },
    { value: 'Subaru', label: 'Subaru' },
    { value: 'Mitsubishi', label: 'Mitsubishi' },
    { value: 'Nissan', label: 'Nissan' },
    { value: 'Lincoln', label: 'Lincoln' },
    { value: 'GMC', label: 'GMC' },
    { value: 'Hyundai', label: 'Hyundai' },
    { value: 'MINI', label: 'MINI' },
    { value: 'Bentley', label: 'Bentley' },
    { value: 'Mercedes-Benz', label: 'Mercedes-Benz' },
    { value: 'Aston Martin', label: 'Aston Martin' },
    { value: 'Pontiac', label: 'Pontiac' },
    { value: 'Lamborghini', label: 'Lamborghini' },
    { value: 'Audi', label: 'Audi' },
    { value: 'BMW', label: 'BMW' },
    { value: 'Chevrolet', label: 'Chevrolet' },
    { value: 'Chrysler', label: 'Chrysler' },
    { value: 'Kia', label: 'Kia' },
    { value: 'Land', label: 'Land' },
  ];

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      border: '0',
      padding: '0 0 0 4px',
      marginTop: 'auto',
      width: '224px',
      height: '48px',
      fontSize: '16px',
      borderRadius: '12px',
      outline: 'none',
    }),
    placeholder: (provided, state) => ({
      ...provided,
      color: 'black',
    }),
  };

  const handlerChange = e => {
    const { name, value } = e.currentTarget;
    setters[name](value);
  };
  const handleSelectChange = selectedOption => {
    setBrand(selectedOption);
  };

  const handlerSubmit = e => {
    e.preventDefault();

    const filter = {};
    if (brand?.value) filter.brand = brand.value;
    if (price) filter.price = price;
    if (kmTo) filter.kmTo = kmTo;
    if (kmFrom) filter.kmFrom = kmFrom;

    setSearchParams(filter);
  };

  return (
    <form onSubmit={handlerSubmit} className={css.form} autoComplete="off">
      <label className={`${css.label} ${css.labelBrand}`}>
        Car brand
        <Select
          options={options}
          value={brand}
          onChange={handleSelectChange}
          styles={customStyles}
        />
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
          <option value={'100'}>100</option>
          <option value={'200'}>200</option>
          <option value={'300'}>300</option>
          <option value={'400'}>400</option>
          <option value={'500'}>500</option>
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
