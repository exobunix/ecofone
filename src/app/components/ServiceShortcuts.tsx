import React from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';

const shortcuts = [
  {
    label: 'Sell Phone',
    sub: 'Get instant cash',
    icon: 'DevicePhoneMobileIcon',
    href: '/sell-device',
    iconBg: 'bg-green-light',
    iconColor: 'text-primary',
  },
  {
    label: 'Buy Refurbished',
    sub: 'Best deals',
    icon: 'ArrowPathIcon',
    href: '/product-listing',
    iconBg: 'bg-blue-50',
    iconColor: 'text-blue-600',
  },
  {
    label: 'Eco Warranty',
    sub: 'Assured trust',
    icon: 'ShieldCheckIcon',
    href: '/product-listing',
    iconBg: 'bg-amber-50',
    iconColor: 'text-amber-600',
  },
  {
    label: 'Sustainable',
    sub: 'Better planet',
    icon: 'GlobeAltIcon',
    href: '/product-listing',
    iconBg: 'bg-teal-50',
    iconColor: 'text-teal-600',
  },
];

export default function ServiceShortcuts() {
  return (
    <div className="bg-card rounded-2xl border border-border shadow-card-green p-4">
      <div className="grid grid-cols-4 gap-2">
        {shortcuts.map((s) => (
          <Link
            key={s.label}
            href={s.href}
            className="flex flex-col items-center gap-2 p-2 rounded-xl hover:bg-muted transition-colors duration-200 group"
          >
            <div className={`w-12 h-12 rounded-xl ${s.iconBg} flex items-center justify-center group-hover:scale-110 transition-transform duration-200`}>
              <Icon name={s.icon as 'DevicePhoneMobileIcon'} size={22} className={s.iconColor} />
            </div>
            <div className="text-center">
              <p className="text-xs font-semibold text-foreground leading-tight">{s.label}</p>
              <p className="text-[10px] text-muted-foreground leading-tight">{s.sub}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}