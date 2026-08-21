'use client';
import React from 'react';
import Header from '@/components/Header';
import BottomNav from '@/components/BottomNav';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background pb-28">
      <Header title="Privacy Policy" />

      <div className="max-w-md mx-auto px-4 pt-6 space-y-6">
        <div className="bg-card rounded-2xl border border-border p-6 shadow-sm space-y-4">
          <h2 className="text-sm font-bold text-foreground">1. Data Collection</h2>
          <p className="text-xs text-muted-foreground leading-relaxed">
            We collect personal details (name, email, shipping address, phone number) when you register an account, schedule a pickup, or place an order.
          </p>

          <h2 className="text-sm font-bold text-foreground">2. Data Security</h2>
          <p className="text-xs text-muted-foreground leading-relaxed">
            We prioritize secure transactions. Your personal information is protected using industry-standard encryption protocols. We never sell your data to third parties.
          </p>

          <h2 className="text-sm font-bold text-foreground">3. Device Data Safety</h2>
          <p className="text-xs text-muted-foreground leading-relaxed">
            All devices purchased or received for recycling are securely formatted and wiped. However, we strongly recommend that users manually reset devices before hand-off.
          </p>

          <h2 className="text-sm font-bold text-foreground">4. Cookies & Analytics</h2>
          <p className="text-xs text-muted-foreground leading-relaxed">
            We use essential cookies to keep you signed in. Performance and analytical cookies are used only to improve page loading speeds.
          </p>
        </div>
      </div>

      <BottomNav activeTab="profile" />
    </div>
  );
}
