import React from 'react';
import { useNavigate } from 'react-router-dom';
import { formatPrice } from '../utils/helpers';

interface SpecialDish {
  id: string;
  name: string;
  category: string;
  price: number;
  description: string;
  image: string;
}

const specialPicks: SpecialDish[] = [
  {
    id: 'dr002',
    name: 'Mango Smoothie',
    category: 'Drinks',
    price: 129,
    description: 'Thick & creamy mango smoothie',
    image: 'https://images.unsplash.com/photo-1505252585461-04db1eb84625?w=600&h=400&fit=crop'
  },
  {
    id: 'm004',
    name: 'Paneer Tikka',
    category: 'Starters',
    price: 229,
    description: 'Grilled cottage cheese skewers',
    image: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=600&h=400&fit=crop'
  },
  {
    id: 'm007',
    name: 'Grilled Salmon',
    category: 'Main Course',
    price: 499,
    description: 'Atlantic salmon with herbs',
    image: 'https://images.unsplash.com/photo-1485921325833-c519f76c4927?w=600&h=400&fit=crop'
  },
  {
    id: 'd001',
    name: 'Chocolate Lava Cake',
    category: 'Desserts',
    price: 179,
    description: 'Warm molten chocolate center',
    image: 'https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=600&h=400&fit=crop'
  }
];

export const ChefSpecialPicks: React.FC = () => {
  const navigate = useNavigate();

  const handleOrderNow = (dishId: string) => {
    navigate(`/dish/${dishId}`);
  };

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-gray-900 dark:text-white mb-4">
            Chef's Special Picks
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Handpicked favorites from each category, recommended by our expert chefs
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {specialPicks.map((dish) => (
            <div
              key={dish.id}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={dish.image}
                  alt={dish.name}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                  onError={(e) => {
                    e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"%3E%3Cpath stroke="%23999" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/%3E%3C/svg%3E';
                  }}
                />
                <div className="absolute top-2 right-2">
                  <span className="bg-accent-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                    Chef's Pick
                  </span>
                </div>
              </div>
              
              <div className="p-5">
                <div className="mb-2">
                  <span className="text-xs font-medium text-primary-600 dark:text-primary-400">
                    {dish.category}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {dish.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                  {dish.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-primary-600">
                    {formatPrice(dish.price)}
                  </span>
                  <button
                    onClick={() => handleOrderNow(dish.id)}
                    className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg font-medium transition-colors shadow-md hover:shadow-lg"
                  >
                    Order Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
