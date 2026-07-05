import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, CheckCircle, MessageSquare, Plus, PenTool } from 'lucide-react';
import { Review, MenuItem } from '../types';

interface ReviewsSectionProps {
  reviews: Review[];
  menuItems: MenuItem[];
  onAddReview: (review: Review) => void;
}

export default function ReviewsSection({ reviews, menuItems, onAddReview }: ReviewsSectionProps) {
  const [showForm, setShowForm] = useState(false);
  
  // New Review form state
  const [name, setName] = useState('');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [selectedDish, setSelectedDish] = useState('');

  // Stats calculation
  const totalReviews = reviews.length;
  const avgRating = (reviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews).toFixed(1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !comment) {
      alert('Please fill out both name and comments.');
      return;
    }

    const newReview: Review = {
      id: `rev-${Date.now()}`,
      name,
      rating,
      comment,
      date: new Date().toLocaleDateString('en-US', {
        month: 'long',
        day: '2-digit',
        year: 'numeric'
      }),
      dishName: selectedDish || undefined,
      isVerified: true,
    };

    onAddReview(newReview);
    
    // Reset Form
    setName('');
    setRating(5);
    setComment('');
    setSelectedDish('');
    setShowForm(false);
  };

  // Find dish image for a review if it matches a dish name
  const getDishImage = (dishName?: string) => {
    if (!dishName) return null;
    const dish = menuItems.find((item) => item.name.toLowerCase() === dishName.toLowerCase() || item.id === dishName);
    return dish ? dish.image : null;
  };

  const getStarArray = (count: number) => {
    return Array.from({ length: 5 }, (_, i) => i < count);
  };

  return (
    <section id="reviews" className="py-16 md:py-24 bg-surface-container-low max-w-[1440px] mx-auto relative overflow-hidden">
      
      <div className="max-w-[1200px] mx-auto px-6">
        
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-16">
          <span className="font-caps text-xs md:text-sm text-terracotta tracking-widest uppercase mb-2 block">
            Testimonial
          </span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-primary font-bold">
            Honest Feedback From <br />
            <span className="text-tertiary-fixed-dim font-medium italic">Valued Customers</span>
          </h2>
          <div className="w-12 h-1 bg-terracotta mx-auto rounded-full mt-4" />
        </div>

        {/* Reviews Dashboard Stats & Call To Action */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center mb-16 bg-surface-white rounded-2xl p-6 md:p-8 border border-deep-earth/5 shadow-sm">
          
          {/* Average Rating Score */}
          <div className="text-center flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-deep-earth/10 pb-6 md:pb-0">
            <span className="font-serif text-5xl md:text-6xl font-bold text-primary mb-2">
              {avgRating}
            </span>
            <div className="flex gap-1 mb-2">
              {getStarArray(Math.round(Number(avgRating))).map((isGold, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 ${isGold ? 'text-tertiary-fixed-dim fill-tertiary-fixed-dim' : 'text-surface-container-highest'}`}
                />
              ))}
            </div>
            <span className="font-sans text-xs text-on-surface-variant font-medium">
              Based on {totalReviews} reviews
            </span>
          </div>

          {/* Star breakdowns progress */}
          <div className="flex flex-col gap-2 px-0 md:px-6">
            {[5, 4, 3, 2, 1].map((stars) => {
              const count = reviews.filter((r) => r.rating === stars).length;
              const percent = totalReviews > 0 ? (count / totalReviews) * 100 : 0;
              return (
                <div key={stars} className="flex items-center gap-3 text-xs">
                  <span className="w-4 text-on-surface-variant font-bold">{stars}★</span>
                  <div className="flex-1 h-2 bg-surface-container rounded-full overflow-hidden">
                    <div
                      className="h-full bg-tertiary-fixed-dim rounded-full"
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                  <span className="w-6 text-on-surface-variant text-right">{count}</span>
                </div>
              );
            })}
          </div>

          {/* Write a review toggle */}
          <div className="text-center md:text-left flex flex-col items-center md:items-start justify-center border-t md:border-t-0 md:border-l border-deep-earth/10 pt-6 md:pt-0 pl-0 md:pl-8">
            <h4 className="font-serif text-lg font-bold text-primary mb-2">Share Your Dining Story</h4>
            <p className="font-sans text-xs md:text-sm text-on-surface-variant leading-relaxed mb-4 max-w-xs">
              Did our Appam delight you? Was the biryani flavorful? Your feedback helps us preserve authentic culinary history.
            </p>
            <button
              onClick={() => setShowForm(!showForm)}
              className="px-5 py-2.5 bg-deep-earth hover:bg-primary text-on-primary rounded-full font-caps text-xs uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer shadow-sm hover:scale-105"
            >
              <PenTool className="w-3.5 h-3.5" />
              {showForm ? 'Cancel Review' : 'Write a Review'}
            </button>
          </div>
        </div>

        {/* Dynamic Add Review Form */}
        <AnimatePresence>
          {showForm && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden mb-12"
            >
              <form
                onSubmit={handleSubmit}
                className="bg-surface-white border border-deep-earth/10 rounded-2xl p-6 md:p-8 flex flex-col gap-4 shadow-sm"
              >
                <h4 className="font-serif text-lg font-bold text-primary mb-1">
                  Write Your Review
                </h4>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-primary uppercase tracking-wider">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Priya Dev"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-3.5 py-2 bg-background border border-deep-earth/10 rounded-xl text-sm focus:outline-none focus:border-primary-container"
                    />
                  </div>

                  {/* Rating Selector */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-primary uppercase tracking-wider">
                      Rating
                    </label>
                    <div className="flex gap-1.5 py-1">
                      {[1, 2, 3, 4, 5].map((starValue) => (
                        <button
                          key={starValue}
                          type="button"
                          onClick={() => setRating(starValue)}
                          className="text-2xl transition-transform hover:scale-110 focus:outline-none cursor-pointer"
                        >
                          <span
                            className={
                              starValue <= rating ? 'text-tertiary-fixed-dim' : 'text-surface-container-highest'
                            }
                          >
                            ★
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Dish Ordered */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-primary uppercase tracking-wider">
                    Which dish did you order? (Optional)
                  </label>
                  <select
                    value={selectedDish}
                    onChange={(e) => setSelectedDish(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-background border border-deep-earth/10 rounded-xl text-sm focus:outline-none focus:border-primary-container"
                  >
                    <option value="">Select a dish from our menu</option>
                    {menuItems.map((dish) => (
                      <option key={dish.id} value={dish.name}>
                        {dish.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Comments */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-primary uppercase tracking-wider">
                    Comments
                  </label>
                  <textarea
                    required
                    placeholder="Tell us about the textures, flavors, and your overall dining or delivery experience..."
                    rows={4}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-background border border-deep-earth/10 rounded-xl text-sm focus:outline-none focus:border-primary-container resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="px-6 py-3 bg-primary-container hover:bg-primary text-on-primary rounded-full font-caps text-xs tracking-widest uppercase font-bold self-start cursor-pointer transition-all shadow-sm"
                >
                  Post Review
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Testimonials List Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review, idx) => {
            const dishImg = getDishImage(review.dishName);
            return (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                // Standard dark deep-earth testimonial block requested in styling spec:
                className={`bg-deep-earth p-7 rounded-2xl text-left text-surface-white relative shadow-md flex flex-col justify-between ${
                  idx === 1 ? 'md:-translate-y-4' : ''
                }`}
              >
                <div>
                  {/* Top Quote Icon / Verified Status */}
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-3xl font-serif text-tertiary-fixed-dim opacity-70 leading-none">“</span>
                    {review.isVerified && (
                      <span className="flex items-center gap-1 bg-surface-white/10 px-2.5 py-1 rounded-full text-[10px] font-sans font-medium text-tertiary-fixed-dim">
                        <CheckCircle className="w-3 h-3" />
                        Verified Dine-in
                      </span>
                    )}
                  </div>

                  {/* Review Text */}
                  <p className="font-sans text-sm text-surface-container-highest/90 italic leading-relaxed mb-6">
                    {review.comment}
                  </p>
                </div>

                {/* Footer of card */}
                <div className="border-t border-surface-white/10 pt-4 mt-auto">
                  
                  {/* Optional Dish mini card for Context */}
                  {review.dishName && dishImg && (
                    <div className="flex gap-2.5 items-center mb-3 bg-surface-white/5 rounded-lg p-1.5 border border-surface-white/5">
                      <img
                        src={dishImg}
                        alt={review.dishName}
                        referrerPolicy="no-referrer"
                        className="w-10 h-10 object-cover rounded"
                      />
                      <div className="flex flex-col">
                        <span className="text-[10px] uppercase font-caps tracking-wide text-tertiary-fixed-dim">Ordered</span>
                        <span className="text-xs font-semibold line-clamp-1">{review.dishName}</span>
                      </div>
                    </div>
                  )}

                  <div className="flex justify-between items-center">
                    <div className="flex flex-col">
                      <span className="font-serif text-sm font-bold text-surface-bright">{review.name}</span>
                      <span className="text-[10px] text-surface-container-highest/60 font-sans mt-0.5">{review.date}</span>
                    </div>

                    <div className="flex gap-0.5">
                      {getStarArray(review.rating).map((isGold, i) => (
                        <span
                          key={i}
                          className={`text-sm ${
                            isGold ? 'text-tertiary-fixed-dim' : 'text-surface-white/20'
                          }`}
                        >
                          ★
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
