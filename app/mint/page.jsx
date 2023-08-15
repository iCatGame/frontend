"use client";

import { Loader } from '@/components/Loader';
import React from 'react';
import Mint from '@/components/Mint';
import FooterApp from '@/components/FooterApp';
import HeaderApp from '@/components/HeaderApp';

const MintPage = () => {
  return (
    <>
      <HeaderApp />

      <Mint/>

      <FooterApp />
    </>
  );
};

export default MintPage;
