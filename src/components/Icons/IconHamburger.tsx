import React, { useState } from 'react';
export const IconHamburger = ({ toggleFunction }: { toggleFunction: (e: boolean) => void }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  //   const toggleFunction = () => {
  //     return isOpen;
  //   };

  return (
    <div className="hidden mt-2 sm:mt-0 sm:flex md:order-2 w-fit">
      <button
        onClick={() => {
          setIsOpen((isOpen) => !isOpen);
          toggleFunction(isOpen);
        }}
        data-collapse-toggle="navbar-sticky"
        type="button"
        className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg w-fit hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 md:hidden"
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
  );
};
