'use client';
import React, { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import BottomNav from '@/components/BottomNav';
import StepCategory from './StepCategory';
import StepBrand from './StepBrand';
import StepModel from './StepModel';
import StepVariant from './StepVariant';
import StepQnA from './StepQnA';
import StepQuote from './StepQuote';

export type SellFlowData = {
  category: string;
  categoryLabel: string;
  brand: string;
  brandLabel: string;
  model: string;
  modelLabel: string;
  variant: string;
  variantLabel: string;
  answers: Record<string, string | string[]>;
  currentPrice: number;
};

const STEPS = ['Category', 'Brand', 'Model', 'Variant', 'Q&A', 'Quote'];

export default function SellDeviceScreen() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [flowData, setFlowData] = useState<SellFlowData>({
    category: '',
    categoryLabel: '',
    brand: '',
    brandLabel: '',
    model: '',
    modelLabel: '',
    variant: '',
    variantLabel: '',
    answers: {},
    currentPrice: 0,
  });

  const goNext = useCallback(() => setStep((s) => Math.min(s + 1, STEPS.length - 1)), []);
  const goBack = useCallback(() => {
    if (step === 0) router.push('/');
    else setStep((s) => s - 1);
  }, [step, router]);

  const updateFlow = useCallback((data: Partial<SellFlowData>) => {
    setFlowData((prev) => ({ ...prev, ...data }));
  }, []);

  const progressPercent = ((step + 1) / STEPS.length) * 100;

  return (
    <div className="min-h-screen bg-background flex flex-col pb-24">
      <Header
        title={`Sell Your Device`}
        showBack
        onBack={goBack}
        rightElement={
          <span className="text-xs font-semibold text-muted-foreground">
            {step + 1}/{STEPS.length}
          </span>
        }
      />

      {/* Progress Bar */}
      <div className="h-1 bg-muted w-full">
        <div
          className="h-full bg-primary progress-bar-fill rounded-full"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Step Labels */}
      <div className="px-4 pt-3 pb-1 flex items-center gap-1 overflow-x-auto scrollbar-hide">
        {STEPS.map((s, i) => (
          <div key={s} className="flex items-center gap-1 flex-shrink-0">
            <div
              className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold transition-all duration-300 ${
                i < step
                  ? 'bg-primary text-white'
                  : i === step
                  ? 'bg-primary text-white ring-2 ring-primary/30' :'bg-muted text-muted-foreground'
              }`}
            >
              {i < step ? '✓' : i + 1}
            </div>
            <span
              className={`text-[10px] font-semibold whitespace-nowrap ${
                i === step ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              {s}
            </span>
            {i < STEPS.length - 1 && (
              <div className={`w-4 h-px ${i < step ? 'bg-primary' : 'bg-border'}`} />
            )}
          </div>
        ))}
      </div>

      {/* Step Content */}
      <div className="flex-1 overflow-hidden">
        <div className="step-transition h-full">
          {step === 0 && (
            <StepCategory flowData={flowData} updateFlow={updateFlow} onNext={goNext} />
          )}
          {step === 1 && (
            <StepBrand flowData={flowData} updateFlow={updateFlow} onNext={goNext} />
          )}
          {step === 2 && (
            <StepModel flowData={flowData} updateFlow={updateFlow} onNext={goNext} />
          )}
          {step === 3 && (
            <StepVariant flowData={flowData} updateFlow={updateFlow} onNext={goNext} />
          )}
          {step === 4 && (
            <StepQnA flowData={flowData} updateFlow={updateFlow} onNext={goNext} />
          )}
          {step === 5 && (
            <StepQuote flowData={flowData} />
          )}
        </div>
      </div>

      <BottomNav activeTab="sell" />
    </div>
  );
}