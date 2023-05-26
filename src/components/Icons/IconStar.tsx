import React from 'react';
interface IProps {
  full: boolean;
  small: boolean;
}
export default function IconStar({ full, small }: IProps) {
  return (
    <svg
      fill={full ? '#ffb900' : '#F6F6F6'}
      stroke="#e09b00"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="0.417px"
      xmlns="http://www.w3.org/2000/svg"
      width={small ? '16px' : '21px'}
      height={small ? '16px' : '20px'}
      viewBox="0 0 21.446 20.417">
      <path
        className="a"
        d="M8080.634,770.281l3.249,6.584,7.265,1.056-5.257,5.125,1.241,7.236-6.5-3.416-6.5,3.416,1.241-7.236-5.257-5.125,7.265-1.056Z"
        transform="translate(-8069.911 -770.073)"
      />
    </svg>
  );
}
