'use client';
import React, { useState } from 'react';
import Icon from '@/components/ui/AppIcon';
import type { SellFlowData } from './SellDeviceScreen';

const modelsByBrand: Record<string, { id: string; label: string; year: string }[]> = {
  apple: [
    { id: 'iphone-15-pro-max', label: 'iPhone 15 Pro Max', year: '2023' },
    { id: 'iphone-15-pro', label: 'iPhone 15 Pro', year: '2023' },
    { id: 'iphone-15', label: 'iPhone 15', year: '2023' },
    { id: 'iphone-14-pro-max', label: 'iPhone 14 Pro Max', year: '2022' },
    { id: 'iphone-14-pro', label: 'iPhone 14 Pro', year: '2022' },
    { id: 'iphone-14', label: 'iPhone 14', year: '2022' },
    { id: 'iphone-13', label: 'iPhone 13', year: '2021' },
    { id: 'iphone-12', label: 'iPhone 12', year: '2020' },
  ],
  samsung: [
    { id: 's23-ultra', label: 'Galaxy S23 Ultra', year: '2023' },
    { id: 's23-plus', label: 'Galaxy S23+', year: '2023' },
    { id: 's23', label: 'Galaxy S23', year: '2023' },
    { id: 's22', label: 'Galaxy S22', year: '2022' },
    { id: 'a54', label: 'Galaxy A54', year: '2023' },
    { id: 'a34', label: 'Galaxy A34', year: '2023' },
  ],
  oneplus: [
    { id: '11', label: 'OnePlus 11', year: '2023' },
    { id: '11r', label: 'OnePlus 11R', year: '2023' },
    { id: '10-pro', label: 'OnePlus 10 Pro', year: '2022' },
    { id: 'nord-3', label: 'Nord 3', year: '2023' },
  ],
  xiaomi: [
    { id: '13-pro', label: 'Xiaomi 13 Pro', year: '2023' },
    { id: '13', label: 'Xiaomi 13', year: '2023' },
    { id: '12-pro', label: 'Xiaomi 12 Pro', year: '2022' },
    { id: 'redmi-note-12', label: 'Redmi Note 12', year: '2023' },
    { id: 'redmi-note-11', label: 'Redmi Note 11', year: '2022' },
  ],
  realme: [
    { id: 'gt-5', label: 'Realme GT 5', year: '2023' },
    { id: '11-pro', label: 'Realme 11 Pro', year: '2023' },
    { id: '10-pro', label: 'Realme 10 Pro', year: '2022' },
  ],
  vivo: [
    { id: 'v27-pro', label: 'Vivo V27 Pro', year: '2023' },
    { id: 'v27', label: 'Vivo V27', year: '2023' },
    { id: 'y100', label: 'Vivo Y100', year: '2023' },
  ],
  oppo: [
    { id: 'reno10-pro', label: 'Reno 10 Pro', year: '2023' },
    { id: 'reno10', label: 'Reno 10', year: '2023' },
    { id: 'a78', label: 'Oppo A78', year: '2023' },
  ],
  google: [
    { id: 'pixel-8-pro', label: 'Pixel 8 Pro', year: '2023' },
    { id: 'pixel-8', label: 'Pixel 8', year: '2023' },
    { id: 'pixel-7a', label: 'Pixel 7a', year: '2023' },
  ],
};

interface Props {
  flowData: SellFlowData;
  updateFlow: (d: Partial<SellFlowData>) => void;
  onNext: () => void;
}

export default function StepModel({ flowData, updateFlow, onNext }: Props) {
  const [search, setSearch] = useState('');
  const models = modelsByBrand[flowData.brand] || modelsByBrand['apple'];
  const filtered = models.filter((m) => m.label.toLowerCase().includes(search.toLowerCase()));

  const handleSelect = (model: typeof models[0]) => {
    updateFlow({ model: model.id, modelLabel: model.label });
    onNext();
  };

  return (
    <div className="px-4 pt-4 pb-6">
      <h2 className="text-lg font-bold text-foreground mb-1">Select Model</h2>
      <p className="text-sm text-muted-foreground mb-4">
        Brand: <span className="text-primary font-semibold">{flowData.brandLabel}</span>
      </p>

      <div className="flex items-center gap-2 bg-card rounded-xl border border-border px-3 py-2.5 mb-4">
        <Icon name="MagnifyingGlassIcon" size={16} className="text-muted-foreground" />
        <input
          type="text"
          placeholder={`Search ${flowData.brandLabel} models...`}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
        />
      </div>

      <div className="space-y-2">
        {filtered.map((model) => (
          <button
            key={model.id}
            onClick={() => handleSelect(model)}
            className={`w-full flex items-center justify-between p-4 rounded-2xl border-2 transition-all duration-200 text-left ${
              flowData.model === model.id
                ? 'border-primary bg-green-light' :'border-border bg-card hover:border-primary/40 hover:bg-muted'
            }`}
          >
            <div>
              <p className="text-sm font-semibold text-foreground">{model.label}</p>
              <p className="text-xs text-muted-foreground">{model.year}</p>
            </div>
            <Icon name="ChevronRightIcon" size={16} className="text-muted-foreground" />
          </button>
        ))}
      </div>
    </div>
  );
}