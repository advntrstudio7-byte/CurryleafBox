import React, { useState } from 'react';
import { ShoppingBag, Calendar, Menu, X } from 'lucide-react';

interface NavbarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
  cartCount: number;
  onCartOpen: () => void;
  onReserveOpen: () => void;
}

export default function Navbar({
  activeSection,
  onSectionChange,
  cartCount,
  onCartOpen,
  onReserveOpen,
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'menu', label: 'Our Menu' },
    { id: 'reviews', label: 'Reviews' },
  ];

  const handleNavClick = (id: string) => {
    onSectionChange(id);
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // height of sticky navbar
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <nav className="bg-background/90 backdrop-blur-md fixed top-0 w-full z-50 border-b border-deep-earth/10 shadow-sm transition-all">
      <div className="max-w-[1440px] mx-auto px-6 h-20 flex justify-between items-center">
        {/* Brand Logo */}
        <button
          onClick={() => handleNavClick('menu')}
          className="flex items-center gap-2 hover:opacity-90 transition-opacity cursor-pointer"
        >
          <img 
            src="/src/assets/logo.png" 
            alt="Curry Leaf Box Logo" 
            className="w-12 h-12 md:w-14 md:h-14 object-contain rounded-full shadow-sm"
          />
          <span className="font-serif text-2xl md:text-3xl font-bold text-primary tracking-tight hidden sm:block">
            Curry Leaf Box
          </span>
        </button>

        {/* Desktop Links */}
        <div className="hidden md:flex gap-8 items-center h-full">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`font-sans text-sm md:text-base font-medium transition-all duration-300 relative py-1 cursor-pointer ${
                activeSection === item.id
                  ? 'text-terracotta border-b-2 border-terracotta'
                  : 'text-on-surface-variant hover:text-terracotta'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Action Buttons & Cart */}
        <div className="flex items-center gap-3 md:gap-4">

          {/* Order Now Button (acts as checkout or triggers menu view) */}
          <button
            onClick={() => {
              if (cartCount > 0) {
                onCartOpen();
              } else {
                handleNavClick('menu');
              }
            }}
            className="relative px-5 py-2 bg-primary-container text-on-primary rounded-full font-caps text-xs tracking-wider uppercase shadow-md hover:bg-primary transition-all hover:scale-105 active:scale-95 cursor-pointer"
          >
            Order Now
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 md:hidden text-primary hover:bg-surface-container-low rounded-full transition-all cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-20 left-0 w-full bg-background border-b border-deep-earth/10 shadow-lg p-6 flex flex-col gap-4 animate-fadeIn z-50">
          <div className="flex flex-col gap-3">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`text-left font-sans text-base py-2.5 px-4 rounded-xl transition-colors cursor-pointer ${
                  activeSection === item.id
                    ? 'bg-surface-container-high text-terracotta font-semibold'
                    : 'text-on-surface hover:bg-surface-container-low'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
          <div className="border-t border-deep-earth/10 pt-4 flex gap-4">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onReserveOpen();
              }}
              className="flex-1 py-3 border border-primary-container text-primary-container rounded-xl text-center font-caps text-xs tracking-wider uppercase hover:bg-surface-container-low transition-all cursor-pointer"
            >
              Reserve Table
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                if (cartCount > 0) {
                  onCartOpen();
                } else {
                  handleNavClick('menu');
                }
              }}
              className="flex-1 py-3 bg-primary-container text-on-primary rounded-xl text-center font-caps text-xs tracking-wider uppercase hover:bg-primary shadow-sm transition-all cursor-pointer"
            >
              Order Now
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
