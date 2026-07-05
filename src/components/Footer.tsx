import React from 'react';
import { Mail, Phone, MapPin, ExternalLink, Instagram, Facebook } from 'lucide-react';

interface FooterProps {
  onNavClick: (id: string) => void;
}

export default function Footer({ onNavClick }: FooterProps) {
  
  const handleItemClick = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    onNavClick(id);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
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
    <footer className="bg-deep-earth text-surface-white font-sans border-t border-surface-white/10 mt-auto">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 lg:gap-16">
          
          {/* Brand and Story Column */}
          <div className="flex flex-col gap-5">
            <h4 className="font-serif text-2xl font-bold text-tertiary-fixed-dim">
              Curry Leaf Box
            </h4>
            <p className="text-sm text-surface-container-highest/70 leading-relaxed">
              Authentic South Indian Culinary Heritage. Delivering slow-cooked, high-quality, freshly ground meals from our seasoned kitchen straight to your modern table.
            </p>
            <div className="flex gap-3.5 mt-2">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-surface-white/10 flex items-center justify-center hover:bg-tertiary-fixed-dim hover:text-deep-earth transition-colors cursor-pointer"
                aria-label="Instagram"
              >
                <Instagram className="w-4.5 h-4.5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-surface-white/10 flex items-center justify-center hover:bg-tertiary-fixed-dim hover:text-deep-earth transition-colors cursor-pointer"
                aria-label="Facebook"
              >
                <Facebook className="w-4.5 h-4.5" />
              </a>
              <a
                href="mailto:order@curryleafbox.com"
                className="w-10 h-10 rounded-full bg-surface-white/10 flex items-center justify-center hover:bg-tertiary-fixed-dim hover:text-deep-earth transition-colors cursor-pointer"
                aria-label="Email Us"
              >
                <Mail className="w-4.5 h-4.5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif text-lg font-bold text-surface-bright mb-6">Quick Links</h4>
            <ul className="space-y-4 text-sm">
              <li>
                <a
                  href="#menu"
                  onClick={(e) => handleItemClick(e, 'menu')}
                  className="text-surface-container-highest/70 hover:text-tertiary-fixed-dim transition-colors hover:translate-x-1 inline-block"
                >
                  Our Menu
                </a>
              </li>
              <li>
                <a
                  href="#reviews"
                  onClick={(e) => handleItemClick(e, 'reviews')}
                  className="text-surface-container-highest/70 hover:text-tertiary-fixed-dim transition-colors hover:translate-x-1 inline-block"
                >
                  Reviews & Feedback
                </a>
              </li>
            </ul>
          </div>

          {/* Information Policies */}
          <div>
            <h4 className="font-serif text-lg font-bold text-surface-bright mb-6">Information</h4>
            <ul className="space-y-4 text-sm">
              <li>
                <span className="text-surface-container-highest/70 hover:text-tertiary-fixed-dim transition-colors cursor-pointer inline-block">
                  About Us
                </span>
              </li>
              <li>
                <span className="text-surface-container-highest/70 hover:text-tertiary-fixed-dim transition-colors cursor-pointer inline-block">
                  Delivery Policy
                </span>
              </li>
              <li>
                <span className="text-surface-container-highest/70 hover:text-tertiary-fixed-dim transition-colors cursor-pointer inline-block">
                  Privacy Policy
                </span>
              </li>
              <li className="pt-4 mt-2 border-t border-surface-white/10 text-xs text-surface-container-highest/70 flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-terracotta shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  Sector-5, Greenwood Enclave, <br />
                  Wave City NH-24, <br />
                  Ghaziabad, Uttar Pradesh - 201002
                </span>
              </li>
            </ul>
          </div>

          {/* Opening Hours Widget Card */}
          <div className="bg-surface-white/5 p-6 rounded-2xl border border-surface-white/10 flex flex-col justify-between">
            <div>
              <h4 className="font-serif text-base font-bold text-surface-bright mb-4">Opening Hours</h4>
              <div className="space-y-3.5 text-xs text-surface-container-highest/70">
                <div className="flex justify-between border-b border-surface-white/10 pb-2">
                  <span>Mon - Fri:</span>
                  <span className="text-tertiary-fixed-dim font-semibold">10:00 AM - 11:00 PM</span>
                </div>
                <div className="flex justify-between border-b border-surface-white/10 pb-2">
                  <span>Saturday:</span>
                  <span className="text-tertiary-fixed-dim font-semibold">09:00 AM - 12:00 AM</span>
                </div>
                <div className="flex justify-between pb-1">
                  <span>Sunday:</span>
                  <span className="text-tertiary-fixed-dim font-semibold">09:00 AM - 10:00 PM</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Legal Disclaimer / Credits */}
        <div className="border-t border-surface-white/10 py-6 text-center text-xs text-surface-container-highest/50 mt-16 flex flex-col sm:flex-row justify-between items-center gap-4">
          <span>© 2026 Curry Leaf Box. Authentic South Indian Culinary Heritage. All rights reserved.</span>
          <span className="text-[10px] text-surface-container-highest/30 flex items-center gap-1">
            Crafted for premium gastronomy
            <ExternalLink className="w-2.5 h-2.5" />
          </span>
        </div>
      </div>
    </footer>
  );
}
