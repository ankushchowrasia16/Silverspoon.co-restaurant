import React from 'react';
import { BackToHome } from '../components/BackToHome';

/**
 * Terms of Service page
 */
export const TermsOfService: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <BackToHome />
          <h1 className="text-4xl font-heading font-bold text-gray-900 dark:text-white mb-6">
            Terms of Service
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-8">
            Last updated: December 2, 2025
          </p>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 space-y-6">
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">1. Acceptance of Terms</h2>
              <p className="text-gray-600 dark:text-gray-400">
                By accessing and using Silver Spoon .Co's services, you accept and agree to be bound by these Terms of 
                Service. If you do not agree to these terms, please do not use our services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">2. Use of Services</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-2">
                You agree to use our services only for lawful purposes and in accordance with these Terms. You agree not to:
              </p>
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-1 ml-4">
                <li>Use the service in any way that violates any applicable law or regulation</li>
                <li>Impersonate or attempt to impersonate the company or another user</li>
                <li>Engage in any conduct that restricts or inhibits anyone's use of the service</li>
                <li>Use any automated system to access the service</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">3. Orders and Payment</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-2">
                All orders placed through our service are subject to acceptance and availability. We reserve the right to:
              </p>
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-1 ml-4">
                <li>Refuse or cancel any order for any reason</li>
                <li>Verify and validate order information before processing</li>
                <li>Limit quantities of items purchased</li>
              </ul>
              <p className="text-gray-600 dark:text-gray-400 mt-3">
                Payment must be made at the time of placing the order. All prices are in Indian Rupees (INR) and include applicable taxes.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">4. Delivery</h2>
              <p className="text-gray-600 dark:text-gray-400">
                We strive to deliver orders within the estimated time frame. However, delivery times are approximate and 
                may vary due to factors beyond our control. We are not liable for any delays in delivery.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">5. Cancellation and Refunds</h2>
              <p className="text-gray-600 dark:text-gray-400">
                Orders can be cancelled within 5 minutes of placement. After this period, cancellation may not be possible. 
                Refunds for cancelled orders will be processed within 5-7 business days.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">6. Intellectual Property</h2>
              <p className="text-gray-600 dark:text-gray-400">
                The content, features, and functionality of our service are owned by Silver Spoon .Co and are protected by 
                international copyright, trademark, and other intellectual property laws.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">7. Limitation of Liability</h2>
              <p className="text-gray-600 dark:text-gray-400">
                Silver Spoon .Co shall not be liable for any indirect, incidental, special, consequential, or punitive 
                damages resulting from your use of or inability to use the service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">8. Changes to Terms</h2>
              <p className="text-gray-600 dark:text-gray-400">
                We reserve the right to modify these Terms of Service at any time. We will notify users of any material 
                changes by posting the new Terms on this page.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">9. Contact Information</h2>
              <p className="text-gray-600 dark:text-gray-400">
                For questions about these Terms of Service, please contact us at:
              </p>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                Email: silverspoonco@gmail.com<br />
                Phone: 9067689550<br />
                Address: Park Street, Kolkata – 700001, West Bengal
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};
