"use client";

import React from "react";
import Image from "next/image";
import { ArrowRight, Sparkles, MapPin } from "lucide-react";

interface HeroProps {
  onExploreClick: () => void;
  onSelectCategory: (cat: string) => void;
  onOpenBooking: () => void;
}

export function Hero({ onExploreClick, onSelectCategory, onOpenBooking }: HeroProps) {
  return (
    <section className="relative overflow-hidden bg-[#FAF8F5] pt-8 pb-16 sm:py-20 border-b border-stone-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Minimal Catchy Copy */}
          <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
            {/* Catchy Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-100/80 border border-amber-300 text-amber-900 text-xs font-semibold tracking-wide">
              <Sparkles className="size-3.5 text-amber-700 fill-amber-700" />
              <span>Private Showroom Viewings & GIA Certified</span>
            </div>

            {/* Headline */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal text-stone-900 leading-[1.15] tracking-tight">
              Minimalist Luxury,{" "}
              <span className="italic font-light text-amber-700">
                Crafted for Eternity.
              </span>
            </h1>

            {/* Concise Subtitle */}
            <p className="text-stone-600 text-base sm:text-lg font-light leading-relaxed max-w-xl mx-auto lg:mx-0">
              Modern fine jewelry designed for effortless everyday wear and special milestones.
              Experience try-on appointments and private consultations in our luxury showrooms.
            </p>

            {/* Clean CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
              <button
                onClick={onExploreClick}
                className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-stone-900 hover:bg-stone-800 text-white font-medium text-xs uppercase tracking-widest transition-all shadow-sm hover:shadow flex items-center justify-center gap-2"
              >
                <span>Explore Collection</span>
                <ArrowRight className="size-3.5" />
              </button>

              <button
                onClick={onOpenBooking}
                className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-white hover:bg-stone-100 text-stone-800 font-medium text-xs uppercase tracking-widest border border-stone-300 transition-colors flex items-center justify-center gap-2"
              >
                <MapPin className="size-3.5 text-amber-700" />
                <span>Book Showroom Visit</span>
              </button>
            </div>
          </div>

          {/* Right Column: Hero Image Showcase in clean rounded frame */}
          <div className="lg:col-span-6 relative">
            <div className="relative aspect-[4/3] sm:aspect-[16/11] w-full rounded-3xl overflow-hidden shadow-xl border border-stone-200 bg-stone-100">
              <Image
                src="/images/hero.jpg"
                alt="AURÉLIA Fine Jewelry Solstice Collection"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center hover:scale-103 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

              {/* Minimal Floating Badge on Image */}
              <div className="absolute bottom-5 left-5 bg-white/90 backdrop-blur-md px-4 py-2 rounded-2xl border border-stone-200/80 shadow-md">
                <span className="text-[10px] uppercase tracking-widest text-amber-700 font-bold block">
                  New Arrival
                </span>
                <span className="font-serif text-sm text-stone-900 font-medium">
                  The Solstice Diamond Necklace & Solitaire
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
