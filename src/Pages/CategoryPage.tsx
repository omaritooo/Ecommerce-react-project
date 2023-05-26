import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';

import Card from '../components/Card';
import { product } from '../types';
import { IconLoader } from '../components/Icons/IconLoader';
import useReactQuery from '../hooks/useReactQuery';
import { getCategoryConfig } from '../repo';

export const CategoryPage = () => {
  const { slug } = useParams();
  const [limit, setLimit] = useState<number>(10);

  const { data, errorResponse, isLoading } = useReactQuery({
    reqName: 'Test',
    request: getCategoryConfig(limit, 0, slug as string)
  });

  return (
    <>
      <h1 className="my-4 text-3xl font-bold uppercase">{slug}</h1>
      <section className="flex flex-wrap justify-start gap-x-4">
        {data ? (
          data.products.map((el: product) => {
            return <Card loading={isLoading} key={el.id} product={el} />;
          })
        ) : (
          <IconLoader />
        )}
      </section>
      {limit <= data?.length && (
        <button
          className="px-2 mx-auto text-white bg-black rounded-md "
          onClick={() => {
            setLimit((limit) => (limit += 10));
          }}>
          Show More
        </button>
      )}
    </>
  );
};
