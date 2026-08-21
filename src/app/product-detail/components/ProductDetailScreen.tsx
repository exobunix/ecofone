'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import BottomNav from '@/components/BottomNav';
import Icon from '@/components/ui/AppIcon';
import AppImage from '@/components/ui/AppImage';

type Condition = 'FAIR' | 'GOOD' | 'SUPERB';

const conditionData: Record<Condition, { price: number; mrp: number; description: string; warranty: string; badge: string; color: string; images: string[] }> = {
  FAIR: {
    price: 29999,
    mrp: 79900,
    description: 'Visible scratches and minor dents on body. Screen may have minor scratches. All functions work perfectly.',
    warranty: '3 Months Ecofone Warranty',
    badge: 'Budget Pick',
    color: 'text-amber-600',
    images: [
      'https://images.unsplash.com/photo-1632661674596-df8be070a5c5?w=600&q=80',
      'https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=600&q=80',
    ],
  },
  GOOD: {
    price: 35999,
    mrp: 79900,
    description: 'Minor scratches on body, barely visible. Screen is in good condition. All functions work perfectly.',
    warranty: '6 Months Ecofone Warranty',
    badge: 'Popular Choice',
    color: 'text-blue-600',
    images: [
      'https://images.unsplash.com/photo-1678685888221-cda773a3dcdb?w=600&q=80',
      'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=600&q=80',
    ],
  },
  SUPERB: {
    price: 42999,
    mrp: 79900,
    description: 'Like new condition. No visible scratches or dents. Screen is pristine. Original accessories may be included.',
    warranty: '12 Months Ecofone Warranty',
    badge: 'Premium Condition',
    color: 'text-primary',
    images: [
      'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=600&q=80',
      'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=600&q=80',
    ],
  },
};

const specs = [
  { label: 'Display', value: '6.1" Super Retina XDR OLED' },
  { label: 'Processor', value: 'Apple A15 Bionic' },
  { label: 'RAM', value: '6 GB' },
  { label: 'Storage', value: '128 GB' },
  { label: 'Camera', value: '12 MP + 12 MP Dual Rear' },
  { label: 'Battery', value: '3,227 mAh' },
  { label: 'OS', value: 'iOS 17' },
  { label: 'Color', value: 'Midnight Black' },
];

const reviews = [
  { id: 1, name: 'Arjun Sharma', rating: 5, date: 'Aug 2026', comment: 'Excellent condition, exactly as described. Fast delivery. Very happy with the purchase!' },
  { id: 2, name: 'Priya Nair', rating: 4, date: 'Jul 2026', comment: 'Good quality phone. Minor scratch on the back but screen is perfect. Worth the price.' },
  { id: 3, name: 'Rahul Mehta', rating: 5, date: 'Jul 2026', comment: 'Superb condition as advertised. Battery health is 92%. Highly recommend Ecofone.' },
];

export default function ProductDetailScreen() {
  const router = useRouter();
  const [selectedCondition, setSelectedCondition] = useState<Condition>('GOOD');
  const [activeImage, setActiveImage] = useState(0);
  const [inWishlist, setInWishlist] = useState(false);
  const [cartAdded, setCartAdded] = useState(false);

  const data = conditionData[selectedCondition];
  const discount = Math.round(((data.mrp - data.price) / data.mrp) * 100);

  const handleAddToCart = () => {
    setCartAdded(true);
    setTimeout(() => setCartAdded(false), 2000);
  };

  return (
    <div className="min-h-screen bg-background pb-32">
      <Header
        title="iPhone 14"
        showBack
        onBack={() => router.push('/product-listing')}
        rightElement={
          <button
            onClick={() => setInWishlist(!inWishlist)}
            className="p-2 rounded-xl bg-muted"
          >
            <Icon
              name="HeartIcon"
              size={18}
              className={inWishlist ? 'text-red-500' : 'text-foreground'}
              variant={inWishlist ? 'solid' : 'outline'}
            />
          </button>
        }
      />

      {/* Image Gallery */}
      <div className="relative bg-muted mx-4 mt-4 rounded-2xl overflow-hidden aspect-square">
        <AppImage
          src={data.images[activeImage]}
          alt={`iPhone 14 ${selectedCondition} condition - front view showing ${activeImage === 0 ? 'screen and dynamic island' : 'back panel with camera system'}`}
          fill
          className="object-cover transition-opacity duration-300"
          priority
        />
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
          {data.images.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveImage(i)}
              className={`h-1.5 rounded-full transition-all ${i === activeImage ? 'w-5 bg-primary' : 'w-1.5 bg-white/60'}`}
            />
          ))}
        </div>
        <div className="absolute top-3 left-3 bg-eco-error text-white text-xs font-bold px-2 py-0.5 rounded-full">
          -{discount}%
        </div>
      </div>

      <div className="px-4 pt-4 space-y-4">
        {/* Title & Price */}
        <div>
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs text-muted-foreground font-medium">Apple</p>
              <h1 className="text-xl font-extrabold text-foreground">iPhone 14</h1>
              <p className="text-xs text-muted-foreground">128 GB · Midnight Black</p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-extrabold text-primary">₹{data.price.toLocaleString('en-IN')}</p>
              <p className="text-xs text-muted-foreground line-through">₹{data.mrp.toLocaleString('en-IN')}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 mt-2">
            <div className="flex items-center gap-1">
              {[1,2,3,4,5].map((s) => (
                <Icon key={s} name="StarIcon" size={12} className={s <= 4 ? 'text-warning' : 'text-muted'} variant="solid" />
              ))}
            </div>
            <span className="text-xs font-semibold text-foreground">4.5</span>
            <span className="text-xs text-muted-foreground">(312 reviews)</span>
          </div>
        </div>

        {/* Condition Selector */}
        <div className="bg-card rounded-2xl border border-border p-4">
          <p className="text-sm font-bold text-foreground mb-3">Select Condition</p>
          <div className="grid grid-cols-3 gap-2">
            {(['FAIR', 'GOOD', 'SUPERB'] as Condition[]).map((c) => {
              const cd = conditionData[c];
              return (
                <button
                  key={c}
                  onClick={() => { setSelectedCondition(c); setActiveImage(0); }}
                  className={`flex flex-col items-center p-3 rounded-xl border-2 transition-all duration-200 ${
                    selectedCondition === c ? 'border-primary bg-green-light' : 'border-border bg-background'
                  }`}
                >
                  <span className={`text-[10px] font-bold mb-1 ${selectedCondition === c ? 'text-primary' : 'text-muted-foreground'}`}>{c}</span>
                  <span className={`text-sm font-extrabold ${selectedCondition === c ? 'text-primary' : 'text-foreground'}`}>
                    ₹{(cd.price / 1000).toFixed(0)}K
                  </span>
                  {selectedCondition === c && (
                    <span className="text-[9px] text-primary font-semibold mt-0.5">{cd.badge}</span>
                  )}
                </button>
              );
            })}
          </div>
          <p className="text-xs text-muted-foreground mt-3 leading-relaxed">{data.description}</p>
          <div className="flex items-center gap-2 mt-2">
            <Icon name="ShieldCheckIcon" size={14} className="text-primary" />
            <span className="text-xs font-semibold text-primary">{data.warranty}</span>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="grid grid-cols-3 gap-2">
          {[
            { icon: 'TruckIcon', label: 'Free Delivery', sub: '2-4 days' },
            { icon: 'ArrowPathIcon', label: '7-Day Return', sub: 'No questions' },
            { icon: 'ShieldCheckIcon', label: '32+ Checks', sub: 'Quality verified' },
          ].map((b) => (
            <div key={b.label} className="bg-card border border-border rounded-xl p-2.5 flex flex-col items-center gap-1 text-center">
              <Icon name={b.icon as 'TruckIcon'} size={18} className="text-primary" />
              <span className="text-[10px] font-bold text-foreground">{b.label}</span>
              <span className="text-[9px] text-muted-foreground">{b.sub}</span>
            </div>
          ))}
        </div>

        {/* Specs */}
        <div className="bg-card rounded-2xl border border-border overflow-hidden">
          <div className="px-4 py-3 border-b border-border">
            <p className="text-sm font-bold text-foreground">Specifications</p>
          </div>
          {specs.map((spec, i) => (
            <div key={spec.label} className={`flex items-center justify-between px-4 py-3 ${i < specs.length - 1 ? 'border-b border-border/50' : ''}`}>
              <span className="text-xs text-muted-foreground">{spec.label}</span>
              <span className="text-xs font-semibold text-foreground">{spec.value}</span>
            </div>
          ))}
        </div>

        {/* Reviews */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm font-bold text-foreground">Customer Reviews</p>
            <button className="text-xs font-semibold text-primary">View All</button>
          </div>
          <div className="space-y-3">
            {reviews.map((r) => (
              <div key={r.id} className="bg-card border border-border rounded-2xl p-4">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="text-sm font-bold text-foreground">{r.name}</p>
                    <p className="text-xs text-muted-foreground">{r.date}</p>
                  </div>
                  <div className="flex items-center gap-0.5">
                    {[1,2,3,4,5].map((s) => (
                      <Icon key={s} name="StarIcon" size={12} className={s <= r.rating ? 'text-warning' : 'text-muted'} variant="solid" />
                    ))}
                  </div>
                </div>
                <p className="text-xs text-charcoal leading-relaxed">{r.comment}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Sticky CTA */}
      <div className="fixed bottom-16 left-0 right-0 px-4 py-3 bottom-nav-glass border-t border-border z-30">
        <div className="flex gap-3">
          <button
            onClick={handleAddToCart}
            className={`flex-1 py-3.5 rounded-2xl text-sm font-bold border-2 transition-all duration-300 ${
              cartAdded
                ? 'border-primary bg-green-light text-primary' :'border-primary text-primary bg-transparent hover:bg-green-light'
            }`}
          >
            {cartAdded ? '✓ Added to Cart' : 'Add to Cart'}
          </button>
          <button
            onClick={() => router.push('/checkout')}
            className="flex-1 py-3.5 rounded-2xl text-sm font-bold bg-primary text-white shadow-cta-green hover:bg-primary/90 transition-all"
          >
            Buy Now
          </button>
        </div>
      </div>

      <BottomNav activeTab="buy" />
    </div>
  );
}