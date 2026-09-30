"use client";

import React, { useState, useMemo } from "react";
import { ProductCard } from "./ProductCard";
import { Product, Currency, JEWELRY_PRODUCTS } from "@/lib/jewelry-data";
import { ArrowUpDown, X } from "lucide-react";

interface ProductGridProps {
  products?: Product[];
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
  currency: Currency;
  wishlist: Product[];
  onToggleWishlist: (product: Product) => void;
  onQuickView: (product: Product) => void;
  onBookShowroom: (product: Product, selectedMetal: string) => void;
  searchQuery: string;
  onClearSearch: () => void;
}

export function ProductGrid({
  products = JEWELRY_PRODUCTS,
  selectedCategory,
  onSelectCategory,
  currency,
  wishlist,
  onToggleWishlist,
  onQuickView,
  onBookShowroom,
  searchQuery,
  onClearSearch,
}: ProductGridProps) {
  const [sortBy, setSortBy] = useState<string>("featured");

  const categories = [
    { id: "all", label: "All Pieces" },
    { id: "rings", label: "Rings" },
    { id: "necklaces", label: "Necklaces" },
    { id: "earrings", label: "Earrings" },
    { id: "bracelets", label: "Bracelets" },
  ];

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      if (selectedCategory !== "all" && p.category !== selectedCategory) {
        return false;
      }
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = p.name.toLowerCase().includes(query);
        const matchesTagline = p.tagline.toLowerCase().includes(query);
        const matchesStone = p.gemstone.toLowerCase().includes(query);
        const matchesMetal = p.metal.toLowerCase().includes(query);
        if (!matchesName && !matchesTagline && !matchesStone && !matchesMetal) {
          return false;
        }
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === "price-low") return a.price - b.price;
      if (sortBy === "price-high") return b.price - a.price;
      return 0;
    });
  }, [products, selectedCategory, searchQuery, sortBy]);

  const isWishlisted = (productId: string) => wishlist.some((w) => w.id === productId);

  return (
    <section id="catalog-section" className="py-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-20">
      {/* Clean Category Pills & Sort Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 pb-4 border-b border-stone-200">
        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 no-scrollbar">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-xs tracking-wider uppercase font-medium transition-all shrink-0 ${
                  isActive
                    ? "bg-stone-900 text-white shadow-xs"
                    : "bg-white text-stone-600 hover:text-stone-900 border border-stone-200/80 hover:border-stone-300"
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Minimal Sort Dropdown */}
        <div className="flex items-center gap-2 self-end sm:self-auto">
          <ArrowUpDown className="size-3.5 text-stone-400" />
          <span className="text-xs text-stone-500 font-medium">Sort:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-white text-stone-800 text-xs rounded-lg px-2.5 py-1.5 border border-stone-200 focus:outline-none focus:border-stone-400 cursor-pointer"
            aria-label="Sort products"
          >
            <option value="featured">Featured</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </select>
        </div>
      </div>

      {/* Active Search Badge */}
      {searchQuery && (
        <div className="mb-6 flex items-center justify-between p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900">
          <span>
            Showing results for <strong>"{searchQuery}"</strong> ({filteredProducts.length} pieces)
          </span>
          <button
            onClick={onClearSearch}
            className="inline-flex items-center gap-1 font-semibold text-amber-900 hover:underline"
          >
            <X className="size-3.5" /> Clear search
          </button>
        </div>
      )}

      {/* Grid of Product Cards */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              currency={currency}
              isWishlisted={isWishlisted(product.id)}
              onToggleWishlist={onToggleWishlist}
              onQuickView={onQuickView}
              onBookShowroom={onBookShowroom}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-2xl border border-stone-200 p-8">
          <h3 className="font-serif text-xl text-stone-900 mb-2">No matching pieces found</h3>
          <p className="text-stone-500 text-xs mb-4">
            Try adjusting your search query or reset the filter.
          </p>
          <button
            onClick={() => {
              onSelectCategory("all");
              onClearSearch();
            }}
            className="px-5 py-2 rounded-full bg-stone-900 text-white text-xs font-medium hover:bg-stone-800 transition"
          >
            View All Jewelry
          </button>
        </div>
      )}
    </section>
  );
}
