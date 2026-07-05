import React from 'react';
import leafImg from '../assets/leaf.png';

export default function BrandMessage() {
  return (
    <section className="relative w-full py-24 md:py-32 bg-[#F8F5F0] flex justify-center items-center overflow-hidden">
      {/* Left Floating Curry Leaf */}
      <div className="absolute left-[-5%] md:left-[5%] top-[15%] animate-[float_6s_ease-in-out_infinite] opacity-60 pointer-events-none">
        <img 
          src={leafImg} 
          alt="Curry Leaf" 
          className="w-24 md:w-48 object-contain drop-shadow-xl -rotate-12"
          onError={(e) => {
            e.currentTarget.style.display = 'none';
          }}
        />
      </div>

      {/* Right Floating Curry Leaf */}
      <div className="absolute right-[-5%] md:right-[5%] bottom-[15%] animate-[float_7s_ease-in-out_infinite] opacity-60 pointer-events-none">
        <img 
          src={leafImg} 
          alt="Curry Leaf" 
          className="w-24 md:w-48 object-contain drop-shadow-xl rotate-[100deg]"
          onError={(e) => {
            e.currentTarget.style.display = 'none';
          }}
        />
      </div>

      <div className="z-10 max-w-4xl px-6 text-center">
        <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl font-bold text-[#2A4B26] leading-[1.2] tracking-tight">
          Traditional recipes, fresh <br/>
          ingredients, heartfelt cooking.<br/>
          The authentic taste of <br/>
          <span className="text-[#C15C3D] italic font-medium">Kerala lives here.</span>
        </h2>
      </div>
    </section>
  );
}
