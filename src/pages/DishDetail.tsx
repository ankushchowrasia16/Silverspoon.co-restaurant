import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { formatPrice } from '../utils/helpers';
import { AddToCartToast } from '../components/AddToCartToast';
import menuDataOld from '../data/menu.json';
import menuDataNew from '../data/menuComplete.json';
import type { MenuItem } from '../types';

export const DishDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { addToCart } = useCart();
  const [showToast, setShowToast] = useState(false);

  // Try to find dish in new data first, then fall back to old data
  let dish = (menuDataNew as MenuItem[]).find((item) => item.id === id);
  if (!dish) {
    dish = (menuDataOld as MenuItem[]).find((item) => item.id === id);
  }

  if (!dish) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Dish Not Found</h1>
          <Link to="/" className="btn-primary inline-block">
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(dish, 1);
    setShowToast(true);
  };

  // Format ingredients
  const formatIngredients = (ingredients: string | string[] | undefined): string => {
    if (!ingredients) return 'Fresh, high-quality ingredients selected by our chefs';
    if (typeof ingredients === 'string') return ingredients;
    return ingredients.join(', ');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="container mx-auto px-4">
        {/* Back Button */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 mb-6 font-medium"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Home
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Image */}
          <div className="relative">
            <img
              src={dish.image}
              alt={dish.name}
              className="w-full h-96 lg:h-full object-cover rounded-2xl shadow-2xl"
              onError={(e) => {
                e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"%3E%3Cpath stroke="%23999" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/%3E%3C/svg%3E';
              }}
            />
            {dish.popular && (
              <div className="absolute top-4 right-4">
                <span className="bg-accent-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                  ⭐ Popular
                </span>
              </div>
            )}
          </div>

          {/* Details */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
            <div className="mb-4">
              <span className="inline-block bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 px-3 py-1 rounded-full text-sm font-medium mb-2">
                {dish.category}
              </span>
              <span className={`ml-2 inline-block px-3 py-1 rounded-full text-sm font-medium ${
                dish.veg 
                  ? 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300' 
                  : 'bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300'
              }`}>
                {dish.veg ? '🥬 Vegetarian' : '🍖 Non-Vegetarian'}
              </span>
            </div>

            <h1 className="text-4xl font-heading font-bold text-gray-900 dark:text-white mb-4">
              {dish.name}
            </h1>

            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center gap-1">
                <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="text-xl font-semibold text-gray-900 dark:text-white">{dish.rating}</span>
                <span className="text-gray-500 dark:text-gray-400 text-sm">/5</span>
              </div>
            </div>

            <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
              {dish.description}
            </p>

            <div className="flex items-center justify-between py-6 border-t border-b border-gray-200 dark:border-gray-700 mb-6">
              <span className="text-4xl font-bold text-primary-600">
                {formatPrice(dish.price)}
              </span>
              <button
                onClick={handleAddToCart}
                className="btn-primary px-8 py-3 text-lg"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>

        {/* Additional Info - All 6 Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* History */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <svg className="w-6 h-6 text-primary-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
              </svg>
              History
            </h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              {dish.history || 'A culinary masterpiece crafted with love and tradition.'}
            </p>
          </div>

          {/* Ingredients */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <svg className="w-6 h-6 text-primary-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
              </svg>
              Ingredients
            </h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              {formatIngredients(dish.ingredients)}
            </p>
          </div>

          {/* Preparation */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <svg className="w-6 h-6 text-primary-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
              </svg>
              Preparation
            </h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              {dish.preparation || 'Expertly prepared using traditional cooking methods.'}
            </p>
          </div>

          {/* Serving */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <svg className="w-6 h-6 text-primary-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V4a2 2 0 00-2-2H6zm1 2a1 1 0 000 2h6a1 1 0 100-2H7zm6 7a1 1 0 011 1v3a1 1 0 11-2 0v-3a1 1 0 011-1zm-3 3a1 1 0 100 2h.01a1 1 0 100-2H10zm-4 1a1 1 0 011-1h.01a1 1 0 110 2H7a1 1 0 01-1-1zm1-4a1 1 0 100 2h.01a1 1 0 100-2H7zm2 1a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1zm4-4a1 1 0 100 2h.01a1 1 0 100-2H13zM9 9a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1zM7 8a1 1 0 000 2h.01a1 1 0 000-2H7z" clipRule="evenodd" />
              </svg>
              Serving
            </h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              {dish.serving || 'Served fresh and beautifully presented.'}
            </p>
          </div>

          {/* Nutrition */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <svg className="w-6 h-6 text-primary-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 0l-2 2a1 1 0 101.414 1.414L8 10.414l1.293 1.293a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Nutrition
            </h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              {dish.nutrition || 'Nutritious ingredients for a balanced meal.'}
            </p>
          </div>

          {/* Trivia */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <svg className="w-6 h-6 text-primary-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              Trivia
            </h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              {dish.trivia || 'An interesting dish with a unique story.'}
            </p>
          </div>
        </div>
      </div>

      {/* Add to Cart Toast */}
      <AddToCartToast show={showToast} onClose={() => setShowToast(false)} />
    </div>
  );
};
