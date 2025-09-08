import React from 'react';

const Hero: React.FC = () => {
  return (
    <section className="relative bg-gradient-to-br from-charcoal-50 to-white dark:from-dark-200 dark:to-dark-100 py-24 px-4">
      <div className="max-w-5xl mx-auto text-center">
        <h1 className="text-6xl md:text-7xl font-serif font-bold text-charcoal-900 dark:text-white mb-6 animate-fade-in leading-tight">
          Crafted
          <span className="block text-mustard-600 dark:text-mustard-400 mt-2">Burgers</span>
        </h1>
        <p className="text-xl text-charcoal-600 dark:text-charcoal-200 mb-10 max-w-2xl mx-auto animate-slide-up font-light leading-relaxed">
          Premium ingredients, bold flavors, and the perfect bite every time
        </p>
        <div className="flex justify-center space-x-4">
          <a 
            href="#burgers"
            className="bg-charcoal-900 dark:bg-mustard-600 text-white px-8 py-4 rounded-full hover:bg-charcoal-800 dark:hover:bg-mustard-700 transition-all duration-300 transform hover:scale-105 font-medium text-lg"
          >
            Order Now
          </a>
          <a 
            href="#menu"
            className="border-2 border-charcoal-900 dark:border-mustard-600 text-charcoal-900 dark:text-mustard-600 px-8 py-4 rounded-full hover:bg-charcoal-900 dark:hover:bg-mustard-600 hover:text-white transition-all duration-300 font-medium text-lg"
          >
            View Menu
          </a>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-10 right-10 w-20 h-20 border border-mustard-300 dark:border-mustard-600 rounded-full opacity-20 dark:opacity-30"></div>
      <div className="absolute bottom-20 left-10 w-16 h-16 bg-mustard-200 dark:bg-mustard-800 rounded-full opacity-30 dark:opacity-40"></div>
    </section>
  );
};

export default Hero;