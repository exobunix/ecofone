'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import BottomNav from '@/components/BottomNav';
import Icon from '@/components/ui/AppIcon';

export default function AboutPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-background pb-28">
      <Header title="About Us" />

      <div className="max-w-md mx-auto px-4 pt-6 space-y-6">
        <div className="bg-card rounded-2xl border border-border p-6 shadow-sm space-y-4">
          <div className="flex justify-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
              <Icon name="InformationCircleIcon" size={36} className="text-primary" />
            </div>
          </div>

          <h2 className="text-lg font-extrabold text-foreground text-center">Ecofone</h2>
          <p className="text-xs text-muted-foreground text-center leading-relaxed">
            Welcome to Ecofone, your premier destination for high-quality, certified refurbished smartphones and devices. We are committed to making technology affordable and sustainable for everyone.
          </p>
        </div>

        <div className="bg-card rounded-2xl border border-border p-6 shadow-sm space-y-4">
          <h3 className="text-sm font-bold text-foreground">Our Mission</h3>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Every year, millions of electronic devices end up in landfills. At Ecofone, we reduce electronic waste by giving a second life to smartphones. We source, inspect, restore, and certify devices so you can purchase premium tech at a fraction of the cost, completely risk-free.
          </p>

          <h3 className="text-sm font-bold text-foreground">Why Choose Us?</h3>
          <ul className="space-y-2 text-xs text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="text-primary font-bold">✓</span>
              <span><strong>45+ Quality Checks:</strong> Every device goes through rigorous testing by our experts.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary font-bold">✓</span>
              <span><strong>Hassle-free Returns:</strong> Easy and stress-free return policies.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary font-bold">✓</span>
              <span><strong>Eco-friendly:</strong> Direct contribution to reducing carbon footprints and e-waste.</span>
            </li>
          </ul>
        </div>
      </div>

      <BottomNav activeTab="profile" />
    </div>
  );
}
