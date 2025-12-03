import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { CartProvider } from './contexts/CartContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { Header } from './components/Header';
import { CartPanel } from './components/CartPanel';
import { CheckoutForm } from './components/CheckoutForm';
import { Footer } from './components/Footer';
import { Toast } from './components/Toast';
import {
  Home,
  AboutUs,
  Contact,
  DishDetail,
  MenuPage,
  Reservations,
  FAQ,
  PrivacyPolicy,
  TermsOfService,
  ShippingInfo,
} from './pages';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info'; visible: boolean }>({
    message: '',
    type: 'success',
    visible: false,
  });

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    setToast({ message, type, visible: true });
  };

  const handleCheckoutClick = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleCheckoutSuccess = (orderId: string) => {
    showToast(`Order placed successfully! Order ID: ${orderId}`, 'success');
  };

  return (
    <ThemeProvider>
      <CartProvider>
        <div className="min-h-screen flex flex-col">
          {/* Header */}
          <Header
            onCartClick={() => setIsCartOpen(true)}
            onSearchChange={setSearchQuery}
          />

          {/* Main Content */}
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home searchQuery={searchQuery} />} />
              <Route path="/menu" element={<MenuPage />} />
              <Route path="/about" element={<AboutUs />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/dish/:id" element={<DishDetail />} />
              <Route path="/reservations" element={<Reservations />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/privacy" element={<PrivacyPolicy />} />
              <Route path="/terms" element={<TermsOfService />} />
              <Route path="/shipping" element={<ShippingInfo />} />
            </Routes>
          </main>

          {/* Footer */}
          <Footer />

          {/* Cart Panel */}
          <CartPanel
            isOpen={isCartOpen}
            onClose={() => setIsCartOpen(false)}
            onCheckout={handleCheckoutClick}
          />

          {/* Checkout Form */}
          <CheckoutForm
            isOpen={isCheckoutOpen}
            onClose={() => setIsCheckoutOpen(false)}
            onSuccess={handleCheckoutSuccess}
          />

          {/* Toast Notification */}
          <Toast
            message={toast.message}
            type={toast.type}
            isVisible={toast.visible}
            onClose={() => setToast(prev => ({ ...prev, visible: false }))}
          />
        </div>
      </CartProvider>
    </ThemeProvider>
  );
}

export default App;
