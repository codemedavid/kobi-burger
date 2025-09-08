import React from 'react';
import { ShoppingCart, Moon, Sun } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';

interface HeaderProps {
  cartItemsCount: number;
  onCartClick: () => void;
  onMenuClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ cartItemsCount, onCartClick, onMenuClick }) => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-50 bg-white/95 dark:bg-dark-100/95 backdrop-blur-sm border-b border-charcoal-200 dark:border-charcoal-800 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <button 
            onClick={onMenuClick}
            className="flex items-center space-x-3 text-charcoal-900 dark:text-white hover:text-mustard-600 dark:hover:text-mustard-400 transition-colors duration-200"
          >
            <img src='/logo.jpg' className="w-10 h-10 bg-charcoal-900 dark:bg-mustard-600 rounded-full flex items-center justify-center" />

            <h1 className="text-2xl font-serif font-semibold tracking-tight">Kobi Burger</h1>
          </button>
          
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#burgers" className="text-charcoal-700 dark:text-charcoal-300 hover:text-mustard-600 dark:hover:text-mustard-400 transition-colors duration-200 font-medium">Burgers</a>
            <a href="#sides" className="text-charcoal-700 dark:text-charcoal-300 hover:text-mustard-600 dark:hover:text-mustard-400 transition-colors duration-200 font-medium">Sides</a>
            <a href="#drinks" className="text-charcoal-700 dark:text-charcoal-300 hover:text-mustard-600 dark:hover:text-mustard-400 transition-colors duration-200 font-medium">Drinks</a>
            <a href="#desserts" className="text-charcoal-700 dark:text-charcoal-300 hover:text-mustard-600 dark:hover:text-mustard-400 transition-colors duration-200 font-medium">Desserts</a>
          </nav>
          
          <div className="flex items-center space-x-2">
            <button 
              onClick={toggleTheme}
              className="p-2 text-charcoal-700 dark:text-charcoal-200 hover:text-charcoal-900 dark:hover:text-white hover:bg-charcoal-100 dark:hover:bg-charcoal-800 rounded-full transition-all duration-200"
            >
              {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
            <button 
              onClick={onCartClick}
              className="relative p-2 text-charcoal-700 dark:text-charcoal-200 hover:text-charcoal-900 dark:hover:text-white hover:bg-mustard-50 dark:hover:bg-mustard-900/30 rounded-full transition-all duration-200"
            >
              <ShoppingCart className="h-6 w-6" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-mustard-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-bounce-gentle font-medium">
                  {cartItemsCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;