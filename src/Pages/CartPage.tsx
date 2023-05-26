import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { activeTabModifier, selectActiveTab, selectCart, selectTC } from '../store/cartSlice';
import { product } from '../types';
import CheckoutCart from '../components/Checkout/CheckoutCart';
import CheckoutSteps from '../components/Checkout/CheckoutSteps';

import CheckoutShipping from '../components/Checkout/CheckoutShipping';
import CheckoutInvoice from '../components/Checkout/CheckoutInvoice';
const CartPage = () => {
  const dispatch = useDispatch();
  const totalCost = useSelector(selectTC);
  const activeTab = useSelector(selectActiveTab);
  const cart: product[] = useSelector(selectCart);
  useEffect(() => {
    dispatch(activeTabModifier(1));
  }, []);

  return (
    <main className="mt-10 md:mt-24">
      {activeTab === 3 ? (
        <h1 className="text-3xl text-black ">Invoice</h1>
      ) : (
        <h1 className="text-3xl text-black ">Checkout Page</h1>
      )}
      {activeTab < 3 ? <CheckoutSteps /> : null}
      {activeTab === 1 ? (
        <CheckoutCart cart={cart} totalCost={totalCost} />
      ) : activeTab == 2 ? (
        <CheckoutShipping />
      ) : (
        <CheckoutInvoice />
      )}
    </main>
  );
};

export default CartPage;
