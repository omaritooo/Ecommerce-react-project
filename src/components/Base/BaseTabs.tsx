import React from 'react';
import { Link } from 'react-router-dom';
const BaseTabs = ({ tabs }: { tabs: string[] }) => {
  const nameHandler = (e: string): string => {
    e = e.replaceAll(/-/g, ' ');
    return e.charAt(0).toUpperCase() + e.slice(1);
  };
  return (
    <div className="flex w-full py-4 overflow-scroll min-h-20 gap-x-2 flex-nowrap">
      {tabs?.map((el: string, idx: number) => {
        return (
          <Link
            to={`/categories/${el}`}
            className="p-2 my-2 text-white bg-yellow-400 rounded-md whitespace-nowrap"
            key={idx}>
            {nameHandler(el)}
          </Link>
        );
      })}
    </div>
  );
};
export default BaseTabs;
