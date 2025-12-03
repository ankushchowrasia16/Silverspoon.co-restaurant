import React from 'react';

interface Review {
  id: string;
  name: string;
  dish: string;
  feedback: string;
  rating: number;
  avatar: string;
}

const reviews: Review[] = [
  {
    id: 'r1',
    name: 'Priya Sharma',
    dish: 'Chicken Tikka Masala',
    feedback: 'Absolutely delicious! The flavors were perfectly balanced and the chicken was so tender. Best tikka masala I\'ve ever had!',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face'
  },
  {
    id: 'r2',
    name: 'Rahul Verma',
    dish: 'Margherita Pizza',
    feedback: 'The pizza was amazing! Fresh ingredients, perfect crust, and the basil was so fragrant. Will definitely order again!',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face'
  },
  {
    id: 'r3',
    name: 'Ananya Patel',
    dish: 'Chocolate Lava Cake',
    feedback: 'Heaven on a plate! The molten chocolate center was perfect. Paired beautifully with the vanilla ice cream.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face'
  },
  {
    id: 'r4',
    name: 'Vikram Singh',
    dish: 'Grilled Salmon',
    feedback: 'Cooked to perfection! The salmon was fresh, flaky, and the lemon butter sauce was divine. Highly recommend!',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face'
  },
  {
    id: 'r5',
    name: 'Sneha Desai',
    dish: 'Mango Smoothie',
    feedback: 'So refreshing and perfectly sweet! You can taste the real mangoes. Best smoothie in town!',
    rating: 4,
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face'
  }
];

export const CustomerReviews: React.FC = () => {
  return (
    <section className="py-16 bg-white dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-gray-900 dark:text-white mb-4">
            What Our Customers Say
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Don't just take our word for it - hear from our happy customers!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6 shadow-md hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={review.avatar}
                  alt={review.name}
                  className="w-16 h-16 rounded-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"%3E%3Ccircle cx="50" cy="50" r="50" fill="%23ddd"/%3E%3Ctext x="50" y="50" text-anchor="middle" dy=".3em" font-size="40" fill="%23999"%3E?%3C/text%3E%3C/svg%3E';
                  }}
                />
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">{review.name}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{review.dish}</p>
                </div>
              </div>
              
              <div className="flex gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-5 h-5 ${i < review.rating ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              
              <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                "{review.feedback}"
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
