import React from 'react';
import Link from 'next/link';
import AppLogo from '@/components/ui/AppLogo';

export default function Footer() {
  return (
    <footer className="border-t border-border py-8 px-6 bg-card">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <AppLogo size={28} />
          <span className="font-bold text-base text-primary">ecofone</span>
        </div>
        <div className="flex items-center gap-6 text-sm font-medium text-muted-foreground">
          <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
          <Link href="/product-listing" className="hover:text-foreground transition-colors">Buy</Link>
          <Link href="/sell-device" className="hover:text-foreground transition-colors">Sell</Link>
          <Link href="/admin-dashboard" className="hover:text-foreground transition-colors">Admin</Link>
        </div>
        <p className="text-xs text-muted-foreground">© 2026 Ecofone. Privacy · Terms</p>
      </div>
    </footer>
  );
}