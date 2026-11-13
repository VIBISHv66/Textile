import React, { useState } from 'react';
import { CurrencyCode, CartItem, SareeDetail } from './types';
import { CurtainIntro } from './components/CurtainIntro';
import { Navbar } from './components/Navbar';
import { HeroShowroom } from './components/HeroShowroom';
import { MarqueeBanner } from './components/MarqueeBanner';
import { SixMoodsSection } from './components/SixMoodsSection';
import { TryTheLookSection } from './components/TryTheLookSection';
import { PickASilkSection } from './components/PickASilkSection';
import { RailSection } from './components/RailSection';
import { GrandSareeCollection } from './components/GrandSareeCollection';
import { FeelTheDrapeSection } from './components/FeelTheDrapeSection';
import { SilkInMotionSection } from './components/SilkInMotionSection';
import { BridalPavilionSection } from './components/BridalPavilionSection';
import { ArtisanHeritageSection } from './components/ArtisanHeritageSection';
import { SareeDetailModal } from './components/SareeDetailModal';
import { AnimatedSection } from './components/AnimatedSection';
import { CartDrawer } from './components/CartDrawer';
import { WishlistDrawer } from './components/WishlistDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { Footer } from './components/Footer';
import { audioAmbience } from './utils/audioAmbience';
import { findSareeDetails } from './data/sareesData';

export default function App() {
  const [curtainOpen, setCurtainOpen] = useState(false);
  const [currency, setCurrency] = useState<CurrencyCode>('INR');
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);

  // Saree Detail Inspection Modal State
  const [inspectedSaree, setInspectedSaree] = useState<SareeDetail | null>(null);

  // Cart State (Prepopulated with 2 items for rich instant experience)
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 'grand-saree-1',
      title: 'Swarna Kamalam Kanjivaram Brocade',
      subtitle: 'Sembaruthi Crimson & 24K Pure Gold Temple Border',
      price: 68500,
      image: '/assets/aistudio/Screenshot_2026-11-12_154726_bb7302ab.png',
      quantity: 1,
      category: 'Kanchipuram Silk',
    },
    {
      id: 'pre-look-1-blouse',
      title: 'Sembaruthi Red Raw Silk Blouse Piece',
      subtitle: 'Hand-Embroidered Zardozi & Peacock Sleeves',
      price: 12500,
      image: '/assets/aistudio/Screenshot_2026-11-12_154856_0061fafd.png',
      quantity: 1,
      category: 'Blouse',
    },
  ]);

  // Wishlist State
  const [wishlistItems, setWishlistItems] = useState<Array<{
    id: string;
    title: string;
    subtitle?: string;
    price: number;
    image: string;
  }>>([
    {
      id: 'grand-saree-4',
      title: 'Mayil Nilambari Turquoise Kanjivaram',
      subtitle: 'Mayilkan Peacock Eye Buttis · Ganga Jamuna Zari Border',
      price: 54000,
      image: '/assets/aistudio/Screenshot_2026-11-12_154758_7de3d4cd.png',
    },
  ]);

  const [cartOpen, setCartOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  // Audio Ambience
  const handleToggleAudio = () => {
    const newState = audioAmbience.toggle();
    setIsAudioPlaying(newState);
  };

  const handleReplayCurtains = () => {
    setCurtainOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleInspectSaree = (saree: SareeDetail) => {
    setInspectedSaree(saree);
  };

  const handleAddToCart = (newItem: {
    id: string;
    title: string;
    subtitle?: string;
    price: number;
    image: string;
    category?: string;
    customDetails?: string;
    quantity?: number;
  }) => {
    const addQty = newItem.quantity || 1;
    setCartItems((prev) => {
      const existing = prev.find((i) => i.id === newItem.id);
      if (existing) {
        return prev.map((i) =>
          i.id === newItem.id ? { ...i, quantity: i.quantity + addQty } : i
        );
      }
      return [...prev, { ...newItem, quantity: addQty }];
    });
    audioAmbience.playChime();
    setCartOpen(true);
  };

  const handleInstantBuy = (item: {
    id: string;
    title: string;
    subtitle?: string;
    price: number;
    image: string;
    category?: string;
    quantity?: number;
  }) => {
    handleAddToCart(item);
    setInspectedSaree(null);
    setCartOpen(false);
    setCheckoutOpen(true);
  };

  const handleToggleWishlist = (item: {
    id: string;
    title: string;
    subtitle?: string;
    price: number;
    image: string;
  }) => {
    setWishlistItems((prev) => {
      const exists = prev.some((w) => w.id === item.id);
      if (exists) {
        return prev.filter((w) => w.id !== item.id);
      } else {
        return [...prev, item];
      }
    });
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((i) => {
          if (i.id === id) {
            const nextQty = i.quantity + delta;
            return nextQty > 0 ? { ...i, quantity: nextQty } : null;
          }
          return i;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveCartItem = (id: string) => {
    setCartItems((prev) => prev.filter((i) => i.id !== id));
  };

  const handleMoveToCart = (item: {
    id: string;
    title: string;
    subtitle?: string;
    price: number;
    image: string;
  }) => {
    handleAddToCart(item);
    setWishlistItems((prev) => prev.filter((i) => i.id !== item.id));
  };

  const handleSelectMood = (_moodId: string, title: string) => {
    const detailed = findSareeDetails(title);
    setInspectedSaree(detailed);
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#FFFDF9] silk-texture-bg text-stone-900 flex flex-col font-sans selection:bg-[#E11D48] selection:text-white relative overflow-x-hidden">
      
      {/* 1. Dramatic Red Silk Royal Curtain Reveal (Matching 00:00 in video) */}
      <CurtainIntro
        isOpen={curtainOpen}
        onOpen={() => setCurtainOpen(true)}
        onReplay={handleReplayCurtains}
      />

      {/* 2. Main Top Navigation Bar */}
      <Navbar
        cartCount={cartCount}
        onOpenCart={() => setCartOpen(true)}
        wishlistCount={wishlistItems.length}
        onOpenWishlist={() => setWishlistOpen(true)}
        currency={currency}
        onCurrencyChange={setCurrency}
        isAudioPlaying={isAudioPlaying}
        onToggleAudio={handleToggleAudio}
        onReplayCurtain={handleReplayCurtains}
      />

      {/* 3. Hero Showroom: Woven for the Divine */}
      <HeroShowroom
        onExploreRail={() => scrollToSection('the-rail')}
        onTryLook={() => scrollToSection('try-the-look')}
        onInspectHeroSaree={() => handleInspectSaree(findSareeDetails('Maharani Fuchsia'))}
      />

      {/* 4. Luxury Marquee Ticker */}
      <MarqueeBanner variant="crimson" />

      {/* 5. Six Moods Section (Scroll Slide-In from Left) */}
      <AnimatedSection direction="left">
        <SixMoodsSection
          currency={currency}
          onSelectMood={handleSelectMood}
          onInspectSaree={handleInspectSaree}
        />
      </AnimatedSection>

      {/* 6. Try the Look (Scroll Slide-In from Right) */}
      <AnimatedSection direction="right">
        <TryTheLookSection
          currency={currency}
          onAddToCart={handleAddToCart}
          onInspectSaree={handleInspectSaree}
        />
      </AnimatedSection>

      {/* 7. Pick a Silk Swatches (Scroll Slide-In from Left) */}
      <AnimatedSection direction="left">
        <PickASilkSection
          currency={currency}
          onAddToCart={handleAddToCart}
          onInspectSaree={handleInspectSaree}
        />
      </AnimatedSection>

      {/* 8. Every silk, on the rail (Matching Video & Screenshot image_5872927a.png) */}
      <AnimatedSection direction="right">
        <RailSection
          currency={currency}
          onAddToCart={handleAddToCart}
          onInspectSaree={handleInspectSaree}
          isAudioPlaying={isAudioPlaying}
          onToggleAudio={handleToggleAudio}
        />
      </AnimatedSection>

      {/* 9. The Grand Saree Collection (24+ Sarees, live filters, search, quick add & inspect) */}
      <AnimatedSection direction="left">
        <GrandSareeCollection
          currency={currency}
          onAddToCart={handleAddToCart}
          onInspectSaree={handleInspectSaree}
          onToggleWishlist={handleToggleWishlist}
          wishlistIds={wishlistItems.map((w) => w.id)}
        />
      </AnimatedSection>

      {/* 10. Feel the drape (Cinematic Video & Tactile Pleat Controls) */}
      <AnimatedSection direction="right">
        <FeelTheDrapeSection
          currency={currency}
          onAddToCart={handleAddToCart}
          onInspectSaree={handleInspectSaree}
        />
      </AnimatedSection>

      {/* 11. Silk, in motion (Vertical Story Reels Carousel & Player) */}
      <AnimatedSection direction="left">
        <SilkInMotionSection
          currency={currency}
          onAddToCart={handleAddToCart}
          onInspectSaree={handleInspectSaree}
        />
      </AnimatedSection>

      {/* 12. The Bridal Collection (Arched Pavilions & Concierge) */}
      <AnimatedSection direction="right">
        <BridalPavilionSection
          currency={currency}
          onAddToCart={handleAddToCart}
          onInspectSaree={handleInspectSaree}
        />
      </AnimatedSection>

      {/* 13. The Master Handloom & Artisan Legacy (Extra rich content, topics & user photos) */}
      <AnimatedSection direction="left">
        <ArtisanHeritageSection
          currency={currency}
          onInspectSaree={handleInspectSaree}
        />
      </AnimatedSection>

      {/* 14. Secondary Marquee Accent */}
      <MarqueeBanner variant="gold" />

      {/* 14. Luxury Footer */}
      <Footer onReplayCurtain={handleReplayCurtains} />

      {/* Universal Saree Detailed Inspection Modal */}
      <SareeDetailModal
        saree={inspectedSaree}
        currency={currency}
        isOpen={!!inspectedSaree}
        onClose={() => setInspectedSaree(null)}
        onAddToCart={handleAddToCart}
        onInstantBuy={handleInstantBuy}
        onToggleWishlist={handleToggleWishlist}
        isWishlisted={inspectedSaree ? wishlistItems.some((w) => w.id === inspectedSaree.id) : false}
      />

      {/* Slide-Over Bag Drawer */}
      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveCartItem}
        currency={currency}
        onProceedToCheckout={() => {
          setCartOpen(false);
          setCheckoutOpen(true);
        }}
      />

      {/* Wishlist Drawer */}
      <WishlistDrawer
        isOpen={wishlistOpen}
        onClose={() => setWishlistOpen(false)}
        items={wishlistItems}
        onRemoveItem={(id) => setWishlistItems((prev) => prev.filter((i) => i.id !== id))}
        onMoveToCart={handleMoveToCart}
        currency={currency}
      />

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
        items={cartItems}
        currency={currency}
        onClearCart={() => setCartItems([])}
      />

    </div>
  );
}
