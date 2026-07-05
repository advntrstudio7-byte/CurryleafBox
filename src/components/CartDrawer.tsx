import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Trash2, Plus, Minus, ArrowRight, CheckCircle, MapPin, Clock, CreditCard } from 'lucide-react';
import { CartItem, MenuItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (menuItemId: string, change: number) => void;
  onRemoveItem: (menuItemId: string) => void;
  onUpdateInstructions: (menuItemId: string, text: string) => void;
  onClearCart: () => void;
}

type StepState = 'cart';

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onUpdateInstructions,
  onClearCart,
}: CartDrawerProps) {
  const [step, setStep] = useState<StepState>('cart');
  
  const subtotal = cartItems.reduce((sum, item) => sum + item.menuItem.price * item.quantity, 0);
  const taxRate = 0.05; // 5% tax and packaging fee
  const taxesAndPkg = Math.round(subtotal * taxRate);
  // Delivery fee will be discussed on WhatsApp
  const total = subtotal + taxesAndPkg;

  const handlePlaceOrder = () => {
    // Construct WhatsApp message
    let message = `*New Order Inquiry - Curry Leaf Box*%0A%0A`;
    
    // Items
    message += `*Items:*%0A`;
    cartItems.forEach(item => {
      message += `- ${item.quantity}x ${item.menuItem.title} (₹${item.menuItem.price * item.quantity})%0A`;
      if (item.customInstructions) {
        message += `  _Note: ${item.customInstructions}_%0A`;
      }
    });
    
    // Totals
    message += `%0A*Summary (Excluding Delivery):*%0A`;
    message += `Subtotal: ₹${subtotal}%0A`;
    message += `Taxes/Pkg: ₹${taxesAndPkg}%0A`;
    message += `*Total: ₹${total}*%0A%0A`;
    
    message += `Please let me know the delivery charges and how to proceed with payment.`;
    
    const whatsappUrl = `https://wa.me/919810256338?text=${message}`;
    window.open(whatsappUrl, '_blank');
    
    onClearCart();
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-on-surface z-50 cursor-pointer"
          />

          {/* Drawer Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.35 }}
            className="fixed top-0 right-0 h-full w-full sm:max-w-md bg-background shadow-2xl z-50 flex flex-col border-l border-deep-earth/10"
          >
            {/* Header */}
            <div className="p-5 border-b border-deep-earth/10 bg-surface-container-low flex justify-between items-center">
              <div className="flex items-center gap-2">
                <span className="font-serif text-lg md:text-xl font-bold text-primary">
                  Your Basket
                </span>
                {cartItems.length > 0 && (
                  <span className="bg-primary-container text-on-primary text-xs font-semibold px-2.5 py-0.5 rounded-full">
                    {cartItems.reduce((count, item) => count + item.quantity, 0)}
                  </span>
                )}
              </div>
              <button
                onClick={onClose}
                className="p-1.5 hover:bg-surface-container-high rounded-full transition-colors text-on-surface-variant cursor-pointer"
                aria-label="Close panel"
              >
                <X className="w-5.5 h-5.5" />
              </button>
            </div>

            {/* CONTENT VIEWS */}
            <div className="flex-1 overflow-y-auto p-5">
              {cartItems.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-6 pb-20">
                  <div className="w-20 h-20 bg-surface-container-low rounded-full flex items-center justify-center mb-6">
                    <Trash2 className="w-8 h-8 text-on-surface-variant/30" />
                  </div>
                  <h3 className="font-serif text-xl font-bold text-primary mb-2">Your basket is empty</h3>
                  <p className="font-sans text-sm text-on-surface-variant max-w-[240px]">
                    Looks like you haven't added any authentic delicacies yet.
                  </p>
                  <button
                    onClick={onClose}
                    className="mt-8 px-6 py-2.5 bg-surface-white border border-deep-earth/10 text-primary font-caps text-xs tracking-wider uppercase font-bold rounded-full hover:bg-surface-container-low transition-colors"
                  >
                    Browse Menu
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  <AnimatePresence initial={false}>
                    {cartItems.map((item) => (
                      <motion.div
                        key={item.menuItem.id}
                        initial={{ opacity: 0, height: 0, scale: 0.95 }}
                        animate={{ opacity: 1, height: 'auto', scale: 1 }}
                        exit={{ opacity: 0, height: 0, scale: 0.95 }}
                        transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
                        className="bg-surface-white border border-deep-earth/10 rounded-2xl p-3 flex gap-3 shadow-sm"
                      >
                        {/* Image */}
                        <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden shrink-0 bg-surface-container-low">
                          <img
                            src={item.menuItem.image}
                            alt={item.menuItem.title}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        {/* Details */}
                        <div className="flex flex-col flex-1 min-w-0 justify-between">
                          <div className="flex justify-between items-start gap-2">
                            <div className="flex flex-col">
                              <span className="font-sans font-bold text-primary text-sm sm:text-base leading-tight">
                                {item.menuItem.title}
                              </span>
                              <span className="text-terracotta font-semibold text-xs mt-0.5">
                                ₹{item.menuItem.price}
                              </span>
                            </div>
                            <button
                              onClick={() => onRemoveItem(item.menuItem.id)}
                              className="p-1.5 text-on-surface-variant/50 hover:text-red-500 hover:bg-red-50 rounded-full transition-all shrink-0 cursor-pointer"
                              aria-label="Remove item"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>

                          <div className="mt-2 space-y-2">
                            {/* Quantity Controls */}
                            <div className="flex items-center gap-3 bg-surface-container-low w-fit rounded-full p-1 border border-deep-earth/5">
                              <button
                                onClick={() => onUpdateQuantity(item.menuItem.id, -1)}
                                className="w-6 h-6 rounded-full bg-surface-white shadow-sm flex items-center justify-center text-primary hover:text-terracotta transition-colors cursor-pointer"
                              >
                                <Minus className="w-3.5 h-3.5" />
                              </button>
                              <span className="font-sans font-bold text-xs w-3 text-center">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => onUpdateQuantity(item.menuItem.id, 1)}
                                className="w-6 h-6 rounded-full bg-primary-container text-on-primary shadow-sm flex items-center justify-center hover:bg-primary transition-colors cursor-pointer"
                              >
                                <Plus className="w-3.5 h-3.5" />
                              </button>
                            </div>

                            {/* Instructions Input */}
                            <input
                              type="text"
                              placeholder="Add instructions (e.g., Make it spicy)"
                              value={item.customInstructions || ''}
                              onChange={(e) => onUpdateInstructions(item.menuItem.id, e.target.value)}
                              className="w-full text-[10px] sm:text-xs bg-surface-container-low border border-deep-earth/5 rounded-md px-2.5 py-1.5 focus:outline-none focus:border-primary/30 transition-colors text-primary placeholder:text-on-surface-variant/50"
                            />
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </div>

            {/* BILL FOOTER SUMMARY */}
            {cartItems.length > 0 && (
              <div className="border-t border-deep-earth/10 bg-surface-container-low p-5 flex flex-col gap-3.5">
                {/* Breakdowns */}
                <div className="flex flex-col gap-2 text-sm border-b border-deep-earth/5 pb-3">
                  <div className="flex justify-between text-on-surface-variant">
                    <span>Subtotal:</span>
                    <span className="font-semibold">₹{subtotal}</span>
                  </div>
                  <div className="flex justify-between text-on-surface-variant">
                    <span>Tax & Packaging (5%):</span>
                    <span className="font-semibold">₹{taxesAndPkg}</span>
                  </div>
                </div>

                {/* Grand Total */}
                <div className="flex justify-between items-center text-primary font-bold text-base md:text-lg">
                  <span>Total (Excl. Delivery):</span>
                  <span className="text-terracotta font-sans text-xl">₹{total}</span>
                </div>

                {/* Primary CTA Button */}
                <button
                  onClick={handlePlaceOrder}
                  className="w-full py-3.5 bg-primary-container text-on-primary rounded-full font-caps text-xs tracking-widest uppercase font-bold hover:bg-primary transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  Proceed to WhatsApp
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
