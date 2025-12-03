import React from 'react';
import { Hero } from '../components/Hero';
import { MenuList } from '../components/MenuList';
import { CustomerReviews } from '../components/CustomerReviews';
import { ChefSpecialPicks } from '../components/ChefSpecialPicks';
import { RestaurantTimings } from '../components/RestaurantTimings';
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
    <div className="relative">
      {/* Moving Background Shape */}
      <div 
        className="fixed top-20 right-10 w-64 h-64 opacity-5 dark:opacity-10 pointer-events-none moving-bg z-0"
        style={{
          backgroundImage: 'url(/shape-5.png)',
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat'
        }}
      />
      
      {/* Hero Section */}
      <Hero />

      {/* Chef's Special Picks */}
      <ChefSpecialPicks />

      {/* Menu Section */}
      <MenuList
        items={menuData as MenuItem[]}
        searchQuery={searchQuery}
      />

      {/* Customer Reviews */}
      <CustomerReviews />

      {/* Restaurant Timings */}
      <RestaurantTimings />
    </div>
  );
};
