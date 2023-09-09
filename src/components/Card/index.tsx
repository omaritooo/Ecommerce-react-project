import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { product } from '../../types';
import { BaseImage } from '../Base/BaseImage';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../store/cartSlice';

export default function Card({ product, loading }: { product: product; loading?: boolean | null }) {
  const dispatch = useDispatch();
  return (
    <div className="relative flex flex-col justify-between my-4 w-[350px] min-w-[250px] sm:min-w-[350px]  overflow-hidden shadow-md group">
      <Card.Favourite />
      <Card.Thumbnail title={product.title} id={product.id} thumbnail={product.thumbnail} />
      <div className="relative p-6 ">
        <span className="whitespace-nowrap bg-yellow-400 px-3 py-1.5 text-xs font-medium">New</span>
        <Card.Title id={product.id} title={product.title} />
        <span className="mt-1.5 text-sm text-gray-700">$ {product.price.toLocaleString()}</span>
        <button
          type="button"
          onClick={() => dispatch(addToCart({ ...product, quantity: 1 }))}
          className="block w-full p-4 mt-4 text-sm font-medium transition bg-yellow-400 rounded hover:scale-105">
          Add to Cart
        </button>
      </div>
    </div>
  );
}

Card.Title = function CardTitle({ id, title }: { id: number; title: string }) {
  return (
    <Link to={`/products/${id}`}>
      <h3 className="mt-4 overflow-hidden text-sm font-medium text-gray-900 sm:text-lg text-ellipsis max-h-[25px]">
        {title}
      </h3>
    </Link>
  );
};

Card.Favourite = function CardFavourite() {
  const [clicked, setClick] = useState(false);

  return (
    <button
      type="button"
      className="absolute end-4 top-4 z-10 rounded-full bg-white p-1.5 text-gray-900 transition hover:text-gray-900/75">
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
        className={`
          ${
            clicked
              ? 'text-red-500 w-6 h-6 transition duration-150 ease-in-out'
              : 'text-black-500 w-6 h-6 transition duration-150 ease-in-out'
          } transition duration-300 ease-in-out
          `}>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
        />
      </svg>
    </button>
  );
};

Card.Thumbnail = function CardThumbnail({
  id,
  title,
  thumbnail
}: {
  id: number;
  title: string;
  thumbnail: string;
}) {
  return (
    <Link to={`/products/${id}`}>
      <BaseImage
        src={thumbnail}
        alt={title}
        title={title}
        styling="object-cover w-full transition duration-500 h-44 md:w-96 group-hover:scale-105 sm:h-72 max-w-96"
      />
    </Link>
  );
};
