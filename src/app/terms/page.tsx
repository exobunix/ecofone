'use client';
import React from 'react';
import Header from '@/components/Header';
import BottomNav from '@/components/BottomNav';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background pb-28">
      <Header title="Terms & Conditions" />

      <div className="max-w-md mx-auto px-4 pt-6 space-y-6">
        <div className="bg-card rounded-2xl border border-border p-6 shadow-sm space-y-4">
          <h2 className="text-sm font-bold text-foreground">1. Introduction</h2>
          <p className="text-xs text-muted-foreground leading-relaxed">
            By using the Ecofone platform, you agree to these Terms and Conditions. Please read them carefully. We reserve the right to modify these terms at any time.
          </p>

          <h2 className="text-sm font-bold text-foreground">2. Buy / Sell Device Rules</h2>
          <p className="text-xs text-muted-foreground leading-relaxed">
            When selling a device, you represent that you are the sole and absolute owner of the device. All quotes are subject to physical inspection. If device specifications or condition do not match your declaration, a revised quote will be offered.
          </p>

          <h2 className="text-sm font-bold text-foreground">3. Payments & Returns</h2>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Payments for sold devices are processed immediately upon successful inspection. Purchases are covered under our certified device warranty policy. Returns are accepted within the specified return window only if the seals remain intact.
          </p>

          <h2 className="text-sm font-bold text-foreground">4. Limitation of Liability</h2>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Ecofone is not liable for data loss. Users must backup and fully erase all data from devices prior to sending them for inspection.
          </p>
        </div>
      </div>

      <BottomNav activeTab="profile" />
    </div>
  );
}
