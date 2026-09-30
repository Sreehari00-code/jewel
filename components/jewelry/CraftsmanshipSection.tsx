"use client";

import React, { useState } from "react";
import { Gem, ShieldCheck, Sparkles, Award, Hammer, Compass } from "lucide-react";

export function CraftsmanshipSection() {
  const [activeTab, setActiveTab] = useState<number>(0);

  const pillars = [
    {
      title: "Ethical Gemstone Provenance",
      icon: Gem,
      subtitle: "100% Kimberly Process Compliant & Conflict-Free",
      description:
        "Every diamond in our collection is strictly vetted to exceed United Nations Kimberley Process requirements. We trace our Colombian emeralds directly to legacy Muzo family cooperatives and our royal sapphires to historic alluvial beds in Sri Lanka.",
      badge: "Zero Blood Diamonds",
    },
    {
      title: "Master Hand-Setting",
      icon: Hammer,
      subtitle: "Sculpted Under 20x Gemological Magnification",
      description:
        "Our artisans spend decades mastering the delicate French pavé, v-prong, and bezel techniques. Each claw is burnished down by hand to cradle the gemstone securely with minimal metal interference, unleashing peak fire and light dispersion.",
      badge: "Hand-Crafted in Paris & NYC",
    },
    {
      title: "Noble Recycled Metals",
      icon: Award,
      subtitle: "Solid 18K Gold (750) & Unalloyed Platinum 950",
      description:
        "We never plate or dilute. Every band and chain is forged from 100% recycled 18K solid yellow gold, rose gold, or hypoallergenic platinum 950, stamped with national hallmarks of authenticity for eternal endurance.",
      badge: "SCS Certified Recycled Gold",
    },
  ];

  return (
    <section id="craftsmanship-section" className="py-24 bg-[#100e0c] border-y border-amber-500/20 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.25em] text-amber-400 uppercase mb-3">
            <Compass className="size-3.5" />
            <span>Savoir-Faire & Heritage</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-light text-white mb-4">
            The Art of Haute Joaillerie
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base font-light">
            Behind every piece lies over a century of traditional metallurgical mastery, modern optical precision, and unyielding ethical commitments.
          </p>
        </div>

        {/* Interactive Tabs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            const isActive = activeTab === idx;

            return (
              <button
                key={pillar.title}
                onClick={() => setActiveTab(idx)}
                className={`p-6 rounded-2xl text-left border transition-all duration-300 relative overflow-hidden flex flex-col justify-between ${
                  isActive
                    ? "bg-[#181512] border-amber-400/80 shadow-xl shadow-amber-500/10"
                    : "bg-[#14120f] border-white/5 hover:border-amber-500/30 opacity-70 hover:opacity-100"
                }`}
              >
                {isActive && (
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 to-amber-200" />
                )}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-xl ${isActive ? "bg-amber-400 text-black" : "bg-black/40 text-amber-400 border border-white/5"}`}>
                      <Icon className="size-5" />
                    </div>
                    <span className="text-[10px] tracking-wider uppercase px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/20">
                      {pillar.badge}
                    </span>
                  </div>
                  <h3 className="font-serif text-lg text-white font-medium mb-1">
                    {pillar.title}
                  </h3>
                  <p className="text-xs text-amber-300/80 font-medium">
                    {pillar.subtitle}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Tab Detail Spotlight Box */}
        <div className="p-8 sm:p-10 rounded-3xl bg-[#151210] border border-amber-500/30 relative overflow-hidden">
          <div className="absolute top-0 right-0 -mr-16 -mt-16 size-64 bg-amber-500/5 rounded-full blur-3xl" />

          <div className="max-w-3xl relative z-10">
            <span className="text-xs font-semibold tracking-widest text-amber-400 uppercase mb-2 block">
              Atelier Principle 0{activeTab + 1}
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl text-amber-100 font-normal mb-4">
              {pillars[activeTab].title}
            </h3>
            <p className="text-sm sm:text-base text-zinc-300 font-light leading-relaxed mb-6">
              {pillars[activeTab].description}
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-white/5 text-center">
              <div>
                <span className="font-serif text-2xl font-bold text-amber-300 block">100%</span>
                <span className="text-[10px] text-zinc-400 uppercase tracking-wider">Conflict-Free</span>
              </div>
              <div>
                <span className="font-serif text-2xl font-bold text-amber-300 block">18K / 950</span>
                <span className="text-[10px] text-zinc-400 uppercase tracking-wider">Solid Fineness</span>
              </div>
              <div>
                <span className="font-serif text-2xl font-bold text-amber-300 block">20x</span>
                <span className="text-[10px] text-zinc-400 uppercase tracking-wider">Optical Precision</span>
              </div>
              <div>
                <span className="font-serif text-2xl font-bold text-amber-300 block">Lifetime</span>
                <span className="text-[10px] text-zinc-400 uppercase tracking-wider">Warranty</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
