import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import css from './App.module.css';

import Section from './Section/Section';
import Modal from './Modal/Modal';
import Sidebar from './Sidebar/Sidebar';
import ContentPanel from './ContentPanel/ContentPanel';
import Form from './Form/Form';
import Home from 'pages/Home/Home';
import SharedLayout from 'pages/SharedLayout';

const LS_KEY = 'carSharingFavorite';
// https://647bc928c0bae2880ad03fe8.mockapi.io/adverts
// hook useLocalStorage video_1 1:06

export const App = () => {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    localStorage.setItem(LS_KEY, JSON.stringify());
  }, []);

  const toggleModal = () => {
    setShowModal(previousValue => !previousValue);
  };

  return (
    <div
      className={css.Wrap}
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        // justifyContent: 'center',
        alignItems: 'center',
        fontSize: 40,
        color: '#010101',
      }}
    >
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route index element={<Home />} />
          <Route path="catalog" element={<Home />} />
          <Route path="favorites" element={<Home />} />
          <Route path="*" element={<h4>Layout not found</h4>} />
        </Route>
      </Routes>

      {/* <Section>
        <Sidebar>hi</Sidebar>
        <ContentPanel>
          <Form />
        </ContentPanel>
      </Section> */}
      {/* {showModal && <Modal onClose={toggleModal}></Modal>} */}
    </div>
  );
};
