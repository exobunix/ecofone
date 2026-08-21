'use client';
import React, { useState } from 'react';
import type { SellFlowData } from './SellDeviceScreen';

const storageOptions = ['64 GB', '128 GB', '256 GB', '512 GB', '1 TB'];
const ramOptions = ['4 GB', '6 GB', '8 GB', '12 GB', '16 GB'];

interface Props {
  flowData: SellFlowData;
  updateFlow: (d: Partial<SellFlowData>) => void;
  onNext: () => void;
}

export default function StepVariant({ flowData, updateFlow, onNext }: Props) {
  const [storage, setStorage] = React.useState('');
  const [ram, setRam] = React.useState('');

  const handleContinue = () => {
    if (!storage) return;
    updateFlow({ variant: `${ram || ''}/${storage}`, variantLabel: `${ram ? ram + ' RAM / ' : ''}${storage}` });
    onNext();
  };

  return (
    <div className="px-4 pt-4 pb-6">
      <h2 className="text-lg font-bold text-foreground mb-1">Select Variant</h2>
      <p className="text-sm text-muted-foreground mb-5">
        Model: <span className="text-primary font-semibold">{flowData.modelLabel}</span>
      </p>

      <div className="mb-5">
        <p className="text-sm font-bold text-foreground mb-3">Storage</p>
        <div className="flex flex-wrap gap-2">
          {storageOptions.map((opt) => (
            <button
              key={opt}
              onClick={() => setStorage(opt)}
              className={`px-4 py-2 rounded-xl border-2 text-sm font-semibold transition-all duration-200 ${
                storage === opt
                  ? 'border-primary bg-green-light text-primary' :'border-border bg-card text-foreground hover:border-primary/40'
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-8">
        <p className="text-sm font-bold text-foreground mb-3">RAM (Optional)</p>
        <div className="flex flex-wrap gap-2">
          {ramOptions.map((opt) => (
            <button
              key={opt}
              onClick={() => setRam(opt)}
              className={`px-4 py-2 rounded-xl border-2 text-sm font-semibold transition-all duration-200 ${
                ram === opt
                  ? 'border-primary bg-green-light text-primary' :'border-border bg-card text-foreground hover:border-primary/40'
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={handleContinue}
        disabled={!storage}
        className={`w-full py-4 rounded-2xl text-sm font-bold transition-all duration-300 ${
          storage
            ? 'bg-primary text-white shadow-cta-green hover:bg-primary/90'
            : 'bg-muted text-muted-foreground cursor-not-allowed'
        }`}
      >
        Continue
      </button>
    </div>
  );
}