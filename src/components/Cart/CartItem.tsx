import React from 'react';
import { product } from '../../types';
import { useDispatch } from 'react-redux';
import { removeFromCart, updateQuantity } from '../../store/cartSlice';

type Favourite = Omit<product, 'quantity'>;

const CartItem = ({ product, cart = false }: { product: product; cart?: boolean }) => {
  return (
    <div className="flex flex-row items-center justify-between w-full px-2 py-2 bg-white rounded-lg shadow-md">
      <div className="flex items-center">
        <img src={product.thumbnail} alt={product.title} className="object-contain w-20 h-20" />
        <CartItem.Info
          cart={cart}
          title={product.title}
          quantity={product.quantity as number}
          price={product.price}
        />
      </div>
      {cart ? <CartItem.Actions product={product} /> : <CartItem.Favourite content={product} />}
    </div>
  );
};

export default CartItem;

CartItem.Info = function CartItemInfo({
  quantity,
  price,
  cart,
  title
}: {
  quantity: number;
  cart: boolean;
  price: number;
  title: string;
}) {
  return (
    <div className="ml-3 gap-y-3">
      <h3 className="flex-wrap max-w-xs text-lg font-medium text-gray-700">{title}</h3>
      {cart ? <p className="text-sm text-gray-500">Quantity: {quantity}</p> : null}
      <p className="font-medium text-gray-700 text-md">$ {price.toLocaleString()} </p>
    </div>
  );
};
CartItem.Actions = function CartItemActions({ product }: { product: product }) {
  const dispatch = useDispatch();

  return (
    <div className="flex flex-col items-center justify-between w-6 ">
      <button
        type="button"
        title="Remove"
        className="text-red-500 w-fit hover:text-red-700 focus:outline-none"
        onClick={() => dispatch(removeFromCart(product))}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-trash"
          viewBox="0 0 16 16">
          {' '}
          <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />{' '}
          <path
            fillRule="evenodd"
            d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
          />{' '}
        </svg>
      </button>
      <div className="flex justify-between text-black disabled:text-gray-200 gap-x-3 w-fit max-w-fit">
        <button
          disabled={product.quantity == 1 ? true : false}
          onClick={() => {
            dispatch(
              updateQuantity({
                item: product,
                type: 'dec'
              })
            );
          }}>
          -
        </button>
        <button
          onClick={() => {
            dispatch(
              updateQuantity({
                item: product,
                type: 'inc'
              })
            );
          }}>
          +
        </button>
      </div>
    </div>
  );
};

const CartItemFavourite = ({ content }: { content: Favourite }) => {
  const dispatch = useDispatch();
  // const buttonAction = () => {
  //   dispatch
  // }

  return (
    <button type="button" title="favourite">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill={content.liked ? 'red' : 'none'}
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className={`w-6 h-6 ${content.liked ? '' : 'text-black'}`}>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
        />
      </svg>
    </button>
  );
};

CartItem.Favourite = CartItemFavourite;
