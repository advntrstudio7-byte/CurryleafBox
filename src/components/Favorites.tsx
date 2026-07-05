import React from 'react';
import { motion } from 'motion/react';
import { Plus, Check, HelpCircle, AlertCircle } from 'lucide-react';
import { MenuItem } from '../types';

interface FavoritesProps {
  menuItems: MenuItem[];
  onAddToCart: (item: MenuItem) => void;
  addedItems: { [id: string]: boolean };
}

export default function Favorites({ menuItems, onAddToCart, addedItems }: FavoritesProps) {
  // Filter for favorites or the initial 4 signature dishes
  const favorites = menuItems.filter(
    (item) =>
      item.id === 'appam-1' ||
      item.id === 'puttu-1' ||
      item.id === 'meals-1' ||
      item.id === 'biriyani-1'
  );

  return (
    <section className="py-16 md:py-24 px-6 max-w-[1440px] mx-auto relative overflow-hidden">
      {/* Decorative leaf illustration on background */}
      <img
        src="https://lh3.googleusercontent.com/aida/AP1WRLsqFJExCag0m6yvuQ11hDKgvJes8ztgMN7aDX4Ts8mMcabc-Z7zPVLU05o5wnNwcptT1M3mWOyp_bogpIrD0H-3XRbcLHqv16pJMtSUkWJVELRxuQOQqHlkpQkY6VZi3LI2i_vsimEHxebQP3_Z4YA24Nqq1kCgCjK8gKzARQ4xaxJStRFQHt1wxJ8JijpXs6i_60IwqG61O3quxbIveCJkvaf6TAaDi6YlSMk90eqjg4KkraRF8GLHmfP6"
        alt=""
        className="absolute -left-12 top-1/4 w-44 md:w-56 opacity-20 pointer-events-none mix-blend-multiply rotate-12"
      />

      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 relative z-10">
        <div>
          <span className="font-caps text-xs md:text-sm text-terracotta tracking-widest uppercase mb-2 block">
            Our Menu
          </span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-primary font-bold leading-tight">
            Customer Favorites <br />
            <span className="text-tertiary-fixed-dim font-medium italic">You'll Love</span>
          </h2>
        </div>
        
        {/* Explore Full Menu anchor helper */}
        <button
          onClick={() => {
            const el = document.getElementById('full-menu');
            if (el) {
              el.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
          }}
          className="mt-6 md:mt-0 px-6 py-3 bg-deep-earth text-surface-white rounded-full font-caps text-xs md:text-sm tracking-wider uppercase hover:bg-primary transition-all duration-300 flex items-center gap-2 cursor-pointer shadow-md hover:scale-105"
        >
          Explore Full Menu
          <motion.span
            animate={{ x: [0, 5, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="text-xs"
          >
            ➔
          </motion.span>
        </button>
      </div>

      {/* Favorites Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 relative z-10">
        {favorites.map((item) => {
          const isAdded = addedItems[item.id];
          return (
            <motion.div
              key={item.id}
              whileHover={{ y: -6, scale: 1.01 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="bg-surface-white rounded-2xl p-4 shadow-[0_4px_12px_rgba(65,37,25,0.03)] hover:shadow-[0_16px_28px_rgba(65,37,25,0.1)] transition-all duration-300 flex flex-col group relative border border-deep-earth/5"
            >
              {/* Optional Badge */}
              {item.badge && (
                <div
                  className={`absolute top-6 right-6 px-3.5 py-1 rounded-full font-caps text-[10px] md:text-xs font-semibold uppercase tracking-wider z-20 shadow-sm ${
                    item.badge === 'Bestseller'
                      ? 'bg-tertiary-fixed-dim text-on-tertiary-fixed-variant'
                      : 'bg-terracotta text-surface-white'
                  }`}
                >
                  {item.badge}
                </div>
              )}

              {/* Food Image Container */}
              <div className="aspect-square rounded-xl overflow-hidden mb-4 bg-surface-container-low relative">
                <img
                  alt={item.name}
                  referrerPolicy="no-referrer"
                  className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
                  src={item.image}
                />
                
                {/* Dietary Tag indicator (Veg vs Non-Veg standard) */}
                <div className="absolute bottom-3 left-3 bg-background/90 backdrop-blur-sm p-1 rounded border border-deep-earth/10 flex items-center justify-center gap-1.5 shadow-sm">
                  <span
                    className={`w-3 h-3 rounded-full ${
                      item.isVeg ? 'bg-emerald-600' : 'bg-red-600'
                    }`}
                  />
                  <span className="text-[10px] font-bold text-deep-earth uppercase tracking-wider px-0.5">
                    {item.isVeg ? 'Veg' : 'Non-Veg'}
                  </span>
                </div>
              </div>

              {/* Title & Description */}
              <div className="flex flex-col flex-grow">
                <h3 className="font-serif text-lg md:text-xl font-bold text-primary mb-1.5 group-hover:text-terracotta transition-colors">
                  {item.name}
                </h3>
                <p className="font-sans text-xs md:text-sm text-on-surface-variant line-clamp-2 leading-relaxed mb-4">
                  {item.description}
                </p>
              </div>

              {/* Price & Action Button */}
              <div className="flex justify-between items-center mt-auto border-t border-deep-earth/10 pt-3.5">
                <span className="font-sans text-lg font-bold text-primary-container">
                  ₹{item.price}
                </span>

                <button
                  onClick={() => onAddToCart(item)}
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-all cursor-pointer ${
                    isAdded
                      ? 'bg-primary-container text-on-primary'
                      : 'bg-surface-container hover:bg-primary-container hover:text-on-primary text-primary-container'
                  }`}
                  aria-label={`Add ${item.name} to cart`}
                >
                  {isAdded ? <Check className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
