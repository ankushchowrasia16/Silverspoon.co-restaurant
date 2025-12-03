import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { formatPrice } from '../utils/helpers';
import { AddToCartToast } from '../components/AddToCartToast';
import menuData from '../data/menu.json';
import type { MenuItem } from '../types';

export const DishDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { addToCart } = useCart();
  const [showToast, setShowToast] = useState(false);

  const dish = menuData.find((item) => item.id === id) as MenuItem | undefined;

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

  // Extended dish information
  const dishHistory = {
    'Margherita Pizza': 'Named after Queen Margherita of Italy, this classic pizza was created in 1889 in Naples. The colors represent the Italian flag: red (tomatoes), white (mozzarella), and green (basil).',
    'Chicken Tikka Masala': 'A beloved Indo-British dish, believed to have been created in Glasgow in the 1970s. It combines the flavors of tandoori chicken with a rich, creamy tomato-based sauce.',
    'Caesar Salad': 'Created by Italian-American chef Caesar Cardini in Tijuana, Mexico, in 1924. The original recipe didn\'t include anchovies!',
    'Paneer Tikka': 'A popular Indian appetizer that originated in the Punjab region. Paneer (cottage cheese) is marinated in spices and grilled to perfection.',
    'Crispy Chicken Wings': 'Buffalo wings were invented in 1964 at the Anchor Bar in Buffalo, New York, by Teressa Bellissimo.',
    'Spaghetti Carbonara': 'A traditional Roman pasta dish dating back to the mid-20th century. The name comes from "carbonaro" (charcoal burner).',
    'Grilled Salmon': 'Salmon has been a dietary staple for thousands of years, prized for its rich omega-3 fatty acids and delicate flavor.',
    'Vegetarian Buddha Bowl': 'Named for its resemblance to Buddha\'s belly, this modern health bowl combines nutritious grains, vegetables, and protein.',
    'Chocolate Lava Cake': 'Also known as molten chocolate cake, it was invented by French chef Michel Bras in 1981.',
    'Tiramisu': 'Meaning "pick me up" in Italian, this coffee-flavored dessert originated in the Veneto region of Italy in the 1960s.',
    'Fruit Cheesecake': 'Cheesecake has ancient origins, with the first recorded recipe dating back to ancient Greece around 230 AD.',
    'Fresh Orange Juice': 'Oranges originated in Southeast Asia and have been cultivated for over 4,000 years.',
    'Mango Smoothie': 'Mangoes have been cultivated in South Asia for thousands of years and are known as the "king of fruits."',
    'Iced Caramel Latte': 'The caramel latte became popular in coffee shops in the 1980s, combining the richness of espresso with sweet caramel.',
    'Sparkling Lemonade': 'Lemonade has been enjoyed since ancient Egypt, and the carbonated version became popular in the 19th century.'
  };

  const ingredients = {
    'Margherita Pizza': 'Pizza dough, San Marzano tomatoes, fresh mozzarella, basil, olive oil',
    'Chicken Tikka Masala': 'Chicken breast, yogurt, spices, tomatoes, cream, butter, garlic, ginger',
    'Caesar Salad': 'Romaine lettuce, parmesan cheese, croutons, Caesar dressing, lemon',
    'Paneer Tikka': 'Paneer cheese, bell peppers, onions, yogurt, spices, mint chutney',
    'Crispy Chicken Wings': 'Chicken wings, flour, spices, buffalo sauce, ranch dressing',
    'Spaghetti Carbonara': 'Spaghetti, bacon, eggs, parmesan cheese, black pepper, cream',
    'Grilled Salmon': 'Salmon fillet, lemon, butter, herbs, vegetables',
    'Vegetarian Buddha Bowl': 'Quinoa, chickpeas, avocado, roasted vegetables, tahini dressing',
    'Chocolate Lava Cake': 'Dark chocolate, butter, eggs, sugar, flour, vanilla ice cream',
    'Tiramisu': 'Ladyfingers, mascarpone cheese, coffee, cocoa powder, eggs, sugar',
    'Fruit Cheesecake': 'Cream cheese, graham crackers, sugar, eggs, mixed berries',
    'Fresh Orange Juice': 'Fresh oranges',
    'Mango Smoothie': 'Fresh mangoes, yogurt, honey, ice',
    'Iced Caramel Latte': 'Espresso, milk, caramel syrup, ice, whipped cream',
    'Sparkling Lemonade': 'Lemons, sugar, sparkling water, mint'
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

        {/* Additional Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* History */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <svg className="w-6 h-6 text-primary-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
              </svg>
              History
            </h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              {dishHistory[dish.name as keyof typeof dishHistory] || 'A culinary masterpiece crafted with love and tradition.'}
            </p>
          </div>

          {/* Ingredients */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <svg className="w-6 h-6 text-primary-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
              </svg>
              Key Ingredients
            </h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              {ingredients[dish.name as keyof typeof ingredients] || 'Fresh, high-quality ingredients selected by our chefs.'}
            </p>
          </div>
        </div>
      </div>

      {/* Add to Cart Toast */}
      <AddToCartToast show={showToast} onClose={() => setShowToast(false)} />
    </div>
  );
};
