"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  X,
  MapPin,
  Calendar,
  Clock,
  CheckCircle2,
  Sparkles,
  Phone,
  ShieldCheck,
  ChevronRight,
  User,
  Mail,
  MessageSquare,
} from "lucide-react";
import {
  Product,
  Currency,
  CURRENCIES,
  SHOWROOMS,
  Showroom,
  ShowroomBooking,
} from "@/lib/jewelry-data";

interface ShowroomBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  product?: Product | null;
  selectedMetal?: string;
  selectedSize?: string | number;
  currency: Currency;
  onBookingSuccess?: (booking: ShowroomBooking) => void;
}

export function ShowroomBookingModal({
  isOpen,
  onClose,
  product,
  selectedMetal,
  selectedSize,
  currency,
  onBookingSuccess,
}: ShowroomBookingModalProps) {
  const [selectedShowroom, setSelectedShowroom] = useState<Showroom>(SHOWROOMS[0]);
  const [cityFilter, setCityFilter] = useState<string>("All");

  // Generate next 5 available dates
  const availableDates = React.useMemo(() => {
    const list = [];
    const today = new Date();
    for (let i = 0; i < 6; i++) {
      const d = new Date();
      d.setDate(today.getDate() + i);
      const dayName = i === 0 ? "Today" : i === 1 ? "Tomorrow" : d.toLocaleDateString("en-US", { weekday: "short" });
      const monthDate = d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
      const fullDateStr = d.toISOString().split("T")[0];
      list.push({ dayName, monthDate, fullDateStr });
    }
    return list;
  }, []);

  const timeSlots = [
    "11:00 AM",
    "12:30 PM",
    "02:00 PM",
    "03:30 PM",
    "05:00 PM",
    "06:30 PM",
  ];

  const consultationTypes = [
    {
      id: "vip_suite",
      title: "VIP Private Try-on Suite",
      description: "Dedicated salon, champagne service, and 1-on-1 private viewing.",
    },
    {
      id: "bespoke_sizing",
      title: "Bridal & Custom Sizing Consultation",
      description: "Precision ring sizing, wedding band pairing, and bespoke engravings.",
    },
    {
      id: "gemstone_sourcing",
      title: "Rare Diamond & Gemstone Preview",
      description: "Inspect certified stones under magnification with our master gemologist.",
    },
  ];

  const [selectedDate, setSelectedDate] = useState<string>(availableDates[0].fullDateStr);
  const [selectedTime, setSelectedTime] = useState<string>(timeSlots[1]);
  const [selectedConsultation, setSelectedConsultation] = useState<string>("vip_suite");

  // Form Fields
  const [guestName, setGuestName] = useState("");
  const [guestEmail, setGuestEmail] = useState("");
  const [guestPhone, setGuestPhone] = useState("");
  const [notes, setNotes] = useState("");

  const [bookingConfirmed, setBookingConfirmed] = useState<ShowroomBooking | null>(null);

  // Close on escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  // Reset or initialize on open
  useEffect(() => {
    if (isOpen) {
      setBookingConfirmed(null);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const currencyConfig = CURRENCIES[currency];
  const convertedPrice = product ? Math.round(product.price * currencyConfig.rate) : 0;

  const filteredShowrooms =
    cityFilter === "All"
      ? SHOWROOMS
      : SHOWROOMS.filter((s) => s.city.toLowerCase() === cityFilter.toLowerCase());

  const handleConfirmBooking = (e: React.FormEvent) => {
    e.preventDefault();
    const newBooking: ShowroomBooking = {
      id: `AUR-SHW-${Math.floor(100000 + Math.random() * 900000)}`,
      product: product || undefined,
      selectedMetal: selectedMetal || (product ? product.metal : undefined),
      selectedSize: selectedSize || (product?.sizes ? product.sizes[0] : undefined),
      showroomId: selectedShowroom.id,
      showroomName: selectedShowroom.name,
      showroomAddress: selectedShowroom.address,
      date: selectedDate,
      timeSlot: selectedTime,
      consultationType:
        consultationTypes.find((c) => c.id === selectedConsultation)?.title ||
        "VIP Private Try-on Suite",
      customerName: guestName.trim() || "Guest Patron",
      customerEmail: guestEmail.trim() || "patron@aurelia.com",
      customerPhone: guestPhone.trim() || "+1 (555) 012-3456",
      specialRequests: notes,
    };

    setBookingConfirmed(newBooking);
    if (onBookingSuccess) {
      onBookingSuccess(newBooking);
    }
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-stone-950/70 backdrop-blur-xs animate-in fade-in duration-200 overflow-y-auto"
    >
      <div
        className="relative w-full max-w-3xl bg-white border border-stone-200 rounded-3xl overflow-hidden shadow-2xl text-stone-900 my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="bg-[#FAF8F5] border-b border-stone-200/80 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="size-8 rounded-full bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-800">
              <MapPin className="size-4" />
            </div>
            <div>
              <h2 className="font-serif text-lg font-normal text-stone-900 leading-tight">
                {bookingConfirmed ? "Showroom Appointment Confirmed" : "Book Showroom Viewing"}
              </h2>
              <p className="text-[11px] text-stone-500">
                Experience exceptional craftsmanship at an AURÉLIA boutique near you
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-stone-200/70 text-stone-500 hover:text-stone-900 transition"
            aria-label="Close modal"
          >
            <X className="size-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="max-h-[80vh] overflow-y-auto p-5 sm:p-7 space-y-6">
          {bookingConfirmed ? (
            /* Confirmation View */
            <div className="text-center py-4 space-y-6 animate-in zoom-in-95 duration-200">
              <div className="size-16 rounded-full bg-emerald-50 border-2 border-emerald-500 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
                <CheckCircle2 className="size-9" />
              </div>

              <div className="space-y-1">
                <span className="text-[11px] uppercase tracking-widest font-semibold text-amber-800">
                  Priority VIP Reservation
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl text-stone-900 font-normal">
                  We look forward to welcoming you
                </h3>
                <p className="text-xs text-stone-500 max-w-md mx-auto">
                  A dedicated master gemologist has been assigned to prepare your private viewing suite.
                </p>
              </div>

              {/* Reservation Summary Card */}
              <div className="max-w-lg mx-auto bg-[#FAF8F5] border border-amber-200/80 rounded-2xl p-5 text-left space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-stone-200/80">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-stone-400 font-semibold block">
                      Booking Reference
                    </span>
                    <span className="font-mono font-bold text-sm text-stone-900">
                      {bookingConfirmed.id}
                    </span>
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wide bg-emerald-100 text-emerald-800 border border-emerald-300">
                    Confirmed
                  </span>
                </div>

                {/* Showroom & Time details */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-stone-400 text-[11px] block">Showroom Location</span>
                    <strong className="text-stone-900 font-semibold block mt-0.5">
                      {bookingConfirmed.showroomName}
                    </strong>
                    <span className="text-stone-500 text-[11px] block mt-0.5">
                      {bookingConfirmed.showroomAddress}
                    </span>
                  </div>
                  <div>
                    <span className="text-stone-400 text-[11px] block">Appointment Time</span>
                    <strong className="text-stone-900 font-semibold block mt-0.5">
                      {bookingConfirmed.date} • {bookingConfirmed.timeSlot}
                    </strong>
                    <span className="text-stone-500 text-[11px] block mt-0.5">
                      {bookingConfirmed.consultationType}
                    </span>
                  </div>
                </div>

                {/* Piece Reserved (if any) */}
                {bookingConfirmed.product && (
                  <div className="pt-3 border-t border-stone-200/80 flex items-center gap-3">
                    <div className="relative size-12 rounded-xl overflow-hidden bg-white shrink-0 border border-stone-200">
                      <Image
                        src={bookingConfirmed.product.image}
                        alt={bookingConfirmed.product.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="text-xs">
                      <span className="text-stone-400 text-[10px] block uppercase tracking-wider font-semibold">
                        Reserved for Try-On
                      </span>
                      <strong className="text-stone-900 font-medium block">
                        {bookingConfirmed.product.name}
                      </strong>
                      <span className="text-amber-800 text-[11px]">
                        {bookingConfirmed.selectedMetal || bookingConfirmed.product.metal}
                        {bookingConfirmed.selectedSize ? ` • Size ${bookingConfirmed.selectedSize}` : ""}
                      </span>
                    </div>
                  </div>
                )}

                {/* Guest details note */}
                <div className="pt-2 text-[11px] text-stone-500 flex items-center gap-2">
                  <ShieldCheck className="size-4 text-emerald-600 shrink-0" />
                  <span>
                    Confirmation sent to <strong>{bookingConfirmed.customerEmail}</strong> and SMS to{" "}
                    <strong>{bookingConfirmed.customerPhone}</strong>.
                  </span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <button
                  onClick={onClose}
                  className="w-full sm:w-auto px-7 py-3 rounded-full bg-stone-900 text-white hover:bg-stone-800 text-xs font-semibold uppercase tracking-wider transition"
                >
                  Return to Collection
                </button>
              </div>
            </div>
          ) : (
            /* Booking Form */
            <form onSubmit={handleConfirmBooking} className="space-y-6">
              {/* Product Info Banner (if a specific product is being booked) */}
              {product && (
                <div className="flex items-center gap-4 p-4 rounded-2xl bg-[#FAF8F5] border border-amber-200/80">
                  <div className="relative size-16 rounded-xl overflow-hidden bg-white shrink-0 border border-stone-200">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover object-center"
                    />
                  </div>
                  <div className="flex-1">
                    <span className="text-[10px] uppercase tracking-wider text-amber-800 font-semibold block">
                      Piece Selected for Showroom Try-On
                    </span>
                    <h4 className="font-serif text-sm sm:text-base font-normal text-stone-900 line-clamp-1">
                      {product.name}
                    </h4>
                    <div className="flex items-center gap-2 text-xs text-stone-600 mt-0.5">
                      <span>{selectedMetal || product.metal}</span>
                      {selectedSize && <span>• Size {selectedSize}</span>}
                      <span className="font-medium text-stone-900 font-serif">
                        • {currencyConfig.symbol}{convertedPrice.toLocaleString()}
                      </span>
                    </div>
                  </div>
                  <div className="hidden sm:block text-right">
                    <span className="inline-flex items-center gap-1 text-[11px] text-amber-800 font-medium bg-amber-100/70 px-2.5 py-1 rounded-full">
                      <Sparkles className="size-3 text-amber-700" />
                      In Boutique Vault
                    </span>
                  </div>
                </div>
              )}

              {/* Step 1: Select Nearby Showroom */}
              <div className="space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <label className="text-xs font-semibold uppercase tracking-wider text-stone-800 flex items-center gap-1.5">
                    <MapPin className="size-3.5 text-amber-700" />
                    <span>1. Select Showroom Location</span>
                  </label>

                  {/* City Filter Pills */}
                  <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0">
                    {["All", "New York", "London", "Paris", "Mumbai", "Los Angeles", "Dubai"].map(
                      (city) => (
                        <button
                          key={city}
                          type="button"
                          onClick={() => setCityFilter(city)}
                          className={`px-2.5 py-1 rounded-full text-[11px] font-medium transition whitespace-nowrap ${
                            cityFilter === city
                              ? "bg-stone-900 text-white"
                              : "bg-stone-100 text-stone-600 hover:bg-stone-200"
                          }`}
                        >
                          {city}
                        </button>
                      )
                    )}
                  </div>
                </div>

                {/* Showroom Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {filteredShowrooms.map((showroom) => {
                    const isSelected = selectedShowroom.id === showroom.id;
                    return (
                      <div
                        key={showroom.id}
                        onClick={() => setSelectedShowroom(showroom)}
                        className={`p-3.5 rounded-2xl border text-left cursor-pointer transition-all ${
                          isSelected
                            ? "bg-amber-50/70 border-amber-600 ring-1 ring-amber-600 shadow-sm"
                            : "bg-white border-stone-200 hover:border-stone-300 hover:bg-stone-50/50"
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <div>
                            <span className="text-[10px] uppercase tracking-wider font-semibold text-amber-800 block">
                              {showroom.city}, {showroom.country}
                            </span>
                            <h5 className="font-serif text-xs sm:text-sm font-semibold text-stone-900 mt-0.5">
                              {showroom.name}
                            </h5>
                          </div>
                          <div
                            className={`size-4 rounded-full border flex items-center justify-center ${
                              isSelected
                                ? "border-amber-600 bg-amber-600 text-white"
                                : "border-stone-300"
                            }`}
                          >
                            {isSelected && <div className="size-1.5 bg-white rounded-full" />}
                          </div>
                        </div>

                        <p className="text-[11px] text-stone-600 mt-1 line-clamp-1">
                          {showroom.address}
                        </p>

                        <div className="flex items-center gap-1.5 mt-2 text-[10px] text-stone-500">
                          <Clock className="size-3 text-stone-400 shrink-0" />
                          <span className="truncate">{showroom.hours}</span>
                        </div>

                        <div className="flex items-center gap-1.5 mt-1 text-[10px] text-stone-500">
                          <Phone className="size-3 text-stone-400 shrink-0" />
                          <span>{showroom.phone}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Step 2: Date & Time Selection */}
              <div className="space-y-3 pt-2 border-t border-stone-100">
                <label className="text-xs font-semibold uppercase tracking-wider text-stone-800 flex items-center gap-1.5">
                  <Calendar className="size-3.5 text-amber-700" />
                  <span>2. Preferred Date & Time</span>
                </label>

                {/* Date options */}
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                  {availableDates.map((item) => {
                    const isSelected = selectedDate === item.fullDateStr;
                    return (
                      <button
                        key={item.fullDateStr}
                        type="button"
                        onClick={() => setSelectedDate(item.fullDateStr)}
                        className={`py-2 px-1 rounded-xl border text-center transition ${
                          isSelected
                            ? "bg-stone-900 text-white border-stone-900 shadow-xs"
                            : "bg-white border-stone-200 text-stone-700 hover:border-stone-300"
                        }`}
                      >
                        <span className="block text-[10px] uppercase tracking-wider opacity-80">
                          {item.dayName}
                        </span>
                        <span className="block text-xs font-bold mt-0.5">
                          {item.monthDate}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Time slot chips */}
                <div className="flex flex-wrap gap-2 pt-1">
                  {timeSlots.map((slot) => {
                    const isSelected = selectedTime === slot;
                    return (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => setSelectedTime(slot)}
                        className={`px-3 py-1.5 rounded-lg border text-xs font-medium transition ${
                          isSelected
                            ? "bg-amber-100 border-amber-600 text-amber-950 font-semibold"
                            : "bg-stone-50 border-stone-200 text-stone-600 hover:border-stone-300"
                        }`}
                      >
                        {slot}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Step 3: Consultation Experience Type */}
              <div className="space-y-2.5 pt-2 border-t border-stone-100">
                <label className="text-xs font-semibold uppercase tracking-wider text-stone-800 flex items-center gap-1.5">
                  <Sparkles className="size-3.5 text-amber-700" />
                  <span>3. Experience Type</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {consultationTypes.map((c) => {
                    const isSelected = selectedConsultation === c.id;
                    return (
                      <div
                        key={c.id}
                        onClick={() => setSelectedConsultation(c.id)}
                        className={`p-3 rounded-xl border cursor-pointer transition ${
                          isSelected
                            ? "bg-stone-900 text-white border-stone-900"
                            : "bg-white border-stone-200 text-stone-800 hover:border-stone-300"
                        }`}
                      >
                        <strong className="block text-xs font-serif font-medium leading-tight">
                          {c.title}
                        </strong>
                        <p
                          className={`text-[10px] mt-1 leading-snug ${
                            isSelected ? "text-stone-300" : "text-stone-500"
                          }`}
                        >
                          {c.description}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Step 4: Contact & Concierge Information */}
              <div className="space-y-3 pt-2 border-t border-stone-100">
                <label className="text-xs font-semibold uppercase tracking-wider text-stone-800 flex items-center gap-1.5">
                  <User className="size-3.5 text-amber-700" />
                  <span>4. Patron Details</span>
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="text-[11px] text-stone-600 font-medium block mb-1">
                      Full Name *
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-2.5 size-3.5 text-stone-400" />
                      <input
                        type="text"
                        required
                        value={guestName}
                        onChange={(e) => setGuestName(e.target.value)}
                        placeholder="e.g. Victoria Sterling"
                        className="w-full pl-8 pr-3 py-2 rounded-xl border border-stone-200 text-xs focus:outline-none focus:border-amber-600"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] text-stone-600 font-medium block mb-1">
                      Email Address *
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-2.5 size-3.5 text-stone-400" />
                      <input
                        type="email"
                        required
                        value={guestEmail}
                        onChange={(e) => setGuestEmail(e.target.value)}
                        placeholder="e.g. v.sterling@example.com"
                        className="w-full pl-8 pr-3 py-2 rounded-xl border border-stone-200 text-xs focus:outline-none focus:border-amber-600"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] text-stone-600 font-medium block mb-1">
                      Mobile / WhatsApp *
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-2.5 size-3.5 text-stone-400" />
                      <input
                        type="tel"
                        required
                        value={guestPhone}
                        onChange={(e) => setGuestPhone(e.target.value)}
                        placeholder="e.g. +1 (555) 234-5678"
                        className="w-full pl-8 pr-3 py-2 rounded-xl border border-stone-200 text-xs focus:outline-none focus:border-amber-600"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="text-[11px] text-stone-600 font-medium block mb-1">
                    Special Requests (Optional)
                  </label>
                  <div className="relative">
                    <MessageSquare className="absolute left-3 top-2.5 size-3.5 text-stone-400" />
                    <input
                      type="text"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="e.g. Surprise proposal planning, champagne preference, specific diamond clarity"
                      className="w-full pl-8 pr-3 py-2 rounded-xl border border-stone-200 text-xs focus:outline-none focus:border-amber-600"
                    />
                  </div>
                </div>
              </div>

              {/* Submit CTA */}
              <div className="pt-4 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-[11px] text-stone-500 flex items-center gap-1.5">
                  <ShieldCheck className="size-4 text-amber-700 shrink-0" />
                  <span>
                    No obligation • Complimentary private viewing & master consultation
                  </span>
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-stone-900 hover:bg-stone-800 text-white font-medium text-xs uppercase tracking-widest transition flex items-center justify-center gap-2 shadow-sm"
                >
                  <span>Confirm Showroom Appointment</span>
                  <ChevronRight className="size-3.5" />
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
