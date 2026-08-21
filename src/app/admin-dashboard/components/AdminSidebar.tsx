'use client';
import React from 'react';
import Link from 'next/link';
import AppLogo from '@/components/ui/AppLogo';
import Icon from '@/components/ui/AppIcon';

const navSections = [
  {
    title: 'Overview',
    items: [
      { label: 'Dashboard', icon: 'HomeIcon', id: 'dashboard' },
      { label: 'Analytics', icon: 'ChartBarIcon', id: 'analytics' },
    ],
  },
  {
    title: 'Catalog',
    items: [
      { label: 'Categories', icon: 'TagIcon', id: 'categories' },
      { label: 'Brands', icon: 'BuildingStorefrontIcon', id: 'brands' },
      { label: 'Models', icon: 'DevicePhoneMobileIcon', id: 'models' },
      { label: 'Products', icon: 'ArchiveBoxIcon', id: 'products' },
      { label: 'Inventory', icon: 'CubeIcon', id: 'inventory' },
    ],
  },
  {
    title: 'Pricing',
    items: [
      { label: 'Question Builder', icon: 'QuestionMarkCircleIcon', id: 'questions' },
      { label: 'Pricing Engine', icon: 'CurrencyRupeeIcon', id: 'pricing' },
      { label: 'Coupons', icon: 'TicketIcon', id: 'coupons' },
    ],
  },
  {
    title: 'Orders',
    items: [
      { label: 'Sell Orders', icon: 'ArrowUpCircleIcon', id: 'sell_orders' },
      { label: 'Buy Orders', icon: 'ShoppingBagIcon', id: 'buy_orders' },
      { label: 'Pickups', icon: 'TruckIcon', id: 'pickups' },
      { label: 'Inspections', icon: 'MagnifyingGlassCircleIcon', id: 'inspections' },
    ],
  },
  {
    title: 'Users',
    items: [
      { label: 'Customers', icon: 'UsersIcon', id: 'customers' },
      { label: 'Roles & Permissions', icon: 'ShieldCheckIcon', id: 'roles' },
      { label: 'Audit Log', icon: 'ClipboardDocumentListIcon', id: 'audit' },
    ],
  },
];

interface Props {
  open: boolean;
  onClose: () => void;
  currentTab: string;
  onChangeTab: (tab: string) => void;
}

export default function AdminSidebar({ open, onClose, currentTab, onChangeTab }: Props) {
  return (
    <aside
      className={`fixed lg:sticky top-0 left-0 h-screen w-64 bg-card border-r border-border z-40 flex flex-col transition-transform duration-300 ${
        open ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}
    >
      {/* Logo */}
      <div className="px-4 py-4 border-b border-border flex items-center justify-between">
        <div className="flex items-center gap-2">
          <AppLogo size={30} />
          <div>
            <span className="font-bold text-sm text-primary">ecofone</span>
            <p className="text-[10px] text-muted-foreground leading-none">Admin Panel</p>
          </div>
        </div>
        <button onClick={onClose} className="p-1.5 rounded-lg bg-muted lg:hidden">
          <Icon name="XMarkIcon" size={16} className="text-foreground" />
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto px-3 py-3 space-y-4">
        {navSections.map((section) => (
          <div key={section.title}>
            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest px-3 mb-1.5">
              {section.title}
            </p>
            <div className="space-y-0.5">
              {section.items.map((item) => {
                const isActive = currentTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      onChangeTab(item.id);
                      onClose();
                    }}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold text-left transition-all ${
                      isActive
                        ? 'bg-primary/10 text-primary'
                        : 'text-foreground hover:bg-muted'
                    }`}
                  >
                    <Icon
                      name={item.icon as 'HomeIcon'}
                      size={16}
                      className={isActive ? 'text-primary' : 'text-muted-foreground'}
                    />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Bottom */}
      <div className="px-3 py-3 border-t border-border">
        <Link href="/" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold text-left text-foreground hover:bg-muted">
          <Icon name="ArrowLeftOnRectangleIcon" size={16} className="text-muted-foreground" />
          <span>Back to Store</span>
        </Link>
      </div>
    </aside>
  );
}