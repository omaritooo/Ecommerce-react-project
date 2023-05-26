import React from 'react';
import { product } from '../../types';
import Card from '.';

interface IProps {
  products: product[] | undefined;
  title: string;
}
export default function CardDrawer({ products, title }: IProps) {
  return (
    <section className="container w-full">
      <h1 className="px-4 my-4 text-5xl font-bold">{title}</h1>
      <div className="flex w-full px-4 overflow-x-scroll gap-y-4 gap-x-4 flex-nowrap">
        {products &&
          products?.map((el: product) => {
            return <Card key={el.id} product={el} />;
          })}
      </div>
    </section>
  );
}
