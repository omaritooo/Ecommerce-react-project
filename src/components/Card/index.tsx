import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { product } from '../../types';
import { BaseImage } from '../Base/BaseImage';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../store/cartSlice';

export default function Card({ product, loading }: { product: product; loading?: boolean | null }) {
  const [clicked, setClick] = useState(false);
  const dispatch = useDispatch();
  return (
    <div className="relative my-4 w-[350px] min-w-[250px] sm:min-w-[350px] block overflow-hidden shadow-md group">
      <button className="absolute end-4 top-4 z-10 rounded-full bg-white p-1.5 text-gray-900 transition hover:text-gray-900/75">
        <span className="sr-only">Wishlist</span>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill={clicked ? 'red' : 'none'}
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          onClick={() => {
            setClick((clicked) => (clicked = !clicked));
          }}
          stroke="currentColor"
          className={
            clicked
              ? 'text-red-500 w-6 h-6 transition duration-150 ease-in-out'
              : 'text-black-500 w-6 h-6 transition duration-150 ease-in-out'
          }>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
          />
        </svg>
      </button>

      <Link to={`/products/${product.id}`}>
        {/* <LazyLoadImage
          loading="lazy"
          className="object-cover w-full transition duration-500 h-44 md:w-96 group-hover:scale-105 sm:h-72 max-w-96"
        /> */}
        <BaseImage
          src={product.thumbnail}
          alt={product.title}
          title={product.title}
          styling="object-cover w-full transition duration-500 h-44 md:w-96 group-hover:scale-105 sm:h-72 max-w-96"
        />
      </Link>

      <div className="relative p-6 bg-white border border-gray-100">
        <span className="whitespace-nowrap bg-yellow-400 px-3 py-1.5 text-xs font-medium">New</span>

        <Link to={`/products/${product.id}`}>
          <h3 className="mt-4 text-sm font-medium text-gray-900 sm:text-lg">{product.title}</h3>
        </Link>

        <p className="mt-1.5 text-sm text-gray-700">${product.price}</p>

        <button
          onClick={() => dispatch(addToCart({ ...product, quantity: 1 }))}
          className="block w-full p-4 mt-4 text-sm font-medium transition bg-yellow-400 rounded hover:scale-105">
          Add to Cart
        </button>
      </div>
    </div>
  );
}
