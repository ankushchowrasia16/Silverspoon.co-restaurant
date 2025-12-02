import React from 'react';
import { Hero } from '../components/Hero';
import { MenuList } from '../components/MenuList';
import menuData from '../data/menu.json';
import type { MenuItem } from '../types';

interface HomeProps {
  searchQuery: string;
}

/**
 * Home page component
 */
export const Home: React.FC<HomeProps> = ({ searchQuery }) => {
  return (
    <>
      {/* Hero Section */}
      <Hero />

      {/* Menu Section */}
      <MenuList
        items={menuData as MenuItem[]}
        searchQuery={searchQuery}
      />
    </>
  );
};
