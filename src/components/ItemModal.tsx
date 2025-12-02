import React, { useState, useEffect } from 'react';
import type { MenuItem, OptionChoice } from '../types';
import { formatPrice } from '../utils/helpers';
import { useCart } from '../contexts/CartContext';

interface ItemModalProps {
  item: MenuItem | null;
  isOpen: boolean;
  onClose: () => void;
}

/**
 * Modal component for viewing item details and customizing options
 */
export const ItemModal: React.FC<ItemModalProps> = ({ item, isOpen, onClose }) => {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedOptions, setSelectedOptions] = useState<{ [key: string]: OptionChoice }>({});
  const [adding, setAdding] = useState(false);

  useEffect(() => {
    if (item && isOpen) {
      // Reset state when modal opens with new item
      setQuantity(1);
      const defaultOptions: { [key: string]: OptionChoice } = {};
      item.options?.forEach(option => {
        if (option.choices.length > 0) {
          defaultOptions[option.name] = option.choices[0];
        }
      });
      setSelectedOptions(defaultOptions);
    }
  }, [item, isOpen]);

  useEffect(() => {
    // Handle ESC key to close modal
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  if (!item || !isOpen) return null;

  const calculateTotalPrice = () => {
    let total = item.price;
    Object.values(selectedOptions).forEach(option => {
      total += option.price;
    });
    return total * quantity;
  };

  const handleOptionChange = (optionName: string, choice: OptionChoice) => {
    setSelectedOptions(prev => ({
      ...prev,
      [optionName]: choice,
    }));
  };

  const handleQuantityChange = (newQty: number) => {
    if (newQty >= 1 && newQty <= 99) {
      setQuantity(newQty);
    }
  };

  const handleAddToCart = () => {
    setAdding(true);
    addToCart(item, quantity, Object.keys(selectedOptions).length > 0 ? selectedOptions : undefined);
    
    setTimeout(() => {
      setAdding(false);
      onClose();
    }, 300);
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-50 animate-fade-in"
        onClick={onClose}
        aria-hidden="true"
      ></div>

      {/* Modal */}
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto pointer-events-auto animate-slide-in-right">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors z-10 focus:outline-none focus:ring-2 focus:ring-primary-500"
            aria-label="Close modal"
          >
            <svg className="w-6 h-6 text-gray-700 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Image */}
          <div className="relative h-64 md:h-80 bg-gray-200 dark:bg-gray-700">
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"%3E%3Cpath stroke="%23999" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/%3E%3C/svg%3E';
              }}
            />
            <div className="absolute top-4 left-4 flex gap-2">
              <span className={`badge ${item.veg ? 'badge-veg' : 'badge-non-veg'}`}>
                {item.veg ? '🥬 Veg' : '🍖 Non-Veg'}
              </span>
              {item.popular && (
                <span className="badge bg-accent-500 text-white">⭐ Popular</span>
              )}
            </div>
          </div>

          {/* Content */}
          <div className="p-6 md:p-8">
            {/* Title and Rating */}
            <div className="flex justify-between items-start mb-4">
              <h2 id="modal-title" className="text-2xl md:text-3xl font-heading font-bold text-gray-900 dark:text-white">
                {item.name}
              </h2>
              <div className="flex items-center gap-1 ml-4">
                <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="text-lg font-medium text-gray-700 dark:text-gray-300">{item.rating}</span>
              </div>
            </div>

            {/* Description */}
            <p className="text-gray-600 dark:text-gray-400 mb-6">{item.description}</p>

            {/* Options */}
            {item.options && item.options.length > 0 && (
              <div className="space-y-4 mb-6">
                {item.options.map(option => (
                  <div key={option.name}>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      {option.name}
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      {option.choices.map(choice => (
                        <button
                          key={choice.label}
                          onClick={() => handleOptionChange(option.name, choice)}
                          className={`px-4 py-2 rounded-lg border-2 transition-all focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                            selectedOptions[option.name]?.label === choice.label
                              ? 'border-primary-600 bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300 font-medium'
                              : 'border-gray-300 dark:border-gray-600 hover:border-primary-400 dark:hover:border-primary-500'
                          }`}
                          aria-pressed={selectedOptions[option.name]?.label === choice.label}
                        >
                          {choice.label}
                          {choice.price > 0 && (
                            <span className="text-xs ml-1">+{formatPrice(choice.price)}</span>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Quantity Selector */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Quantity
              </label>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => handleQuantityChange(quantity - 1)}
                  disabled={quantity <= 1}
                  className="w-10 h-10 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500"
                  aria-label="Decrease quantity"
                >
                  <svg className="w-5 h-5 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                  </svg>
                </button>
                <input
                  type="number"
                  min="1"
                  max="99"
                  value={quantity}
                  onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
                  className="w-20 text-center py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  aria-label="Quantity"
                />
                <button
                  onClick={() => handleQuantityChange(quantity + 1)}
                  disabled={quantity >= 99}
                  className="w-10 h-10 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500"
                  aria-label="Increase quantity"
                >
                  <svg className="w-5 h-5 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Add to Cart Button */}
            <div className="flex items-center justify-between pt-6 border-t border-gray-200 dark:border-gray-700">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Total Price</p>
                <p className="text-3xl font-bold text-primary-600">{formatPrice(calculateTotalPrice())}</p>
              </div>
              <button
                onClick={handleAddToCart}
                disabled={adding}
                className="btn-primary px-8 py-3 disabled:opacity-50"
                aria-label={`Add ${quantity} ${item.name} to cart`}
              >
                {adding ? 'Adding...' : 'Add to Cart'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
