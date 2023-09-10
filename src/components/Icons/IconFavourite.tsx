import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { selectFavourite } from '../../store/favouriteSlice';
import { BaseDropdown } from '../Base/BaseDropdown';
export const IconFavourite = () => {
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

  const favs = useSelector(selectFavourite);

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
              {favs.length}
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-8 h-8">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
              />
            </svg>
          </button>
          {/* <CartDropdown show={cartOpen} /> */}
          <BaseDropdown content={favs} show={cartOpen} />
        </div>
      ) : null}
    </>
  );
};
