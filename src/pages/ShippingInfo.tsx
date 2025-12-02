import React from 'react';

/**
 * Shipping Info page
 */
export const ShippingInfo: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-heading font-bold text-gray-900 dark:text-white mb-6">
            Shipping & Delivery Information
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
            Everything you need to know about our delivery service
          </p>

          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Delivery Areas</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-3">
                We currently deliver to the following areas in Kolkata:
              </p>
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-1 ml-4">
                <li>Park Street and surrounding areas</li>
                <li>Salt Lake (Sector I, II, III, IV, V)</li>
                <li>Ballygunge and Gariahat</li>
                <li>Jadavpur and Garia</li>
                <li>New Town</li>
                <li>EM Bypass corridor</li>
              </ul>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Delivery Timings</h2>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <span className="font-medium text-gray-900 dark:text-white">Lunch</span>
                  <span className="text-gray-600 dark:text-gray-400">11:00 AM - 3:00 PM</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <span className="font-medium text-gray-900 dark:text-white">Dinner</span>
                  <span className="text-gray-600 dark:text-gray-400">6:00 PM - 11:00 PM</span>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Delivery Charges</h2>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">Free Delivery</p>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">On orders above ₹500</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-primary-600 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">Standard Delivery: ₹40</p>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">For orders below ₹500</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Estimated Delivery Time</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-3">
                Standard delivery time is <strong className="text-gray-900 dark:text-white">30-45 minutes</strong> from 
                order confirmation. During peak hours, delivery may take up to 60 minutes.
              </p>
              <div className="bg-primary-50 dark:bg-primary-900/20 rounded-lg p-4 mt-4">
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  <strong>Note:</strong> Delivery times are estimates and may vary based on traffic conditions, weather, 
                  and order volume. We'll keep you updated on your order status.
                </p>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Order Tracking</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-3">
                Track your order in real-time through:
              </p>
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-1 ml-4">
                <li>SMS notifications at each stage of delivery</li>
                <li>Order status page on our website</li>
                <li>Direct contact with our delivery partner</li>
              </ul>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Contact Delivery Support</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-3">
                For any delivery-related queries or issues, please contact us:
              </p>
              <div className="space-y-2">
                <p className="text-gray-600 dark:text-gray-400">
                  📞 Phone: 9067689550
                </p>
                <p className="text-gray-600 dark:text-gray-400">
                  ✉️ Email: silverspoonco@gmail.com
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
