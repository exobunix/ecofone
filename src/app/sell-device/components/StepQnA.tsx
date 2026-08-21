'use client';
import React, { useState, useEffect } from 'react';
import Icon from '@/components/ui/AppIcon';
import type { SellFlowData } from './SellDeviceScreen';

const questions = [
  {
    id: 'screen',
    text: 'What is the condition of the screen?',
    type: 'single',
    options: [
      { id: 'perfect', label: 'No scratches or cracks', priceEffect: 0 },
      { id: 'minor', label: 'Minor scratches (not visible in use)', priceEffect: -1500 },
      { id: 'cracked', label: 'Cracked or broken', priceEffect: -5000 },
    ],
  },
  {
    id: 'battery',
    text: 'Battery health / backup status?',
    type: 'single',
    options: [
      { id: 'excellent', label: 'Excellent (full day battery)', priceEffect: 0 },
      { id: 'good', label: 'Good (8+ hours)', priceEffect: -800 },
      { id: 'average', label: 'Average (less than 6 hours)', priceEffect: -2000 },
    ],
  },
  {
    id: 'body',
    text: 'How is the physical body / frame?',
    type: 'single',
    options: [
      { id: 'no_dents', label: 'No dents or bends', priceEffect: 0 },
      { id: 'minor_dents', label: 'Minor dents/scratches', priceEffect: -1000 },
      { id: 'major_damage', label: 'Major damage or bends', priceEffect: -3000 },
    ],
  },
  {
    id: 'accessories',
    text: 'What accessories do you have?',
    type: 'multi',
    options: [
      { id: 'box', label: 'Original box', priceEffect: 500 },
      { id: 'charger', label: 'Original charger', priceEffect: 300 },
      { id: 'earphones', label: 'Original earphones', priceEffect: 200 },
      { id: 'none', label: 'None', priceEffect: 0 },
    ],
  },
  {
    id: 'fingerprint',
    text: 'Is the fingerprint/Face ID working?',
    type: 'single',
    options: [
      { id: 'yes', label: 'Yes, working perfectly', priceEffect: 0 },
      { id: 'no', label: 'Not working', priceEffect: -1500 },
    ],
  },
];

const BASE_PRICES: Record<string, number> = {
  'iphone-15-pro-max': 75000,
  'iphone-15-pro': 65000,
  'iphone-15': 55000,
  'iphone-14-pro-max': 62000,
  'iphone-14-pro': 52000,
  'iphone-14': 42000,
  'iphone-13': 35000,
  'iphone-12': 26000,
  's23-ultra': 55000,
  's23-plus': 45000,
  's23': 38000,
  's22': 30000,
  'a54': 22000,
  'a34': 16000,
  '11': 32000,
  '11r': 28000,
  '10-pro': 25000,
  'nord-3': 22000,
  '13-pro': 40000,
  '13': 32000,
  '12-pro': 28000,
  'redmi-note-12': 14000,
  'redmi-note-11': 11000,
};

interface Props {
  flowData: SellFlowData;
  updateFlow: (d: Partial<SellFlowData>) => void;
  onNext: () => void;
}

export default function StepQnA({ flowData, updateFlow, onNext }: Props) {
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});
  const [price, setPrice] = useState(() => BASE_PRICES[flowData.model] || 25000);
  const [priceAnimating, setPriceAnimating] = useState(false);

  const question = questions[currentQ];

  const triggerPriceAnim = () => {
    setPriceAnimating(true);
    setTimeout(() => setPriceAnimating(false), 400);
  };

  const handleSingleAnswer = (optId: string, priceEffect: number) => {
    const newAnswers = { ...answers, [question.id]: optId };
    setAnswers(newAnswers);
    const newPrice = Math.max(price + priceEffect, 1000);
    setPrice(newPrice);
    triggerPriceAnim();
    updateFlow({ answers: newAnswers, currentPrice: newPrice });

    setTimeout(() => {
      if (currentQ < questions.length - 1) {
        setCurrentQ((q) => q + 1);
      } else {
        onNext();
      }
    }, 300);
  };

  const handleMultiAnswer = (optId: string, priceEffect: number) => {
    const current = (answers[question.id] as string[]) || [];
    let updated: string[];
    if (optId === 'none') {
      updated = ['none'];
    } else {
      updated = current.includes(optId)
        ? current.filter((id) => id !== optId && id !== 'none')
        : [...current.filter((id) => id !== 'none'), optId];
    }
    setAnswers({ ...answers, [question.id]: updated });
  };

  const handleMultiNext = () => {
    const selected = (answers[question.id] as string[]) || [];
    const effectSum = question.options
      .filter((o) => selected.includes(o.id))
      .reduce((acc, o) => acc + o.priceEffect, 0);
    const newPrice = Math.max(price + effectSum, 1000);
    setPrice(newPrice);
    triggerPriceAnim();
    updateFlow({ answers, currentPrice: newPrice });
    if (currentQ < questions.length - 1) {
      setCurrentQ((q) => q + 1);
    } else {
      onNext();
    }
  };

  const progressQ = ((currentQ + 1) / questions.length) * 100;

  return (
    <div className="flex flex-col h-full">
      {/* Live Price Banner */}
      <div className="mx-4 mt-4 bg-card rounded-2xl border border-border shadow-card-green p-4 flex items-center justify-between mb-4">
        <div>
          <p className="text-xs text-muted-foreground font-medium">Estimated Price</p>
          <p className={`text-2xl font-extrabold text-primary ${priceAnimating ? 'price-counter-animation' : ''}`}>
            ₹{price.toLocaleString('en-IN')}
          </p>
        </div>
        <div className="flex items-center gap-1.5 bg-green-light rounded-xl px-3 py-1.5">
          <Icon name="TrendingUpIcon" size={14} className="text-primary" />
          <span className="text-xs font-bold text-primary">Live Quote</span>
        </div>
      </div>

      {/* Q progress */}
      <div className="px-4 mb-4">
        <div className="flex justify-between text-xs text-muted-foreground mb-1.5">
          <span>Question {currentQ + 1} of {questions.length}</span>
          <span>{Math.round(progressQ)}% done</span>
        </div>
        <div className="h-1.5 bg-muted rounded-full">
          <div className="h-full bg-accent rounded-full progress-bar-fill" style={{ width: `${progressQ}%` }} />
        </div>
      </div>

      {/* Question */}
      <div className="px-4 flex-1 step-transition">
        <h3 className="text-base font-bold text-foreground mb-4">{question.text}</h3>
        <div className="space-y-2">
          {question.options.map((opt) => {
            const isSelected = question.type === 'multi'
              ? ((answers[question.id] as string[]) || []).includes(opt.id)
              : answers[question.id] === opt.id;
            return (
              <button
                key={opt.id}
                onClick={() =>
                  question.type === 'single'
                    ? handleSingleAnswer(opt.id, opt.priceEffect)
                    : handleMultiAnswer(opt.id, opt.priceEffect)
                }
                className={`w-full flex items-center justify-between p-4 rounded-2xl border-2 transition-all duration-200 text-left ${
                  isSelected
                    ? 'border-primary bg-green-light' :'border-border bg-card hover:border-primary/40'
                }`}
              >
                <span className="text-sm font-medium text-foreground">{opt.label}</span>
                <div className="flex items-center gap-2">
                  {opt.priceEffect !== 0 && (
                    <span className={`text-xs font-bold ${opt.priceEffect > 0 ? 'text-success' : 'text-eco-error'}`}>
                      {opt.priceEffect > 0 ? '+' : ''}₹{Math.abs(opt.priceEffect).toLocaleString('en-IN')}
                    </span>
                  )}
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${isSelected ? 'border-primary bg-primary' : 'border-border'}`}>
                    {isSelected && <Icon name="CheckIcon" size={12} className="text-white" />}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {question.type === 'multi' && (
          <button
            onClick={handleMultiNext}
            className="w-full mt-4 py-4 bg-primary text-white rounded-2xl text-sm font-bold shadow-cta-green hover:bg-primary/90 transition-all"
          >
            Continue
          </button>
        )}
      </div>
    </div>
  );
}