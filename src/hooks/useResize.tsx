import { useEffect, useState } from 'react';

export const useResize = ({ isOpen }: { isOpen: boolean }) => {
  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);
  const handleScroll = () => {
    const scroll = window.scrollY;
    setScrollPosition(scroll);
  };
  useEffect(() => {
    const handleWindowResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleWindowResize);
    if (!isOpen && windowWidth < 768) {
      document.body.style.overflow = 'auto';
    } else if (isOpen && windowWidth < 768) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
      setIsOpen(false);
    }

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  });

  return { scrollPosition };
};
