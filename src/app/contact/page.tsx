'use client';
import React from 'react';
import Header from '@/components/Header';
import BottomNav from '@/components/BottomNav';
import Icon from '@/components/ui/AppIcon';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background pb-28">
      <Header title="Contact Us" />

      <div className="max-w-md mx-auto px-4 pt-6 space-y-6">
        <div className="bg-card rounded-2xl border border-border p-6 shadow-sm space-y-4">
          <div className="flex justify-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
              <Icon name="EnvelopeIcon" size={32} className="text-primary" />
            </div>
          </div>

          <h2 className="text-base font-extrabold text-foreground text-center">Get in Touch</h2>
          <p className="text-xs text-muted-foreground text-center leading-relaxed">
            Have questions about buying, selling, or order tracking? We are here to support you 24/7.
          </p>
        </div>

        <div className="bg-card rounded-2xl border border-border p-5 shadow-sm space-y-4">
          <h3 className="text-sm font-bold text-foreground">Support Channels</h3>

          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-muted rounded-xl text-xs">
              <div className="p-2 bg-primary/10 text-primary rounded-lg">
                <Icon name="EnvelopeIcon" size={16} />
              </div>
              <div>
                <p className="font-bold text-foreground">Email Support</p>
                <p className="text-muted-foreground">support@ecofone.com</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-muted rounded-xl text-xs">
              <div className="p-2 bg-primary/10 text-primary rounded-lg">
                <Icon name="PhoneIcon" size={16} />
              </div>
              <div>
                <p className="font-bold text-foreground">Toll-Free Helpline</p>
                <p className="text-muted-foreground">+1 (800) 555-0199</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-muted rounded-xl text-xs">
              <div className="p-2 bg-primary/10 text-primary rounded-lg">
                <Icon name="MapPinIcon" size={16} />
              </div>
              <div>
                <p className="font-bold text-foreground">Corporate Office</p>
                <p className="text-muted-foreground">100 Green Tech Avenue, Suite 500, California</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <BottomNav activeTab="profile" />
    </div>
  );
}
