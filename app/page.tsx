"use client";

import React, { useState } from "react";
import { Header } from "@/components/jewelry/Header";
import { Hero } from "@/components/jewelry/Hero";
import { ProductGrid } from "@/components/jewelry/ProductGrid";
import { QuickViewModal } from "@/components/jewelry/QuickViewModal";
import { WishlistDrawer } from "@/components/jewelry/WishlistDrawer";
import { ShowroomBookingModal } from "@/components/jewelry/ShowroomBookingModal";
import { CraftsmanshipSection } from "@/components/jewelry/CraftsmanshipSection";
import { ReviewsSection } from "@/components/jewelry/ReviewsSection";
import { Footer } from "@/components/jewelry/Footer";
import { Product, Currency, JEWELRY_PRODUCTS, ShowroomBooking } from "@/lib/jewelry-data";
import { Check, Heart, MapPin } from "lucide-react";

export default function JewelryStorePage() {
  const [currency, setCurrency] = useState<Currency>("USD");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Wishlist State (pre-populate with 1 favorite piece)
  const [wishlist, setWishlist] = useState<Product[]>([JEWELRY_PRODUCTS[1]]);

  // Modals & Drawers state
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);

  // Showroom Booking State
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingProduct, setBookingProduct] = useState<Product | null>(null);
  const [bookingMetal, setBookingMetal] = useState<string | undefined>(undefined);
  const [bookingSize, setBookingSize] = useState<string | number | undefined>(undefined);

  // Minimal Toast Notification
  const [toastMessage, setToastMessage] = useState<{
    text: string;
    icon?: "check" | "heart" | "map";
  } | null>(null);

  const showToast = (text: string, icon: "check" | "heart" | "map" = "check") => {
    setToastMessage({ text, icon });
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Showroom Booking Trigger
  const handleOpenBooking = (
    product?: Product | null,
    selectedMetal?: string,
    selectedSize?: string | number
  ) => {
    setBookingProduct(product || null);
    setBookingMetal(selectedMetal);
    setBookingSize(selectedSize);
    setIsBookingOpen(true);
  };

  // Wishlist Handlers
  const handleToggleWishlist = (product: Product) => {
    const exists = wishlist.some((w) => w.id === product.id);
    if (exists) {
      setWishlist((prev) => prev.filter((w) => w.id !== product.id));
      showToast(`Removed from wishlist.`, "check");
    } else {
      setWishlist((prev) => [...prev, product]);
      showToast(`Saved to wishlist.`, "heart");
    }
  };

  const scrollToCatalog = () => {
    const el = document.getElementById("catalog-section");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-stone-900 flex flex-col font-sans selection:bg-amber-200 selection:text-amber-950">
      {/* Header */}
      <Header
        wishlistCount={wishlist.length}
        currentCurrency={currency}
        onCurrencyChange={setCurrency}
        onOpenBooking={() => handleOpenBooking()}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

      {/* Main Content */}
      <main className="flex-1">
        {/* Minimal Catchy Hero */}
        <Hero
          onExploreClick={scrollToCatalog}
          onSelectCategory={(cat) => setSelectedCategory(cat)}
          onOpenBooking={() => handleOpenBooking()}
        />

        {/* Product Catalog Grid & Minimal Category Filter */}
        <ProductGrid
          products={JEWELRY_PRODUCTS}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          currency={currency}
          wishlist={wishlist}
          onToggleWishlist={handleToggleWishlist}
          onQuickView={(prod) => setQuickViewProduct(prod)}
          onBookShowroom={(prod, metal) => handleOpenBooking(prod, metal)}
          searchQuery={searchQuery}
          onClearSearch={() => setSearchQuery("")}
        />

        {/* Savoir-Faire & Craftsmanship Heritage */}
        <CraftsmanshipSection />

        {/* Patron Reviews & Atelier Invitations */}
        <ReviewsSection />
      </main>

      {/* Minimal Footer */}
      <Footer onSelectCategory={setSelectedCategory} />

      {/* Quick View Modal */}
      <QuickViewModal
        product={quickViewProduct}
        currency={currency}
        isOpen={Boolean(quickViewProduct)}
        onClose={() => setQuickViewProduct(null)}
        onBookShowroom={(prod, metal, size) => handleOpenBooking(prod, metal, size)}
      />

      {/* Wishlist Drawer */}
      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlist={wishlist}
        currency={currency}
        onRemoveFromWishlist={(prod) =>
          setWishlist((prev) => prev.filter((w) => w.id !== prod.id))
        }
        onBookShowroom={(prod) => handleOpenBooking(prod, prod.metal, prod.sizes?.[0])}
      />

      {/* Showroom Booking Modal */}
      <ShowroomBookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        product={bookingProduct}
        selectedMetal={bookingMetal}
        selectedSize={bookingSize}
        currency={currency}
        onBookingSuccess={(booking: ShowroomBooking) => {
          showToast(`Viewing booked at ${booking.showroomName}`, "map");
        }}
      />

      {/* Minimal Floating Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 animate-in fade-in slide-in-from-bottom-2 duration-200">
          <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-stone-900 text-white text-xs shadow-lg">
            {toastMessage.icon === "heart" ? (
              <Heart className="size-3.5 text-rose-400 fill-rose-400 shrink-0" />
            ) : toastMessage.icon === "map" ? (
              <MapPin className="size-3.5 text-amber-300 shrink-0" />
            ) : (
              <Check className="size-3.5 text-emerald-400 shrink-0" />
            )}
            <span>{toastMessage.text}</span>
          </div>
        </div>
      )}
    </div>
  );
}
