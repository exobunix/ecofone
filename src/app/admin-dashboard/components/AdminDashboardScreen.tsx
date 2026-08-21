'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import AppLogo from '@/components/ui/AppLogo';
import Icon from '@/components/ui/AppIcon';
import KpiCards from './KpiCards';
import RevenueChart from './RevenueChart';
import OrdersTable from './OrdersTable';
import AdminSidebar from './AdminSidebar';

export default function AdminDashboardScreen() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [dateFilter, setDateFilter] = useState('7d');
  const [currentTab, setCurrentTab] = useState('dashboard');

  const renderTabContent = () => {
    switch (currentTab) {
      case 'dashboard':
        return (
          <>
            {/* KPI Cards */}
            <KpiCards />

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <div className="lg:col-span-2">
                <RevenueChart />
              </div>
              <div>
                <CategoryDonut />
              </div>
            </div>

            {/* Orders Tables */}
            <OrdersTable />
          </>
        );
      case 'sell_orders':
      case 'buy_orders':
      case 'pickups':
      case 'inspections':
        return (
          <div className="bg-card rounded-2xl border border-border p-6 shadow-sm space-y-4">
            <h2 className="text-base font-extrabold text-foreground capitalize">
              {currentTab.replace('_', ' ')} Manager
            </h2>
            <p className="text-xs text-muted-foreground">
              Review and manage system order records and updates.
            </p>
            <OrdersTable />
          </div>
        );
      case 'customers':
        return (
          <div className="bg-card rounded-2xl border border-border p-6 shadow-sm space-y-4">
            <h2 className="text-base font-extrabold text-foreground">Customer Management</h2>
            <p className="text-xs text-muted-foreground">
              View registered customer profiles and platform details.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead>
                  <tr className="border-b border-border bg-muted/50 text-xs font-bold text-muted-foreground">
                    <th className="px-4 py-3">Customer ID</th>
                    <th className="px-4 py-3">Name</th>
                    <th className="px-4 py-3">Email</th>
                    <th className="px-4 py-3">Verified</th>
                  </tr>
                </thead>
                <tbody className="text-xs">
                  <tr className="border-b border-border">
                    <td className="px-4 py-3 font-mono text-primary font-bold">USR-841920</td>
                    <td className="px-4 py-3 font-semibold">Priya Nair</td>
                    <td className="px-4 py-3">priya@example.com</td>
                    <td className="px-4 py-3 text-success font-semibold">Yes</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="px-4 py-3 font-mono text-primary font-bold">USR-294012</td>
                    <td className="px-4 py-3 font-semibold">Rahul Mehta</td>
                    <td className="px-4 py-3">rahul@mehta.com</td>
                    <td className="px-4 py-3 text-success font-semibold">Yes</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        );
      default:
        return (
          <div className="bg-card rounded-2xl border border-border p-8 shadow-sm text-center space-y-3">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto text-primary">
              <Icon name="WrenchIcon" size={24} />
            </div>
            <div>
              <h3 className="text-sm font-bold text-foreground capitalize">{currentTab.replace('_', ' ')}</h3>
              <p className="text-xs text-muted-foreground mt-1">This module is currently being optimized. Check back soon!</p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-muted flex">
      {/* Sidebar */}
      <AdminSidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        currentTab={currentTab}
        onChangeTab={setCurrentTab}
      />
      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Admin Header */}
        <header className="glass-nav px-4 lg:px-6 py-3 flex items-center justify-between sticky top-0 z-20">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 rounded-xl bg-muted lg:hidden"
            >
              <Icon name="Bars3Icon" size={20} className="text-foreground" />
            </button>
            <div className="flex items-center gap-2">
              <AppLogo size={28} />
              <span className="font-bold text-base text-primary hidden sm:block">ecofone</span>
              <span className="text-muted-foreground text-sm hidden sm:block">/ Admin</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Date Filter */}
            <div className="hidden md:flex items-center gap-1 bg-card border border-border rounded-xl p-1">
              {[
                { id: '7d', label: '7D' },
                { id: '30d', label: '30D' },
                { id: '90d', label: '90D' },
                { id: 'ytd', label: 'YTD' },
              ]?.map((f) => (
                <button
                  key={f?.id}
                  onClick={() => setDateFilter(f?.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    dateFilter === f?.id ? 'bg-primary text-white' : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {f?.label}
                </button>
              ))}
            </div>

            <button className="relative p-2 rounded-xl bg-muted">
              <Icon name="BellIcon" size={18} className="text-foreground" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-eco-error rounded-full" />
            </button>

            <div className="flex items-center gap-2 bg-card border border-border rounded-xl px-3 py-2">
              <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                <span className="text-[10px] font-bold text-white">SA</span>
              </div>
              <span className="text-xs font-semibold text-foreground hidden sm:block">Super Admin</span>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 p-4 lg:p-6 space-y-5 overflow-y-auto">
          {/* Page Title */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-extrabold text-foreground capitalize">
                {currentTab.replace('_', ' ')}
              </h1>
              <p className="text-sm text-muted-foreground">August 21, 2026 · Overview</p>
            </div>
            <div className="flex items-center gap-2">
              <button className="flex items-center gap-1.5 px-3 py-2 bg-card border border-border rounded-xl text-xs font-semibold text-foreground hover:border-primary/40 transition-colors">
                <Icon name="ArrowDownTrayIcon" size={14} className="text-primary" />
                Export
              </button>
              <Link
                href="/product-listing"
                className="flex items-center gap-1.5 px-3 py-2 bg-primary text-white rounded-xl text-xs font-bold"
              >
                <Icon name="PlusIcon" size={14} className="text-white" />
                Add Product
              </Link>
            </div>
          </div>

          {renderTabContent()}
        </main>
      </div>
    </div>
  );
}

function CategoryDonut() {
  const categories = [
    { label: 'Smartphones', value: 68, color: 'bg-primary' },
    { label: 'Laptops', value: 20, color: 'bg-blue-500' },
    { label: 'Tablets', value: 7, color: 'bg-amber-500' },
    { label: 'Others', value: 5, color: 'bg-muted-foreground' },
  ];

  return (
    <div className="bg-card rounded-2xl border border-border p-5 h-full">
      <h3 className="text-sm font-bold text-foreground mb-4">Sales by Category</h3>
      <div className="space-y-3">
        {categories?.map((cat) => (
          <div key={cat?.label}>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-muted-foreground font-medium">{cat?.label}</span>
              <span className="font-bold text-foreground">{cat?.value}%</span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div
                className={`h-full ${cat?.color} rounded-full transition-all duration-700`}
                style={{ width: `${cat?.value}%` }}
              />
            </div>
          </div>
        ))}
      </div>
      <div className="mt-5 pt-4 border-t border-border">
        <p className="text-xs text-muted-foreground mb-1">Total Devices Sold</p>
        <p className="text-2xl font-extrabold text-foreground">4,821</p>
        <p className="text-xs text-success font-semibold">↑ 12.4% vs last month</p>
      </div>
    </div>
  );
}