import React from 'react';
import { Outlet } from 'react-router-dom';
import { TheHeader } from '../components/TheHeader';
import { TheFooter } from '../components/TheFooter';
export const MainLayout = () => {
  return (
    <>
      <TheHeader />
      <main className="container mt-16 lg:mt-32">
        <Outlet />
      </main>
      <TheFooter />
    </>
  );
};
