import React, { useState } from 'react';
import { Plus, Minus, X, ShoppingCart } from 'lucide-react';
import { MenuItem, Variation, AddOn } from '../types';

interface MenuItemCardProps {
  item: MenuItem;
  onAddToCart: (item: MenuItem, quantity?: number, variation?: Variation, addOns?: AddOn[]) => void;
  quantity: number;
  onUpdateQuantity: (id: string, quantity: number) => void;
}

const MenuItemCard: React.FC<MenuItemCardProps> = ({ 
  item, 
  onAddToCart, 
  quantity, 
  onUpdateQuantity 
}) => {
  const [showCustomization, setShowCustomization] = useState(false);
  const [selectedVariation, setSelectedVariation] = useState<Variation | undefined>(
    item.variations?.[0]
  );
  const [selectedAddOns, setSelectedAddOns] = useState<(AddOn & { quantity: number })[]>([]);

  const calculatePrice = () => {
    let price = item.basePrice;
    if (selectedVariation) {
      price = item.basePrice + selectedVariation.price;
    }
    selectedAddOns.forEach(addOn => {
      price += addOn.price * addOn.quantity;
    });
    return price;
  };

  const handleAddToCart = () => {
    if (item.variations?.length || item.addOns?.length) {
      setShowCustomization(true);
    } else {
      onAddToCart(item, 1);
    }
  };

  const handleCustomizedAddToCart = () => {
    // Convert selectedAddOns back to regular AddOn array for cart
    const addOnsForCart: AddOn[] = selectedAddOns.flatMap(addOn => 
      Array(addOn.quantity).fill({ ...addOn, quantity: undefined })
    );
    onAddToCart(item, 1, selectedVariation, addOnsForCart);
    setShowCustomization(false);
    setSelectedAddOns([]);
  };

  const handleIncrement = () => {
    onUpdateQuantity(item.id, quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 0) {
      onUpdateQuantity(item.id, quantity - 1);
    }
  };

  const updateAddOnQuantity = (addOn: AddOn, quantity: number) => {
    setSelectedAddOns(prev => {
      const existingIndex = prev.findIndex(a => a.id === addOn.id);
      
      if (quantity === 0) {
        // Remove add-on if quantity is 0
        return prev.filter(a => a.id !== addOn.id);
      }
      
      if (existingIndex >= 0) {
        // Update existing add-on quantity
        const updated = [...prev];
        updated[existingIndex] = { ...updated[existingIndex], quantity };
        return updated;
      } else {
        // Add new add-on with quantity
        return [...prev, { ...addOn, quantity }];
      }
    });
  };

  const groupedAddOns = item.addOns?.reduce((groups, addOn) => {
    const category = addOn.category;
    if (!groups[category]) {
      groups[category] = [];
    }
    groups[category].push(addOn);
    return groups;
  }, {} as Record<string, AddOn[]>);

  return (
    <>
      <div className={`bg-white dark:bg-dark-50 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group animate-scale-in border border-charcoal-100 dark:border-charcoal-800 ${!item.available ? 'opacity-60' : ''}`}>
        {item.popular && (
          <div className="bg-mustard-600 text-white text-xs font-semibold px-4 py-2 rounded-full absolute top-4 right-4 z-10 tracking-wide">
            POPULAR
          </div>
        )}
        
        {!item.available && (
          <div className="bg-charcoal-500 text-white text-xs font-semibold px-4 py-2 rounded-full absolute top-4 left-4 z-10 tracking-wide">
            SOLD OUT
          </div>
        )}
        
        <div className="aspect-w-16 aspect-h-9 bg-gradient-to-br from-charcoal-50 to-charcoal-100 dark:from-charcoal-800 dark:to-charcoal-700 relative">
          {item.image ? (
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-48 object-cover transition-opacity duration-300"
              loading="lazy"
              decoding="async"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                e.currentTarget.nextElementSibling?.classList.remove('hidden');
              }}
              onLoad={(e) => {
                e.currentTarget.style.opacity = '1';
              }}
              style={{ opacity: 0 }}
            />
          ) : null}
          <div className={`absolute inset-0 flex items-center justify-center ${item.image ? 'hidden' : ''}`}>
            <div className="text-6xl opacity-20 text-charcoal-400 dark:text-charcoal-600">🍔</div>
          </div>
        </div>
        
        <div className="p-6">
          <h4 className="text-xl font-serif font-semibold text-charcoal-900 dark:text-white mb-3 tracking-tight">{item.name}</h4>
          <p className={`text-sm mb-4 leading-relaxed ${!item.available ? 'text-charcoal-400 dark:text-charcoal-500' : 'text-charcoal-600 dark:text-charcoal-200'}`}>
            {!item.available ? 'Currently Unavailable' : item.description}
          </p>
          
          <div className="flex items-center justify-between mb-4">
            <div>
              <span className="text-2xl font-bold text-charcoal-900 dark:text-white">
                ₱{item.basePrice}
                {item.variations && item.variations.length > 0 && (
                  <span className="text-sm text-charcoal-500 dark:text-charcoal-300 ml-2 font-normal">starting</span>
                )}
              </span>
              {item.variations && item.variations.length > 0 && (
                <div className="text-xs text-charcoal-500 dark:text-charcoal-300 mt-1 font-medium">
                  {item.variations.length} size{item.variations.length > 1 ? 's' : ''} available
                </div>
              )}
            </div>
            
            {!item.available ? (
              <button
                disabled
                className="bg-charcoal-200 dark:bg-charcoal-800 text-charcoal-500 dark:text-charcoal-300 px-6 py-3 rounded-full cursor-not-allowed font-medium"
              >
                Sold Out
              </button>
            ) : quantity === 0 ? (
              <button
                onClick={handleAddToCart}
                className="bg-charcoal-900 dark:bg-mustard-600 text-white px-6 py-3 rounded-full hover:bg-charcoal-800 dark:hover:bg-mustard-700 transition-all duration-200 transform hover:scale-105 font-medium"
              >
                {item.variations?.length || item.addOns?.length ? 'Customize' : 'Add to Cart'}
              </button>
            ) : (
              <div className="flex items-center space-x-3 bg-mustard-50 dark:bg-mustard-900/30 rounded-full p-1 border border-mustard-200 dark:border-mustard-700">
                <button
                  onClick={handleDecrement}
                    className="p-2 hover:bg-mustard-100 dark:hover:bg-mustard-800/30 rounded-full transition-colors duration-200"
                >
                  <Minus className="h-4 w-4 text-charcoal-700" />
                </button>
                  <span className="font-bold text-charcoal-900 dark:text-white min-w-[24px] text-center">{quantity}</span>
                <button
                  onClick={handleIncrement}
                    className="p-2 hover:bg-mustard-100 dark:hover:bg-mustard-800/30 rounded-full transition-colors duration-200"
                >
                  <Plus className="h-4 w-4 text-charcoal-700" />
                </button>
              </div>
            )}
          </div>

          {item.addOns && item.addOns.length > 0 && (
            <div className="text-xs text-charcoal-500 dark:text-charcoal-300 font-medium">
              {item.addOns.length} add-on{item.addOns.length > 1 ? 's' : ''} available
            </div>
          )}
        </div>
      </div>

      {/* Customization Modal */}
      {showCustomization && (
        <div className="fixed inset-0 bg-dark-400 bg-opacity-80 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-dark-50 rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="sticky top-0 bg-white dark:bg-dark-50 border-b border-charcoal-200 dark:border-charcoal-800 p-6 flex items-center justify-between">
              <h3 className="text-xl font-serif font-semibold text-charcoal-900 dark:text-white">Customize {item.name}</h3>
              <button
                onClick={() => setShowCustomization(false)}
                className="p-2 hover:bg-charcoal-100 dark:hover:bg-charcoal-800 rounded-full transition-colors duration-200"
              >
                <X className="h-5 w-5 text-charcoal-600 dark:text-charcoal-200" />
              </button>
            </div>

            <div className="p-6">
              {/* Size Variations */}
              {item.variations && item.variations.length > 0 && (
                <div className="mb-6">
                  <h4 className="font-semibold text-charcoal-900 dark:text-white mb-4">Choose Size</h4>
                  <div className="space-y-3">
                    {item.variations.map((variation) => (
                      <label
                        key={variation.id}
                        className="flex items-center justify-between p-4 border border-charcoal-200 dark:border-charcoal-700 rounded-xl hover:bg-charcoal-50 dark:hover:bg-charcoal-800 cursor-pointer transition-colors duration-200"
                      >
                        <div className="flex items-center space-x-3">
                          <input
                            type="radio"
                            name="variation"
                            checked={selectedVariation?.id === variation.id}
                            onChange={() => setSelectedVariation(variation)}
                            className="text-mustard-600 focus:ring-mustard-500"
                          />
                          <span className="font-medium text-charcoal-900 dark:text-white">{variation.name}</span>
                        </div>
                        <span className="text-charcoal-900 dark:text-white font-semibold">
                          ₱{item.basePrice + variation.price}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {/* Add-ons */}
              {groupedAddOns && Object.keys(groupedAddOns).length > 0 && (
                <div className="mb-6">
                  <h4 className="font-semibold text-charcoal-900 dark:text-white mb-4">Add-ons</h4>
                  {Object.entries(groupedAddOns).map(([category, addOns]) => (
                    <div key={category} className="mb-4">
                      <h5 className="text-sm font-semibold text-charcoal-700 dark:text-charcoal-200 mb-3 capitalize tracking-wide">
                        {category.replace('-', ' ')}
                      </h5>
                      <div className="space-y-2">
                        {addOns.map((addOn) => (
                          <div
                            key={addOn.id}
                            className="flex items-center justify-between p-4 border border-charcoal-200 dark:border-charcoal-700 rounded-xl hover:bg-charcoal-50 dark:hover:bg-charcoal-800 transition-colors duration-200"
                          >
                            <div className="flex-1">
                              <span className="font-medium text-charcoal-900 dark:text-white">{addOn.name}</span>
                              <div className="text-sm text-charcoal-600 dark:text-charcoal-200">
                                {addOn.price > 0 ? `₱${addOn.price} each` : 'Free'}
                              </div>
                            </div>
                            
                            <div className="flex items-center space-x-2">
                              {selectedAddOns.find(a => a.id === addOn.id) ? (
                                <div className="flex items-center space-x-2 bg-mustard-100 dark:bg-mustard-900/40 rounded-full p-1 border border-mustard-200 dark:border-mustard-700">
                                  <button
                                    type="button"
                                    onClick={() => {
                                      const current = selectedAddOns.find(a => a.id === addOn.id);
                                      updateAddOnQuantity(addOn, (current?.quantity || 1) - 1);
                                    }}
                                    className="p-1 hover:bg-mustard-200 dark:hover:bg-mustard-800/50 rounded-full transition-colors duration-200"
                                  >
                                    <Minus className="h-3 w-3 text-charcoal-700" />
                                  </button>
                                  <span className="font-semibold text-charcoal-900 dark:text-white min-w-[20px] text-center text-sm">
                                    {selectedAddOns.find(a => a.id === addOn.id)?.quantity || 0}
                                  </span>
                                  <button
                                    type="button"
                                    onClick={() => {
                                      const current = selectedAddOns.find(a => a.id === addOn.id);
                                      updateAddOnQuantity(addOn, (current?.quantity || 0) + 1);
                                    }}
                                    className="p-1 hover:bg-mustard-200 dark:hover:bg-mustard-800/50 rounded-full transition-colors duration-200"
                                  >
                                    <Plus className="h-3 w-3 text-charcoal-700" />
                                  </button>
                                </div>
                              ) : (
                                <button
                                  type="button"
                                  onClick={() => updateAddOnQuantity(addOn, 1)}
                                  className="flex items-center space-x-1 px-4 py-2 bg-charcoal-900 dark:bg-mustard-600 text-white rounded-full hover:bg-charcoal-800 dark:hover:bg-mustard-700 transition-colors duration-200 text-sm font-medium"
                                >
                                  <Plus className="h-3 w-3" />
                                  <span>Add</span>
                                </button>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Price Summary */}
              <div className="border-t border-charcoal-200 dark:border-charcoal-800 pt-4 mb-6">
                <div className="flex items-center justify-between text-xl font-serif font-bold text-charcoal-900 dark:text-white">
                  <span>Total:</span>
                  <span>₱{calculatePrice()}</span>
                </div>
              </div>

              <button
                onClick={handleCustomizedAddToCart}
                className="w-full bg-charcoal-900 dark:bg-mustard-600 text-white py-4 rounded-xl hover:bg-charcoal-800 dark:hover:bg-mustard-700 transition-colors duration-200 font-semibold flex items-center justify-center space-x-2"
              >
                <ShoppingCart className="h-4 w-4" />
                <span>Add to Cart - ₱{calculatePrice()}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MenuItemCard;