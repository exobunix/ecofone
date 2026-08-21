import React from 'react';
import Icon from '@/components/ui/AppIcon';

const badges = [
  {
    icon: 'ShieldCheckIcon',
    title: '32+ Quality Checks',
    sub: 'On every device',
    color: 'text-primary',
    bg: 'bg-green-light',
  },
  {
    icon: 'ArrowPathIcon',
    title: '7 Days Easy Return',
    sub: 'No questions asked',
    color: 'text-blue-600',
    bg: 'bg-blue-50',
  },
  {
    icon: 'LockClosedIcon',
    title: '100% Secure Payment',
    sub: 'Instant bank transfer',
    color: 'text-amber-600',
    bg: 'bg-amber-50',
  },
];

export default function TrustBadges() {
  return (
    <div className="bg-card rounded-2xl border border-border shadow-sm p-4">
      <div className="grid grid-cols-3 gap-3">
        {badges.map((b) => (
          <div key={b.title} className="flex flex-col items-center text-center gap-2">
            <div className={`w-10 h-10 rounded-xl ${b.bg} flex items-center justify-center`}>
              <Icon name={b.icon as 'ShieldCheckIcon'} size={20} className={b.color} />
            </div>
            <div>
              <p className="text-[11px] font-bold text-foreground leading-tight">{b.title}</p>
              <p className="text-[10px] text-muted-foreground leading-tight">{b.sub}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}