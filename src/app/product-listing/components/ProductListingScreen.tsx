'use client';
import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import BottomNav from '@/components/BottomNav';
import Icon from '@/components/ui/AppIcon';
import AppImage from '@/components/ui/AppImage';
import FilterDrawer from './FilterDrawer';

type Condition = 'ALL' | 'FAIR' | 'GOOD' | 'SUPERB';
type SortOption = 'popular' | 'price_low' | 'price_high' | 'newest' | 'rating';

const products = [
{
  id: 1,
  name: 'iPhone 14',
  brand: 'Apple',
  storage: '128 GB',
  ram: '6 GB',
  condition: 'SUPERB',
  price: 38999,
  mrp: 79900,
  rating: 4.7,
  reviews: 284,
  warranty: '12 months',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_10f249037-1772991353272.png",
  alt: 'iPhone 14 in deep purple color with dynamic island displayed on white background',
  badge: 'Best Seller',
  inStock: true
},
{
  id: 2,
  name: 'iPhone 13',
  brand: 'Apple',
  storage: '128 GB',
  ram: '4 GB',
  condition: 'GOOD',
  price: 32999,
  mrp: 69900,
  rating: 4.5,
  reviews: 421,
  warranty: '6 months',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_1ee3ab382-1772135481057.png",
  alt: 'iPhone 13 in pink color showing vibrant OLED display with iOS interface',
  badge: null,
  inStock: true
},
{
  id: 3,
  name: 'OnePlus 11R',
  brand: 'OnePlus',
  storage: '256 GB',
  ram: '16 GB',
  condition: 'SUPERB',
  price: 24999,
  mrp: 39999,
  rating: 4.6,
  reviews: 156,
  warranty: '12 months',
  image: "https://images.unsplash.com/photo-1603543245818-22c7984c76cd",
  alt: 'OnePlus smartphone in dark black with Never Settle text on display',
  badge: 'Hot Deal',
  inStock: true
},
{
  id: 4,
  name: 'Samsung Galaxy S23',
  brand: 'Samsung',
  storage: '256 GB',
  ram: '8 GB',
  condition: 'GOOD',
  price: 29999,
  mrp: 74999,
  rating: 4.4,
  reviews: 312,
  warranty: '6 months',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_175e093df-1771887531027.png",
  alt: 'Samsung Galaxy S23 in phantom black with triple camera system visible',
  badge: null,
  inStock: true
},
{
  id: 5,
  name: 'Redmi Note 12 Pro',
  brand: 'Xiaomi',
  storage: '128 GB',
  ram: '8 GB',
  condition: 'FAIR',
  price: 12999,
  mrp: 26999,
  rating: 4.2,
  reviews: 598,
  warranty: '3 months',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_1c02d7c81-1772655888448.png",
  alt: 'Redmi Note 12 Pro in ice blue gradient color with slim profile',
  badge: null,
  inStock: true
},
{
  id: 6,
  name: 'Google Pixel 8',
  brand: 'Google',
  storage: '128 GB',
  ram: '8 GB',
  condition: 'SUPERB',
  price: 44999,
  mrp: 75999,
  rating: 4.8,
  reviews: 89,
  warranty: '12 months',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_1a6e2df26-1772329995405.png",
  alt: 'Google Pixel 8 in hazel color with temperature sensor and camera bar',
  badge: 'New Arrival',
  inStock: true
},
{
  id: 7,
  name: 'iPhone 12',
  brand: 'Apple',
  storage: '64 GB',
  ram: '4 GB',
  condition: 'FAIR',
  price: 21999,
  mrp: 65900,
  rating: 4.1,
  reviews: 732,
  warranty: '3 months',
  image: "https://images.unsplash.com/photo-1629171051328-19f2a594e6b3",
  alt: 'iPhone 12 in blue color with flat edges and ceramic shield front',
  badge: null,
  inStock: true
},
{
  id: 8,
  name: 'Samsung Galaxy A54',
  brand: 'Samsung',
  storage: '128 GB',
  ram: '8 GB',
  condition: 'SUPERB',
  price: 19999,
  mrp: 38999,
  rating: 4.3,
  reviews: 245,
  warranty: '12 months',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_13a82cf60-1767283843132.png",
  alt: 'Samsung Galaxy A54 in awesome violet color with slim profile and Gorilla Glass',
  badge: null,
  inStock: true
}];


const conditionColors: Record<string, string> = {
  FAIR: 'bg-amber-50 text-amber-700 border border-amber-200',
  GOOD: 'bg-blue-50 text-blue-700 border border-blue-200',
  SUPERB: 'bg-green-light text-primary border border-primary/20'
};

export default function ProductListingScreen() {
  const router = useRouter();
  const [conditionFilter, setConditionFilter] = useState<Condition>('ALL');
  const [sortBy, setSortBy] = useState<SortOption>('popular');
  const [showFilter, setShowFilter] = useState(false);
  const [showSort, setShowSort] = useState(false);
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100000]);

  const filtered = useMemo(() => {
    let list = products.filter((p) => {
      if (conditionFilter !== 'ALL' && p.condition !== conditionFilter) return false;
      if (p.price < priceRange[0] || p.price > priceRange[1]) return false;
      return true;
    });
    switch (sortBy) {
      case 'price_low':list = [...list].sort((a, b) => a.price - b.price);break;
      case 'price_high':list = [...list].sort((a, b) => b.price - a.price);break;
      case 'rating':list = [...list].sort((a, b) => b.rating - a.rating);break;
      case 'newest':list = [...list].sort((a, b) => b.id - a.id);break;
    }
    return list;
  }, [conditionFilter, sortBy, priceRange]);

  const toggleWishlist = (id: number, e: React.MouseEvent) => {
    e.preventDefault();
    setWishlist((prev) => prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]);
  };

  const discount = (price: number, mrp: number) => Math.round((mrp - price) / mrp * 100);

  return (
    <div className="min-h-screen bg-background pb-24">
      <Header
        title="Buy Refurbished"
        showBack
        onBack={() => router.push('/')}
        rightElement={
        <button className="p-2 rounded-xl bg-muted">
            <Icon name="MagnifyingGlassIcon" size={18} className="text-foreground" />
          </button>
        } />


      {/* Condition Tabs */}
      <div className="px-4 pt-4 pb-2 flex gap-2 overflow-x-auto scrollbar-hide">
        {(['ALL', 'FAIR', 'GOOD', 'SUPERB'] as Condition[]).map((c) =>
        <button
          key={c}
          onClick={() => setConditionFilter(c)}
          className={`flex-shrink-0 px-4 py-2 rounded-full text-xs font-bold border transition-all duration-200 ${
          conditionFilter === c ?
          'condition-tab-active border-primary' : 'bg-card border-border text-foreground hover:border-primary/40'}`
          }>

            {c === 'ALL' ? 'All Conditions' : c}
          </button>
        )}
      </div>

      {/* Filter & Sort Bar */}
      <div className="px-4 py-2 flex items-center gap-2">
        <button
          onClick={() => setShowFilter(true)}
          className="flex items-center gap-1.5 px-3 py-2 bg-card border border-border rounded-xl text-xs font-semibold text-foreground hover:border-primary/40 transition-colors">

          <Icon name="FunnelIcon" size={14} className="text-primary" />
          Filters
        </button>
        <button
          onClick={() => setShowSort(!showSort)}
          className="flex items-center gap-1.5 px-3 py-2 bg-card border border-border rounded-xl text-xs font-semibold text-foreground hover:border-primary/40 transition-colors">

          <Icon name="ArrowsUpDownIcon" size={14} className="text-primary" />
          Sort
        </button>
        <span className="ml-auto text-xs text-muted-foreground">{filtered.length} devices</span>
      </div>

      {/* Sort Dropdown */}
      {showSort &&
      <div className="mx-4 mb-2 bg-card rounded-2xl border border-border shadow-card-green p-2 z-20 relative">
          {[
        { id: 'popular', label: 'Most Popular' },
        { id: 'price_low', label: 'Price: Low to High' },
        { id: 'price_high', label: 'Price: High to Low' },
        { id: 'rating', label: 'Highest Rated' },
        { id: 'newest', label: 'Newest First' }].
        map((opt) =>
        <button
          key={opt.id}
          onClick={() => {setSortBy(opt.id as SortOption);setShowSort(false);}}
          className={`w-full text-left px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
          sortBy === opt.id ? 'bg-green-light text-primary font-bold' : 'text-foreground hover:bg-muted'}`
          }>

              {opt.label}
            </button>
        )}
        </div>
      }

      {/* Product Grid */}
      <div className="px-4 grid grid-cols-2 gap-3">
        {filtered.map((product, idx) =>
        <Link
          key={product.id}
          href="/product-detail"
          className="bg-card rounded-2xl border border-border overflow-hidden card-hover shadow-sm"
          style={{ transitionDelay: `${idx * 40}ms` }}>

            <div className="relative aspect-square bg-muted">
              <AppImage
              src={product.image}
              alt={product.alt}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 50vw, 200px" />

              {/* Discount badge */}
              <div className="absolute top-2 left-2 bg-eco-error text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                -{discount(product.price, product.mrp)}%
              </div>
              {/* Wishlist */}
              <button
              onClick={(e) => toggleWishlist(product.id, e)}
              className="absolute top-2 right-2 w-7 h-7 bg-white/90 rounded-full flex items-center justify-center shadow-sm">

                <Icon
                name="HeartIcon"
                size={14}
                className={wishlist.includes(product.id) ? 'text-red-500' : 'text-muted-foreground'}
                variant={wishlist.includes(product.id) ? 'solid' : 'outline'} />

              </button>
              {/* Condition */}
              <div className={`absolute bottom-2 left-2 text-[10px] font-bold px-2 py-0.5 rounded-full ${conditionColors[product.condition]}`}>
                {product.condition}
              </div>
            </div>

            <div className="p-3">
              <p className="text-xs text-muted-foreground mb-0.5">{product.brand}</p>
              <p className="text-sm font-bold text-foreground mb-1 truncate">{product.name}</p>
              <p className="text-[10px] text-muted-foreground mb-1.5">{product.storage} · {product.warranty} warranty</p>
              <div className="flex items-center gap-1 mb-2">
                <Icon name="StarIcon" size={12} className="text-warning" variant="solid" />
                <span className="text-[11px] font-bold text-foreground">{product.rating}</span>
                <span className="text-[10px] text-muted-foreground">({product.reviews})</span>
              </div>
              <div className="flex items-baseline gap-1.5">
                <span className="text-sm font-extrabold text-primary">₹{product.price.toLocaleString('en-IN')}</span>
                <span className="text-[10px] text-muted-foreground line-through">₹{product.mrp.toLocaleString('en-IN')}</span>
              </div>
              {product.badge &&
            <span className="inline-block mt-1.5 text-[10px] font-bold bg-amber-50 text-amber-700 rounded-full px-2 py-0.5">
                  {product.badge}
                </span>
            }
            </div>
          </Link>
        )}
      </div>

      {/* Filter Drawer */}
      {showFilter &&
      <FilterDrawer
        onClose={() => setShowFilter(false)}
        priceRange={priceRange}
        onPriceChange={setPriceRange} />

      }

      <BottomNav activeTab="buy" />
    </div>);

}