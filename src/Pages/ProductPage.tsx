import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Link, useLoaderData, useNavigate } from 'react-router-dom';

import useReactQuery from '../hooks/useReactQuery';
import { getProductConfig, setupResponseInterceptor } from '../repo';
import { BaseImage } from '../components/Base/BaseImage';
import { QueryClient } from 'react-query';
import { useDispatch } from 'react-redux';
import { addToCart, emptyCart } from '../store/cartSlice';
import { product } from '../types';

export const ProductPage = () => {
  const { slug } = useParams();
  const dispatch = useDispatch();
  const product: any = useLoaderData();

  const { data, errorResponse, isLoading } = useReactQuery({
    reqName: 'SingleProduct',
    request: getProductConfig(slug as string)
  });

  const priceBeforeDiscount = (price: number, discount: number): number => {
    const val = price * ((discount + 100) / 100);
    return Math.floor(val);
  };

  const [thumbnail, setThumbnail] = useState<string>('');

  useEffect(() => {
    if (data) {
      setThumbnail(data?.thumbnail);
    }
  }, [data]);
  const thumbnailChanger = (e: string): void => {
    setThumbnail(e);
  };
  return (
    <>
      <div className="relative max-w-screen-xl px-4 py-8 mx-auto">
        <div>
          {!isLoading ? (
            <h1 className="text-2xl font-bold lg:text-3xl">{data?.title}</h1>
          ) : (
            <h1 className="w-1/4 h-10 bg-gray-200 rounded-full animate-pulse"></h1>
          )}

          {!isLoading ? (
            <p className="mt-1 text-sm text-gray-500">SKU: #{data?.id}</p>
          ) : (
            <p className="w-1/6 h-4 mt-2 bg-gray-200 rounded-full animate-pulse"></p>
          )}
        </div>

        <div className="grid gap-8 lg:grid-cols-4 lg:items-start">
          <div className="lg:col-span-3">
            <div className="relative mt-4">
              {!isLoading ? (
                <BaseImage
                  alt={product.data?.title}
                  src={thumbnail}
                  styling="h-72 w-full rounded-xl object-cover lg:h-[540px]"
                />
              ) : (
                <div className="h-72 w-full rounded-xl bg-gray-200 animate-pulse object-cover lg:h-[540px]"></div>
              )}

              <div className="absolute bottom-4 left-1/2 inline-flex -translate-x-1/2 items-center rounded-full bg-black/75 px-3 py-1.5 text-white">
                <svg
                  className="w-4 h-4"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                  />
                </svg>

                <span className="ms-1.5 text-xs"> Hover to zoom </span>
              </div>
            </div>

            {!isLoading ? (
              <ul className="flex gap-1 mt-1">
                {product.data?.images.map((el: string, idx: number) => {
                  return (
                    <li key={idx}>
                      <button
                        onClick={() => {
                          thumbnailChanger(el);
                        }}
                        onMouseEnter={() => {
                          thumbnailChanger(el);
                        }}>
                        <BaseImage
                          alt={product.data?.title}
                          src={el}
                          styling="object-cover w-16 h-16 rounded-md"
                        />
                      </button>
                    </li>
                  );
                })}
              </ul>
            ) : (
              <div className="flex mt-2 gap-x-2">
                <div className="object-cover w-16 h-16 bg-gray-200 rounded-md animate-pulse"></div>
                <div className="object-cover w-16 h-16 bg-gray-200 rounded-md animate-pulse"></div>
                <div className="object-cover w-16 h-16 bg-gray-200 rounded-md animate-pulse"></div>
                <div className="object-cover w-16 h-16 bg-gray-200 rounded-md animate-pulse"></div>
              </div>
            )}
          </div>

          <div className="lg:sticky lg:top-0">
            <div className="space-y-4 lg:pt-8">
              <fieldset>
                <legend className="text-lg font-bold">Color</legend>

                <form className="flex flex-wrap gap-1 mt-2">
                  <label htmlFor="color_green" className="cursor-pointer">
                    <input
                      type="radio"
                      id="color_green"
                      name="color"
                      className="sr-only peer"
                      defaultChecked
                    />

                    <span className="block w-6 h-6 bg-green-700 border border-gray-200 rounded-full ring-1 ring-transparent ring-offset-1 peer-checked:ring-gray-300"></span>
                  </label>

                  <label htmlFor="color_blue" className="cursor-pointer">
                    <input type="radio" id="color_blue" name="color" className="sr-only peer" />

                    <span className="block w-6 h-6 bg-blue-700 border border-gray-200 rounded-full ring-1 ring-transparent ring-offset-1 peer-checked:ring-gray-300"></span>
                  </label>

                  <label htmlFor="color_pink" className="cursor-pointer">
                    <input type="radio" id="color_pink" name="color" className="sr-only peer" />

                    <span className="block w-6 h-6 bg-pink-700 border border-gray-200 rounded-full ring-1 ring-transparent ring-offset-1 peer-checked:ring-gray-300"></span>
                  </label>

                  <label htmlFor="color_red" className="cursor-pointer">
                    <input type="radio" id="color_red" name="color" className="sr-only peer" />

                    <span className="block w-6 h-6 bg-red-700 border border-gray-200 rounded-full ring-1 ring-transparent ring-offset-1 peer-checked:ring-gray-300"></span>
                  </label>

                  <label htmlFor="color_indigo" className="cursor-pointer">
                    <input type="radio" id="color_indigo" name="color" className="sr-only peer" />

                    <span className="block w-6 h-6 bg-indigo-700 border border-gray-200 rounded-full ring-1 ring-transparent ring-offset-1 peer-checked:ring-gray-300"></span>
                  </label>
                </form>
              </fieldset>

              <fieldset>
                <legend className="text-lg font-bold">Category</legend>

                <form className="flex flex-wrap gap-1 mt-2">
                  <label htmlFor="material_cotton" className="cursor-pointer">
                    <input
                      type="radio"
                      id="material_cotton"
                      name="material"
                      className="sr-only peer"
                      defaultChecked
                    />

                    {!isLoading ? (
                      <span className="block px-3 py-1 text-xs border border-gray-200 rounded-full peer-checked:bg-gray-100">
                        {product.data?.brand}
                      </span>
                    ) : (
                      <div className="block w-20 h-6 px-3 py-1 text-xs border border-gray-200 rounded-full animate-pulse peer-checked:bg-gray-100"></div>
                    )}
                  </label>

                  <label htmlFor="material_wool" className="cursor-pointer">
                    <input
                      type="radio"
                      id="material_wool"
                      name="material"
                      className="sr-only peer"
                      checked
                    />

                    {!isLoading ? (
                      <Link
                        to={`/categories/${product.data?.category}`}
                        className="block px-3 py-1 text-xs uppercase border border-gray-200 rounded-full peer-checked:bg-gray-100">
                        {product.data?.category}
                      </Link>
                    ) : (
                      <div className="block w-20 h-6 px-3 py-1 text-xs border border-gray-200 rounded-full animate-pulse peer-checked:bg-gray-100"></div>
                    )}
                  </label>
                </form>
              </fieldset>

              <div className="p-4 bg-gray-100 border rounded">
                <p className="text-sm">
                  <span className="block">
                    {' '}
                    Pay as low as ${data ? (product.data?.price / 24).toFixed(0) : null}/mo with 0%
                    APR.{' '}
                  </span>

                  <a href="" className="inline-block mt-1 underline">
                    {' '}
                    Find out more{' '}
                  </a>
                </p>
              </div>

              <div>
                <div className="text-xl font-bold">
                  {!isLoading ? (
                    <>
                      ${product.data?.price.toLocaleString()}{' '}
                      <span className="text-gray-300 line-through">
                        {product.data
                          ? priceBeforeDiscount(
                              product.data?.price,
                              product.data?.discountPercentage
                            ).toLocaleString()
                          : null}
                      </span>
                    </>
                  ) : (
                    <div className="w-24 h-6 bg-gray-200 rounded-full animate-pulse"></div>
                  )}
                </div>
              </div>

              <button
                onClick={() => {
                  dispatch(addToCart({ ...product.data, quantity: 1 }));
                }}
                className="w-full px-6 py-3 text-sm font-bold tracking-wide text-white uppercase bg-yellow-400 rounded">
                Add to cart
              </button>

              <button className="w-full px-6 py-3 text-sm font-bold tracking-wide uppercase bg-gray-100 border border-gray-300 rounded">
                Notify when on sale
              </button>
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="prose max-w-none">
              {!isLoading ? (
                <p>{product.data?.description}</p>
              ) : (
                <div className="w-1/2 h-5 bg-gray-200 rounded-full animate-pulse "></div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
