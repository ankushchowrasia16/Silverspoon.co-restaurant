# Silver Spoon .Co - Project Structure

This document outlines the complete, production-ready folder structure of the Silver Spoon .Co restaurant website.

## 📁 Complete Directory Structure

```
silverspoon.co/
│
├── index.html                   # Root HTML file with React mount point
├── package.json                 # Project dependencies and scripts
├── package-lock.json            # Locked dependency versions
├── tsconfig.json                # TypeScript configuration
├── tsconfig.app.json            # App-specific TypeScript config
├── tsconfig.node.json           # Node-specific TypeScript config
├── vite.config.ts               # Vite bundler configuration
├── tailwind.config.js           # Tailwind CSS configuration
├── postcss.config.js            # PostCSS configuration
├── eslint.config.js             # ESLint linting rules
├── vercel.json                  # Vercel deployment config
├── .gitignore                   # Git ignore patterns
│
├── README.md                    # Main project documentation
├── DEPLOYMENT.md                # Deployment instructions
├── REPORT.md                    # Project report
├── SUBMISSION.md                # Submission details
├── STRUCTURE.md                 # This file - project structure guide
│
├── public/                      # Static assets served at root
│   ├── favicon/                 # Favicon assets
│   │   ├── silverspoon.png      # Main favicon (1433KB)
│   │   └── favicon.png          # Alternative favicon
│   ├── shape-5.png              # Background decoration shape
│   └── vite.svg                 # Vite logo
│
├── src/                         # Source code directory
│   │
│   ├── main.tsx                 # Application entry point
│   ├── App.tsx                  # Root App component with routing
│   │
│   ├── assets/                  # Organized asset files
│   │   ├── css/                 # All CSS stylesheets
│   │   │   ├── index.css        # Global styles & Tailwind directives
│   │   │   ├── App.css          # App-specific styles
│   │   │   ├── DishCard.css     # DishCard component styles
│   │   │   ├── DishDetailPage.css  # Dish detail page styles
│   │   │   ├── MenuFilters.css  # Menu filter styles
│   │   │   └── MenuPage.css     # Menu page styles
│   │   │
│   │   ├── images/              # Image assets
│   │   │   ├── menu/            # Menu item images (placeholder)
│   │   │   ├── ui/              # UI decoration images
│   │   │   │   └── shape-5.png  # Background shape
│   │   │   └── logo/            # Logo assets (placeholder)
│   │   │
│   │   └── icons/               # Icon assets (placeholder)
│   │
│   ├── components/              # Reusable React components
│   │   ├── Header.tsx           # Navigation header with search & cart
│   │   ├── Hero.tsx             # Hero section with CTA
│   │   ├── Footer.tsx           # Footer with links
│   │   ├── MenuList.tsx         # Menu grid with filters
│   │   ├── MenuItemCard.tsx     # Individual menu item card
│   │   ├── MenuFilters.tsx      # Filter controls for menu
│   │   ├── ItemModal.tsx        # Item details modal
│   │   ├── DishCard.tsx         # Dish card component
│   │   ├── DishDetail.tsx       # Dish detail view
│   │   ├── CartPanel.tsx        # Sliding cart panel
│   │   ├── CheckoutForm.tsx     # Checkout form modal
│   │   ├── Toast.tsx            # Notification component
│   │   ├── AddToCartToast.tsx   # Add to cart notification
│   │   ├── ChefSpecialPicks.tsx # Featured dishes section
│   │   ├── CustomerReviews.tsx  # Reviews section
│   │   ├── AboutSection.tsx     # About section component
│   │   ├── RestaurantTimings.tsx # Restaurant hours
│   │   ├── LoadingScreen.tsx    # Loading state component
│   │   └── BackToHome.tsx       # Back navigation component
│   │
│   ├── pages/                   # Page-level components
│   │   ├── Home.tsx             # Home page
│   │   ├── MenuPage.tsx         # Menu page
│   │   ├── AboutUs.tsx          # About page
│   │   ├── Contact.tsx          # Contact page
│   │   ├── DishDetail.tsx       # Dish detail page (route)
│   │   ├── DishDetailPage.tsx   # Dish detail page component
│   │   ├── Reservations.tsx     # Reservation page
│   │   ├── FAQ.tsx              # FAQ page
│   │   ├── PrivacyPolicy.tsx    # Privacy policy page
│   │   ├── TermsOfService.tsx   # Terms of service page
│   │   ├── ShippingInfo.tsx     # Shipping information page
│   │   └── index.ts             # Page exports barrel file
│   │
│   ├── contexts/                # React Context providers
│   │   ├── CartContext.tsx      # Cart state management
│   │   └── ThemeContext.tsx     # Theme (dark/light) state
│   │
│   ├── hooks/                   # Custom React hooks
│   │   └── useLocalStorage.ts   # localStorage synchronization hook
│   │
│   ├── data/                    # Static data and configurations
│   │   ├── menu.json            # Menu items data (16 items)
│   │   ├── menuComplete.json    # Complete menu dataset
│   │   ├── menuData.ts          # Menu data utilities
│   │   └── menuFilters.ts       # Filter configurations
│   │
│   ├── types/                   # TypeScript type definitions
│   │   └── index.ts             # All type interfaces & enums
│   │
│   └── utils/                   # Utility functions
│       └── helpers.ts           # Helper functions
│
└── node_modules/                # NPM dependencies (auto-generated)
```

## 🎯 Key Organizational Principles

### 1. **Separation of Concerns**
- **Components**: Reusable UI elements
- **Pages**: Route-specific page components
- **Contexts**: Global state management
- **Hooks**: Reusable stateful logic
- **Utils**: Pure utility functions

### 2. **Asset Organization**
- **CSS**: All stylesheets in `src/assets/css/`
- **Images**: Categorized in `src/assets/images/{menu,ui,logo}/`
- **Icons**: Dedicated `src/assets/icons/` directory
- **Public**: Static files served at root URL

### 3. **Type Safety**
- All types centralized in `src/types/`
- TypeScript for all `.tsx` and `.ts` files
- Strict type checking enabled

### 4. **Code Quality**
- ESLint for linting
- Prettier for formatting (if configured)
- Consistent naming conventions

## 🚀 Build Output Structure

When you run `npm run build`, Vite creates an optimized production build:

```
dist/
├── index.html              # Optimized HTML with hashed assets
├── assets/
│   ├── index-[hash].js     # Bundled & minified JavaScript
│   ├── index-[hash].css    # Bundled & minified CSS
│   └── [asset]-[hash].png  # Optimized images
└── favicon/
    └── silverspoon.png     # Favicon
```

## 📝 Import Path Examples

### CSS Imports
```typescript
// In main.tsx
import './assets/css/index.css'
```

### Component Imports
```typescript
// In App.tsx
import { Header } from './components/Header'
import { Home, MenuPage, AboutUs } from './pages'
```

### Context Usage
```typescript
// In any component
import { useCart } from './contexts/CartContext'
import { useTheme } from './contexts/ThemeContext'
```

### Data Imports
```typescript
// In MenuList.tsx
import menuData from './data/menu.json'
import { menuFilters } from './data/menuFilters'
```

### Type Imports
```typescript
// In any TypeScript file
import type { MenuItem, CartItem, Order } from './types'
```

## 🔧 Configuration Files

### vite.config.ts
- Build configuration
- Plugin setup
- Dev server settings

### tailwind.config.js
- Custom color palette
- Font families
- Theme extensions

### tsconfig.json
- TypeScript compiler options
- Path aliases (if any)
- Strict type checking

### eslint.config.js
- Linting rules
- Code style enforcement

## 📦 Deployment

The project is configured for deployment on:
- **Vercel** (primary, uses `vercel.json`)
- **Netlify** (alternative)
- Any static hosting service

Build command: `npm run build`
Output directory: `dist/`

## 🎨 Asset Management Best Practices

1. **Images**: Use WebP format for better compression
2. **CSS**: Component-specific styles in assets/css/
3. **Favicon**: Multiple sizes in public/favicon/
4. **Icons**: SVG format preferred for scalability

## 📊 Performance Optimizations

- **Code Splitting**: Routes and large components lazy-loaded
- **Tree Shaking**: Unused code eliminated in production
- **Minification**: All assets minified in build
- **Caching**: Hashed filenames for optimal browser caching

---

**Last Updated**: December 5, 2024
**Project Version**: 1.0.0
**Built With**: React 18 + TypeScript + Vite + Tailwind CSS

---

© 2024 Silver Spoon .Co. All rights reserved.
