//"use client";
import React from 'react'
import Footer from '@/components/Layout/Footer'
import Nav from '@/components/Layout/Nav'
import { ProfilePage } from '@/components/Layout/ProfilePage';
const Page: React.FC = () => {
  return (
    <div>
      <Nav />
      <ProfilePage />
      <Footer />
    </div>
  );
};

export default Page;