import React from 'react';
import CartItem from '../Cart/CartItem';
import { useSelector } from 'react-redux';
import { selectTC } from '../../store/cartSlice';
import { product } from '../../types';
import { Link } from 'react-router-dom';

export const BaseDropdown = ({
  show,
  content,
  cart = false
}: {
  show: boolean;
  content: product[];
  cart?: boolean;
}) => {
  return (
    <section
      className={`absolute bg-white rounded-md shadow-md z-30 h-fit w-96 right-2 p-4 top-10 transition-all ease-in-out duration-300 ${
        show ? 'opacity-100  h-fit' : 'hidden opacity-0 h-0'
      }`}>
      <div className="px-4 pt-8 pb-4 mx-auto ">
        <h1 className="mb-4 text-2xl font-medium text-gray-800">
          {cart ? 'Shopping Cart' : 'Favourites'}
        </h1>
        <BaseDropdown.Items cart={cart} content={content} />
        {cart ? <BaseDropdown.Checkout /> : null}
      </div>
    </section>
  );
};

const BaseDropdownCheckout = () => {
  const totalCost = useSelector(selectTC);

  return (
    <>
      <div className="flex items-center justify-between mt-4">
        <span className="text-lg font-medium text-gray-800">Total:</span>
        <span className="text-lg font-medium text-gray-800">${totalCost?.toFixed(2)}</span>
      </div>
      <div className="flex justify-end mt-4">
        <Link to="/cart" className="px-4 py-2 font-medium text-white bg-gray-800 rounded-md">
          Checkout
        </Link>
      </div>
    </>
  );
};

const BaseDropdownItems = ({ content, cart = false }: { content: product[]; cart?: boolean }) => {
  let items;
  if (content.length === 0) {
    items = (
      <p className="text-lg text-gray-600">
        {cart ? 'Your cart is empty' : 'No favourites selected'}
      </p>
    );
  } else if (content.length <= 3) {
    items = content.map((product: product) => (
      <CartItem key={product.id} cart={cart} product={product} />
    ));
  } else {
    items = (
      <>
        {content.slice(0, 3).map((product: product) => (
          <CartItem key={product.id} cart={cart} product={product} />
        ))}
        <Link className="mx-auto mt-3 text-black" to={cart ? '/cart' : ''}>
          Show More
        </Link>
      </>
    );
  }

  return <div className="flex flex-col mt-4 gap-y-1">{items}</div>;
};

BaseDropdown.Checkout = BaseDropdownCheckout;
BaseDropdown.Items = BaseDropdownItems;
