import React from 'react';
import { useSelector } from 'react-redux';
import { selectInvoice } from '../../store/cartSlice';
import { product } from '../../types';
import { Link } from 'react-router-dom';

const CheckoutInvoice = () => {
  const invoiceSelector = useSelector(selectInvoice);
  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <h2 className="mb-4 text-lg font-medium">Invoice</h2>
      <div className="flex justify-between mb-4">
        <div>
          <p className="font-medium text-gray-600">Invoice #</p>
          <p className="font-bold text-gray-900">INV-{Math.floor(Math.random() * 100 + 1)}</p>
        </div>
        <div>
          <p className="font-medium text-gray-600">Date</p>
          <p className="font-bold text-gray-900">{invoiceSelector.user.date}</p>
        </div>
      </div>
      <div className="mb-4">
        <p className="font-medium text-gray-600">Billed to</p>
        <p className="font-bold text-gray-900">{invoiceSelector.user.name}</p>
      </div>
      <table className="w-full mb-4">
        <thead>
          <tr>
            <th className="font-medium text-left text-gray-600">Item</th>
            <th className="font-medium text-right text-gray-600">Quantity</th>
            <th className="font-medium text-right text-gray-600">Price</th>
            <th className="font-medium text-right text-gray-600">Total</th>
          </tr>
        </thead>
        <tbody>
          {invoiceSelector.product.map((el: product) => {
            return (
              <tr key={el.id}>
                <td className="font-medium text-gray-900">{el.title}</td>
                <td className="text-right text-gray-900">{el.quantity}</td>
                <td className="text-right text-gray-900">${el.price.toLocaleString()}</td>
                <td className="text-right text-gray-900">
                  ${(el.price * el.quantity).toLocaleString()}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {invoiceSelector.totalCost ? (
        <>
          <div className="flex justify-end font-medium">
            <p className="mr-4">Subtotal:</p>
            <p className="text-gray-900">${invoiceSelector.totalCost.toLocaleString()}</p>
          </div>
          <div className="flex justify-end font-medium">
            <p className="mr-4">Tax:</p>
            <p className="text-gray-900">${(invoiceSelector.totalCost * 0.14).toLocaleString()}</p>
          </div>
          <div className="flex justify-end mt-4 text-xl font-bold">
            <p className="mr-4">Total:</p>
            <p className="text-gray-900">${(invoiceSelector.totalCost * 1.14).toLocaleString()}</p>
          </div>
        </>
      ) : null}
      <Link className="px-4 py-2 mt-10 bg-yellow-400 rounded-md" to="/">
        Back to home
      </Link>
    </div>
  );
};

export default CheckoutInvoice;
