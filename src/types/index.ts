/**
 * Menu item option choice
 */
export interface OptionChoice {
  label: string;
  price: number;
}

/**
 * Menu item option group (e.g., Size, Spice Level)
 */
export interface ItemOption {
  name: string;
  choices: OptionChoice[];
}

/**
 * Main menu item structure
 */
export interface MenuItem {
  id: string;
  name: string;
  category: string;
  price: number;
  veg: boolean;
  rating: number;
  image: string;
  short: string;
  description: string;
  options?: ItemOption[];
  popular?: boolean;
  history?: string;
  ingredients?: string | string[];
  preparation?: string;
  serving?: string;
  nutrition?: string;
  trivia?: string;
}

/**
 * Cart item with selected options and quantity
 */
export interface CartItem {
  id: string;
  menuItem: MenuItem;
  quantity: number;
  selectedOptions?: { [optionName: string]: OptionChoice };
  totalPrice: number;
}

/**
 * Cart state structure
 */
export interface CartState {
  items: CartItem[];
  subtotal: number;
  tax: number;
  deliveryFee: number;
  total: number;
}

/**
 * Filter options for menu
 */
export interface MenuFilters {
  category: string;
  search: string;
  dietaryPreference: 'all' | 'veg' | 'non-veg';
  priceRange: [number, number];
  sortBy: 'price-asc' | 'price-desc' | 'popularity' | 'rating';
}

/**
 * Checkout form data
 */
export interface CheckoutFormData {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  zipCode: string;
  paymentMethod: 'card' | 'cash' | 'upi';
  notes?: string;
}

/**
 * Order data
 */
export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  customerInfo: CheckoutFormData;
  timestamp: number;
  status: 'pending' | 'confirmed' | 'delivered';
}
