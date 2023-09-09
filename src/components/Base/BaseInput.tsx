import React, { KeyboardEvent } from 'react';

export const BaseInput = ({
  text,
  enter,
  title
}: {
  text: (e: string) => void;
  enter?: (e: string) => void;
  title: string;
}) => {
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter' && enter) {
      enter(e.key);
    }
  };
  return (
    <input
      title={title}
      className="flex-1 w-full h-10 p-2 text-black rounded-md bg-offwhite focus:outline-none"
      onChange={(e) => {
        text(e.target.value);
      }}
      onKeyDown={handleKeyDown}
    />
  );
};
