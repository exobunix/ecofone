'use client';
import React, { useState, useRef, useEffect } from 'react';


import AppLogo from '@/components/ui/AppLogo';
import Icon from '@/components/ui/AppIcon';
import BottomNav from '@/components/BottomNav';
import HeroBanner from './HeroBanner';
import ServiceShortcuts from './ServiceShortcuts';
import TopSmartphones from './TopSmartphones';
import PromoBanners from './PromoBanners';
import TrustBadges from './TrustBadges';

export default function HomePageScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -30px 0px' }
    );
    const elements = document.querySelectorAll('.reveal-up');
    elements?.forEach((el) => observer?.observe(el));
    return () => observer?.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Sticky Header */}
      <header className="glass-nav sticky top-0 z-40 px-4 py-3">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <AppLogo size={32} />
            <div>
              <span className="font-bold text-lg text-primary tracking-tight">ecofone</span>
              <p className="text-muted-foreground text-xs leading-none">Smart Choices. Better Planet.</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-1 text-sm font-medium text-foreground">
              <Icon name="MapPinIcon" size={16} className="text-primary" />
              <span>New Delhi</span>
              <Icon name="ChevronDownIcon" size={14} className="text-muted-foreground" />
            </button>
            <button className="relative p-1.5 rounded-full bg-muted">
              <Icon name="BellIcon" size={20} className="text-foreground" />
              <span className="absolute top-0.5 right-0.5 w-2 h-2 bg-accent rounded-full border border-white" />
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className={`flex items-center gap-2 bg-white rounded-xl border transition-all duration-300 px-3 py-2.5 ${isSearchFocused ? 'border-primary shadow-sm' : 'border-border'}`}>
          <Icon name="MagnifyingGlassIcon" size={18} className="text-muted-foreground flex-shrink-0" />
          <input
            type="text"
            placeholder="Search for mobiles, laptops & more..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e?.target?.value)}
            onFocus={() => setIsSearchFocused(true)}
            onBlur={() => setIsSearchFocused(false)}
            className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
          />
          <button className="bg-primary rounded-lg p-1.5 flex-shrink-0">
            <Icon name="QrCodeIcon" size={16} className="text-white" />
          </button>
        </div>
      </header>
      <main ref={scrollRef} className="px-4 space-y-5 pt-4">
        {/* Hero Banner */}
        <div className="reveal-up">
          <HeroBanner />
        </div>

        {/* Service Shortcuts */}
        <div className="reveal-up">
          <ServiceShortcuts />
        </div>

        {/* Top Selling Smartphones */}
        <div className="reveal-up">
          <TopSmartphones />
        </div>

        {/* Promo Banners */}
        <div className="reveal-up">
          <PromoBanners />
        </div>

        {/* Trust Badges */}
        <div className="reveal-up">
          <TrustBadges />
        </div>
      </main>
      <BottomNav activeTab="home" />
    </div>
  );
}