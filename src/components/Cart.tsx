import React from 'react';
import { Trash2, Plus, Minus, ArrowLeft } from 'lucide-react';
import { CartItem } from '../types';

interface CartProps {
  cartItems: CartItem[];
  updateQuantity: (id: string, quantity: number) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  onContinueShopping: () => void;
  onCheckout: () => void;
}

const Cart: React.FC<CartProps> = ({
  cartItems,
  updateQuantity,
  removeFromCart,
  clearCart,
  getTotalPrice,
  onContinueShopping,
  onCheckout
}) => {
  if (cartItems.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center py-16">
          <div className="text-6xl mb-4 opacity-30">🍔</div>
          <h2 className="text-2xl font-serif font-semibold text-charcoal-900 dark:text-white mb-2">Your cart is empty</h2>
          <p className="text-charcoal-600 dark:text-charcoal-200 mb-6">Add some delicious burgers to get started!</p>
          <button
            onClick={onContinueShopping}
            className="bg-charcoal-900 dark:bg-mustard-600 text-white px-6 py-3 rounded-full hover:bg-charcoal-800 dark:hover:bg-mustard-700 transition-all duration-200 font-medium"
          >
            Browse Menu
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <button
          onClick={onContinueShopping}
          className="flex items-center space-x-2 text-charcoal-600 dark:text-charcoal-200 hover:text-charcoal-900 dark:hover:text-white transition-colors duration-200"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Continue Shopping</span>
        </button>
        <h1 className="text-3xl font-serif font-semibold text-charcoal-900 dark:text-white">Your Cart</h1>
        <button
          onClick={clearCart}
          className="text-charcoal-600 dark:text-charcoal-200 hover:text-charcoal-900 dark:hover:text-white transition-colors duration-200 font-medium"
        >
          Clear All
        </button>
      </div>

      <div className="bg-white dark:bg-dark-50 rounded-2xl shadow-sm overflow-hidden mb-8 border border-charcoal-100 dark:border-charcoal-800">
        {cartItems.map((item, index) => (
          <div key={item.id} className={`p-6 ${index !== cartItems.length - 1 ? 'border-b border-charcoal-200 dark:border-charcoal-800' : ''}`}>
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h3 className="text-lg font-serif font-semibold text-charcoal-900 dark:text-white mb-1">{item.name}</h3>
                {item.selectedVariation && (
                  <p className="text-sm text-charcoal-600 dark:text-charcoal-200 mb-1">Size: {item.selectedVariation.name}</p>
                )}
                {item.selectedAddOns && item.selectedAddOns.length > 0 && (
                  <p className="text-sm text-charcoal-600 dark:text-charcoal-200 mb-1">
                    Add-ons: {item.selectedAddOns.map(addOn => 
                      addOn.quantity && addOn.quantity > 1 
                        ? `${addOn.name} x${addOn.quantity}`
                        : addOn.name
                    ).join(', ')}
                  </p>
                )}
                <p className="text-lg font-bold text-charcoal-900 dark:text-white">₱{item.totalPrice} each</p>
              </div>
              
              <div className="flex items-center space-x-4 ml-4">
                <div className="flex items-center space-x-3 bg-mustard-50 dark:bg-mustard-900/30 rounded-full p-1 border border-mustard-200 dark:border-mustard-700">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="p-2 hover:bg-mustard-100 rounded-full transition-colors duration-200"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="font-bold text-charcoal-900 dark:text-white min-w-[32px] text-center">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="p-2 hover:bg-mustard-100 rounded-full transition-colors duration-200"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
                
                <div className="text-right">
                  <p className="text-lg font-bold text-charcoal-900 dark:text-white">₱{item.totalPrice * item.quantity}</p>
                </div>
                
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="p-2 text-charcoal-500 dark:text-charcoal-300 hover:text-charcoal-700 dark:hover:text-charcoal-100 hover:bg-charcoal-50 dark:hover:bg-charcoal-800 rounded-full transition-all duration-200"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white dark:bg-dark-50 rounded-2xl shadow-sm p-6 border border-charcoal-100 dark:border-charcoal-800">
        <div className="flex items-center justify-between text-2xl font-serif font-bold text-charcoal-900 dark:text-white mb-6">
          <span>Total:</span>
          <span>₱{parseFloat(getTotalPrice() || 0).toFixed(2)}</span>
        </div>
        
        <button
          onClick={onCheckout}
          className="w-full bg-charcoal-900 dark:bg-mustard-600 text-white py-4 rounded-xl hover:bg-charcoal-800 dark:hover:bg-mustard-700 transition-all duration-200 transform hover:scale-[1.02] font-semibold text-lg"
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;