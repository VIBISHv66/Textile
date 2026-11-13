import React from 'react';
import { CurrencyCode } from '../types';
import { CURRENCIES } from '../data/sareesData';
import { SilkImage } from './SilkImage';
import { X, Heart, ShoppingBag, ArrowRight } from 'lucide-react';

interface WishlistItem {
  id: string;
  title: string;
  subtitle?: string;
  price: number;
  image: string;
}

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: WishlistItem[];
  onRemoveItem: (id: string) => void;
  onMoveToCart: (item: WishlistItem) => void;
  currency: CurrencyCode;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onRemoveItem,
  onMoveToCart,
  currency,
}) => {
  if (!isOpen) return null;

  const curr = CURRENCIES[currency] || CURRENCIES.INR;
  const formatPrice = (p: number) => {
    const converted = Math.round(p * curr.rate);
    return `${curr.symbol}${converted.toLocaleString()}`;
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs flex justify-end">
      <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-300">
        
        <div className="p-6 border-b border-stone-200 flex items-center justify-between bg-[#FFFDF9]">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-[#E11D48] fill-[#E11D48]" />
            <h3 className="text-xl font-cinzel font-bold text-stone-900">
              Saved Silks ({items.length})
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-stone-500 hover:text-stone-900 rounded-full hover:bg-stone-200 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {items.length === 0 ? (
            <div className="py-20 text-center text-stone-500">
              <Heart className="w-12 h-12 mx-auto mb-3 opacity-30 text-[#E11D48]" />
              <p className="font-cinzel text-base font-semibold text-stone-700">No saved weaves yet</p>
              <p className="text-xs text-stone-400 mt-1">Tap the heart on any saree to save it for later.</p>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                className="p-3.5 rounded-2xl border border-stone-200 bg-stone-50/60 flex items-center gap-3"
              >
                <div className="w-16 h-20 rounded-xl overflow-hidden bg-stone-200 shrink-0 border border-stone-200">
                  <SilkImage
                    src={item.image}
                    alt={item.title}
                    label={item.title}
                    fallbackColor="#BE123C"
                    patternType="zari"
                    className="w-full h-full"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-semibold text-stone-900 truncate">
                    {item.title}
                  </h4>
                  {item.subtitle && (
                    <p className="text-[11px] text-stone-500 truncate mt-0.5">
                      {item.subtitle}
                    </p>
                  )}
                  <div className="text-xs font-mono font-bold text-[#E11D48] mt-1">
                    {formatPrice(item.price)}
                  </div>
                </div>

                <div className="flex flex-col items-end gap-2 shrink-0">
                  <button
                    onClick={() => onRemoveItem(item.id)}
                    className="text-stone-400 hover:text-red-600 text-xs cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => onMoveToCart(item)}
                    className="p-2 rounded-lg bg-gradient-to-r from-[#E11D48] to-[#F59E0B] text-white hover:opacity-95 transition-opacity cursor-pointer shadow-xs"
                    title="Move to Bag"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="p-6 border-t border-stone-200 bg-[#FFFDF9] text-center">
          <button
            onClick={onClose}
            className="w-full py-3 rounded-full border border-stone-300 text-xs font-semibold uppercase tracking-wider text-stone-700 hover:bg-stone-50 transition-colors cursor-pointer"
          >
            Continue Browsing
          </button>
        </div>

      </div>
    </div>
  );
};
