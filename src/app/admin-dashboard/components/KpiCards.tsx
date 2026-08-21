import React from 'react';
import Icon from '@/components/ui/AppIcon';

const kpis = [
  {
    label: 'Total Users',
    value: '18,294',
    change: '+8.2%',
    changeDir: 'up',
    icon: 'UsersIcon',
    iconBg: 'bg-blue-50',
    iconColor: 'text-blue-600',
  },
  {
    label: 'Sell Orders',
    value: '3,841',
    change: '+14.5%',
    changeDir: 'up',
    icon: 'ArrowUpCircleIcon',
    iconBg: 'bg-green-light',
    iconColor: 'text-primary',
  },
  {
    label: 'Buy Orders',
    value: '2,156',
    change: '+6.3%',
    changeDir: 'up',
    icon: 'ShoppingBagIcon',
    iconBg: 'bg-purple-50',
    iconColor: 'text-purple-600',
  },
  {
    label: 'GMV',
    value: '₹4.2 Cr',
    change: '+22.1%',
    changeDir: 'up',
    icon: 'CurrencyRupeeIcon',
    iconBg: 'bg-amber-50',
    iconColor: 'text-amber-600',
  },
  {
    label: 'Pending Pickups',
    value: '127',
    change: '-5.4%',
    changeDir: 'down',
    icon: 'TruckIcon',
    iconBg: 'bg-red-50',
    iconColor: 'text-eco-error',
  },
  {
    label: 'Inventory',
    value: '1,482',
    change: '+3.1%',
    changeDir: 'up',
    icon: 'CubeIcon',
    iconBg: 'bg-teal-50',
    iconColor: 'text-teal-600',
  },
];

export default function KpiCards() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3">
      {kpis.map((kpi) => (
        <div
          key={kpi.label}
          className="bg-card rounded-2xl border border-border p-4 card-hover shadow-sm"
        >
          <div className={`w-9 h-9 rounded-xl ${kpi.iconBg} flex items-center justify-center mb-3`}>
            <Icon name={kpi.icon as 'UsersIcon'} size={18} className={kpi.iconColor} />
          </div>
          <p className="text-xs text-muted-foreground font-medium mb-0.5">{kpi.label}</p>
          <p className="text-lg font-extrabold text-foreground leading-tight">{kpi.value}</p>
          <div className={`flex items-center gap-0.5 mt-1 text-[11px] font-semibold ${kpi.changeDir === 'up' ? 'text-success' : 'text-eco-error'}`}>
            <Icon
              name={kpi.changeDir === 'up' ? 'ArrowTrendingUpIcon' : 'ArrowTrendingDownIcon'}
              size={12}
              className={kpi.changeDir === 'up' ? 'text-success' : 'text-eco-error'}
            />
            {kpi.change}
          </div>
        </div>
      ))}
    </div>
  );
}