import React, { useState } from 'react';

interface IProps {
  itemsPerPage: number;
  itemsSize: number;
  currentPage: (el: number) => void;
}
const BasePagination = ({ itemsPerPage, itemsSize, currentPage }: IProps) => {
  const pageArray = [];
  const [currPage, setCurrPage] = useState(1);
  for (let i = 1; i <= Math.ceil(itemsSize / itemsPerPage); i++) {
    pageArray.push(i);
  }

  currPage;
  return (
    <ol className="flex justify-center gap-1 text-xs font-medium">
      <li>
        <button
          disabled={currPage > 1 ? false : true}
          onClick={() => {
            if (currPage > 1) {
              setCurrPage((currPage) => currPage - 1);
            }
            currentPage(currPage);
            currPage;
          }}
          className="inline-flex items-center justify-center w-8 h-8 text-gray-900 bg-white border border-gray-100 rounded disabled:bg-gray-200 rtl:rotate-180">
          <span className="sr-only">Prev Page</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-3 h-3"
            viewBox="0 0 20 20"
            fill="currentColor">
            <path
              fillRule="evenodd"
              d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </li>
      {pageArray.map((el: number) => (
        <li key={el}>
          <button
            onClick={() => {
              currentPage(el);
              setCurrPage(el);
            }}
            className={`block w-8 h-8 leading-8 text-center text-gray-900 bg-white border border-gray-100 rounded ${
              currPage == el ? `bg-blue-400 text-white` : ``
            }`}>
            {el}
          </button>
        </li>
      ))}

      <li>
        <button
          disabled={currPage === Math.ceil(itemsSize / itemsPerPage) ? true : false}
          onClick={() => {
            setCurrPage((currPage) => currPage + 1);
            currPage;
            currentPage(currPage);
          }}
          className="inline-flex items-center justify-center w-8 h-8 text-gray-900 bg-white border border-gray-100 rounded disabled:bg-gray-200 rtl:rotate-180">
          <span className="sr-only">Next Page</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-3 h-3"
            viewBox="0 0 20 20"
            fill="currentColor">
            <path
              fillRule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </li>
    </ol>
  );
};

export default BasePagination;
