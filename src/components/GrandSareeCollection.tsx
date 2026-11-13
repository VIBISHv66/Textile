import React, { useState, useMemo } from 'react';
import { GRAND_SAREES_COLLECTION } from '../data/sareesData';
import { SareeDetail, CurrencyCode } from '../types';
import { CURRENCIES } from '../data/sareesData';
import { SilkImage } from './SilkImage';
import {
  Search,
  SlidersHorizontal,
  Sparkles,
  ShoppingBag,
  Eye,
  Heart,
  Star,
  Check,
  ShieldCheck,
  ArrowUpDown,
  Grid3X3,
  LayoutGrid,
} from 'lucide-react';

interface GrandSareeCollectionProps {
  currency: CurrencyCode;
  onAddToCart: (item: {
    id: string;
    title: string;
    subtitle?: string;
    price: number;
    image: string;
    category?: string;
  }) => void;
  onInspectSaree: (saree: SareeDetail) => void;
  onToggleWishlist?: (item: {
    id: string;
    title: string;
    subtitle?: string;
    price: number;
    image: string;
  }) => void;
  wishlistIds?: string[];
}

export const GrandSareeCollection: React.FC<GrandSareeCollectionProps> = ({
  currency,
  onAddToCart,
  onInspectSaree,
  onToggleWishlist,
  wishlistIds = [],
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All Weaves');
  const [selectedColor, setSelectedColor] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high' | 'loom-days'>('featured');
  const [viewMode, setViewMode] = useState<'grid' | 'showcase'>('grid');
  const [addedIds, setAddedIds] = useState<Record<string, boolean>>({});

  const curr = CURRENCIES[currency] || CURRENCIES.INR;

  const formatPrice = (p: number) => {
    const converted = Math.round(p * curr.rate);
    return `${curr.symbol}${converted.toLocaleString()}`;
  };

  const categories = [
    'All Weaves',
    'Kanchipuram Silk',
    'Banarasi Brocade',
    'Paithani Silk',
    'Mysore Crepe',
    'Bridal Muhurtham',
    'Soft Silk',
  ];

  const colorFilters = [
    { label: 'All', hex: '' },
    { label: 'Crimson Ruby', hex: '#E11D48' },
    { label: 'Sunburst Gold', hex: '#F59E0B' },
    { label: 'Peacock Turquoise', hex: '#0284C7' },
    { label: 'Royal Violet', hex: '#7C3AED' },
    { label: 'Forest Emerald', hex: '#059669' },
    { label: 'Sacred Ivory', hex: '#FEF3C7' },
  ];

  const filteredSarees = useMemo(() => {
    return GRAND_SAREES_COLLECTION.filter((saree) => {
      // Category filter
      if (selectedCategory !== 'All Weaves') {
        if (selectedCategory === 'Soft Silk') {
          if (saree.weaveCategory !== 'Soft Silk' && saree.weaveCategory !== 'Chanderi Silk') {
            return false;
          }
        } else if (saree.weaveCategory !== selectedCategory) {
          return false;
        }
      }

      // Color filter
      if (selectedColor !== 'All') {
        const matchesColor =
          saree.colorName.toLowerCase().includes(selectedColor.toLowerCase()) ||
          saree.colorHex.toLowerCase() === selectedColor.toLowerCase();
        if (!matchesColor) return false;
      }

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesSearch =
          saree.name.toLowerCase().includes(q) ||
          saree.subtitle.toLowerCase().includes(q) ||
          saree.weaveCategory.toLowerCase().includes(q) ||
          saree.origin.toLowerCase().includes(q) ||
          saree.motifs.some((m) => m.toLowerCase().includes(q));
        if (!matchesSearch) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'loom-days') return b.loomDays - a.loomDays;
      return 0; // featured maintains curated order
    });
  }, [selectedCategory, selectedColor, searchQuery, sortBy]);

  const handleQuickAdd = (saree: SareeDetail, e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart({
      id: saree.id,
      title: saree.name,
      subtitle: `${saree.weaveCategory} · ${saree.colorName}`,
      price: saree.price,
      image: saree.image,
      category: saree.weaveCategory,
    });
    setAddedIds((prev) => ({ ...prev, [saree.id]: true }));
    setTimeout(() => {
      setAddedIds((prev) => ({ ...prev, [saree.id]: false }));
    }, 2000);
  };

  return (
    <section id="sarees-collection" className="py-20 lg:py-28 bg-[#FFFDF9] border-b border-[#FDE68A]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#E11D48] font-bold mb-2">
              <Sparkles className="w-3.5 h-3.5 text-[#F59E0B]" />
              <span>Ravi Textiles Master Vault</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-cinzel font-bold text-stone-900 tracking-tight">
              The Grand Sarees Collection.
            </h2>
            <p className="text-stone-600 text-sm sm:text-base font-light mt-1 max-w-2xl">
              "Over twenty-four certified heirloom weaves spanning sacred Kanchipuram pit-looms, Varanasi brocades, and Paithani royal tapestries. Tap any saree for full artisan specifications."
            </p>
          </div>

          <div className="text-xs text-stone-500 font-mono flex items-center gap-2">
            <span className="font-bold text-[#E11D48] text-sm">{filteredSarees.length}</span>
            <span>Handcrafted Sarees Available</span>
          </div>
        </div>

        {/* Search & Filter Toolbar */}
        <div className="p-4 sm:p-6 bg-white rounded-3xl border border-[#FDE68A] shadow-xs mb-8 space-y-4">
          
          {/* Search Bar + Sort + View Mode Row */}
          <div className="flex flex-col sm:flex-row items-center gap-3">
            {/* Search Input */}
            <div className="relative flex-1 w-full">
              <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by weave, color, temple motif, or occasion (e.g. Korvai, Gold Tissue, Peacock)..."
                className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-stone-200 text-xs sm:text-sm focus:border-[#E11D48] focus:ring-1 focus:ring-[#E11D48] outline-hidden bg-[#FAF7F2]/60"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-stone-400 hover:text-stone-700"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end">
              <div className="flex items-center gap-1.5 bg-[#FAF7F2] border border-stone-200 rounded-2xl px-3 py-2 text-xs text-stone-700">
                <ArrowUpDown className="w-3.5 h-3.5 text-stone-500" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-transparent font-medium outline-hidden cursor-pointer"
                >
                  <option value="featured">Featured Curations</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="loom-days">Loom Days: Longest</option>
                </select>
              </div>

              {/* View Mode Toggle */}
              <div className="flex items-center bg-[#FAF7F2] border border-stone-200 rounded-2xl p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-1.5 rounded-xl transition-colors cursor-pointer ${
                    viewMode === 'grid' ? 'bg-white text-[#E11D48] shadow-xs' : 'text-stone-500'
                  }`}
                  title="Grid View"
                >
                  <Grid3X3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('showcase')}
                  className={`p-1.5 rounded-xl transition-colors cursor-pointer ${
                    viewMode === 'showcase' ? 'bg-white text-[#E11D48] shadow-xs' : 'text-stone-500'
                  }`}
                  title="Showcase View"
                >
                  <LayoutGrid className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Weave Category Filter Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer ${
                    isSelected
                      ? 'bg-[#E11D48] text-white shadow-xs'
                      : 'bg-[#FAF7F2] border border-stone-200 text-stone-700 hover:text-[#E11D48] hover:border-[#F59E0B]'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Color Filter Chips */}
          <div className="flex items-center gap-2 overflow-x-auto pt-1 border-t border-stone-100 no-scrollbar">
            <span className="text-[11px] font-mono uppercase text-stone-400 font-bold mr-1 shrink-0">
              Palette:
            </span>
            {colorFilters.map((col) => {
              const isSelected = selectedColor === col.label;
              return (
                <button
                  key={col.label}
                  onClick={() => setSelectedColor(col.label)}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-all flex items-center gap-1.5 shrink-0 cursor-pointer ${
                    isSelected
                      ? 'bg-stone-900 text-white shadow-xs'
                      : 'bg-white border border-stone-200 text-stone-700 hover:bg-stone-50'
                  }`}
                >
                  {col.hex && (
                    <span
                      className="w-2.5 h-2.5 rounded-full border border-black/20"
                      style={{ backgroundColor: col.hex }}
                    />
                  )}
                  <span>{col.label}</span>
                </button>
              );
            })}
          </div>

        </div>

        {/* Saree Cards Grid */}
        {filteredSarees.length === 0 ? (
          <div className="py-20 text-center bg-white rounded-3xl border border-stone-200 p-8">
            <Sparkles className="w-10 h-10 mx-auto text-amber-500 mb-2 opacity-50" />
            <h3 className="text-xl font-cinzel font-bold text-stone-800">No Sarees Found</h3>
            <p className="text-xs text-stone-500 mt-1 max-w-sm mx-auto">
              We couldn't find a saree matching your search criteria. Try clearing filters or exploring all weaves.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All Weaves');
                setSelectedColor('All');
              }}
              className="mt-4 px-6 py-2 rounded-full bg-[#E11D48] text-white text-xs font-semibold uppercase tracking-wider cursor-pointer"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div
            className={`grid gap-6 ${
              viewMode === 'grid'
                ? 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
                : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
            }`}
          >
            {filteredSarees.map((saree) => {
              const isAdded = addedIds[saree.id];
              const isWish = wishlistIds.includes(saree.id);

              return (
                <div
                  key={saree.id}
                  onClick={() => onInspectSaree(saree)}
                  className="saree-card-interactive group bg-white rounded-3xl overflow-hidden border border-[#FDE68A] hover:border-[#E11D48] shadow-xs hover:shadow-2xl transition-all duration-300 cursor-pointer flex flex-col justify-between"
                >
                  {/* Image Viewport */}
                  <div className="relative aspect-[3/4] w-full overflow-hidden bg-stone-100">
                    <SilkImage
                      src={saree.image}
                      alt={saree.name}
                      label={saree.name}
                      fallbackColor={saree.colorHex}
                      patternType="temple"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 pointer-events-none" />

                    {/* Top Badges */}
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-20">
                      <span className="text-[10px] font-mono uppercase tracking-wider bg-black/60 backdrop-blur-md text-[#FFF3B0] px-2.5 py-0.5 rounded-full border border-white/20">
                        {saree.tag || saree.weaveCategory}
                      </span>

                      {onToggleWishlist && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onToggleWishlist({
                              id: saree.id,
                              title: saree.name,
                              subtitle: saree.subtitle,
                              price: saree.price,
                              image: saree.image,
                            });
                          }}
                          className={`p-2 rounded-full backdrop-blur-md transition-transform hover:scale-110 cursor-pointer ${
                            isWish
                              ? 'bg-red-500 text-white'
                              : 'bg-black/40 text-white hover:bg-black/60'
                          }`}
                          aria-label="Wishlist Saree"
                        >
                          <Heart className={`w-3.5 h-3.5 ${isWish ? 'fill-current' : ''}`} />
                        </button>
                      )}
                    </div>

                    {/* Bottom Quick Specs Strip on Image */}
                    <div className="absolute bottom-3 left-3 right-3 z-20 text-white flex items-center justify-between text-[11px] font-mono">
                      <span className="bg-black/50 backdrop-blur-xs px-2 py-0.5 rounded">
                        {saree.loomDays} Loom Days
                      </span>
                      <span className="bg-[#E11D48]/90 text-white px-2 py-0.5 rounded font-bold">
                        {saree.zariGrams}g Pure Zari
                      </span>
                    </div>

                    {/* Hover Inspect Cue */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 text-white z-10 backdrop-blur-xs">
                      <Eye className="w-5 h-5 text-[#FDE047]" />
                      <span className="text-xs font-cinzel font-bold tracking-wider">Tap to View Details</span>
                    </div>
                  </div>

                  {/* Saree Card Details */}
                  <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-wider text-stone-400 mb-1">
                        <span className="text-[#E11D48] font-bold">{saree.weaveCategory}</span>
                        <span>{saree.origin}</span>
                      </div>

                      <h3 className="text-base sm:text-lg font-cinzel font-bold text-stone-900 group-hover:text-[#E11D48] transition-colors line-clamp-1">
                        {saree.name}
                      </h3>

                      <p className="text-xs text-stone-500 line-clamp-2 mt-1 font-light leading-snug">
                        {saree.subtitle}
                      </p>

                      {/* Technical Specs Strip */}
                      <div className="mt-3 py-2 px-2.5 rounded-xl bg-[#FAF7F2] border border-stone-200 text-[11px] text-stone-600 flex items-center justify-between font-mono">
                        <span>{saree.weightGrams}g Weight</span>
                        <span>·</span>
                        <span className="truncate max-w-[120px]">{saree.zariType}</span>
                      </div>
                    </div>

                    {/* Price and Action Row */}
                    <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between gap-2">
                      <div>
                        <div className="text-lg font-cinzel font-bold text-[#E11D48] font-mono">
                          {formatPrice(saree.price)}
                        </div>
                        {saree.originalPrice && (
                          <div className="text-[10px] text-stone-400 font-mono line-through">
                            {formatPrice(saree.originalPrice)}
                          </div>
                        )}
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onInspectSaree(saree);
                          }}
                          className="px-3.5 py-2 rounded-xl border border-stone-300 hover:border-[#E11D48] text-stone-800 hover:text-[#E11D48] text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer hover:bg-stone-50"
                          title="View Full Saree Details"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span className="hidden sm:inline">Details</span>
                        </button>

                        <button
                          onClick={(e) => handleQuickAdd(saree, e)}
                          className={`shimmer-btn-sheen p-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer shadow-xs ${
                            isAdded
                              ? 'bg-emerald-600 text-white'
                              : 'bg-stone-900 hover:bg-[#E11D48] text-white hover:scale-105'
                          }`}
                          title="Add to Silk Bag"
                        >
                          {isAdded ? <Check className="w-3.5 h-3.5" /> : <ShoppingBag className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        )}

        {/* Bottom Guarantee Banner */}
        <div className="mt-14 p-6 sm:p-8 rounded-3xl bg-[#FFFBEB] border border-[#FDE68A] flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#E11D48] text-white flex items-center justify-center shrink-0 shadow-md">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base font-cinzel font-bold text-stone-900">
                Ravi Textiles Authentic Pit-Loom Guarantee
              </h4>
              <p className="text-xs text-stone-600 font-light mt-0.5">
                Every saree in this vault is authenticated with the Silk Mark of India and serialized handloom identification.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono text-stone-700">
            <span className="px-3 py-1.5 rounded-full bg-white border border-stone-200">
              100% Pure Mulberry
            </span>
            <span className="px-3 py-1.5 rounded-full bg-white border border-stone-200">
              Certified Real Zari
            </span>
          </div>
        </div>

      </div>
    </section>
  );
};
