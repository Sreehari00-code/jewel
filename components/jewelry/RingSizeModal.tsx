"use client";

import React, { useState } from "react";
import { X, HelpCircle, Check, Ruler } from "lucide-react";

interface RingSizeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function RingSizeModal({ isOpen, onClose }: RingSizeModalProps) {
  const [circumference, setCircumference] = useState<number>(54);

  if (!isOpen) return null;

  // Approximate sizing formula
  const getRingSize = (mm: number) => {
    if (mm < 50) return { us: "4.5", uk: "I 1/2", eu: "48", dia: "15.3" };
    if (mm < 52) return { us: "5", uk: "J 1/2", eu: "50", dia: "15.7" };
    if (mm < 54) return { us: "6", uk: "L 1/2", eu: "52", dia: "16.5" };
    if (mm < 56) return { us: "7", uk: "N 1/2", eu: "54", dia: "17.3" };
    if (mm < 58) return { us: "8", uk: "P 1/2", eu: "57", dia: "18.1" };
    if (mm < 60) return { us: "9", uk: "R 1/2", eu: "59", dia: "18.9" };
    return { us: "10", uk: "T 1/2", eu: "62", dia: "19.8" };
  };

  const currentSize = getRingSize(circumference);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-xl bg-[#12100e] border border-amber-500/30 rounded-3xl overflow-hidden shadow-2xl text-zinc-100 flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-amber-500/15 flex items-center justify-between bg-[#171411]">
          <div className="flex items-center gap-2">
            <Ruler className="size-4 text-amber-400" />
            <h2 className="font-serif text-lg font-normal text-amber-100">
              Atelier Ring Size & Measurement Guide
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/5 text-zinc-400 hover:text-white transition"
          >
            <X className="size-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
          {/* Interactive Finger Circumference Slider */}
          <div className="bg-[#181512] p-5 rounded-2xl border border-amber-500/20">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs uppercase tracking-wider text-amber-300 font-medium">
                Interactive Finger Circumference:
              </span>
              <span className="font-serif text-lg text-amber-200 font-bold">{circumference} mm</span>
            </div>

            <input
              type="range"
              min={48}
              max={62}
              step={0.5}
              value={circumference}
              onChange={(e) => setCircumference(parseFloat(e.target.value))}
              className="w-full accent-amber-400 cursor-pointer h-2 bg-zinc-700 rounded-lg"
            />

            {/* Live Size Results Card */}
            <div className="grid grid-cols-4 gap-2 text-center mt-5 pt-4 border-t border-white/5">
              <div className="bg-black/40 p-2.5 rounded-xl border border-white/5">
                <span className="text-[10px] text-zinc-500 uppercase block">US Size</span>
                <span className="text-base font-serif font-bold text-amber-300">{currentSize.us}</span>
              </div>
              <div className="bg-black/40 p-2.5 rounded-xl border border-white/5">
                <span className="text-[10px] text-zinc-500 uppercase block">UK / AU</span>
                <span className="text-base font-serif font-bold text-zinc-200">{currentSize.uk}</span>
              </div>
              <div className="bg-black/40 p-2.5 rounded-xl border border-white/5">
                <span className="text-[10px] text-zinc-500 uppercase block">EU Standard</span>
                <span className="text-base font-serif font-bold text-zinc-200">{currentSize.eu}</span>
              </div>
              <div className="bg-black/40 p-2.5 rounded-xl border border-white/5">
                <span className="text-[10px] text-zinc-500 uppercase block">Diameter</span>
                <span className="text-base font-serif font-bold text-zinc-200">{currentSize.dia} mm</span>
              </div>
            </div>
          </div>

          {/* Simple 3-Step Measurement Tips */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-wider text-amber-300 font-semibold">
              How to Measure at Home with Precision
            </h4>
            <div className="space-y-2 text-xs text-zinc-300">
              <div className="flex gap-2.5">
                <span className="size-5 rounded-full bg-amber-500/20 text-amber-300 font-bold flex items-center justify-center shrink-0 text-[10px]">
                  1
                </span>
                <p>Wrap a piece of non-stretchy string or ribbon comfortably around the base of your finger.</p>
              </div>
              <div className="flex gap-2.5">
                <span className="size-5 rounded-full bg-amber-500/20 text-amber-300 font-bold flex items-center justify-center shrink-0 text-[10px]">
                  2
                </span>
                <p>Mark where the string overlaps with a fine pen and measure the flat length in millimeters.</p>
              </div>
              <div className="flex gap-2.5">
                <span className="size-5 rounded-full bg-amber-500/20 text-amber-300 font-bold flex items-center justify-center shrink-0 text-[10px]">
                  3
                </span>
                <p>Use the slider above to see your exact US ring size. When between sizes, order the larger size.</p>
              </div>
            </div>
          </div>

          {/* Atelier Guarantee */}
          <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-200 flex items-start gap-2.5">
            <Check className="size-4 text-amber-400 shrink-0 mt-0.5" />
            <span>
              <strong>Complimentary 60-Day Atelier Resizing:</strong> If your piece doesn't fit like a dream, our master goldsmiths will resize it free of charge with insured round-trip postage.
            </span>
          </div>

          <button
            onClick={onClose}
            className="w-full py-3.5 rounded-xl bg-amber-400 text-black font-semibold text-xs uppercase tracking-wider hover:brightness-110 transition"
          >
            Got It, Back to Shopping
          </button>
        </div>
      </div>
    </div>
  );
}
