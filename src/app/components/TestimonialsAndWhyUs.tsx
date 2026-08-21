'use client';
import React from 'react';
import Icon from '@/components/ui/AppIcon';

export default function TestimonialsAndWhyUs() {
  const whyUsItems = [
    {
      icon: 'ShieldCheckIcon',
      title: 'Certified Quality Checks',
      desc: 'Every phone goes through 45+ rigorous software and hardware diagnostic checks before purchase or listing.',
      color: 'bg-primary/10 text-primary',
    },
    {
      icon: 'GlobeAmericasIcon',
      title: 'Environmentally Friendly',
      desc: 'Reducing carbon emissions and electronic waste by giving premium smartphones a verified second life.',
      color: 'bg-blue-50 text-blue-700',
    },
    {
      icon: 'BanknotesIcon',
      title: 'Best Market Valuation',
      desc: 'Our dynamic AI pricing engine calculates the fairest condition-based pricing for your devices.',
      color: 'bg-green-50 text-green-700',
    },
    {
      icon: 'TruckIcon',
      title: 'Free Doorstep Service',
      desc: 'Enjoy free inspections and instant payments right from the comfort of your home or office.',
      color: 'bg-amber-50 text-amber-700',
    },
  ];

  const testimonials = [
    {
      name: 'Priya Nair',
      device: 'Sold iPhone 14 Pro',
      quote: 'Selling my iPhone was so simple! The pick-up agent came right on time, verified the condition, and transferred the money instantly.',
      rating: 5,
      date: '1 day ago',
    },
    {
      name: 'Rahul Mehta',
      device: 'Bought Galaxy S23',
      quote: 'I was hesitant about buying a refurbished phone, but the S23 looks brand new! Zero scratches, 94% battery health, and saved ₹25,000.',
      rating: 5,
      date: '3 days ago',
    },
    {
      name: 'Ananya Singh',
      device: 'Sold OnePlus 11',
      quote: 'Wonderful initiative! Quick diagnostic check, polite staff, and fair trade-in value. Highly recommend Ecofone.',
      rating: 4.8,
      date: '1 week ago',
    },
  ];

  return (
    <div className="space-y-6 pt-2">
      {/* Why Choose Us */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold text-foreground">Why Choose Ecofone?</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {whyUsItems.map((item, idx) => (
            <div key={idx} className="bg-card rounded-2xl border border-border p-4 flex gap-3.5 items-start">
              <div className={`p-2.5 rounded-xl ${item.color} flex-shrink-0`}>
                <Icon name={item.icon as 'ShieldCheckIcon'} size={20} />
              </div>
              <div className="space-y-1">
                <h4 className="text-xs font-bold text-foreground">{item.title}</h4>
                <p className="text-[11px] text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Testimonials */}
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <h3 className="text-sm font-bold text-foreground">What Our Customers Say</h3>
          <span className="text-[10px] font-bold text-primary flex items-center gap-0.5">
            ★ 4.9/5 Average
          </span>
        </div>

        <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-none snap-x snap-mandatory">
          {testimonials.map((test, idx) => (
            <div
              key={idx}
              className="bg-card rounded-2xl border border-border p-4 flex-shrink-0 w-[280px] snap-center space-y-3"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="text-xs font-bold text-foreground">{test.name}</h4>
                  <p className="text-[9px] text-muted-foreground">{test.device}</p>
                </div>
                <div className="flex items-center gap-0.5 text-primary text-[10px] font-bold">
                  <span>★</span>
                  <span>{test.rating}</span>
                </div>
              </div>
              <p className="text-[10px] text-muted-foreground italic leading-relaxed">
                &ldquo;{test.quote}&rdquo;
              </p>
              <div className="text-[9px] text-muted-foreground text-right">
                {test.date}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
