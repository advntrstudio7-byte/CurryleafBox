import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FullMenu from './components/FullMenu';
import Storytelling from './components/Storytelling';
import ReviewsSection from './components/ReviewsSection';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import ReservationModal from './components/ReservationModal';
import BrandMessage from './components/BrandMessage';

import { MENU_ITEMS, INITIAL_REVIEWS } from './data';
import { MenuItem, CartItem, Review } from './types';

export default function App() {
  // Navigation & Modal state
  const [activeSection, setActiveSection] = useState('menu');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isReserveOpen, setIsReserveOpen] = useState(false);

  // Cart Management
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [addedItems, setAddedItems] = useState<{ [id: string]: boolean }>({});

  // Reviews Data State
  const [reviews, setReviews] = useState<Review[]>(INITIAL_REVIEWS);

  // Scroll effect to highlight navbar elements
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['menu', 'reviews'];
      const scrollPosition = window.scrollY + 200; // Offset for sticky navbar

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Cart operations
  const handleAddToCart = (item: MenuItem) => {
    setCartItems((prev) => {
      const existingIndex = prev.findIndex((i) => i.menuItem.id === item.id);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + 1,
        };
        return updated;
      } else {
        return [...prev, { menuItem: item, quantity: 1 }];
      }
    });

    // Mark as added
    setAddedItems((prev) => ({
      ...prev,
      [item.id]: true,
    }));

    // Trigger open cart drawer for immediate delightful user response!
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (menuItemId: string, change: number) => {
    setCartItems((prev) => {
      const existingIndex = prev.findIndex((i) => i.menuItem.id === menuItemId);
      if (existingIndex === -1) return prev;

      const updated = [...prev];
      const newQty = updated[existingIndex].quantity + change;

      if (newQty <= 0) {
        // Remove item entirely
        setAddedItems((added) => {
          const copy = { ...added };
          delete copy[menuItemId];
          return copy;
        });
        return prev.filter((i) => i.menuItem.id !== menuItemId);
      } else {
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: newQty,
        };
        return updated;
      }
    });
  };

  const handleRemoveItem = (menuItemId: string) => {
    setCartItems((prev) => prev.filter((i) => i.menuItem.id !== menuItemId));
    setAddedItems((prev) => {
      const copy = { ...prev };
      delete copy[menuItemId];
      return copy;
    });
  };

  const handleUpdateInstructions = (menuItemId: string, text: string) => {
    setCartItems((prev) => {
      const existingIndex = prev.findIndex((i) => i.menuItem.id === menuItemId);
      if (existingIndex === -1) return prev;

      const updated = [...prev];
      updated[existingIndex] = {
        ...updated[existingIndex],
        customInstructions: text,
      };
      return updated;
    });
  };

  const handleClearCart = () => {
    setCartItems([]);
    setAddedItems({});
  };

  const handleAddReview = (newReview: Review) => {
    setReviews((prev) => [newReview, ...prev]);
  };

  const handleViewMenuClick = () => {
    const el = document.getElementById('menu');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-background text-on-background selection:bg-tertiary-fixed-dim selection:text-on-tertiary-fixed flex flex-col">
      {/* Navbar header */}
      <Navbar
        activeSection={activeSection}
        onSectionChange={setActiveSection}
        cartCount={totalCartCount}
        onCartOpen={() => setIsCartOpen(true)}
        onReserveOpen={() => setIsReserveOpen(true)}
      />

      {/* Hero Banner */}
      <Hero onViewMenuClick={handleViewMenuClick} />

      {/* Content Sections */}
      <main className="flex-1">
        {/* Brand Message Section */}
        <BrandMessage />

        {/* Heritage Storytelling details (Story, Tradition, Banana Leaf experience) */}
        <Storytelling />

        {/* Full Filterable Menu Grid */}
        <FullMenu
          menuItems={MENU_ITEMS}
          onAddToCart={handleAddToCart}
          addedItems={addedItems}
        />

        {/* Reviews and Ratings Grid & Posting interface */}
        <ReviewsSection
          reviews={reviews}
          menuItems={MENU_ITEMS}
          onAddReview={handleAddReview}
        />
      </main>

      {/* Footer information */}
      <Footer onNavClick={setActiveSection} />

      {/* Overlay Slideout Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onUpdateInstructions={handleUpdateInstructions}
        onClearCart={handleClearCart}
      />

      {/* Modal Dialog for Table Booking */}
      <ReservationModal
        isOpen={isReserveOpen}
        onClose={() => setIsReserveOpen(false)}
      />
    </div>
  );
}
