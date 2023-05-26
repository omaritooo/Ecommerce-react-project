import React, { useState } from 'react';
import { BaseImage } from '../Base/BaseImage';
import { useSelector } from 'react-redux';
import { activeTabModifier, createInvoice, selectCart, selectTC } from '../../store/cartSlice';
import { product } from '../../types';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
const CheckoutShipping = () => {
  const cart = useSelector(selectCart);
  const totalCost = useSelector(selectTC);
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const date = new Date();
  const MySwal = withReactContent(Swal);

  const submitForm = () => {
    const nameRegex = /^([\w]{3,})+\s+([\w\s]{3,})+$/i;
    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if (!nameRegex.test(name)) {
      MySwal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'Card name incorrect.',
        showConfirmButton: false,
        toast: true,
        timer: 1500
      });
      return;
    }
    if (!emailRegex.test(email)) {
      email;
      MySwal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'Email incorrect.',
        showConfirmButton: false,
        toast: true,
        timer: 1500
      });
      return;
    }
    MySwal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Order shipped.',
      showConfirmButton: false,
      toast: true,
      timer: 1500
    });
    dispatch(
      createInvoice({
        product: cart,
        user: {
          name: name,
          email: email,
          date: `${date.getDate()} / ${date.getMonth() + 1} / ${date.getFullYear()}`,
          orderId: 1
        }
      })
    );
    dispatch(activeTabModifier(3));
  };

  return (
    <div className="grid mt-10 sm:px-10 lg:grid-cols-2 lg:px-20 xl:px-32">
      <div className="px-4 pt-8">
        <p className="text-xl font-medium">Order Summary</p>
        <p className="text-gray-400">Check your items. And select a suitable shipping method.</p>
        <div className="px-2 py-4 mt-8 space-y-3 bg-white border rounded-lg sm:px-6">
          {cart.slice(0, 2).map((el: product) => {
            return (
              <div key={el.id} className="flex flex-col bg-white rounded-lg sm:flex-row">
                <BaseImage
                  styling="object-cover object-center w-24 h-24 m-2 border rounded-md "
                  src={el.thumbnail}
                  alt=""
                />
                <div className="flex flex-col w-full px-4 py-4">
                  <span className="font-semibold">{el.title}</span>
                  <p className="mt-auto text-lg font-bold">${el.price.toLocaleString()}</p>
                </div>
              </div>
            );
          })}
        </div>

        <p className="mt-8 text-lg font-medium">Shipping Methods</p>
        <form className="grid gap-6 mt-5">
          <div className="relative">
            <input className="hidden peer" id="radio_1" type="radio" name="radio" checked />
            <span className="box-content absolute block w-3 h-3 -translate-y-1/2 bg-white border-8 border-gray-300 rounded-full peer-checked:border-gray-700 right-4 top-1/2"></span>
            <label
              className="flex p-4 border border-gray-300 rounded-lg cursor-pointer select-none peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50"
              htmlFor="radio_1">
              <img className="object-contain w-14" src="/images/naorrAeygcJzX0SyNI4Y0.png" alt="" />
              <div className="ml-5">
                <span className="mt-2 font-semibold">Fedex Delivery</span>
                <p className="text-sm leading-6 text-slate-500">Delivery: 2-4 Days</p>
              </div>
            </label>
          </div>
          <div className="relative">
            <input className="hidden peer" id="radio_2" type="radio" name="radio" checked />
            <span className="box-content absolute block w-3 h-3 -translate-y-1/2 bg-white border-8 border-gray-300 rounded-full peer-checked:border-gray-700 right-4 top-1/2"></span>
            <label
              className="flex p-4 border border-gray-300 rounded-lg cursor-pointer select-none peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50"
              htmlFor="radio_2">
              <img className="object-contain w-14" src="/images/oG8xsl3xsOkwkMsrLGKM4.png" alt="" />
              <div className="ml-5">
                <span className="mt-2 font-semibold">Fedex Delivery</span>
                <p className="text-sm leading-6 text-slate-500">Delivery: 2-4 Days</p>
              </div>
            </label>
          </div>
        </form>
      </div>
      <div className="px-4 pt-8 mt-10 bg-gray-50 lg:mt-0">
        <p className="text-xl font-medium">Payment Details</p>
        <p className="text-gray-400">Complete your order by providing your payment details.</p>
        <div className="">
          <label htmlFor="email" className="block mt-4 mb-2 text-sm font-medium">
            Email
          </label>
          <div className="relative">
            <input
              type="text"
              id="email"
              name="email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              className="w-full px-4 py-3 text-sm border border-gray-200 rounded-md shadow-sm outline-none pl-11 focus:z-10 focus:border-blue-500 focus:ring-blue-500"
              placeholder="your.email@gmail.com"
            />
            <div className="absolute inset-y-0 left-0 inline-flex items-center px-3 pointer-events-none">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                />
              </svg>
            </div>
          </div>
          <label htmlFor="card-holder" className="block mt-4 mb-2 text-sm font-medium">
            Card Holder
          </label>
          <div className="relative">
            <input
              onChange={(e) => {
                setName(e.target.value);
              }}
              type="text"
              id="card-holder"
              name="card-holder"
              className="w-full px-4 py-3 text-sm uppercase border border-gray-200 rounded-md shadow-sm outline-none pl-11 focus:z-10 focus:border-blue-500 focus:ring-blue-500"
              placeholder="Your full name here"
            />
            <div className="absolute inset-y-0 left-0 inline-flex items-center px-3 pointer-events-none">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z"
                />
              </svg>
            </div>
          </div>

          <div className="py-2 mt-6 border-t border-b">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-gray-900">Subcost</p>
              <p className="font-semibold text-gray-900">${totalCost.toLocaleString()}</p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-gray-900">Shipping</p>
              <p className="font-semibold text-gray-900">$8.00</p>
            </div>
          </div>
          <div className="flex items-center justify-between mt-6">
            <p className="text-sm font-medium text-gray-900">Total</p>
            <p className="text-2xl font-semibold text-gray-900">
              ${(totalCost + 8).toLocaleString()}
            </p>
          </div>
        </div>
        <button
          onClick={() => {
            submitForm();
          }}
          className="w-full px-6 py-3 mt-4 mb-8 font-medium text-white bg-gray-900 rounded-md">
          Place Order
        </button>
        <button
          onClick={() => {
            dispatch(activeTabModifier(1));
          }}
          className="w-full px-6 py-3 mb-2 font-medium text-gray-800 bg-white border rounded-md">
          Back to Cart
        </button>
      </div>
    </div>
  );
};

export default CheckoutShipping;
