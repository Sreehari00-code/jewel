"use client";

import React, { useState } from "react";
import { X, CheckCircle2, Lock, ArrowRight } from "lucide-react";
import { CartItem, Currency, CURRENCIES } from "@/lib/jewelry-data";

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  currency: Currency;
  appliedPromo: string;
  onOrderCompleted: () => void;
}

export function CheckoutModal({
  isOpen,
  onClose,
  items,
  currency,
  appliedPromo,
  onOrderCompleted,
}: CheckoutModalProps) {
  const [step, setStep] = useState<"checkout" | "confirmed">("checkout");
  const [formData, setFormData] = useState({
    name: "Elena Vance",
    email: "elena.vance@example.com",
    address: "740 Park Avenue",
    city: "New York",
    country: "United States",
    cardNumber: "•••• •••• •••• 4242",
    expiry: "12/28",
    cvv: "•••",
  });
  const [orderNumber, setOrderNumber] = useState("");

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!isOpen) return null;

  const currencyConfig = CURRENCIES[currency];
  const subtotalUSD = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const discountRate = appliedPromo.toUpperCase() === "LUXE10" ? 0.1 : 0;
  const discountUSD = subtotalUSD * discountRate;
  const finalTotalUSD = subtotalUSD - discountUSD;
  const finalTotalConverted = Math.round(finalTotalUSD * currencyConfig.rate);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setOrderNumber(`AUR-${Math.floor(100000 + Math.random() * 900000)}`);
    setStep("confirmed");
    onOrderCompleted();
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs animate-in fade-in duration-200"
    >
      <div
        className="relative w-full max-w-lg bg-white border border-stone-200 rounded-3xl overflow-hidden shadow-2xl text-stone-900 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-stone-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Lock className="size-4 text-stone-700" />
            <h2 className="font-serif text-lg font-medium text-stone-900">
              {step === "confirmed" ? "Order Confirmed" : "Quick Checkout"}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-stone-100 text-stone-500 hover:text-stone-900 transition"
          >
            <X className="size-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto">
          {step === "checkout" ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex justify-between items-baseline border-b border-stone-100 pb-3">
                <span className="text-xs text-stone-500 font-medium">Order Total:</span>
                <span className="font-serif text-xl font-bold text-stone-900">
                  {currencyConfig.symbol}{finalTotalConverted.toLocaleString()}
                </span>
              </div>

              <div>
                <label className="text-xs font-medium text-stone-700 block mb-1">Full Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-stone-50 text-xs text-stone-900 rounded-xl p-2.5 border border-stone-200 focus:outline-none focus:border-stone-400"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-medium text-stone-700 block mb-1">Email Address</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-stone-50 text-xs text-stone-900 rounded-xl p-2.5 border border-stone-200 focus:outline-none focus:border-stone-400"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-medium text-stone-700 block mb-1">Street Address</label>
                  <input
                    type="text"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full bg-stone-50 text-xs text-stone-900 rounded-xl p-2.5 border border-stone-200 focus:outline-none focus:border-stone-400"
                    required
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-stone-700 block mb-1">City</label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full bg-stone-50 text-xs text-stone-900 rounded-xl p-2.5 border border-stone-200 focus:outline-none focus:border-stone-400"
                    required
                  />
                </div>
              </div>

              <div className="pt-2 border-t border-stone-100">
                <label className="text-xs font-medium text-stone-700 block mb-1">Card Number</label>
                <input
                  type="text"
                  value={formData.cardNumber}
                  onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
                  className="w-full bg-stone-50 text-xs text-stone-900 rounded-xl p-2.5 border border-stone-200 focus:outline-none focus:border-stone-400 mb-2"
                  required
                />
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="text"
                    value={formData.expiry}
                    onChange={(e) => setFormData({ ...formData, expiry: e.target.value })}
                    placeholder="MM/YY"
                    className="w-full bg-stone-50 text-xs text-stone-900 rounded-xl p-2.5 border border-stone-200 focus:outline-none focus:border-stone-400"
                    required
                  />
                  <input
                    type="password"
                    value={formData.cvv}
                    onChange={(e) => setFormData({ ...formData, cvv: e.target.value })}
                    placeholder="CVV"
                    className="w-full bg-stone-50 text-xs text-stone-900 rounded-xl p-2.5 border border-stone-200 focus:outline-none focus:border-stone-400"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 mt-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-medium text-xs uppercase tracking-widest transition flex items-center justify-center gap-2 shadow-sm"
              >
                <span>Complete Purchase</span>
                <ArrowRight className="size-4" />
              </button>
            </form>
          ) : (
            <div className="text-center py-6 space-y-4">
              <div className="size-12 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto border border-emerald-200">
                <CheckCircle2 className="size-7" />
              </div>
              <div>
                <h3 className="font-serif text-2xl text-stone-900 font-normal">
                  Thank You for Your Order!
                </h3>
                <p className="text-xs text-stone-500 mt-1">
                  We have received your order and are preparing your fine jewelry piece.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 text-xs space-y-2 text-left">
                <div className="flex justify-between">
                  <span className="text-stone-500">Order Number:</span>
                  <span className="font-mono font-bold text-stone-900">{orderNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">Deliver To:</span>
                  <span className="text-stone-900">{formData.address}, {formData.city}</span>
                </div>
                <div className="flex justify-between font-semibold pt-1 border-t border-stone-200">
                  <span className="text-stone-700">Total:</span>
                  <span className="text-stone-900">{currencyConfig.symbol}{finalTotalConverted.toLocaleString()}</span>
                </div>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="w-full py-3 rounded-xl bg-stone-900 text-white text-xs font-medium hover:bg-stone-800 transition"
              >
                Back to Store
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
