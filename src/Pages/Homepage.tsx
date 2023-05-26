import React from 'react';
import CardDrawer from '../components/Card/CardDrawer';
import { BaseCollection } from '../components/Base/BaseCollection';
import useReactQuery from '../hooks/useReactQuery';
import { getProductsConfig } from '../repo';
import { IconLoader } from '../components/Icons/IconLoader';

export const Homepage = () => {
  const { data, errorResponse, isLoading } = useReactQuery({
    reqName: 'Test',
    request: getProductsConfig(15, 0)
  });
  const { data: data2 } = useReactQuery({ reqName: 'Tete', request: getProductsConfig(20, 0) });

  return (
    <>
      <BaseCollection />
      {data && <CardDrawer title="Trending Now" products={data.products} />}
      {errorResponse ? (
        <span>{errorResponse.message}</span>
      ) : isLoading ? (
        <span>Loading...</span>
      ) : null}
      {!isLoading ? <CardDrawer title="Top Rated" products={data2?.products} /> : <IconLoader />}
    </>
  );
};
