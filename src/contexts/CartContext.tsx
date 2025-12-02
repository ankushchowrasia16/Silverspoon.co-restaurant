import React, { createContext, useContext, useCallback, useMemo } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import type { CartItem, MenuItem, OptionChoice } from '../types';

interface CartContextType {
  items: CartItem[];
  addToCart: (menuItem: MenuItem, quantity: number, selectedOptions?: { [key: string]: OptionChoice }) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  getItemCount: () => number;
  subtotal: number;
  tax: number;
  specialDiscount: number;
  couponDiscount: number;
  total: number;
  applyCoupon: (code: string) => boolean;
  couponApplied: string;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const TAX_RATE = 0.08; // 8% tax

/**
 * Cart Provider component that manages cart state and operations
 */
export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useLocalStorage<CartItem[]>('silver-spoon-cart', []);
  const [couponApplied, setCouponApplied] = useLocalStorage<string>('silver-spoon-coupon', '');
  const [specialDiscountRate] = useLocalStorage<number>('silver-spoon-special-discount', Math.random() < 0.5 ? 0.03 : 0.05);

  /**
   * Calculate total price for a cart item including options
   */
  const calculateItemPrice = useCallback((menuItem: MenuItem, selectedOptions?: { [key: string]: OptionChoice }): number => {
    let price = menuItem.price;
    if (selectedOptions) {
      Object.values(selectedOptions).forEach(option => {
        price += option.price;
      });
    }
    return price;
  }, []);

  /**
   * Generate unique ID for cart item based on menu item and selected options
   */
  const generateCartItemId = useCallback((menuItem: MenuItem, selectedOptions?: { [key: string]: OptionChoice }): string => {
    const optionsStr = selectedOptions 
      ? Object.entries(selectedOptions)
          .map(([key, val]) => `${key}:${val.label}`)
          .sort()
          .join('|')
      : '';
    return `${menuItem.id}${optionsStr ? `-${optionsStr}` : ''}`;
  }, []);

  /**
   * Add item to cart or increase quantity if already exists
   */
  const addToCart = useCallback((menuItem: MenuItem, quantity: number, selectedOptions?: { [key: string]: OptionChoice }) => {
    if (quantity < 1 || quantity > 99) {
      console.error('Invalid quantity:', quantity);
      return;
    }

    const itemPrice = calculateItemPrice(menuItem, selectedOptions);
    const cartItemId = generateCartItemId(menuItem, selectedOptions);

    setItems(prevItems => {
      const existingItemIndex = prevItems.findIndex(item => item.id === cartItemId);
      
      if (existingItemIndex !== -1) {
        // Item exists, update quantity
        const newItems = [...prevItems];
        const newQuantity = Math.min(newItems[existingItemIndex].quantity + quantity, 99);
        newItems[existingItemIndex] = {
          ...newItems[existingItemIndex],
          quantity: newQuantity,
          totalPrice: itemPrice * newQuantity,
        };
        return newItems;
      } else {
        // New item, add to cart
        const newItem: CartItem = {
          id: cartItemId,
          menuItem,
          quantity,
          selectedOptions,
          totalPrice: itemPrice * quantity,
        };
        return [...prevItems, newItem];
      }
    });
  }, [calculateItemPrice, generateCartItemId, setItems]);

  /**
   * Remove item from cart
   */
  const removeFromCart = useCallback((itemId: string) => {
    setItems(prevItems => prevItems.filter(item => item.id !== itemId));
  }, [setItems]);

  /**
   * Update quantity of an item in cart
   */
  const updateQuantity = useCallback((itemId: string, quantity: number) => {
    if (quantity < 1 || quantity > 99) {
      console.error('Invalid quantity:', quantity);
      return;
    }

    setItems(prevItems => {
      return prevItems.map(item => {
        if (item.id === itemId) {
          const itemPrice = calculateItemPrice(item.menuItem, item.selectedOptions);
          return {
            ...item,
            quantity,
            totalPrice: itemPrice * quantity,
          };
        }
        return item;
      });
    });
  }, [calculateItemPrice, setItems]);

  /**
   * Clear all items from cart
   */
  const clearCart = useCallback(() => {
    setItems([]);
  }, [setItems]);

  /**
   * Get total number of items in cart
   */
  const getItemCount = useCallback(() => {
    return items.reduce((count, item) => count + item.quantity, 0);
  }, [items]);

  /**
   * Apply coupon code
   */
  const applyCoupon = useCallback((code: string): boolean => {
    if (code.toUpperCase() === 'SILVER10' && !couponApplied) {
      setCouponApplied(code.toUpperCase());
      return true;
    }
    return false;
  }, [couponApplied, setCouponApplied]);

  /**
   * Calculate cart totals
   */
  const { subtotal, tax, specialDiscount, couponDiscount, total } = useMemo(() => {
    const subtotal = items.reduce((sum, item) => sum + item.totalPrice, 0);
    const tax = subtotal * TAX_RATE;
    const specialDiscount = subtotal * specialDiscountRate;
    const couponDiscount = couponApplied ? subtotal * 0.10 : 0;
    const total = subtotal + tax - specialDiscount - couponDiscount;
    return { subtotal, tax, specialDiscount, couponDiscount, total };
  }, [items, specialDiscountRate, couponApplied]);

  const value: CartContextType = {
    items,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getItemCount,
    subtotal,
    tax,
    specialDiscount,
    couponDiscount,
    total,
    applyCoupon,
    couponApplied,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

/**
 * Hook to access cart context
 */
export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
