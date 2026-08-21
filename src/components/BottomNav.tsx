'use client';
import React from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';

type Tab = 'home' | 'sell' | 'buy' | 'orders' | 'profile';

const navItems: { tab: Tab; label: string; icon: string; href: string }[] = [
  { tab: 'home', label: 'Home', icon: 'HomeIcon', href: '/' },
  { tab: 'sell', label: 'Sell Device', icon: 'TagIcon', href: '/sell-device' },
  { tab: 'buy', label: 'Buy', icon: 'ShoppingBagIcon', href: '/product-listing' },
  { tab: 'orders', label: 'My Orders', icon: 'ClipboardDocumentListIcon', href: '/my-orders' },
  { tab: 'profile', label: 'Profile', icon: 'UserIcon', href: '/login' },
];

export default function BottomNav({ activeTab }: { activeTab: Tab }) {
  return (
    <nav className="bottom-nav-glass fixed bottom-0 left-0 right-0 z-40 shadow-bottom-nav">
      <div className="flex items-center justify-around py-2 px-2 max-w-lg mx-auto">
        {navItems.map((item) => {
          const isActive = item.tab === activeTab;
          return (
            <Link
              key={item.tab}
              href={item.href}
              className="flex flex-col items-center gap-0.5 px-3 py-1 min-w-[44px] min-h-[44px] justify-center rounded-xl transition-colors duration-200"
            >
              <Icon
                name={item.icon as 'HomeIcon'}
                size={22}
                className={isActive ? 'text-primary' : 'text-muted-foreground'}
                variant={isActive ? 'solid' : 'outline'}
              />
              <span className={`text-[10px] font-semibold leading-tight ${isActive ? 'text-primary' : 'text-muted-foreground'}`}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}