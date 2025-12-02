import React from 'react';

/**
 * Privacy Policy page
 */
export const PrivacyPolicy: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-heading font-bold text-gray-900 dark:text-white mb-6">
            Privacy Policy
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-8">
            Last updated: December 2, 2025
          </p>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 space-y-6">
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">1. Information We Collect</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-2">
                We collect information that you provide directly to us, including:
              </p>
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-1 ml-4">
                <li>Name, email address, and phone number</li>
                <li>Delivery address and payment information</li>
                <li>Order history and preferences</li>
                <li>Communication preferences</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">2. How We Use Your Information</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-2">
                We use the information we collect to:
              </p>
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-1 ml-4">
                <li>Process and fulfill your orders</li>
                <li>Send you order confirmations and updates</li>
                <li>Improve our services and customer experience</li>
                <li>Send promotional communications (with your consent)</li>
                <li>Respond to your inquiries and provide customer support</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">3. Information Sharing</h2>
              <p className="text-gray-600 dark:text-gray-400">
                We do not sell, trade, or rent your personal information to third parties. We may share your information with:
              </p>
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-1 ml-4 mt-2">
                <li>Delivery partners to fulfill your orders</li>
                <li>Payment processors to process transactions</li>
                <li>Service providers who assist in our operations</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">4. Data Security</h2>
              <p className="text-gray-600 dark:text-gray-400">
                We implement appropriate security measures to protect your personal information. However, no method of 
                transmission over the internet is 100% secure, and we cannot guarantee absolute security.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">5. Your Rights</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-2">
                You have the right to:
              </p>
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-1 ml-4">
                <li>Access and update your personal information</li>
                <li>Request deletion of your data</li>
                <li>Opt-out of marketing communications</li>
                <li>Object to processing of your data</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">6. Cookies</h2>
              <p className="text-gray-600 dark:text-gray-400">
                We use cookies and similar technologies to enhance your experience, analyze usage, and assist in our 
                marketing efforts. You can control cookies through your browser settings.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">7. Contact Us</h2>
              <p className="text-gray-600 dark:text-gray-400">
                If you have any questions about this Privacy Policy, please contact us at:
              </p>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                Email: silverspoonco@gmail.com<br />
                Phone: 9067689550
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};
