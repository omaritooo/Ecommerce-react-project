import { createBrowserRouter, useNavigate } from 'react-router-dom';
import React from 'react';
import { MainLayout } from '../Layouts/MainLayout';
import { Homepage } from '../Pages/Homepage';
import { TheHeader } from '../components/TheHeader';
import { ProductPage } from '../Pages/ProductPage';
import { CategoryPage } from '../Pages/CategoryPage';
import CartPage from '../Pages/CartPage';
import SearchPage from '../Pages/SearchPage';
import ErrorPage from '../Pages/ErrorPage';
import useReactQuery from '../hooks/useReactQuery';
import { getProductConfig } from '../repo';
import axios from 'axios';

const loader = {};

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Homepage />
      },
      {
        path: 'products/:slug',
        element: <ProductPage />,
        loader: ({ params }) => {
          return axios.get(`https://dummyjson.com/products/${params.slug}`);
        }
      },
      {
        path: 'products/',
        element: <TheHeader />
      },
      {
        path: 'categories/:slug',
        element: <CategoryPage />,
        loader: ({ params }) => {
          const response = axios.get(`https://dummyjson.com/categories/${params.slug}`);
          return response;
        }
      },
      {
        path: 'cart',
        element: <CartPage />
      },
      {
        path: 'search/:slug',
        element: <SearchPage />
      },
      {
        path: '*',
        element: <ErrorPage />
      }
    ]
  }
]);
