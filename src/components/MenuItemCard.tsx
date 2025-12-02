import React, { useState } from 'react';
import type { MenuItem } from '../types';
import { formatPrice } from '../utils/helpers';

interface MenuItemCardProps {
  item: MenuItem;
  onViewDetails: (item: MenuItem) => void;
  onQuickAdd: (item: MenuItem) => void;
}

/**
 * Menu item card component displaying item preview
 */
export const MenuItemCard: React.FC<MenuItemCardProps> = ({ item, onViewDetails, onQuickAdd }) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  return (
    <article className="card group cursor-pointer h-full flex flex-col">
      {/* Image Container */}
      <div 
        className="relative h-48 bg-gray-200 dark:bg-gray-700 overflow-hidden"
        onClick={() => onViewDetails(item)}
        role="button"
        tabIndex={0}
        onKeyPress={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            onViewDetails(item);
          }
        }}
        aria-label={`View details for ${item.name}`}
      >
        {/* Skeleton Loader */}
        {!imageLoaded && !imageError && (
          <div className="absolute inset-0 skeleton"></div>
        )}
        
        {/* Image */}
        {!imageError ? (
          <img
            src={item.image}
            alt={item.name}
            className={`w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onError={handleImageError}
            onLoad={handleImageLoad}
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-300 dark:bg-gray-600">
            <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}

        {/* Badges */}
        <div className="absolute top-2 left-2 flex gap-2">
          <span className={`badge ${item.veg ? 'badge-veg' : 'badge-non-veg'}`}>
            {item.veg ? '🥬 Veg' : '🍖 Non-Veg'}
          </span>
          {item.popular && (
            <span className="badge bg-accent-500 text-white">
              ⭐ Popular
            </span>
          )}
        </div>

        {/* Overlay on Hover */}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
          <button
            className="opacity-0 group-hover:opacity-100 transform scale-90 group-hover:scale-100 transition-all duration-300 bg-white dark:bg-gray-800 text-primary-600 px-4 py-2 rounded-lg font-medium shadow-lg"
            onClick={(e) => {
              e.stopPropagation();
              onViewDetails(item);
            }}
            aria-label={`View details for ${item.name}`}
          >
            View Details
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex-1 flex flex-col">
        {/* Title and Rating */}
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white line-clamp-1 flex-1">
            {item.name}
          </h3>
          <div className="flex items-center gap-1 ml-2 flex-shrink-0">
            <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{item.rating}</span>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2 flex-1">
          {item.short}
        </p>

        {/* Price and Add Button */}
        <div className="flex items-center justify-between mt-auto">
          <span className="text-2xl font-bold text-primary-600">
            {formatPrice(item.price)}
          </span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onQuickAdd(item);
            }}
            className="bg-primary-600 hover:bg-primary-700 text-white p-2 rounded-lg transition-all shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
            aria-label={`Add ${item.name} to cart`}
            id={`add-to-cart-${item.id}`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </button>
        </div>
      </div>
    </article>
  );
};
