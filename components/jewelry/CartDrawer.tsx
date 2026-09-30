"use client";

import React, { useState } from "react";
import Image from "next/image";
import { X, Trash2, ShoppingBag, ArrowRight, Check } from "lucide-react";
import { CartItem, Currency, CURRENCIES } from "@/lib/jewelry-data";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  currency: Currency;
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onCheckout: () => void;
  appliedPromo: string;
  onApplyPromo: (code: string) => boolean;
}

export function CartDrawer({
  isOpen,
  onClose,
  items,
  currency,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
  appliedPromo,
  onApplyPromo,
}: CartDrawerProps) {
  const [promoInput, setPromoInput] = useState("");
  const [promoError, setPromoError] = useState("");

  if (!isOpen) return null;

  const currencyConfig = CURRENCIES[currency];

  const subtotalUSD = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const discountRate = appliedPromo.toUpperCase() === "LUXE10" ? 0.1 : 0;
  const discountUSD = subtotalUSD * discountRate;
  const finalTotalUSD = subtotalUSD - discountUSD;

  const subtotalConverted = Math.round(subtotalUSD * currencyConfig.rate);
  const discountConverted = Math.round(discountUSD * currencyConfig.rate);
  const finalTotalConverted = Math.round(finalTotalUSD * currencyConfig.rate);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoInput.trim()) return;
    const success = onApplyPromo(promoInput.trim());
    if (!success) {
      setPromoError("Invalid code. Use LUXE10");
    } else {
      setPromoError("");
      setPromoInput("");
    }
  };

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
              <ShoppingBag className="size-4 text-stone-900" />
              <h2 className="font-serif text-lg font-medium text-stone-900">
                Shopping Bag ({items.reduce((sum, item) => sum + item.quantity, 0)})
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-stone-100 text-stone-500 hover:text-stone-900 transition"
              aria-label="Close bag"
            >
              <X className="size-5" />
            </button>
          </div>

          {/* Complimentary Courier Alert */}
          <div className="bg-amber-50 px-5 py-2 border-b border-amber-100 text-xs text-amber-900 font-medium">
            ✓ Complimentary insured express delivery included
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {items.length === 0 ? (
              <div className="text-center py-20">
                <ShoppingBag className="size-10 text-stone-300 mx-auto mb-3" />
                <h3 className="font-serif text-base text-stone-800 mb-1">Your bag is empty</h3>
                <p className="text-xs text-stone-500 mb-5">
                  Browse our fine jewelry collection and find your perfect piece.
                </p>
                <button
                  onClick={onClose}
                  className="px-5 py-2 rounded-full bg-stone-900 text-white text-xs font-medium hover:bg-stone-800 transition"
                >
                  Browse Jewelry
                </button>
              </div>
            ) : (
              items.map((item) => {
                const itemPriceConverted = Math.round(
                  item.product.price * item.quantity * currencyConfig.rate
                );

                return (
                  <div
                    key={item.id}
                    className="flex gap-3.5 p-3 rounded-2xl bg-stone-50 border border-stone-200/70"
                  >
                    {/* Thumbnail */}
                    <div className="relative size-18 rounded-xl overflow-hidden bg-white shrink-0 border border-stone-200">
                      <Image
                        src={item.product.image}
                        alt={item.product.name}
                        fill
                        className="object-cover object-center"
                      />
                    </div>

                    {/* Info */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between">
                          <h4 className="font-serif text-xs font-medium text-stone-900 line-clamp-1">
                            {item.product.name}
                          </h4>
                          <button
                            onClick={() => onRemoveItem(item.id)}
                            className="text-stone-400 hover:text-rose-500 p-0.5"
                            title="Remove"
                          >
                            <Trash2 className="size-3.5" />
                          </button>
                        </div>

                        <div className="text-[11px] text-stone-500 mt-0.5">
                          {item.selectedMetal}
                          {item.selectedSize && ` • Size ${item.selectedSize}`}
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-2">
                        {/* Quantity Increment */}
                        <div className="flex items-center border border-stone-200 rounded-lg bg-white px-2 py-0.5">
                          <button
                            onClick={() => onUpdateQuantity(item.id, -1)}
                            className="px-1.5 text-xs text-stone-500 hover:text-stone-900"
                          >
                            -
                          </button>
                          <span className="px-1.5 text-xs font-medium text-stone-900">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(item.id, 1)}
                            className="px-1.5 text-xs text-stone-500 hover:text-stone-900"
                          >
                            +
                          </button>
                        </div>

                        <span className="font-serif text-sm font-semibold text-stone-900">
                          {currencyConfig.symbol}{itemPriceConverted.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer & Checkout */}
          {items.length > 0 && (
            <div className="p-5 border-t border-stone-200 bg-white space-y-4">
              {/* Promo Code Form */}
              <form onSubmit={handleApplyPromo} className="space-y-1">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={promoInput}
                    onChange={(e) => setPromoInput(e.target.value)}
                    placeholder="Promo code (try LUXE10)"
                    className="flex-1 bg-stone-50 text-xs text-stone-900 placeholder:text-stone-400 rounded-xl px-3 py-2 border border-stone-200 focus:border-stone-400 focus:outline-none uppercase"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-medium rounded-xl transition"
                  >
                    Apply
                  </button>
                </div>
                {promoError && <p className="text-[11px] text-rose-500">{promoError}</p>}
                {appliedPromo && (
                  <div className="flex items-center gap-1 text-[11px] text-emerald-700">
                    <Check className="size-3" />
                    <span>Code <strong>{appliedPromo}</strong> applied (10% off)</span>
                  </div>
                )}
              </form>

              {/* Price Breakdown */}
              <div className="space-y-1.5 text-xs text-stone-600 border-t border-stone-100 pt-3">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>{currencyConfig.symbol}{subtotalConverted.toLocaleString()}</span>
                </div>

                {discountConverted > 0 && (
                  <div className="flex justify-between text-emerald-700">
                    <span>Discount (10%)</span>
                    <span>-{currencyConfig.symbol}{discountConverted.toLocaleString()}</span>
                  </div>
                )}

                <div className="flex justify-between font-serif text-base font-semibold text-stone-900 pt-1 border-t border-stone-100">
                  <span>Total</span>
                  <span>{currencyConfig.symbol}{finalTotalConverted.toLocaleString()}</span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={onCheckout}
                className="w-full py-3.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-medium text-xs uppercase tracking-widest transition flex items-center justify-center gap-2 shadow-sm"
              >
                <span>Checkout</span>
                <ArrowRight className="size-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
