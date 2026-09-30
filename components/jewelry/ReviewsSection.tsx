"use client";

import React, { useState } from "react";
import { Star, ShieldCheck, Mail, Sparkles, Check, ArrowRight } from "lucide-react";
import { CLIENT_REVIEWS } from "@/lib/jewelry-data";

export function ReviewsSection() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
  };

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Testimonials Header */}
      <div className="text-center max-w-2xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.25em] text-amber-400 uppercase mb-3">
          <Star className="size-3.5 fill-amber-400 text-amber-400" />
          <span>Atelier Patron Testimonials</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl font-light text-white mb-4">
          Celebrated by Connoisseurs
        </h2>
        <p className="text-zinc-400 text-sm font-light">
          Treasured in private collections across Geneva, London, New York, and Paris.
        </p>
      </div>

      {/* Reviews Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
        {CLIENT_REVIEWS.map((rev) => (
          <div
            key={rev.id}
            className="p-8 rounded-3xl bg-[#141210] border border-amber-500/20 flex flex-col justify-between hover:border-amber-400/40 transition-all duration-300"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex text-amber-400">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="size-4 fill-amber-400" />
                  ))}
                </div>
                <div className="flex items-center gap-1 text-[11px] text-emerald-400">
                  <ShieldCheck className="size-3.5" />
                  <span>Verified Patron</span>
                </div>
              </div>

              <h4 className="font-serif text-base text-amber-100 font-medium mb-3">
                "{rev.title}"
              </h4>

              <p className="text-xs sm:text-sm text-zinc-300 font-light leading-relaxed mb-6 italic">
                "{rev.comment}"
              </p>
            </div>

            <div className="pt-4 border-t border-white/5">
              <div className="text-xs font-semibold text-white">{rev.author}</div>
              <div className="text-[11px] text-zinc-400">{rev.location}</div>
              <div className="text-[10px] text-amber-300/80 font-serif mt-1">Acquisition: {rev.piece}</div>
            </div>
          </div>
        ))}
      </div>

      {/* VIP Atelier Newsletter Club */}
      <div className="rounded-3xl bg-gradient-to-br from-[#1a1612] via-[#241e16] to-[#161310] border border-amber-500/30 p-8 sm:p-12 text-center relative overflow-hidden">
        <div className="max-w-2xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 p-2 rounded-full bg-amber-500/10 text-amber-300 text-xs font-medium border border-amber-500/20 mb-4">
            <Sparkles className="size-3.5" />
            <span>Exclusive Atelier Invitations</span>
          </div>

          <h3 className="font-serif text-2xl sm:text-4xl text-white font-normal mb-3">
            Join the AURÉLIA Circle
          </h3>
          <p className="text-zinc-300 text-xs sm:text-sm font-light max-w-md mx-auto mb-8">
            Receive private allocations of rare gemstones, invitations to salon unveilings, and 10% privilege on your first acquisition.
          </p>

          {subscribed ? (
            <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-200 inline-flex items-center gap-2 text-sm animate-in zoom-in">
              <Check className="size-5 text-emerald-400" />
              <span>Welcome to the Atelier Circle. Present code <strong className="text-amber-300">LUXE10</strong> during your showroom appointment for 10% acquisition privilege.</span>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <div className="relative flex-1">
                <Mail className="absolute left-4 top-3.5 size-4 text-zinc-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your confidential email..."
                  required
                  className="w-full bg-[#110f0d] text-xs text-amber-100 placeholder:text-zinc-500 rounded-full pl-11 pr-4 py-3.5 border border-white/10 focus:border-amber-400 focus:outline-none"
                />
              </div>
              <button
                type="submit"
                className="px-6 py-3.5 rounded-full bg-amber-400 text-black text-xs font-semibold uppercase tracking-wider hover:brightness-110 transition shadow-lg shadow-amber-400/20 flex items-center justify-center gap-2 shrink-0"
              >
                <span>Request Access</span>
                <ArrowRight className="size-3.5" />
              </button>
            </form>
          )}

          <p className="text-[10px] text-zinc-500 mt-4 tracking-wider">
            We honor your privacy strictly. Unsubscribe at your pleasure with one click.
          </p>
        </div>
      </div>
    </section>
  );
}
