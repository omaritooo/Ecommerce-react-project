import React, { useEffect, useState } from 'react';
import IconLogo from './Icons/IconLogo';
import { BaseInput } from './Base/BaseInput';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { CartDropdown } from './Cart/CartDropdown';
import { CartToggle } from './Cart/CartToggle';
import { IconHamburger } from './Icons/IconHamburger';
import { useScroll } from '../hooks/useScroll';

export const TheHeader = () => {
  const { scrollPosition } = useScroll();
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

  const getToggle = (el: boolean) => {
    setIsOpen(el);
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
    <nav
      className={`${
        scrollPosition > 50 ? 'shadow-lg bg-white' : 'bg-transparent'
      } z-20 fixed top-0 left-0 w-screen py-2.5 px-6 sm:px-0 sm:py-5 transition-all duration-300`}>
      <div className="container flex items-center justify-around w-full px-4 gap-y-5 ">
        <Link to="/" className="mr-auto w-fit">
          <IconLogo />
        </Link>
        <IconHamburger toggleFunction={getToggle} />
        {!location.pathname.includes('search') ? (
          <div className="hidden w-1/3 mx-auto md:inline-flex max-h-min gap-x-4 md:gap-x-2">
            <BaseInput title="Search bar" enter={searchFunction} text={textEmitter} />
            <button
              onClick={() => {
                searchFunction();
              }}
              className="px-3 py-1 text-white bg-black rounded-md">
              Search
            </button>
          </div>
        ) : null}
        <CartToggle />

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
              <BaseInput title="mobile search" enter={searchFunction} text={textEmitter} />
            </div>
          </ul>
        </div>
      </div>
    </nav>
  );
};
