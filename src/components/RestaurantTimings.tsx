import React from 'react';

export const RestaurantTimings: React.FC = () => {
  return (
    <section className="py-12 bg-primary-600 dark:bg-primary-700">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-center gap-8">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="text-white">
              <h3 className="text-xl font-semibold mb-1">Opening Hours</h3>
              <p className="text-primary-100">We're here to serve you!</p>
            </div>
          </div>
          
          <div className="h-16 w-px bg-white/20 hidden md:block"></div>
          
          <div className="text-center md:text-left">
            <p className="text-3xl font-bold text-white mb-1">
              Open Daily
            </p>
            <p className="text-xl text-primary-100">
              10:00 AM – 10:00 PM
            </p>
          </div>
          
          <div className="h-16 w-px bg-white/20 hidden md:block"></div>
          
          <div className="text-center">
            <p className="text-white text-sm mb-2">Call for Reservations</p>
            <a 
              href="tel:9067689550" 
              className="inline-block bg-white text-primary-600 px-6 py-3 rounded-lg font-semibold hover:bg-primary-50 transition-colors shadow-lg"
            >
              📞 9067689550
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
