'use client';
import React from 'react';
import Icon from '@/components/ui/AppIcon';
import type { SellFlowData } from './SellDeviceScreen';

const categories = [
  { id: 'smartphone', label: 'Smartphone', icon: 'DevicePhoneMobileIcon', sub: 'iPhone, Samsung, OnePlus…', color: 'text-primary', bg: 'bg-green-light' },
  { id: 'laptop', label: 'Laptop', icon: 'ComputerDesktopIcon', sub: 'MacBook, Dell, HP…', color: 'text-blue-600', bg: 'bg-blue-50' },
  { id: 'tablet', label: 'Tablet', icon: 'DeviceTabletIcon', sub: 'iPad, Samsung Tab…', color: 'text-purple-600', bg: 'bg-purple-50' },
  { id: 'smartwatch', label: 'Smartwatch', icon: 'ClockIcon', sub: 'Apple Watch, Galaxy Watch…', color: 'text-amber-600', bg: 'bg-amber-50' },
];

interface Props {
  flowData: SellFlowData;
  updateFlow: (d: Partial<SellFlowData>) => void;
  onNext: () => void;
}

export default function StepCategory({ flowData, updateFlow, onNext }: Props) {
  const handleSelect = (cat: typeof categories[0]) => {
    updateFlow({ category: cat.id, categoryLabel: cat.label });
    onNext();
  };

  return (
    <div className="px-4 pt-4 pb-6">
      <h2 className="text-lg font-bold text-foreground mb-1">What do you want to sell?</h2>
      <p className="text-sm text-muted-foreground mb-5">Select the category of your device</p>

      <div className="grid grid-cols-2 gap-3">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => handleSelect(cat)}
            className={`flex flex-col items-start gap-3 p-4 rounded-2xl border-2 transition-all duration-200 text-left ${
              flowData.category === cat.id
                ? 'border-primary bg-green-light shadow-card-green'
                : 'border-border bg-card hover:border-primary/40 hover:bg-muted'
            }`}
          >
            <div className={`w-12 h-12 rounded-xl ${cat.bg} flex items-center justify-center`}>
              <Icon name={cat.icon as 'DevicePhoneMobileIcon'} size={24} className={cat.color} />
            </div>
            <div>
              <p className="text-sm font-bold text-foreground">{cat.label}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{cat.sub}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}