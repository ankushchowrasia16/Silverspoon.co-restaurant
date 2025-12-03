import React, { useState, useMemo } from 'react';
import type { MenuItem, MenuFilters } from '../types';
import { MenuItemCard } from './MenuItemCard';
import { ItemModal } from './ItemModal';
import { AddToCartToast } from './AddToCartToast';
import { useCart } from '../contexts/CartContext';

interface MenuListProps {
  items: MenuItem[];
  searchQuery: string;
}

const CATEGORIES = ['All', 'Starters', 'Main Course', 'Desserts', 'Drinks'];

/**
 * Menu list component with filters and sorting
 */
export const MenuList: React.FC<MenuListProps> = ({ items, searchQuery }) => {
  const { addToCart } = useCart();
  const [filters, setFilters] = useState<MenuFilters>({
    category: 'All',
    search: '',
    dietaryPreference: 'all',
    priceRange: [0, 1000],
    sortBy: 'popularity',
  });
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [flyingItem, setFlyingItem] = useState<string | null>(null);
  const [showToast, setShowToast] = useState(false);

  // Update search from parent
  useMemo(() => {
    setFilters(prev => ({ ...prev, search: searchQuery }));
  }, [searchQuery]);

  // Filtered and sorted items
  const filteredItems = useMemo(() => {
    let result = [...items];

    // Category filter
    if (filters.category !== 'All') {
      result = result.filter(item => item.category === filters.category);
    }

    // Search filter
    if (filters.search.trim()) {
      const searchLower = filters.search.toLowerCase();
      result = result.filter(
        item =>
          item.name.toLowerCase().includes(searchLower) ||
          item.description.toLowerCase().includes(searchLower) ||
          item.short.toLowerCase().includes(searchLower)
      );
    }

    // Dietary preference filter
    if (filters.dietaryPreference !== 'all') {
      result = result.filter(item => 
        filters.dietaryPreference === 'veg' ? item.veg : !item.veg
      );
    }

    // Price range filter
    result = result.filter(
      item => item.price >= filters.priceRange[0] && item.price <= filters.priceRange[1]
    );

    // Sorting
    switch (filters.sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'popularity':
        result.sort((a, b) => {
          if (a.popular && !b.popular) return -1;
          if (!a.popular && b.popular) return 1;
          return b.rating - a.rating;
        });
        break;
    }

    return result;
  }, [items, filters]);

  const handleViewDetails = (item: MenuItem) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handleQuickAdd = (item: MenuItem) => {
    const buttonId = `add-to-cart-${item.id}`;
    setFlyingItem(buttonId);
    addToCart(item, 1);
    setShowToast(true);
    
    // Remove animation after it completes
    setTimeout(() => setFlyingItem(null), 600);
  };

  return (
    <section id="menu-section" className="py-12 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-gray-900 dark:text-white mb-4">
            Our Menu
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Discover our carefully curated selection of dishes, each crafted with the finest ingredients
          </p>
        </div>

        {/* Filters Bar */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 md:p-6 mb-8">
          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2 mb-6">
            {CATEGORIES.map(category => (
              <button
                key={category}
                onClick={() => setFilters(prev => ({ ...prev, category }))}
                className={`px-4 py-2 rounded-lg font-medium transition-all focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                  filters.category === category
                    ? 'bg-primary-600 text-white shadow-md'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
                aria-pressed={filters.category === category}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Filters Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Dietary Preference */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Dietary Preference
              </label>
              <select
                value={filters.dietaryPreference}
                onChange={(e) => setFilters(prev => ({ ...prev, dietaryPreference: e.target.value as any }))}
                className="input-field"
                aria-label="Filter by dietary preference"
              >
                <option value="all">All</option>
                <option value="veg">Vegetarian</option>
                <option value="non-veg">Non-Vegetarian</option>
              </select>
            </div>

            {/* Sort By */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Sort By
              </label>
              <select
                value={filters.sortBy}
                onChange={(e) => setFilters(prev => ({ ...prev, sortBy: e.target.value as any }))}
                className="input-field"
                aria-label="Sort items"
              >
                <option value="popularity">Popularity</option>
                <option value="rating">Rating</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>

            {/* Price Range */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Price Range: ₹{filters.priceRange[0]} - ₹{filters.priceRange[1]}
              </label>
              <input
                type="range"
                min="0"
                max="1000"
                step="50"
                value={filters.priceRange[1]}
                onChange={(e) => setFilters(prev => ({ ...prev, priceRange: [0, parseInt(e.target.value)] }))}
                className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-primary-600"
                aria-label="Filter by maximum price"
              />
            </div>
          </div>
        </div>

        {/* Results Info */}
        <div className="flex justify-between items-center mb-6">
          <p className="text-gray-600 dark:text-gray-400">
            Showing <span className="font-semibold text-gray-900 dark:text-white">{filteredItems.length}</span> items
          </p>
          {filters.search && (
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Search results for: <span className="font-medium text-primary-600">{filters.search}</span>
            </p>
          )}
        </div>

        {/* Menu Grid */}
        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredItems.map((item) => (
              <MenuItemCard
                key={item.id}
                item={item}
                onViewDetails={handleViewDetails}
                onQuickAdd={handleQuickAdd}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <svg className="w-24 h-24 mx-auto text-gray-300 dark:text-gray-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-xl font-medium text-gray-500 dark:text-gray-400 mb-2">No items found</p>
            <p className="text-gray-400 dark:text-gray-500">Try adjusting your filters or search query</p>
          </div>
        )}
      </div>

      {/* Item Detail Modal */}
      <ItemModal
        item={selectedItem}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedItem(null);
        }}
      />

      {/* Flying Animation Element */}
      {flyingItem && (
        <div
          id="flying-item"
          className="fixed pointer-events-none z-50"
          style={{ 
            animation: 'fly-to-cart 0.6s ease-out forwards',
          }}
        />
      )}

      {/* Add to Cart Toast */}
      <AddToCartToast show={showToast} onClose={() => setShowToast(false)} />
    </section>
  );
};
