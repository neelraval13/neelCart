'use client'

import React from 'react';
import Header from '@/components/Header';
import ViewAllProducts from './viewAllProducts';
import SingleProduct from './singleProduct';
import Footer from '@/components/Footer';

export default function Home() {
  // Replace this with your logic to switch between views
  const showAllProducts = true;

  return (
    <>
      <Header />
      <div className="p-[1%]">
        {showAllProducts ? <ViewAllProducts /> : <SingleProduct />}
      </div>
      <Footer />
    </>
  );
}