import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Flame, ShoppingCart } from 'lucide-react';
import { MenuItem } from '../types';

interface FullMenuProps {
  menuItems: MenuItem[];
  onAddToCart: (item: MenuItem) => void;
  addedItems: { [id: string]: boolean };
}

const MenuGrid = ({ items, onAddToCart, addedItems }: { items: MenuItem[], onAddToCart: (item: MenuItem) => void, addedItems: { [id: string]: boolean } }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
    <AnimatePresence mode="popLayout">
      {items.map((item) => {
        const isAdded = addedItems[item.id];
        return (
          <motion.div
            key={item.id}
            layout
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="bg-surface-white rounded-2xl p-5 shadow-[0_4px_12px_rgba(65,37,25,0.03)] hover:shadow-[0_12px_24px_rgba(65,37,25,0.08)] transition-all duration-300 flex flex-col group border border-deep-earth/5"
          >
            {/* Food Image */}
            <div className="aspect-square rounded-xl overflow-hidden mb-5 bg-surface-variant relative">
              <img
                alt={item.name}
                referrerPolicy="no-referrer"
                className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                src={item.image}
              />

              {/* Dietary Indicator Corner */}
              <div className="absolute top-3 left-3 bg-background/90 backdrop-blur-sm p-1 rounded border border-deep-earth/10 flex items-center justify-center gap-1.5 shadow-sm">
                <span
                  className={`w-2.5 h-2.5 rounded-full ${
                    item.isVeg ? 'bg-emerald-600' : 'bg-red-600'
                  }`}
                />
                <span className="text-[9px] font-bold text-deep-earth uppercase tracking-wider px-0.5">
                  {item.isVeg ? 'Veg' : 'Non-Veg'}
                </span>
              </div>

              {/* Optional Badge */}
              {item.badge && (
                <div className="absolute top-3 right-3 bg-tertiary-fixed-dim text-on-tertiary-fixed-variant px-3 py-1 rounded-full font-caps text-[10px] uppercase font-semibold z-10 shadow-sm">
                  {item.badge}
                </div>
              )}
            </div>

            {/* Content details */}
            <div className="flex flex-col flex-grow mb-4">
              <h3 className="font-serif text-lg md:text-xl font-bold text-primary mb-2 group-hover:text-terracotta transition-colors">
                {item.name}
              </h3>
              <p className="font-sans text-xs md:text-sm text-on-surface-variant leading-relaxed">
                {item.description}
              </p>
            </div>

            {/* Price and Add button */}
            <div className="flex justify-between items-center mt-auto border-t border-deep-earth/10 pt-4">
              <span className="font-sans text-lg font-bold text-primary-container">
                ₹{item.price}
              </span>

              <button
                onClick={() => onAddToCart(item)}
                className={`px-5 py-2 rounded-full font-caps text-xs font-semibold uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer shadow-sm ${
                  isAdded
                    ? 'bg-primary text-on-primary'
                    : 'bg-primary-container text-on-primary hover:bg-primary hover:scale-[1.03] active:scale-[0.97]'
                }`}
              >
                <ShoppingCart className="w-3.5 h-3.5" />
                <span>{isAdded ? 'Added' : 'Order Now'}</span>
              </button>
            </div>
          </motion.div>
        );
      })}
    </AnimatePresence>

    {/* No items found illustration fallback */}
    {items.length === 0 && (
      <div className="col-span-full py-16 text-center">
        <Flame className="w-12 h-12 text-terracotta mx-auto mb-4 opacity-40" />
        <h4 className="font-serif text-xl font-semibold text-primary mb-1">No items found in this category</h4>
      </div>
    )}
  </div>
);

export default function FullMenu({ menuItems, onAddToCart, addedItems }: FullMenuProps) {
  const dishes = menuItems.filter((item) => item.category === 'breakfast' || item.category === 'mains');
  const addons = menuItems.filter((item) => item.category === 'sides' || item.category === 'drinks');

  return (
    <section id="menu" className="py-16 md:py-24 px-6 bg-background max-w-[1440px] mx-auto scroll-mt-20">
      
      {/* Header Description */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <span className="font-caps text-xs md:text-sm text-terracotta tracking-widest uppercase mb-2 block">
          Explore More
        </span>
        <h2 className="font-serif text-3xl md:text-5xl text-primary font-bold mb-4">
          Our Full Menu
        </h2>
        <div className="w-16 h-1 bg-terracotta mx-auto rounded-full mb-4" />
        <p className="font-sans text-sm md:text-base text-on-surface-variant leading-relaxed">
          From light morning string hoppers to rich festive sadya feasts, discover the culinary masterpieces cooked with hand-pressed coconut oil and fresh-picked curry leaves.
        </p>
      </div>

      <div id="full-menu">
        <MenuGrid items={dishes} onAddToCart={onAddToCart} addedItems={addedItems} />
      </div>

      {addons.length > 0 && (
        <div className="mt-20">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="font-serif text-3xl md:text-5xl text-primary font-bold mb-4">
              Add-ons
            </h2>
            <div className="w-16 h-1 bg-terracotta mx-auto rounded-full mb-4" />
          </div>
          <MenuGrid items={addons} onAddToCart={onAddToCart} addedItems={addedItems} />
        </div>
      )}

    </section>
  );
}
