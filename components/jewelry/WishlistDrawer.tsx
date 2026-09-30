"use client";

import React from "react";
import Image from "next/image";
import { X, Heart, Trash2, MapPin } from "lucide-react";
import { Product, Currency, CURRENCIES } from "@/lib/jewelry-data";

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  wishlist: Product[];
  currency: Currency;
  onRemoveFromWishlist: (product: Product) => void;
  onBookShowroom: (product: Product) => void;
}

export function WishlistDrawer({
  isOpen,
  onClose,
  wishlist,
  currency,
  onRemoveFromWishlist,
  onBookShowroom,
}: WishlistDrawerProps) {
  if (!isOpen) return null;

  const currencyConfig = CURRENCIES[currency];

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-stone-900/50 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white border-l border-stone-200 text-stone-900 shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-300">
          {/* Header */}
          <div className="p-5 border-b border-stone-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Heart className="size-4 text-rose-500 fill-rose-500" />
              <h2 className="font-serif text-lg font-medium text-stone-900">
                Wishlist ({wishlist.length})
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-stone-100 text-stone-500 hover:text-stone-900 transition"
              aria-label="Close wishlist"
            >
              <X className="size-5" />
            </button>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-3.5">
            {wishlist.length === 0 ? (
              <div className="text-center py-20">
                <Heart className="size-10 text-stone-300 mx-auto mb-3" />
                <h3 className="font-serif text-base text-stone-800 mb-1">Your wishlist is empty</h3>
                <p className="text-xs text-stone-500 mb-5">
                  Save pieces you love to review anytime.
                </p>
                <button
                  onClick={onClose}
                  className="px-5 py-2 rounded-full bg-stone-900 text-white text-xs font-medium hover:bg-stone-800 transition"
                >
                  Explore Collection
                </button>
              </div>
            ) : (
              wishlist.map((product) => {
                const convertedPrice = Math.round(product.price * currencyConfig.rate);

                return (
                  <div
                    key={product.id}
                    className="flex gap-3.5 p-3 rounded-2xl bg-stone-50 border border-stone-200/70"
                  >
                    <div className="relative size-18 rounded-xl overflow-hidden bg-white shrink-0 border border-stone-200">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover object-center"
                      />
                    </div>

                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between">
                          <h4 className="font-serif text-xs font-medium text-stone-900 line-clamp-1">
                            {product.name}
                          </h4>
                          <button
                            onClick={() => onRemoveFromWishlist(product)}
                            className="text-stone-400 hover:text-rose-500 p-0.5"
                            title="Remove"
                          >
                            <Trash2 className="size-3.5" />
                          </button>
                        </div>
                        <div className="text-[11px] text-stone-500 mt-0.5">
                          {product.gemstone} • {product.caratWeight}
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-2">
                        <span className="font-serif text-sm font-semibold text-stone-900">
                          {currencyConfig.symbol}{convertedPrice.toLocaleString()}
                        </span>
                        <button
                          onClick={() => {
                            onClose();
                            onBookShowroom(product);
                          }}
                          className="px-3 py-1.5 rounded-lg bg-stone-900 hover:bg-stone-800 text-white text-xs font-medium flex items-center gap-1.5 transition"
                        >
                          <MapPin className="size-3 text-amber-300" />
                          <span>Book Viewing</span>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
