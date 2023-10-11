import { Route, Routes } from 'react-router-dom';
import { lazy } from 'react';
import css from './App.module.css';

import SharedLayout from 'pages/SharedLayout';
const Home = lazy(() => import('../pages/Home/Home'));
const Catalog = lazy(() => import('../pages/Catalog/Catalog'));
const Favorites = lazy(() => import('../pages/Favorites/Favorites'));

export const App = () => {
  return (
    <div
      className={css.Wrap}
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        fontSize: 40,
        color: '#010101',
      }}
    >
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route index element={<Home />} />
          <Route path="catalog" element={<Catalog />} />
          <Route path="favorites" element={<Favorites />} />
          <Route path="*" element={<h4>Layout not found</h4>} />
        </Route>
      </Routes>
    </div>
  );
};
