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

type StepState = 'cart' | 'checkout' | 'success';

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
  
  // Checkout form state
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [deliveryType, setDeliveryType] = useState<'delivery' | 'takeaway'>('delivery');
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'upi'>('cod');
  
  // Calculations
  const subtotal = cartItems.reduce((sum, item) => sum + item.menuItem.price * item.quantity, 0);
  const taxRate = 0.05; // 5% tax and packaging fee
  const taxesAndPkg = Math.round(subtotal * taxRate);
  const deliveryFee = deliveryType === 'takeaway' || subtotal === 0 ? 0 : subtotal > 500 ? 0 : 40;
  const total = subtotal + taxesAndPkg + deliveryFee;

  const handleProceedToCheckout = () => {
    setStep('checkout');
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || (deliveryType === 'delivery' && !address)) {
      alert('Please fill in all required fields.');
      return;
    }
    
    // Construct WhatsApp message
    let message = `*New Order - Curry Leaf Box*%0A%0A`;
    
    // Items
    message += `*Items:*%0A`;
    cartItems.forEach(item => {
      message += `- ${item.quantity}x ${item.menuItem.title} (₹${item.menuItem.price * item.quantity})%0A`;
      if (item.customInstructions) {
        message += `  _Note: ${item.customInstructions}_%0A`;
      }
    });
    
    // Totals
    message += `%0A*Bill Summary:*%0A`;
    message += `Subtotal: ₹${subtotal}%0A`;
    message += `Taxes/Pkg: ₹${taxesAndPkg}%0A`;
    message += `Delivery: ₹${deliveryFee}%0A`;
    message += `*Total: ₹${total}* (${paymentMethod.toUpperCase()})%0A%0A`;
    
    // Customer Details
    message += `*Customer Details:*%0A`;
    message += `Name: ${name}%0A`;
    message += `Phone: ${phone}%0A`;
    message += `Order Type: ${deliveryType === 'delivery' ? 'Delivery' : 'Takeaway'}%0A`;
    if (deliveryType === 'delivery') {
      message += `Address: ${address}%0A`;
    }
    
    const whatsappUrl = `https://wa.me/919810256338?text=${message}`;
    window.open(whatsappUrl, '_blank');
    
    setStep('success');
  };

  const handleDone = () => {
    onClearCart();
    setStep('cart');
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
                  {step === 'cart' ? 'Your Basket' : step === 'checkout' ? 'Delivery Details' : 'Order Confirmed'}
                </span>
                {step === 'cart' && cartItems.length > 0 && (
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
              
              {/* STEP 1: CART LIST */}
              {step === 'cart' && (
                <>
                  {cartItems.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-center py-16 px-4">
                      <div className="w-16 h-16 bg-surface-container rounded-full flex items-center justify-center text-on-surface-variant mb-4">
                        🍽️
                      </div>
                      <h4 className="font-serif text-lg font-semibold text-primary mb-1">
                        Your basket is empty
                      </h4>
                      <p className="font-sans text-xs md:text-sm text-on-surface-variant max-w-xs mb-6">
                        Add delicious authentic South Indian recipes from our menu to place an order.
                      </p>
                      <button
                        onClick={onClose}
                        className="px-6 py-2.5 bg-primary-container text-on-primary rounded-full font-caps text-xs uppercase tracking-wider hover:bg-primary shadow-sm cursor-pointer"
                      >
                        Browse Menu
                      </button>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-5">
                      {cartItems.map((item) => (
                        <div
                          key={item.menuItem.id}
                          className="flex gap-4 p-3 bg-surface-white rounded-xl border border-deep-earth/5 shadow-sm"
                        >
                          {/* Item Thumbnail */}
                          <img
                            src={item.menuItem.image}
                            alt={item.menuItem.name}
                            referrerPolicy="no-referrer"
                            className="w-16 h-16 rounded-lg object-cover bg-surface-variant"
                          />

                          {/* Item Details */}
                          <div className="flex-1 flex flex-col">
                            <div className="flex justify-between items-start">
                              <h5 className="font-serif text-sm font-bold text-primary">
                                {item.menuItem.name}
                              </h5>
                              <button
                                onClick={() => onRemoveItem(item.menuItem.id)}
                                className="text-on-surface-variant hover:text-red-600 transition-colors cursor-pointer"
                                aria-label={`Remove ${item.menuItem.name}`}
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                            <span className="text-xs font-semibold text-primary-container mt-0.5">
                              ₹{item.menuItem.price} each
                            </span>

                            {/* Quantity Selector and Note inputs */}
                            <div className="flex justify-between items-center mt-3">
                              <div className="flex items-center bg-surface-container rounded-full border border-deep-earth/5">
                                <button
                                  onClick={() => onUpdateQuantity(item.menuItem.id, -1)}
                                  className="p-1.5 hover:bg-surface-container-high rounded-full transition-colors cursor-pointer"
                                  aria-label="Decrease quantity"
                                >
                                  <Minus className="w-3.5 h-3.5 text-primary" />
                                </button>
                                <span className="px-2.5 font-sans text-xs font-bold text-primary">
                                  {item.quantity}
                                </span>
                                <button
                                  onClick={() => onUpdateQuantity(item.menuItem.id, 1)}
                                  className="p-1.5 hover:bg-surface-container-high rounded-full transition-colors cursor-pointer"
                                  aria-label="Increase quantity"
                                >
                                  <Plus className="w-3.5 h-3.5 text-primary" />
                                </button>
                              </div>

                              <span className="font-sans text-sm font-bold text-deep-earth">
                                ₹{item.menuItem.price * item.quantity}
                              </span>
                            </div>

                            {/* Optional custom instructions input */}
                            <input
                              type="text"
                              placeholder="Any prep notes? (e.g. spicy, no coconut)"
                              value={item.customInstructions || ''}
                              onChange={(e) => onUpdateInstructions(item.menuItem.id, e.target.value)}
                              className="mt-2 text-[10px] sm:text-xs font-sans text-on-surface bg-surface-container-low border border-deep-earth/5 px-2.5 py-1 rounded-md focus:outline-none focus:border-primary-container"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              )}

              {/* STEP 2: CHECKOUT FORM */}
              {step === 'checkout' && (
                <form onSubmit={handlePlaceOrder} className="flex flex-col gap-4">
                  {/* Delivery Type Selectors */}
                  <div className="grid grid-cols-2 gap-2 mb-2">
                    <button
                      type="button"
                      onClick={() => setDeliveryType('delivery')}
                      className={`py-2.5 rounded-xl font-caps text-xs tracking-wider uppercase border text-center transition-all cursor-pointer ${
                        deliveryType === 'delivery'
                          ? 'bg-primary-container text-on-primary border-primary-container font-bold'
                          : 'bg-surface-white border-deep-earth/10 text-on-surface-variant hover:bg-surface-container-low'
                      }`}
                    >
                      Home Delivery
                    </button>
                    <button
                      type="button"
                      onClick={() => setDeliveryType('takeaway')}
                      className={`py-2.5 rounded-xl font-caps text-xs tracking-wider uppercase border text-center transition-all cursor-pointer ${
                        deliveryType === 'takeaway'
                          ? 'bg-primary-container text-on-primary border-primary-container font-bold'
                          : 'bg-surface-white border-deep-earth/10 text-on-surface-variant hover:bg-surface-container-low'
                      }`}
                    >
                      Self Takeaway
                    </button>
                  </div>

                  {/* Input Fields */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-primary uppercase tracking-wider">
                      Your Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Enter your name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-surface-white border border-deep-earth/10 rounded-xl text-sm font-sans focus:outline-none focus:border-primary-container focus:ring-1 focus:ring-primary-container"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-primary uppercase tracking-wider">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. +91 98765 43210"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-surface-white border border-deep-earth/10 rounded-xl text-sm font-sans focus:outline-none focus:border-primary-container"
                    />
                  </div>

                  {deliveryType === 'delivery' && (
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold text-primary uppercase tracking-wider">
                        Delivery Address <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        required
                        placeholder="Complete street address, building/flat number, landmark"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        rows={3}
                        className="w-full px-3.5 py-2.5 bg-surface-white border border-deep-earth/10 rounded-xl text-sm font-sans focus:outline-none focus:border-primary-container resize-none"
                      />
                    </div>
                  )}

                  {/* Payment Methods */}
                  <div className="flex flex-col gap-1.5 mt-2">
                    <label className="text-xs font-semibold text-primary uppercase tracking-wider mb-1">
                      Payment Mode
                    </label>
                    <div className="flex flex-col gap-2">
                      <label className="flex items-center gap-3 p-3 bg-surface-white border border-deep-earth/10 rounded-xl cursor-pointer hover:bg-surface-container-low transition-colors">
                        <input
                          type="radio"
                          name="payment"
                          checked={paymentMethod === 'cod'}
                          onChange={() => setPaymentMethod('cod')}
                          className="text-primary focus:ring-primary"
                        />
                        <div className="flex flex-col">
                          <span className="text-sm font-bold text-primary">Cash on Delivery</span>
                          <span className="text-xs text-on-surface-variant">Pay when your warm meal arrives</span>
                        </div>
                      </label>

                      <label className="flex items-center gap-3 p-3 bg-surface-white border border-deep-earth/10 rounded-xl cursor-pointer hover:bg-surface-container-low transition-colors">
                        <input
                          type="radio"
                          name="payment"
                          checked={paymentMethod === 'upi'}
                          onChange={() => setPaymentMethod('upi')}
                          className="text-primary focus:ring-primary"
                        />
                        <div className="flex flex-col">
                          <span className="text-sm font-bold text-primary">Pay via UPI / Cards</span>
                          <span className="text-xs text-on-surface-variant">Instant pay via secure scan at pickup/delivery</span>
                        </div>
                      </label>
                    </div>
                  </div>

                  {/* Form Submit Button trigger is in footer */}
                  <button type="submit" id="submit-order-form" className="hidden" />
                </form>
              )}

              {/* STEP 3: SUCCESS CONFIRMATION */}
              {step === 'success' && (
                <div className="h-full flex flex-col items-center justify-center text-center py-6 px-4">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: [0, 1.2, 1] }}
                    transition={{ duration: 0.5 }}
                    className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-6"
                  >
                    <CheckCircle className="w-10 h-10" />
                  </motion.div>

                  <h3 className="font-serif text-2xl font-bold text-primary mb-2">
                    Order Placed Successfully!
                  </h3>
                  <p className="font-sans text-sm text-on-surface-variant mb-6 max-w-sm">
                    Thank you, <span className="font-bold text-primary">{name}</span>! Your chef is already grinding fresh coconut and curry leaves for your authentic South Indian meals.
                  </p>

                  {/* Order Spec Card */}
                  <div className="w-full bg-surface-container-low border border-deep-earth/10 rounded-xl p-4.5 text-left flex flex-col gap-3 mb-8">
                    <div className="flex justify-between text-xs border-b border-deep-earth/5 pb-2">
                      <span className="text-on-surface-variant">Order Reference:</span>
                      <span className="font-bold font-mono text-primary uppercase">#CBL-{Math.floor(1000 + Math.random() * 9000)}</span>
                    </div>

                    <div className="flex items-start gap-2.5 text-xs">
                      <Clock className="w-4 h-4 text-terracotta mt-0.5 shrink-0" />
                      <div>
                        <span className="font-semibold text-primary block">Estimated Prep & Transit:</span>
                        <span className="text-on-surface-variant">{deliveryType === 'delivery' ? '35 - 45 mins' : '15 - 20 mins'}</span>
                      </div>
                    </div>

                    {deliveryType === 'delivery' && (
                      <div className="flex items-start gap-2.5 text-xs">
                        <MapPin className="w-4 h-4 text-terracotta mt-0.5 shrink-0" />
                        <div>
                          <span className="font-semibold text-primary block">Delivery Location:</span>
                          <span className="text-on-surface-variant line-clamp-1">{address}</span>
                        </div>
                      </div>
                    )}

                    <div className="flex items-start gap-2.5 text-xs">
                      <CreditCard className="w-4 h-4 text-terracotta mt-0.5 shrink-0" />
                      <div>
                        <span className="font-semibold text-primary block">Total bill to settle:</span>
                        <span className="text-on-surface-variant font-bold">₹{total} ({paymentMethod === 'cod' ? 'Cash on Delivery' : 'Pay via UPI QR'})</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={handleDone}
                    className="w-full py-3.5 bg-primary-container text-on-primary rounded-full font-caps text-xs tracking-widest uppercase font-bold hover:bg-primary shadow-sm transition-all"
                  >
                    Done
                  </button>
                </div>
              )}
            </div>

            {/* BILL FOOTER SUMMARY (ONLY FOR STEPS 1 & 2) */}
            {step !== 'success' && cartItems.length > 0 && (
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
                  {deliveryType === 'delivery' && (
                    <div className="flex justify-between text-on-surface-variant">
                      <span>Delivery Fee:</span>
                      <span className="font-semibold">
                        {deliveryFee === 0 ? <span className="text-emerald-700">FREE</span> : `₹${deliveryFee}`}
                      </span>
                    </div>
                  )}
                </div>

                {/* Grand Total */}
                <div className="flex justify-between items-center text-primary font-bold text-base md:text-lg">
                  <span>Grand Total:</span>
                  <span className="text-terracotta font-sans text-xl">₹{total}</span>
                </div>

                {/* Primary CTA Button */}
                {step === 'cart' ? (
                  <button
                    onClick={handleProceedToCheckout}
                    className="w-full py-3.5 bg-primary-container text-on-primary rounded-full font-caps text-xs tracking-widest uppercase font-bold hover:bg-primary transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
                  >
                    Proceed to Delivery
                    <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      const trigger = document.getElementById('submit-order-form');
                      if (trigger) trigger.click();
                    }}
                    className="w-full py-3.5 bg-primary-container text-on-primary rounded-full font-caps text-xs tracking-widest uppercase font-bold hover:bg-primary transition-all cursor-pointer shadow-md"
                  >
                    Place Order (₹{total})
                  </button>
                )}

                {/* Step back control */}
                {step === 'checkout' && (
                  <button
                    type="button"
                    onClick={() => setStep('cart')}
                    className="text-center font-caps text-[10px] sm:text-xs text-on-surface-variant hover:text-primary uppercase tracking-wider transition-colors py-1"
                  >
                    ← Back to basket edit
                  </button>
                )}
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
