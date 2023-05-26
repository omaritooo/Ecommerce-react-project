import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useReactQuery from '../hooks/useReactQuery';
import { getSearchConfig } from '../repo';
import { product } from '../types';
import Card from '../components/Card';
import { IconLoader } from '../components/Icons/IconLoader';
import { BaseInput } from '../components/Base/BaseInput';

const SearchPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [limit, setLimit] = useState<number>(5);
  const [text, setText] = useState<string>('');
  const textEmitter = (e: string) => {
    setText(e);
  };
  const { data, isLoading } = useReactQuery({
    reqName: 'SearchProducts',
    request: getSearchConfig(limit, 0, slug as string)
  });
  const enter = () => {
    navigate(`/search/${text}`);
    window.location.reload();
  };

  return (
    <section className="mt-32">
      <div className="flex flex-col items-center justify-start w-full gap-x-10 lg:flex-row">
        <h1 className="my-4 text-3xl font-bold uppercase">Search</h1>
        <div className="flex w-full h-10 max-w-sm my-10 shadow-md sm:max-w-2xl sm:w-1/2 lg:w-1/3 md:flex md:gap-x-2">
          <BaseInput text={textEmitter} enter={enter} />
          <button
            onClick={() => {
              navigate(`/search/${text}`);
              window.location.reload();
            }}
            className="px-3 py-2 text-white bg-black rounded-md">
            Search
          </button>
        </div>
      </div>
      <section className="flex flex-wrap justify-center px-4 sm:px-0 lg:justify-start gap-x-4">
        {data && data.products ? (
          data.products.map((el: product) => {
            return <Card loading={isLoading} key={el.id} product={el} />;
          })
        ) : (
          <IconLoader />
        )}
      </section>
      <div className="flex justify-center w-full">
        {!data?.total ? null : limit <= data?.total ? (
          <button
            className="px-4 py-2 mx-auto text-white bg-black rounded-md justify-items-center "
            onClick={() => {
              setLimit((limit) => (limit += 10));
            }}>
            Show More
          </button>
        ) : (
          <span>{limit}</span>
        )}
      </div>
    </section>
  );
};

export default SearchPage;
