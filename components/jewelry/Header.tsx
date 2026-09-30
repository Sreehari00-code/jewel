"use client";

import React, { useState } from "react";
import { Heart, Search, X, Menu, MapPin } from "lucide-react";
import { CURRENCIES, Currency } from "@/lib/jewelry-data";

interface HeaderProps {
  wishlistCount: number;
  currentCurrency: Currency;
  onCurrencyChange: (c: Currency) => void;
  onOpenBooking: () => void;
  onOpenWishlist: () => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
}

export function Header({
  wishlistCount,
  currentCurrency,
  onCurrencyChange,
  onOpenBooking,
  onOpenWishlist,
  searchQuery,
  onSearchChange,
  selectedCategory,
  onSelectCategory,
}: HeaderProps) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const categories = [
    { id: "all", label: "All" },
    { id: "rings", label: "Rings" },
    { id: "necklaces", label: "Necklaces" },
    { id: "earrings", label: "Earrings" },
    { id: "bracelets", label: "Bracelets" },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-[#FAF8F5]/90 backdrop-blur-md border-b border-stone-200/70 transition-colors">

      {/* Main Clean Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Mobile Menu Button */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-stone-700 hover:text-stone-900"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>

          {/* Desktop Category Navigation */}
          <nav className="hidden lg:flex items-center space-x-7 text-xs uppercase tracking-[0.18em] font-medium text-stone-600">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  onSelectCategory(cat.id);
                  const el = document.getElementById("catalog-section");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                className={`transition-colors py-1 relative hover:text-amber-700 ${
                  selectedCategory === cat.id
                    ? "text-amber-700 font-semibold"
                    : ""
                }`}
              >
                {cat.label}
                {selectedCategory === cat.id && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-600 rounded-full" />
                )}
              </button>
            ))}
          </nav>

          {/* Brand Logo */}
          <div
            onClick={() => {
              onSelectCategory("all");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="flex flex-col items-center cursor-pointer select-none"
          >
            <span className="font-serif tracking-[0.25em] text-2xl sm:text-3xl font-light text-stone-900 uppercase">
              AURÉLIA
            </span>
            <span className="text-[9px] tracking-[0.35em] uppercase text-amber-700 font-medium -mt-0.5">
              Fine Jewelry
            </span>
          </div>

          {/* Right Tools (Currency, Search, Wishlist, Cart) */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* Currency Selector */}
            <div className="hidden sm:flex items-center bg-stone-100 rounded-full px-2.5 py-1 border border-stone-200 text-xs">
              <select
                value={currentCurrency}
                onChange={(e) => onCurrencyChange(e.target.value as Currency)}
                className="bg-transparent text-stone-800 text-xs font-semibold focus:outline-none cursor-pointer"
                aria-label="Select Currency"
              >
                {(Object.keys(CURRENCIES) as Currency[]).map((curr) => (
                  <option key={curr} value={curr} className="bg-white text-stone-800">
                    {CURRENCIES[curr].label}
                  </option>
                ))}
              </select>
            </div>

            {/* Search Toggle */}
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2 text-stone-600 hover:text-stone-900 rounded-full hover:bg-stone-100 transition"
              title="Search"
              aria-label="Search"
            >
              <Search className="size-5" />
            </button>

            {/* Wishlist Button */}
            <button
              onClick={onOpenWishlist}
              className="p-2 text-stone-600 hover:text-stone-900 rounded-full hover:bg-stone-100 transition relative"
              title="Wishlist"
              aria-label="Wishlist"
            >
              <Heart className="size-5" />
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-1 size-4 bg-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Book Showroom Visit Button */}
            <button
              onClick={onOpenBooking}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-stone-900 text-white hover:bg-stone-800 transition shadow-xs text-xs font-medium"
              title="Book Showroom Visit"
              aria-label="Book Showroom Visit"
            >
              <MapPin className="size-3.5 text-amber-300" />
              <span className="hidden sm:inline">Book Showroom</span>
              <span className="sm:hidden">Showroom</span>
            </button>
          </div>
        </div>

        {/* Minimal Search Bar */}
        {isSearchOpen && (
          <div className="py-3 border-t border-stone-200 animate-in fade-in duration-200">
            <div className="max-w-xl mx-auto relative flex items-center">
              <Search className="absolute left-3.5 size-4 text-stone-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search rings, solitaires, emeralds, tennis bracelets..."
                className="w-full bg-white text-stone-900 placeholder:text-stone-400 text-xs rounded-full pl-10 pr-9 py-2.5 border border-stone-300 focus:border-amber-600 focus:outline-none focus:ring-1 focus:ring-amber-600/30 shadow-inner"
                autoFocus
              />
              {searchQuery && (
                <button
                  onClick={() => onSearchChange("")}
                  className="absolute right-3 text-stone-400 hover:text-stone-700"
                >
                  <X className="size-3.5" />
                </button>
              )}
            </div>
          </div>
        )}

        {/* Mobile Navigation Dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-3 border-t border-stone-200 space-y-1">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  onSelectCategory(cat.id);
                  setMobileMenuOpen(false);
                  const el = document.getElementById("catalog-section");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                className={`w-full text-left px-4 py-2 rounded-lg text-xs uppercase tracking-wider font-medium transition ${
                  selectedCategory === cat.id
                    ? "bg-amber-100 text-amber-900 font-semibold"
                    : "text-stone-700 hover:bg-stone-100"
                }`}
              >
                {cat.label}
              </button>
            ))}

            <div className="pt-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBooking();
                }}
                className="w-full text-left px-4 py-2.5 rounded-lg text-xs uppercase tracking-wider font-semibold text-amber-950 bg-amber-500/20 hover:bg-amber-500/30 flex items-center gap-2"
              >
                <MapPin className="size-3.5 text-amber-800" />
                <span>Book Nearby Showroom Viewing</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
