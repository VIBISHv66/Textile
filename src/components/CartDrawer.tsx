import React, { useState } from 'react';
import { CartItem, CurrencyCode } from '../types';
import { CURRENCIES } from '../data/sareesData';
import { SilkImage } from './SilkImage';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, ShieldCheck, Tag } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  currency: CurrencyCode;
  onProceedToCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  currency,
  onProceedToCheckout,
}) => {
  const [couponCode, setCouponCode] = useState('');
  const [discountApplied, setDiscountApplied] = useState(false);
  const [couponError, setCouponError] = useState('');

  if (!isOpen) return null;

  const curr = CURRENCIES[currency] || CURRENCIES.INR;

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discountRate = discountApplied ? 0.2 : 0;
  const discountAmount = subtotal * discountRate;
  const finalTotal = subtotal - discountAmount;

  const formatPrice = (p: number) => {
    const converted = Math.round(p * curr.rate);
    return `${curr.symbol}${converted.toLocaleString()}`;
  };

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (couponCode.trim().toUpperCase() === 'DIVINE20') {
      setDiscountApplied(true);
      setCouponError('');
    } else {
      setCouponError('Invalid coupon. Try code "DIVINE20" for 20% off.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs flex justify-end">
      <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-300">
        
        {/* Drawer Header */}
        <div className="p-6 border-b border-stone-200 flex items-center justify-between bg-[#FFFDF9]">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#E11D48]" />
            <h3 className="text-xl font-cinzel font-bold text-stone-900">
              Your Silk Bag ({items.reduce((acc, i) => acc + i.quantity, 0)})
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-stone-500 hover:text-stone-900 rounded-full hover:bg-stone-200 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cart Item List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {items.length === 0 ? (
            <div className="py-20 text-center text-stone-500">
              <ShoppingBag className="w-12 h-12 mx-auto mb-3 opacity-30 text-[#E11D48]" />
              <p className="font-cinzel text-base font-semibold text-stone-700">Your bag is empty</p>
              <p className="text-xs text-stone-400 mt-1">Explore our heirloom weaves or style a full look.</p>
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
                    patternType="korvai"
                    className="w-full h-full"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  {item.category && (
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#E11D48] font-bold">
                      {item.category}
                    </span>
                  )}
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

                {/* Quantity and Remove */}
                <div className="flex flex-col items-end gap-2 shrink-0">
                  <button
                    onClick={() => onRemoveItem(item.id)}
                    className="text-stone-400 hover:text-red-600 transition-colors cursor-pointer"
                    title="Remove item"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>

                  <div className="flex items-center border border-stone-300 rounded-lg bg-white overflow-hidden text-xs">
                    <button
                      onClick={() => onUpdateQuantity(item.id, -1)}
                      className="px-2 py-0.5 hover:bg-stone-100 text-stone-600 cursor-pointer"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="px-2 font-mono font-medium">{item.quantity}</span>
                    <button
                      onClick={() => onUpdateQuantity(item.id, 1)}
                      className="px-2 py-0.5 hover:bg-stone-100 text-stone-600 cursor-pointer"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Summary & Checkout */}
        {items.length > 0 && (
          <div className="p-6 border-t border-stone-200 bg-[#FFFDF9] space-y-4">
            {/* Coupon input */}
            <form onSubmit={handleApplyCoupon} className="flex gap-2">
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="Enter code (RAVI25)"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="w-full px-3 py-2 text-xs uppercase font-mono tracking-wider rounded-xl border border-stone-300 focus:outline-hidden focus:border-[#E11D48]"
                />
                <Tag className="w-3.5 h-3.5 text-stone-400 absolute right-3 top-2.5" />
              </div>
              <button
                type="submit"
                className="px-4 py-2 bg-stone-900 hover:bg-[#E11D48] text-white rounded-xl text-xs font-semibold uppercase transition-colors cursor-pointer"
              >
                Apply
              </button>
            </form>
            {discountApplied && (
              <p className="text-xs text-emerald-600 font-medium">✓ 25% Ravi Textiles Festive Discount Applied!</p>
            )}
            {couponError && <p className="text-xs text-red-600">{couponError}</p>}

            {/* Price breakdown */}
            <div className="space-y-1.5 text-xs text-stone-600 border-t border-stone-200 pt-3">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-mono font-medium">{formatPrice(subtotal)}</span>
              </div>
              {discountApplied && (
                <div className="flex justify-between text-emerald-600 font-medium">
                  <span>Festive Discount (25%)</span>
                  <span className="font-mono">-{formatPrice(discountAmount)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Insured Express Shipping</span>
                <span className="font-semibold text-[#E11D48] uppercase text-[10px]">Complimentary</span>
              </div>
              <div className="flex justify-between text-base font-cinzel font-bold text-stone-900 pt-2 border-t border-stone-200">
                <span>Total</span>
                <span className="font-mono text-[#E11D48]">{formatPrice(finalTotal)}</span>
              </div>
            </div>

            <button
              onClick={() => {
                onClose();
                onProceedToCheckout();
              }}
              className="w-full py-4 rounded-full bg-gradient-to-r from-[#E11D48] via-[#F59E0B] to-[#E11D48] hover:opacity-95 text-white font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-lg hover:shadow-xl transition-all"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="flex items-center justify-center gap-2 text-[11px] text-stone-500">
              <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Silk Mark Guaranteed · 100% Secure Transaction</span>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
