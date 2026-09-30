"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Heart, MapPin } from "lucide-react";
import { Product, Currency, CURRENCIES } from "@/lib/jewelry-data";

interface ProductCardProps {
  product: Product;
  currency: Currency;
  isWishlisted: boolean;
  onToggleWishlist: (product: Product) => void;
  onQuickView: (product: Product) => void;
  onBookShowroom: (product: Product, selectedMetal: string) => void;
}

export function ProductCard({
  product,
  currency,
  isWishlisted,
  onToggleWishlist,
  onQuickView,
  onBookShowroom,
}: ProductCardProps) {
  const [selectedMetal, setSelectedMetal] = useState(product.metal);

  const currencyConfig = CURRENCIES[currency];
  const convertedPrice = Math.round(product.price * currencyConfig.rate);

  return (
    <div
      onClick={() => onQuickView(product)}
      className="group bg-white rounded-2xl border border-stone-200/90 overflow-hidden hover:border-amber-400 hover:shadow-xl hover:shadow-amber-500/5 transition-all duration-300 flex flex-col cursor-pointer"
    >
      {/* Product Image Frame */}
      <div className="relative aspect-square w-full bg-[#f6f4f0] overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
        />

        {/* Minimal Badge */}
        {product.badge && (
          <div className="absolute top-3 left-3">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold tracking-wide uppercase bg-white/95 text-amber-900 border border-amber-200/80 shadow-xs">
              {product.badge}
            </span>
          </div>
        )}

        {/* Wishlist Button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(product);
          }}
          className={`absolute top-3 right-3 p-2 rounded-full transition ${
            isWishlisted
              ? "bg-rose-50 text-rose-500"
              : "bg-white/80 text-stone-600 hover:text-stone-900 hover:bg-white shadow-xs"
          }`}
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart className={`size-4 ${isWishlisted ? "fill-rose-500 text-rose-500" : ""}`} />
        </button>

        {/* Quick View Button on Hover */}
        <div className="absolute inset-x-3 bottom-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <div className="w-full py-2 rounded-xl bg-white/95 text-stone-900 text-xs font-medium text-center shadow-md border border-stone-200 hover:bg-white">
            Quick View
          </div>
        </div>
      </div>

      {/* Card Info */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Stone and Metal Info */}
          <div className="text-[11px] uppercase tracking-wider text-amber-800 font-medium mb-1">
            {product.gemstone} • {product.caratWeight}
          </div>

          {/* Product Name */}
          <h3 className="font-serif text-base text-stone-900 font-normal group-hover:text-amber-800 transition-colors line-clamp-1 mb-1">
            {product.name}
          </h3>

          {/* Metal Color Selector Dots */}
          <div className="flex items-center gap-1.5 mt-2 mb-3" onClick={(e) => e.stopPropagation()}>
            {product.metalsAvailable.map((m) => (
              <button
                key={m.name}
                type="button"
                onClick={() => setSelectedMetal(m.name)}
                title={m.name}
                className={`size-3.5 rounded-full border transition-all ${
                  selectedMetal === m.name
                    ? "ring-2 ring-amber-500 ring-offset-1 scale-110"
                    : "opacity-70 hover:opacity-100"
                }`}
                style={{ backgroundColor: m.hex }}
              />
            ))}
            <span className="text-[10px] text-stone-400 ml-1 truncate max-w-[120px]">
              {selectedMetal}
            </span>
          </div>
        </div>

        {/* Price & Add to Bag Row */}
        <div className="pt-2 border-t border-stone-100 flex items-center justify-between">
          <span className="font-serif text-base font-semibold text-stone-900">
            {currencyConfig.symbol}{convertedPrice.toLocaleString()}
          </span>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onBookShowroom(product, selectedMetal);
            }}
            className="px-3 py-1.5 rounded-full bg-stone-900 hover:bg-stone-800 text-white text-[11px] font-medium tracking-wide flex items-center gap-1.5 transition-all shadow-xs"
            title="Book Showroom Viewing"
            aria-label="Book Showroom Viewing"
          >
            <MapPin className="size-3 text-amber-300" />
            <span>Book Viewing</span>
          </button>
        </div>
      </div>
    </div>
  );
}
