'use client';
import React, { useState } from 'react';
import Icon from '@/components/ui/AppIcon';

interface Props {
  onClose: () => void;
  priceRange: [number, number];
  onPriceChange: (range: [number, number]) => void;
}

const brands = ['Apple', 'Samsung', 'OnePlus', 'Xiaomi', 'Realme', 'Vivo', 'Google'];
const storageOptions = ['32 GB', '64 GB', '128 GB', '256 GB', '512 GB'];
const warrantyOptions = ['3 months', '6 months', '12 months'];

export default function FilterDrawer({ onClose, priceRange, onPriceChange }: Props) {
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedStorage, setSelectedStorage] = useState<string[]>([]);
  const [selectedWarranty, setSelectedWarranty] = useState<string[]>([]);
  const [minRating, setMinRating] = useState(0);
  const [localPrice, setLocalPrice] = useState<[number, number]>(priceRange);

  const toggleArr = (arr: string[], setArr: (a: string[]) => void, val: string) => {
    setArr(arr.includes(val) ? arr.filter((i) => i !== val) : [...arr, val]);
  };

  const applyFilters = () => {
    onPriceChange(localPrice);
    onClose();
  };

  const resetFilters = () => {
    setSelectedBrands([]);
    setSelectedStorage([]);
    setSelectedWarranty([]);
    setMinRating(0);
    setLocalPrice([0, 100000]);
    onPriceChange([0, 100000]);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative w-full bg-card rounded-t-3xl max-h-[85vh] overflow-y-auto bottom-sheet-enter">
        <div className="sticky top-0 bg-card rounded-t-3xl px-4 pt-4 pb-3 border-b border-border flex items-center justify-between z-10">
          <h3 className="text-base font-bold text-foreground">Filters</h3>
          <div className="flex items-center gap-3">
            <button onClick={resetFilters} className="text-xs font-semibold text-primary">Reset</button>
            <button onClick={onClose} className="p-1.5 rounded-lg bg-muted">
              <Icon name="XMarkIcon" size={18} className="text-foreground" />
            </button>
          </div>
        </div>

        <div className="p-4 space-y-5">
          {/* Brand */}
          <div>
            <p className="text-sm font-bold text-foreground mb-3">Brand</p>
            <div className="flex flex-wrap gap-2">
              {brands.map((b) => (
                <button
                  key={b}
                  onClick={() => toggleArr(selectedBrands, setSelectedBrands, b)}
                  className={`px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all ${
                    selectedBrands.includes(b) ? 'border-primary bg-green-light text-primary' : 'border-border text-foreground bg-card'
                  }`}
                >
                  {b}
                </button>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div>
            <p className="text-sm font-bold text-foreground mb-3">
              Price Range: <span className="text-primary">₹{localPrice[0].toLocaleString('en-IN')} – ₹{localPrice[1].toLocaleString('en-IN')}</span>
            </p>
            <input
              type="range"
              min={0}
              max={100000}
              step={1000}
              value={localPrice[1]}
              onChange={(e) => setLocalPrice([localPrice[0], parseInt(e.target.value)])}
              className="w-full accent-primary"
            />
          </div>

          {/* Storage */}
          <div>
            <p className="text-sm font-bold text-foreground mb-3">Storage</p>
            <div className="flex flex-wrap gap-2">
              {storageOptions.map((s) => (
                <button
                  key={s}
                  onClick={() => toggleArr(selectedStorage, setSelectedStorage, s)}
                  className={`px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all ${
                    selectedStorage.includes(s) ? 'border-primary bg-green-light text-primary' : 'border-border text-foreground bg-card'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Warranty */}
          <div>
            <p className="text-sm font-bold text-foreground mb-3">Warranty</p>
            <div className="flex flex-wrap gap-2">
              {warrantyOptions.map((w) => (
                <button
                  key={w}
                  onClick={() => toggleArr(selectedWarranty, setSelectedWarranty, w)}
                  className={`px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all ${
                    selectedWarranty.includes(w) ? 'border-primary bg-green-light text-primary' : 'border-border text-foreground bg-card'
                  }`}
                >
                  {w}
                </button>
              ))}
            </div>
          </div>

          {/* Min Rating */}
          <div>
            <p className="text-sm font-bold text-foreground mb-3">Minimum Rating</p>
            <div className="flex gap-2">
              {[3, 3.5, 4, 4.5].map((r) => (
                <button
                  key={r}
                  onClick={() => setMinRating(r)}
                  className={`flex items-center gap-1 px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all ${
                    minRating === r ? 'border-primary bg-green-light text-primary' : 'border-border text-foreground bg-card'
                  }`}
                >
                  <Icon name="StarIcon" size={12} className="text-warning" variant="solid" />
                  {r}+
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="sticky bottom-0 bg-card border-t border-border px-4 py-4">
          <button
            onClick={applyFilters}
            className="w-full py-4 bg-primary text-white rounded-2xl text-sm font-bold shadow-cta-green"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
}