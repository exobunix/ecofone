'use client';
import React from 'react';
import Link from 'next/link';
import AppLogo from '@/components/ui/AppLogo';
import Icon from '@/components/ui/AppIcon';

const navSections = [
  {
    title: 'Overview',
    items: [
      { label: 'Dashboard', icon: 'HomeIcon', href: '/admin-dashboard', active: true },
      { label: 'Analytics', icon: 'ChartBarIcon', href: '/admin-dashboard' },
    ],
  },
  {
    title: 'Catalog',
    items: [
      { label: 'Categories', icon: 'TagIcon', href: '/admin-dashboard' },
      { label: 'Brands', icon: 'BuildingStorefrontIcon', href: '/admin-dashboard' },
      { label: 'Models', icon: 'DevicePhoneMobileIcon', href: '/admin-dashboard' },
      { label: 'Products', icon: 'ArchiveBoxIcon', href: '/admin-dashboard' },
      { label: 'Inventory', icon: 'CubeIcon', href: '/admin-dashboard' },
    ],
  },
  {
    title: 'Pricing',
    items: [
      { label: 'Question Builder', icon: 'QuestionMarkCircleIcon', href: '/admin-dashboard' },
      { label: 'Pricing Engine', icon: 'CurrencyRupeeIcon', href: '/admin-dashboard' },
      { label: 'Coupons', icon: 'TicketIcon', href: '/admin-dashboard' },
    ],
  },
  {
    title: 'Orders',
    items: [
      { label: 'Sell Orders', icon: 'ArrowUpCircleIcon', href: '/admin-dashboard' },
      { label: 'Buy Orders', icon: 'ShoppingBagIcon', href: '/admin-dashboard' },
      { label: 'Pickups', icon: 'TruckIcon', href: '/admin-dashboard' },
      { label: 'Inspections', icon: 'MagnifyingGlassCircleIcon', href: '/admin-dashboard' },
    ],
  },
  {
    title: 'Users',
    items: [
      { label: 'Customers', icon: 'UsersIcon', href: '/admin-dashboard' },
      { label: 'Roles & Permissions', icon: 'ShieldCheckIcon', href: '/admin-dashboard' },
      { label: 'Audit Log', icon: 'ClipboardDocumentListIcon', href: '/admin-dashboard' },
    ],
  },
  {
    title: 'Content',
    items: [
      { label: 'Banners / CMS', icon: 'PhotoIcon', href: '/admin-dashboard' },
      { label: 'Reviews', icon: 'StarIcon', href: '/admin-dashboard' },
      { label: 'Support Tickets', icon: 'ChatBubbleLeftEllipsisIcon', href: '/admin-dashboard' },
      { label: 'Settings', icon: 'Cog6ToothIcon', href: '/admin-dashboard' },
    ],
  },
];

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function AdminSidebar({ open, onClose }: Props) {
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
              {section.items.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`admin-sidebar-link ${item.active ? 'active' : ''}`}
                >
                  <Icon name={item.icon as 'HomeIcon'} size={16} className={item.active ? 'text-primary' : 'text-muted-foreground'} />
                  <span>{item.label}</span>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </nav>

      {/* Bottom */}
      <div className="px-3 py-3 border-t border-border">
        <Link href="/" className="admin-sidebar-link">
          <Icon name="ArrowLeftOnRectangleIcon" size={16} className="text-muted-foreground" />
          <span>Back to Store</span>
        </Link>
      </div>
    </aside>
  );
}