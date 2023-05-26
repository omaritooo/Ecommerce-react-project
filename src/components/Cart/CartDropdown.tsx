import React from 'react';
import CartItem from './CartItem';
import { useSelector } from 'react-redux';
import { selectCart, selectTC } from '../../store/cartSlice';
import { product } from '../../types';
import { Link } from 'react-router-dom';

export const CartDropdown = ({ show }: { show: boolean }) => {
  const totalCost = useSelector(selectTC);
  const cart = useSelector(selectCart);

  return (
    <>
      <section
        className={`absolute bg-white rounded-md shadow-md z-20 h-fit w-96 right-2 p-4 top-10 transition duration-300 ${
          show ? 'opacity-100 h-fit' : 'hidden opacity-0 h-0'
        }`}>
        <div className="px-4 pt-8 pb-4 mx-auto ">
          <h2 className="mb-4 text-2xl font-medium text-gray-800">Shopping Cart</h2>
          <div className="flex flex-col mt-4 gap-y-1">
            {cart.length === 0 ? (
              <p className="text-lg text-gray-600">Your cart is empty</p>
            ) : (
              <>
                {cart.length <= 3 ? (
                  cart.map((product: product) => <CartItem key={product.id} product={product} />)
                ) : (
                  <>
                    {cart.slice(0, 3).map((product: product) => (
                      <CartItem key={product.id} product={product} />
                    ))}
                    <Link className="mx-auto mt-3 text-black" to="/cart">
                      Show More
                    </Link>
                  </>
                )}
                )
                <div className="flex items-center justify-between mt-4">
                  <span className="text-lg font-medium text-gray-800">Total:</span>
                  <span className="text-lg font-medium text-gray-800">
                    ${totalCost?.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-end mt-4">
                  <Link
                    to="/cart"
                    className="px-4 py-2 font-medium text-white bg-gray-800 rounded-md">
                    Checkout
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      </section>
    </>
  );
};
