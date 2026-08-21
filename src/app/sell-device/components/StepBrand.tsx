'use client';
import React, { useState } from 'react';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';
import type { SellFlowData } from './SellDeviceScreen';

const brands = [
{ id: 'apple', label: 'Apple', logo: "https://images.unsplash.com/photo-1678059285248-031d5128c38a", alt: 'Apple logo on silver background' },
{ id: 'samsung', label: 'Samsung', logo: "https://images.unsplash.com/photo-1677995432796-c2518daf8e77", alt: 'Samsung smartphone showing brand identity' },
{ id: 'oneplus', label: 'OnePlus', logo: "https://img.rocket.new/generatedImages/rocket_gen_img_12b42f3b3-1773054280340.png", alt: 'OnePlus smartphone with brand logo' },
{ id: 'xiaomi', label: 'Xiaomi', logo: "https://img.rocket.new/generatedImages/rocket_gen_img_1fc3ac79f-1778929539924.png", alt: 'Xiaomi smartphone in light color' },
{ id: 'realme', label: 'Realme', logo: "https://img.rocket.new/generatedImages/rocket_gen_img_18bb156f7-1778930097680.png", alt: 'Realme smartphone with gradient back panel' },
{ id: 'vivo', label: 'Vivo', logo: "https://img.rocket.new/generatedImages/rocket_gen_img_11a806b27-1778508934120.png", alt: 'Vivo smartphone showing sleek design' },
{ id: 'oppo', label: 'Oppo', logo: "https://images.unsplash.com/photo-1649859397268-251f729c4e09", alt: 'Oppo smartphone in elegant color' },
{ id: 'google', label: 'Google Pixel', logo: "https://images.unsplash.com/photo-1602469841943-21af2208754b", alt: 'Google Pixel smartphone in purple' }];


interface Props {
  flowData: SellFlowData;
  updateFlow: (d: Partial<SellFlowData>) => void;
  onNext: () => void;
}

export default function StepBrand({ flowData, updateFlow, onNext }: Props) {
  const [search, setSearch] = useState('');
  const filtered = brands.filter((b) => b.label.toLowerCase().includes(search.toLowerCase()));

  const handleSelect = (brand: typeof brands[0]) => {
    updateFlow({ brand: brand.id, brandLabel: brand.label });
    onNext();
  };

  return (
    <div className="px-4 pt-4 pb-6">
      <h2 className="text-lg font-bold text-foreground mb-1">Select Brand</h2>
      <p className="text-sm text-muted-foreground mb-4">
        Selling: <span className="text-primary font-semibold">{flowData.categoryLabel}</span>
      </p>

      <div className="flex items-center gap-2 bg-card rounded-xl border border-border px-3 py-2.5 mb-5">
        <Icon name="MagnifyingGlassIcon" size={16} className="text-muted-foreground" />
        <input
          type="text"
          placeholder="Search brand..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none" />

      </div>

      <div className="grid grid-cols-3 gap-3">
        {filtered.map((brand) =>
        <button
          key={brand.id}
          onClick={() => handleSelect(brand)}
          className={`flex flex-col items-center gap-2 p-3 rounded-2xl border-2 transition-all duration-200 ${
          flowData.brand === brand.id ?
          'border-primary bg-green-light' : 'border-border bg-card hover:border-primary/40'}`
          }>

            <div className="w-14 h-14 rounded-xl overflow-hidden bg-muted">
              <AppImage src={brand.logo} alt={brand.alt} width={56} height={56} className="object-cover w-full h-full" />
            </div>
            <span className="text-xs font-semibold text-foreground text-center leading-tight">{brand.label}</span>
          </button>
        )}
      </div>
    </div>);

}