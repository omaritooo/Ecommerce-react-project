import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';

interface IProps {
  width?: number;
  height?: number;
  alt: string;
  src: string;
  title?: string;
  styling: string;
}

export const BaseImage = ({ width, height, alt, src, title, styling }: IProps) => {
  return (
    <LazyLoadImage
      width={width}
      height={height}
      alt={alt}
      src={src}
      title={title}
      className={styling}
    />
  );
};
