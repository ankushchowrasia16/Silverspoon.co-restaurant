import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import type { MenuItem, MenuFilters } from '../types';
import menuData from '../data/menuComplete.json';
import { formatPrice } from '../utils/helpers';

const CATEGORIES = ['All', 'Starters', 'Main Course', 'Desserts', 'Drinks'];

/**
 * Scrollable Menu Page with all dishes and filters
 */
export const MenuPage: React.FC = () => {
  const navigate = useNavigate();
  const [filters, setFilters] = useState<MenuFilters>({
    category: 'All',
    search: '',
    dietaryPreference: 'all',
    priceRange: [0, 1000],
    sortBy: 'popularity',
  });

  // Filtered and sorted items
  const filteredItems = useMemo(() => {
    let result = [...(menuData as MenuItem[])];

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
  }, [filters]);

  const handleCardClick = (id: string) => {
    navigate(`/dish/${id}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-gray-900 dark:text-white mb-4">
            Complete Menu
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Explore our full collection of carefully crafted dishes
          </p>
        </div>

        {/* Filters Bar */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 md:p-6 mb-8 sticky top-20 z-10">
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
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Search
              </label>
              <input
                type="text"
                placeholder="Search dishes..."
                value={filters.search}
                onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
                className="input-field w-full"
                aria-label="Search dishes"
              />
            </div>

            {/* Dietary Preference */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Dietary
              </label>
              <select
                value={filters.dietaryPreference}
                onChange={(e) => setFilters(prev => ({ ...prev, dietaryPreference: e.target.value as any }))}
                className="input-field w-full"
                aria-label="Filter by dietary preference"
              >
                <option value="all">All</option>
                <option value="veg">Veg</option>
                <option value="non-veg">Non-Veg</option>
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
                className="input-field w-full"
                aria-label="Sort items"
              >
                <option value="popularity">Popularity</option>
                <option value="rating">Rating H→L</option>
                <option value="price-asc">Price L→H</option>
                <option value="price-desc">Price H→L</option>
              </select>
            </div>

            {/* Price Range */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Price: ₹{filters.priceRange[0]} - ₹{filters.priceRange[1]}
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
            Showing <span className="font-semibold text-primary-600">{filteredItems.length}</span> items
          </p>
        </div>

        {/* Scrollable Menu Grid */}
        <div className="max-h-[calc(100vh-400px)] overflow-y-auto pr-2">
          {filteredItems.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-8">
              {filteredItems.map((item) => (
                <div
                  key={item.id}
                  onClick={() => handleCardClick(item.id)}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      handleCardClick(item.id);
                    }
                  }}
                >
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"%3E%3Cpath stroke="%23999" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/%3E%3C/svg%3E';
                      }}
                    />
                    {item.popular && (
                      <div className="absolute top-2 right-2">
                        <span className="bg-accent-500 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
                          ⭐ Popular
                        </span>
                      </div>
                    )}
                    {/* Veg/Non-Veg Badge */}
                    <div className="absolute top-2 left-2">
                      <div className={`w-6 h-6 rounded-sm flex items-center justify-center ${
                        item.veg ? 'bg-green-500' : 'bg-red-500'
                      }`}>
                        <div className={`w-3 h-3 rounded-full ${
                          item.veg ? 'bg-white border-2 border-green-500' : 'bg-white'
                        }`} />
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 line-clamp-1">
                      {item.name}
                    </h3>
                    
                    {/* Rating */}
                    <div className="flex items-center gap-1 mb-2">
                      <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span className="text-sm font-semibold text-gray-900 dark:text-white">{item.rating}</span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">• {item.category}</span>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
                      {item.short}
                    </p>

                    {/* Price and Button */}
                    <div className="flex items-center justify-between">
                      <span className="text-xl font-bold text-primary-600">
                        {formatPrice(item.price)}
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCardClick(item.id);
                        }}
                        className="text-sm font-medium text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
                      >
                        View Details →
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <svg className="w-24 h-24 mx-auto text-gray-300 dark:text-gray-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-xl font-medium text-gray-500 dark:text-gray-400 mb-2">No items found</p>
              <p className="text-gray-400 dark:text-gray-500">Try adjusting your filters or search query</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
