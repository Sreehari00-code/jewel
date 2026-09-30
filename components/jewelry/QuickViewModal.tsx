"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { X, MapPin, Sparkles, ShieldCheck } from "lucide-react";
import { Product, Currency, CURRENCIES } from "@/lib/jewelry-data";

interface QuickViewModalProps {
  product: Product | null;
  currency: Currency;
  isOpen: boolean;
  onClose: () => void;
  onBookShowroom: (
    product: Product,
    selectedMetal: string,
    selectedSize?: string | number
  ) => void;
}

export function QuickViewModal({
  product,
  currency,
  isOpen,
  onClose,
  onBookShowroom,
}: QuickViewModalProps) {
  const [selectedMetal, setSelectedMetal] = useState<string>("");
  const [selectedSize, setSelectedSize] = useState<string | number>("");

  useEffect(() => {
    if (product) {
      setSelectedMetal(product.metal);
      if (product.sizes && product.sizes.length > 0) {
        setSelectedSize(product.sizes[2] || product.sizes[0]);
      } else if (product.lengths && product.lengths.length > 0) {
        setSelectedSize(product.lengths[0]);
      } else {
        setSelectedSize("");
      }
    }
  }, [product]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!isOpen || !product) return null;

  const currencyConfig = CURRENCIES[currency];
  const convertedPrice = Math.round(product.price * currencyConfig.rate);

  const handleBook = () => {
    onClose();
    onBookShowroom(product, selectedMetal, selectedSize);
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs animate-in fade-in duration-200"
    >
      <div
        className="relative w-full max-w-3xl bg-white border border-stone-200 rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row text-stone-900 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 hover:text-stone-900 transition"
          aria-label="Close modal"
        >
          <X className="size-4" />
        </button>

        {/* Product Image */}
        <div className="relative md:w-1/2 aspect-square md:aspect-auto bg-[#f8f6f2] min-h-[300px]">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover object-center"
          />
          {product.badge && (
            <div className="absolute top-4 left-4">
              <span className="px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-white/95 text-amber-900 border border-stone-200 shadow-xs">
                {product.badge}
              </span>
            </div>
          )}
        </div>

        {/* Product Details & Selection */}
        <div className="md:w-1/2 p-6 sm:p-8 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div>
              <span className="text-[11px] uppercase tracking-wider font-semibold text-amber-700">
                {product.category} • {product.gemstone}
              </span>
              <h2 className="font-serif text-2xl font-normal text-stone-900 mt-1">
                {product.name}
              </h2>
              <div className="font-serif text-2xl font-semibold text-stone-900 mt-2">
                {currencyConfig.symbol}{convertedPrice.toLocaleString()}
              </div>
            </div>

            <p className="text-xs text-stone-600 font-light leading-relaxed">
              {product.description}
            </p>

            {/* Metal Swatch Options */}
            <div className="space-y-1.5 pt-2">
              <label className="text-xs font-medium text-stone-700 flex justify-between">
                <span>Metal:</span>
                <span className="text-stone-900 font-semibold">{selectedMetal}</span>
              </label>
              <div className="flex flex-wrap gap-2">
                {product.metalsAvailable.map((m) => (
                  <button
                    key={m.name}
                    type="button"
                    onClick={() => setSelectedMetal(m.name)}
                    className={`px-3 py-1.5 rounded-xl border text-xs flex items-center gap-1.5 transition ${
                      selectedMetal === m.name
                        ? "bg-amber-50 border-amber-600 text-amber-950 font-medium"
                        : "bg-stone-50 border-stone-200 text-stone-600 hover:border-stone-300"
                    }`}
                  >
                    <span
                      className="size-2.5 rounded-full border border-stone-300"
                      style={{ backgroundColor: m.hex }}
                    />
                    <span>{m.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Size Options */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="space-y-1.5 pt-2">
                <label className="text-xs font-medium text-stone-700 block">
                  Select Ring Size:
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {product.sizes.map((sz) => (
                    <button
                      key={sz}
                      type="button"
                      onClick={() => setSelectedSize(sz)}
                      className={`size-8 rounded-lg text-xs font-medium border transition ${
                        selectedSize === sz
                          ? "bg-stone-900 text-white border-stone-900"
                          : "bg-white border-stone-200 text-stone-700 hover:border-stone-300"
                      }`}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Book Showroom Appointment */}
          <div className="pt-4 border-t border-stone-200 space-y-3">
            <button
              type="button"
              onClick={handleBook}
              className="w-full py-3.5 rounded-xl font-medium text-xs tracking-widest uppercase transition flex items-center justify-center gap-2 bg-stone-900 hover:bg-stone-800 text-white shadow-sm"
            >
              <MapPin className="size-4 text-amber-300" />
              <span>Book Viewing at Nearby Showroom</span>
            </button>

            <div className="flex items-center justify-center gap-1.5 text-[11px] text-stone-500 text-center">
              <ShieldCheck className="size-3.5 text-amber-700 shrink-0" />
              <span>Personal Try-On in Private VIP Suite • Complimentary Ring Sizing</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
