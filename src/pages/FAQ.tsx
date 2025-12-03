import React, { useState } from 'react';
import { BackToHome } from '../components/BackToHome';

/**
 * FAQ page
 */
export const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: 'What are your operating hours?',
      answer: 'We are open Monday to Sunday from 11:00 AM to 11:00 PM. Kitchen closes at 10:30 PM.',
    },
    {
      question: 'Do you offer delivery?',
      answer: 'Yes! We offer delivery through our website and various delivery partners. Free delivery on orders above ₹500.',
    },
    {
      question: 'Can I make reservations online?',
      answer: 'Absolutely! You can make reservations through our Reservations page or by calling us directly.',
    },
    {
      question: 'Do you accommodate dietary restrictions?',
      answer: 'Yes, we offer vegetarian, vegan, and gluten-free options. Please inform us of any allergies or dietary requirements.',
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept cash, all major credit/debit cards, UPI, and digital wallets.',
    },
    {
      question: 'Do you have parking facilities?',
      answer: 'Yes, we have valet parking available for our customers at no extra charge.',
    },
    {
      question: 'Can I host private events?',
      answer: 'Yes, we have a private dining area that can accommodate up to 50 guests. Contact us for more details.',
    },
    {
      question: 'Do you offer catering services?',
      answer: 'Yes, we provide catering services for events and parties. Please contact us for a custom quote.',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <BackToHome />
          <h1 className="text-4xl font-heading font-bold text-gray-900 dark:text-white mb-4 text-center">
            Frequently Asked Questions
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 text-center">
            Find answers to common questions about Silver Spoon .Co
          </p>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden"
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <span className="font-semibold text-gray-900 dark:text-white">{faq.question}</span>
                  <svg
                    className={`w-5 h-5 text-gray-500 transform transition-transform ${
                      openIndex === index ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {openIndex === index && (
                  <div className="px-6 pb-4">
                    <p className="text-gray-600 dark:text-gray-400">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-8 bg-primary-50 dark:bg-primary-900/20 rounded-xl p-6 text-center">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Still have questions?
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Feel free to contact us directly, and we'll be happy to help!
            </p>
            <a href="/contact" className="btn-primary inline-block">
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
