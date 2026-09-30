"use client";

import React from "react";

interface FooterProps {
  onSelectCategory: (cat: string) => void;
}

export function Footer({ onSelectCategory }: FooterProps) {
  return (
    <footer className="bg-[#F5F2EB] border-t border-stone-200/80 py-12 px-4 sm:px-6 lg:px-8 text-stone-600 text-xs">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Brand */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <span className="font-serif tracking-[0.25em] text-xl font-light text-stone-900 uppercase">
            AURÉLIA
          </span>
          <p className="text-[11px] text-stone-500 mt-1 max-w-sm">
            Ethically handcrafted fine jewelry in solid 18K gold and conflict-free gemstones.
          </p>
        </div>

        {/* Quick Links */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-xs uppercase tracking-wider font-medium text-stone-600">
          {["rings", "necklaces", "earrings", "bracelets"].map((cat) => (
            <button
              key={cat}
              onClick={() => {
                onSelectCategory(cat);
                const el = document.getElementById("catalog-section");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
              className="hover:text-amber-800 transition"
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Copyright */}
        <div className="text-[11px] text-stone-400">
          © {new Date().getFullYear()} AURÉLIA Fine Jewelry. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
