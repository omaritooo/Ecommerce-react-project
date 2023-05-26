import React, { useEffect, useState } from 'react';
import { product } from '../../types';
import BasePagination from '../Base/BasePagination';
import { useDispatch } from 'react-redux';
import { activeTabModifier, removeFromCart, updateQuantity } from '../../store/cartSlice';

interface IProps {
  cart: product[];
  totalCost: number;
}

const CheckoutCart = ({ cart, totalCost }: IProps) => {
  const [page, setPage] = useState<number>(1);

  const dispatch = useDispatch();

  const [paginatedCart, setPaginatedCart] = useState<product[]>([]);

  const currentPage = (el: number) => {
    setPage(el);
  };

  const arrayPagination = (array: product[], pageSize: number, pageNumber: number) => {
    setPaginatedCart(array.slice((pageNumber - 1) * pageSize, pageNumber * pageSize));
  };

  useEffect(() => {
    arrayPagination(cart, 5, page);

    // (divivdedArrays);
  }, [cart]);
  useEffect(() => {
    arrayPagination(cart, 5, page);
  }, [page]);
  return (
    <div className="max-w-screen-xl px-4 py-8 mx-auto sm:px-6 sm:py-12 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <header className="text-center">
          <h1 className="text-xl font-bold text-gray-900 sm:text-3xl">Your Cart</h1>
        </header>

        <div className="mt-8">
          <ul className="space-y-4">
            {paginatedCart?.map((el: product) => (
              <>
                <li className="flex flex-col items-center justify-between gap-4 sm:flex-row">
                  <img
                    src={el.thumbnail}
                    alt={el.title}
                    className="object-cover w-16 h-16 rounded"
                  />

                  <div>
                    <h3 className="text-sm text-gray-900">{el.title}</h3>

                    <dl className="mt-0.5 space-y-px text-[10px] text-gray-600">
                      <div>
                        <dt className="inline">Price:</dt>
                        <dd className="inline">{el.price.toLocaleString()}</dd>
                      </div>
                    </dl>
                  </div>

                  <div className="flex flex-col items-center justify-end gap-2 ml-auto w-fit">
                    <form className="flex flex-col items-center justify-between">
                      <button className="text-gray-600 transition hover:text-red-600">
                        <span className="sr-only">Remove item</span>
                        <button
                          onClick={() => {
                            dispatch(removeFromCart(el));
                          }}>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="w-4 h-4">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                            />
                          </svg>
                        </button>
                      </button>

                      <div className="w-full mx-auto sm:w-auto sm:mx-0">
                        <label htmlFor="Quantity" className="sr-only">
                          Quantity
                        </label>

                        <div className="flex items-center justify-center gap-1 mx-auto w-fit">
                          <button
                            disabled={el.quantity ? el?.quantity <= 1 : true}
                            onClick={() => {
                              dispatch(
                                updateQuantity({
                                  item: el,
                                  type: 'dec'
                                })
                              );
                            }}
                            type="button"
                            className="w-10 h-10 leading-10 text-gray-600 transition hover:opacity-75">
                            &minus;
                          </button>
                          <div className="h-10 w-16 rounded border-gray-200 flex align-middles items-center justify-center text-center [-moz-appearance:_textfield] sm:text-sm [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none">
                            {el.quantity}
                          </div>

                          <button
                            onClick={() => {
                              dispatch(
                                updateQuantity({
                                  item: el,
                                  type: 'inc'
                                })
                              );
                            }}
                            type="button"
                            className="w-10 h-10 leading-10 text-gray-600 transition hover:opacity-75">
                            +
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </li>
              </>
            ))}
          </ul>

          <div className="flex justify-end pt-8 mt-8 border-t border-gray-100">
            <div className="w-screen max-w-lg space-y-4">
              <dl className="space-y-0.5 text-sm text-gray-700">
                <div className="flex justify-between !text-base font-medium">
                  <dt>Total</dt>
                  <dd>${totalCost.toLocaleString()}</dd>
                </div>
              </dl>

              <div className="flex justify-end">
                <button
                  onClick={() => {
                    dispatch(activeTabModifier(2));
                  }}
                  className="block px-5 py-3 text-sm text-gray-100 transition bg-gray-700 rounded hover:bg-gray-600">
                  Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {cart.length > 5 ? (
        <BasePagination itemsSize={cart.length} itemsPerPage={5} currentPage={currentPage} />
      ) : null}
    </div>
  );
};

export default CheckoutCart;
