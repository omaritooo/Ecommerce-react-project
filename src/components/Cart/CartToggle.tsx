import { useLocation } from 'react-router-dom';
import { CartDropdown } from './CartDropdown';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectCart } from '../../store/cartSlice';

export const CartToggle = () => {
  const [showCart, setShowCart] = useState<boolean>(true);
  const [cartOpen, setCartOpen] = useState<boolean>(false);
  const location = useLocation();
  useEffect(() => {
    if (location.pathname == '/cart') {
      setShowCart(false);
    } else {
      setShowCart(true);
    }
    setCartOpen(false);
  }, [location]);
  const cart = useSelector(selectCart);

  return (
    <>
      {showCart ? (
        <div className={`relative hidden text-black ml-auto md:flex w-fit`}>
          <button
            type="button"
            title="cart toggle"
            className="relative my-auto h-fit w-fit"
            onClick={() => {
              setCartOpen((cartOpen) => (cartOpen = !cartOpen));
            }}>
            <div className="absolute -top-1 -right-2 flex items-center justify-center w-5 h-5 text-[10px] rounded-full bg-gold">
              {cart.length}
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-8 h-8">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
              />
            </svg>
          </button>
          <CartDropdown show={cartOpen} />
        </div>
      ) : null}
    </>
  );
};
