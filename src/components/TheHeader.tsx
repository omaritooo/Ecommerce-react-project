import React, { useEffect, useState } from 'react';
import IconLogo from './Icons/IconLogo';
import { BaseInput } from './Base/BaseInput';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { CartDropdown } from './Cart/CartDropdown';
export const TheHeader = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [showCart, setShowCart] = useState<boolean>(true);
  const navigate = useNavigate();
  const [text, setText] = useState<string>('');
  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);
  const [cartOpen, setCartOpen] = useState<boolean>(false);
  const textEmitter = (e: string) => {
    setText(e);
  };

  const searchFunction = () => {
    navigate(`/search/${text}`);
  };
  useEffect(() => {
    const handleWindowResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleWindowResize);
    if (!isOpen && windowWidth < 768) {
      document.body.style.overflow = 'auto';
    } else if (isOpen && windowWidth < 768) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
      setIsOpen(false);
    }

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  });
  useEffect(() => {
    if (location.pathname == '/cart') {
      setShowCart(false);
    } else {
      setShowCart(true);
    }
    setCartOpen(false);
  }, [location]);

  return (
    <nav className="fixed top-0 left-0 z-20 w-screen border-b border-gray-200 bg-yellow-300 py-2.5 px-6 sm:px-0 sm:py-5">
      <div className="container flex flex-wrap items-center justify-between md:w-screen ">
        <Link to="/">
          <IconLogo />
        </Link>
        <div className="mt-2 sm:mt-0 sm:flex md:order-2">
          <button
            onClick={() => {
              setIsOpen((isOpen) => (isOpen = !isOpen));
            }}
            data-collapse-toggle="navbar-sticky"
            type="button"
            className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 md:hidden"
            aria-controls="navbar-sticky"
            aria-expanded="false">
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-6 h-6"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg">
              <path
                fillRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"></path>
            </svg>
          </button>
        </div>
        {!location.pathname.includes('search') && (
          <div className="hidden w-1/3 mx-auto md:flex md:gap-x-2">
            <BaseInput enter={searchFunction} text={textEmitter} />
            <button
              onClick={() => {
                searchFunction();
              }}
              className="px-3 py-2 text-white bg-black rounded-md">
              Search
            </button>
          </div>
        )}
        {showCart ? (
          <div
            className={`relative hidden ml-auto text-white md:block ${
              location.pathname.includes('search') ? 'ml-auto' : ''
            }`}>
            <button
              className="my-auto"
              onClick={() => {
                setCartOpen((cartOpen) => (cartOpen = !cartOpen));
              }}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-8 h-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </button>
            <CartDropdown show={cartOpen} />
          </div>
        ) : null}

        {isOpen && (
          <div className="flex flex-col items-start justify-between w-screen h-screen md:hidden overflow-none ">
            <ul className="flex flex-col py-4 mt-4 text-lg rounded-lg">
              <li>
                <Link
                  to="/"
                  className="block py-2 pr-4 text-gray-700 rounded md:bg-transparent md:p-0"
                  aria-current="page">
                  Home
                </Link>
              </li>
              <li>
                <a
                  href="#"
                  className="block py-2 text-gray-700 rounded hover:bg-gray-100 md:p-0 md:hover:bg-transparent md:hover:text-blue-700">
                  Cart
                </a>
              </li>
              <div className="w-full">
                <BaseInput enter={searchFunction} text={textEmitter} />
              </div>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};
