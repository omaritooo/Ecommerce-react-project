import React, { KeyboardEvent } from 'react';

export const BaseInput = ({
  text,
  enter
}: {
  text: (e: string) => void;
  enter: (e: string) => void;
}) => {
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      enter(e.key);
    }
  };
  return (
    <input
      className="w-full h-10 p-2 text-black rounded-md focus:outline-none"
      onChange={(e) => {
        text(e.target.value);
      }}
      onKeyDown={handleKeyDown}
    />
  );
};
