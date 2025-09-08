import React from 'react';
import { MenuItem, CartItem } from '../types';
import { useCategories } from '../hooks/useCategories';
import MenuItemCard from './MenuItemCard';

interface MenuProps {
  menuItems: MenuItem[];
  addToCart: (item: MenuItem, quantity?: number, variation?: any, addOns?: any[]) => void;
  cartItems: CartItem[];
  updateQuantity: (id: string, quantity: number) => void;
}

const Menu: React.FC<MenuProps> = ({ menuItems, addToCart, cartItems, updateQuantity }) => {
  const { categories } = useCategories();
  const popularItems = menuItems.filter(item => item.popular);

  const handleCategoryClick = (categoryId: string) => {
    const element = document.getElementById(`category-${categoryId}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-dark-400" style={{ scrollBehavior: 'smooth' }}>
      {/* Modern Menu Header */}
      <div className="bg-gradient-to-r from-charcoal-900 to-charcoal-800 dark:from-dark-100 dark:to-dark-200 py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-white mb-4">
            Our Menu
          </h1>
          <p className="text-xl text-charcoal-200 dark:text-charcoal-300 max-w-2xl mx-auto leading-relaxed">
            Crafted with premium ingredients and bold flavors
          </p>
        </div>
      </div>

      {/* Category Navigation */}
      <div className="sticky top-16 z-40 bg-white/95 dark:bg-dark-100/95 backdrop-blur-sm border-b border-charcoal-200 dark:border-charcoal-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex overflow-x-auto scrollbar-hide py-4 space-x-1">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategoryClick(category.id)}
                className="flex items-center space-x-2 px-6 py-3 rounded-full whitespace-nowrap transition-all duration-200 text-charcoal-700 dark:text-charcoal-300 hover:bg-charcoal-100 dark:hover:bg-charcoal-800 hover:bg-mustard-100 dark:hover:bg-mustard-900"
              >
                <span className="text-lg">{category.icon}</span>
                <span className="font-medium">{category.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Popular Items Section */}
      {popularItems.length > 0 && (
        <section className="py-12 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-serif font-bold text-charcoal-900 dark:text-white mb-2">
                Popular Choices
              </h2>
              <p className="text-charcoal-600 dark:text-charcoal-300">
                Customer favorites you can't miss
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {popularItems.slice(0, 3).map((item) => {
                const cartItem = cartItems.find(cartItem => cartItem.id === item.id);
                return (
                  <MenuItemCard
                    key={item.id}
                    item={item}
                    onAddToCart={addToCart}
                    quantity={cartItem?.quantity || 0}
                    onUpdateQuantity={updateQuantity}
                  />
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Main Menu Section - All Categories */}
      <div className="py-8 px-4">
        <div className="max-w-7xl mx-auto">
          {categories.map((category) => {
            const categoryItems = menuItems.filter(item => item.category === category.id);
            
            if (categoryItems.length === 0) return null;
            
            return (
              <section 
                key={category.id} 
                id={`category-${category.id}`}
                className="mb-16 scroll-mt-24"
              >
                <div className="mb-8">
                  <h2 className="text-3xl font-serif font-bold text-charcoal-900 dark:text-white mb-2 flex items-center">
                    <span className="text-2xl mr-3">{category.icon}</span>
                    {category.name}
                  </h2>
                  <p className="text-charcoal-600 dark:text-charcoal-300">
                    {categoryItems.length} items available
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {categoryItems.map((item) => {
                    const cartItem = cartItems.find(cartItem => cartItem.id === item.id);
                    return (
                      <MenuItemCard
                        key={item.id}
                        item={item}
                        onAddToCart={addToCart}
                        quantity={cartItem?.quantity || 0}
                        onUpdateQuantity={updateQuantity}
                      />
                    );
                  })}
                </div>
              </section>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Menu;