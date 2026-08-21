'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';
import type { SellFlowData } from './SellDeviceScreen';

const timeSlots = [
  '9:00 AM – 11:00 AM',
  '11:00 AM – 1:00 PM',
  '2:00 PM – 4:00 PM',
  '4:00 PM – 6:00 PM',
  '6:00 PM – 8:00 PM',
];

const pickupDates = ['Today', 'Tomorrow', 'Day After', '+3 Days'];

interface Props {
  flowData: SellFlowData;
}

export default function StepQuote({ flowData }: Props) {
  const [selectedDate, setSelectedDate] = useState('Tomorrow');
  const [selectedSlot, setSelectedSlot] = useState('');
  const [scheduled, setScheduled] = useState(false);

  const finalPrice = flowData.currentPrice || 38000;

  const handleSchedule = () => {
    if (!selectedSlot) return;
    setScheduled(true);
  };

  if (scheduled) {
    return (
      <div className="px-4 pt-8 flex flex-col items-center text-center">
        <div className="w-20 h-20 bg-green-light rounded-full flex items-center justify-center mb-6 animate-pulse-green">
          <Icon name="CheckCircleIcon" size={40} className="text-primary" variant="solid" />
        </div>
        <h2 className="text-xl font-extrabold text-foreground mb-2">Pickup Scheduled!</h2>
        <p className="text-muted-foreground text-sm mb-6 max-w-xs">
          Our agent will pick up your device on <strong>{selectedDate}</strong> between <strong>{selectedSlot}</strong>.
        </p>
        <div className="bg-card rounded-2xl border border-border shadow-card-green p-5 w-full mb-6">
          <div className="flex justify-between items-center mb-3">
            <span className="text-sm text-muted-foreground">Device</span>
            <span className="text-sm font-bold text-foreground">{flowData.modelLabel}</span>
          </div>
          <div className="flex justify-between items-center mb-3">
            <span className="text-sm text-muted-foreground">Variant</span>
            <span className="text-sm font-semibold text-foreground">{flowData.variantLabel}</span>
          </div>
          <div className="h-px bg-border my-3" />
          <div className="flex justify-between items-center">
            <span className="text-sm font-bold text-foreground">Confirmed Quote</span>
            <span className="text-xl font-extrabold text-primary">₹{finalPrice.toLocaleString('en-IN')}</span>
          </div>
        </div>
        <Link
          href="/"
          className="w-full py-4 bg-primary text-white rounded-2xl text-sm font-bold text-center shadow-cta-green block"
        >
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="px-4 pt-4 pb-6">
      {/* Final Quote Card */}
      <div className="dark-banner-gradient rounded-2xl p-5 mb-5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 blob-accent opacity-20 pointer-events-none" />
        <p className="text-white/70 text-xs font-semibold mb-1">Your Final Quote</p>
        <p className="text-white text-sm mb-2">{flowData.modelLabel} · {flowData.variantLabel}</p>
        <p className="text-white text-4xl font-extrabold mb-1">₹{finalPrice.toLocaleString('en-IN')}</p>
        <p className="text-white/60 text-xs">Subject to physical inspection. Price guaranteed for 7 days.</p>
      </div>

      {/* Benefits */}
      <div className="grid grid-cols-3 gap-2 mb-5">
        {[
          { icon: 'TruckIcon', label: 'Free Pickup' },
          { icon: 'BanknotesIcon', label: 'Instant Pay' },
          { icon: 'ShieldCheckIcon', label: 'Safe & Secure' },
        ].map((b) => (
          <div key={b.label} className="bg-card border border-border rounded-xl p-3 flex flex-col items-center gap-1.5">
            <Icon name={b.icon as 'TruckIcon'} size={20} className="text-primary" />
            <span className="text-[10px] font-bold text-foreground text-center">{b.label}</span>
          </div>
        ))}
      </div>

      {/* Schedule Pickup */}
      <h3 className="text-sm font-bold text-foreground mb-3">Schedule Pickup</h3>

      <div className="flex gap-2 overflow-x-auto scrollbar-hide mb-4 pb-1">
        {pickupDates.map((d) => (
          <button
            key={d}
            onClick={() => setSelectedDate(d)}
            className={`flex-shrink-0 px-4 py-2 rounded-xl border-2 text-xs font-bold transition-all ${
              selectedDate === d
                ? 'border-primary bg-green-light text-primary' :'border-border bg-card text-foreground'
            }`}
          >
            {d}
          </button>
        ))}
      </div>

      <div className="space-y-2 mb-6">
        {timeSlots.map((slot) => (
          <button
            key={slot}
            onClick={() => setSelectedSlot(slot)}
            className={`w-full flex items-center justify-between p-3.5 rounded-xl border-2 text-sm transition-all ${
              selectedSlot === slot
                ? 'border-primary bg-green-light' :'border-border bg-card hover:border-primary/40'
            }`}
          >
            <span className="font-medium text-foreground">{slot}</span>
            {selectedSlot === slot && (
              <Icon name="CheckCircleIcon" size={18} className="text-primary" variant="solid" />
            )}
          </button>
        ))}
      </div>

      <button
        onClick={handleSchedule}
        disabled={!selectedSlot}
        className={`w-full py-4 rounded-2xl text-sm font-bold transition-all ${
          selectedSlot
            ? 'bg-primary text-white shadow-cta-green hover:bg-primary/90'
            : 'bg-muted text-muted-foreground cursor-not-allowed'
        }`}
      >
        Confirm Pickup for ₹{finalPrice.toLocaleString('en-IN')}
      </button>
    </div>
  );
}