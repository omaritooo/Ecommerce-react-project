import React from 'react';
import { useSelector } from 'react-redux';
import { selectActiveTab } from '../../store/cartSlice';

const CheckoutSteps = () => {
  const activeTab = useSelector(selectActiveTab);
  return (
    <div className="mx-auto mt-10">
      <ol className="flex items-center justify-center gap-2 mx-auto text-xs font-medium text-gray-500 sm:gap-4">
        <li className="flex"></li>

        <li className="flex items-center justify-center gap-2 text-blue-600">
          {activeTab > 1 ? (
            <span className="rounded bg-green-50 p-1.5 text-green-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-3 h-3"
                viewBox="0 0 20 20"
                fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
          ) : (
            <span className="h-6 w-6 rounded bg-blue-50 text-center text-[10px]/6 font-bold">
              1
            </span>
          )}

          <span className={`${activeTab > 1 ? 'text-green-600' : ''}`}> Checkout </span>
        </li>

        <li className="flex items-center justify-end gap-2">
          {activeTab > 2 ? (
            <span className="rounded bg-green-50 p-1.5 text-green-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-3 h-3"
                viewBox="0 0 20 20"
                fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
          ) : (
            <span className="h-6 w-6 rounded bg-blue-50 text-center text-[10px]/6 font-bold">
              2
            </span>
          )}

          <span className={`${activeTab > 2 ? 'text-green-600' : ''}`}> Payment </span>
        </li>
      </ol>
    </div>
  );
};

export default CheckoutSteps;
