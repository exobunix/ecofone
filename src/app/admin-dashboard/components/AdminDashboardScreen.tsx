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
      case 'analytics':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-card border border-border rounded-2xl p-5">
                <p className="text-xs font-semibold text-muted-foreground">Conversion Rate</p>
                <h3 className="text-xl font-extrabold text-foreground mt-1">3.24%</h3>
                <p className="text-[10px] text-success font-bold mt-0.5">↑ 0.4% vs last week</p>
              </div>
              <div className="bg-card border border-border rounded-2xl p-5">
                <p className="text-xs font-semibold text-muted-foreground">Average Order Value</p>
                <h3 className="text-xl font-extrabold text-foreground mt-1">₹31,450</h3>
                <p className="text-[10px] text-success font-bold mt-0.5">↑ 5.2% vs last month</p>
              </div>
              <div className="bg-card border border-border rounded-2xl p-5">
                <p className="text-xs font-semibold text-muted-foreground">Bounce Rate</p>
                <h3 className="text-xl font-extrabold text-foreground mt-1">41.2%</h3>
                <p className="text-[10px] text-success font-bold mt-0.5">↓ 2.1% improvement</p>
              </div>
            </div>
            <div className="bg-card border border-border rounded-2xl p-6">
              <h3 className="text-sm font-bold text-foreground mb-4">Visitor Traffic Sources</h3>
              <div className="space-y-4">
                {[
                  { source: 'Direct', percentage: 45, color: 'bg-primary' },
                  { source: 'Search Engines', percentage: 35, color: 'bg-blue-500' },
                  { source: 'Social Media', percentage: 15, color: 'bg-amber-500' },
                  { source: 'Referrals', percentage: 5, color: 'bg-muted-foreground' },
                ].map((item) => (
                  <div key={item.source} className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="font-semibold text-foreground">{item.source}</span>
                      <span className="font-bold text-muted-foreground">{item.percentage}%</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div className={`h-full ${item.color}`} style={{ width: `${item.percentage}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      case 'categories':
        return (
          <div className="bg-card rounded-2xl border border-border p-6 shadow-sm space-y-4">
            <h2 className="text-base font-extrabold text-foreground">Categories</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead>
                  <tr className="border-b border-border bg-muted/50 text-xs font-bold text-muted-foreground">
                    <th className="px-4 py-3">Category</th>
                    <th className="px-4 py-3">Total Models</th>
                    <th className="px-4 py-3">Status</th>
                  </tr>
                </thead>
                <tbody className="text-xs">
                  {[
                    { name: 'Smartphones', count: 142, status: 'Active' },
                    { name: 'Laptops', count: 38, status: 'Active' },
                    { name: 'Tablets', count: 24, status: 'Active' },
                    { name: 'Smartwatches', count: 19, status: 'Inactive' },
                  ].map((cat) => (
                    <tr key={cat.name} className="border-b border-border hover:bg-muted/10">
                      <td className="px-4 py-3 font-semibold text-foreground">{cat.name}</td>
                      <td className="px-4 py-3 text-muted-foreground">{cat.count} models</td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-0.5 rounded-full font-bold text-[10px] ${cat.status === 'Active' ? 'bg-green-light text-primary' : 'bg-red-50 text-eco-error'}`}>
                          {cat.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      case 'brands':
        return (
          <div className="bg-card rounded-2xl border border-border p-6 shadow-sm space-y-4">
            <h2 className="text-base font-extrabold text-foreground">Brands</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead>
                  <tr className="border-b border-border bg-muted/50 text-xs font-bold text-muted-foreground">
                    <th className="px-4 py-3">Brand</th>
                    <th className="px-4 py-3">Catalog Count</th>
                    <th className="px-4 py-3">Status</th>
                  </tr>
                </thead>
                <tbody className="text-xs">
                  {[
                    { name: 'Apple', count: 56, status: 'Active' },
                    { name: 'Samsung', count: 42, status: 'Active' },
                    { name: 'OnePlus', count: 18, status: 'Active' },
                    { name: 'Google', count: 12, status: 'Active' },
                    { name: 'Xiaomi', count: 31, status: 'Active' },
                  ].map((brand) => (
                    <tr key={brand.name} className="border-b border-border hover:bg-muted/10">
                      <td className="px-4 py-3 font-semibold text-foreground">{brand.name}</td>
                      <td className="px-4 py-3 text-muted-foreground">{brand.count} devices</td>
                      <td className="px-4 py-3">
                        <span className="px-2 py-0.5 rounded-full font-bold text-[10px] bg-green-light text-primary">
                          {brand.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      case 'models':
        return (
          <div className="bg-card rounded-2xl border border-border p-6 shadow-sm space-y-4">
            <h2 className="text-base font-extrabold text-foreground">Models</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead>
                  <tr className="border-b border-border bg-muted/50 text-xs font-bold text-muted-foreground">
                    <th className="px-4 py-3">Model Name</th>
                    <th className="px-4 py-3">Brand</th>
                    <th className="px-4 py-3">Base Price</th>
                    <th className="px-4 py-3">Status</th>
                  </tr>
                </thead>
                <tbody className="text-xs">
                  {[
                    { name: 'iPhone 14 Pro', brand: 'Apple', price: '₹65,000', status: 'Active' },
                    { name: 'iPhone 13', brand: 'Apple', price: '₹42,000', status: 'Active' },
                    { name: 'Galaxy S23', brand: 'Samsung', price: '₹48,000', status: 'Active' },
                    { name: 'Pixel 8', brand: 'Google', price: '₹50,000', status: 'Active' },
                    { name: 'OnePlus 11', brand: 'OnePlus', price: '₹38,000', status: 'Active' },
                  ].map((model) => (
                    <tr key={model.name} className="border-b border-border hover:bg-muted/10">
                      <td className="px-4 py-3 font-semibold text-foreground">{model.name}</td>
                      <td className="px-4 py-3 text-muted-foreground">{model.brand}</td>
                      <td className="px-4 py-3 font-bold text-foreground">{model.price}</td>
                      <td className="px-4 py-3">
                        <span className="px-2 py-0.5 rounded-full font-bold text-[10px] bg-green-light text-primary">
                          {model.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      case 'products':
        return (
          <div className="bg-card rounded-2xl border border-border p-6 shadow-sm space-y-4">
            <h2 className="text-base font-extrabold text-foreground">Refurbished Products</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead>
                  <tr className="border-b border-border bg-muted/50 text-xs font-bold text-muted-foreground">
                    <th className="px-4 py-3">Product Name</th>
                    <th className="px-4 py-3">Condition</th>
                    <th className="px-4 py-3">Selling Price</th>
                    <th className="px-4 py-3">Stock</th>
                    <th className="px-4 py-3">Status</th>
                  </tr>
                </thead>
                <tbody className="text-xs">
                  {[
                    { name: 'iPhone 14 Pro (128GB)', cond: 'Superb', price: '₹54,999', stock: 5, status: 'In Stock' },
                    { name: 'Galaxy S23 (256GB)', cond: 'Good', price: '₹38,999', stock: 3, status: 'In Stock' },
                    { name: 'OnePlus 11 (256GB)', cond: 'Fair', price: '₹29,999', stock: 2, status: 'Low Stock' },
                    { name: 'iPhone 13 (128GB)', cond: 'Superb', price: '₹38,999', stock: 0, status: 'Out of Stock' },
                  ].map((prod) => (
                    <tr key={prod.name} className="border-b border-border hover:bg-muted/10">
                      <td className="px-4 py-3 font-semibold text-foreground">{prod.name}</td>
                      <td className="px-4 py-3 text-muted-foreground">{prod.cond}</td>
                      <td className="px-4 py-3 font-bold text-foreground">{prod.price}</td>
                      <td className="px-4 py-3 text-muted-foreground">{prod.stock} units</td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-0.5 rounded-full font-bold text-[10px] ${prod.stock > 2 ? 'bg-green-light text-primary' : prod.stock > 0 ? 'bg-amber-50 text-amber-700' : 'bg-red-50 text-eco-error'}`}>
                          {prod.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      case 'inventory':
        return (
          <div className="bg-card rounded-2xl border border-border p-6 shadow-sm space-y-4">
            <h2 className="text-base font-extrabold text-foreground">Inventory Stock Control</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead>
                  <tr className="border-b border-border bg-muted/50 text-xs font-bold text-muted-foreground">
                    <th className="px-4 py-3">SKU</th>
                    <th className="px-4 py-3">Product</th>
                    <th className="px-4 py-3">Warehouse Location</th>
                    <th className="px-4 py-3">Quantity</th>
                    <th className="px-4 py-3">Last Audited</th>
                  </tr>
                </thead>
                <tbody className="text-xs text-muted-foreground">
                  {[
                    { sku: 'INV-APP-14P', name: 'iPhone 14 Pro', loc: 'WH-A12', qty: 8, date: '21 Aug 2026' },
                    { sku: 'INV-SAM-S23', name: 'Galaxy S23', loc: 'WH-B04', qty: 4, date: '20 Aug 2026' },
                    { sku: 'INV-OP-11', name: 'OnePlus 11', loc: 'WH-C02', qty: 2, date: '19 Aug 2026' },
                  ].map((inv) => (
                    <tr key={inv.sku} className="border-b border-border hover:bg-muted/10">
                      <td className="px-4 py-3 font-mono font-bold text-primary">{inv.sku}</td>
                      <td className="px-4 py-3 font-semibold text-foreground">{inv.name}</td>
                      <td className="px-4 py-3">{inv.loc}</td>
                      <td className="px-4 py-3 font-bold text-foreground">{inv.qty} items</td>
                      <td className="px-4 py-3">{inv.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      case 'questions':
        return (
          <div className="bg-card rounded-2xl border border-border p-6 shadow-sm space-y-4">
            <h2 className="text-base font-extrabold text-foreground">Diagnostic Question Builder</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead>
                  <tr className="border-b border-border bg-muted/50 text-xs font-bold text-muted-foreground">
                    <th className="px-4 py-3">Diagnostic Question</th>
                    <th className="px-4 py-3">Impact Type</th>
                    <th className="px-4 py-3">Price Deduction</th>
                  </tr>
                </thead>
                <tbody className="text-xs">
                  {[
                    { q: 'Are there any scratches on the screen?', type: 'Physical Condition', deduct: '- ₹1,500' },
                    { q: 'Does the device turn on and boot up normally?', type: 'Functional Test', deduct: '- ₹8,000' },
                    { q: 'Is the rear camera lens cracked or blurry?', type: 'Hardware Defect', deduct: '- ₹2,500' },
                    { q: 'Is the phone carrier locked?', type: 'Software Status', deduct: '- ₹3,000' },
                  ].map((item, idx) => (
                    <tr key={idx} className="border-b border-border hover:bg-muted/10">
                      <td className="px-4 py-3 font-semibold text-foreground">{item.q}</td>
                      <td className="px-4 py-3 text-muted-foreground">{item.type}</td>
                      <td className="px-4 py-3 font-bold text-eco-error">{item.deduct}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      case 'pricing':
        return (
          <div className="bg-card rounded-2xl border border-border p-6 shadow-sm space-y-4">
            <h2 className="text-base font-extrabold text-foreground">Pricing Rules & Margins</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead>
                  <tr className="border-b border-border bg-muted/50 text-xs font-bold text-muted-foreground">
                    <th className="px-4 py-3">Condition Grade</th>
                    <th className="px-4 py-3">Target Margin</th>
                    <th className="px-4 py-3">Purchase Discount</th>
                    <th className="px-4 py-3">Buffer Reserve</th>
                  </tr>
                </thead>
                <tbody className="text-xs">
                  {[
                    { grade: 'Superb (Like New)', margin: '15%', discount: '20%', buffer: '2.5%' },
                    { grade: 'Good (Minor Scratches)', margin: '18%', discount: '35%', buffer: '5.0%' },
                    { grade: 'Fair (Visible Scuffs)', margin: '22%', discount: '50%', buffer: '8.0%' },
                  ].map((rule, idx) => (
                    <tr key={idx} className="border-b border-border hover:bg-muted/10">
                      <td className="px-4 py-3 font-semibold text-foreground">{rule.grade}</td>
                      <td className="px-4 py-3 text-muted-foreground">{rule.margin}</td>
                      <td className="px-4 py-3 text-muted-foreground">{rule.discount}</td>
                      <td className="px-4 py-3 text-muted-foreground">{rule.buffer}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      case 'coupons':
        return (
          <div className="bg-card rounded-2xl border border-border p-6 shadow-sm space-y-4">
            <h2 className="text-base font-extrabold text-foreground">Coupons & Discounts</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead>
                  <tr className="border-b border-border bg-muted/50 text-xs font-bold text-muted-foreground">
                    <th className="px-4 py-3">Promo Code</th>
                    <th className="px-4 py-3">Value</th>
                    <th className="px-4 py-3">Min Order</th>
                    <th className="px-4 py-3">Status</th>
                  </tr>
                </thead>
                <tbody className="text-xs">
                  {[
                    { code: 'ECO500', val: 'Flat ₹500 Off', min: '₹10,000', status: 'Active' },
                    { code: 'WELCOME10', val: '10% Discount', min: '₹5,000', status: 'Active' },
                    { code: 'FESTIVE3K', val: 'Flat ₹3,000 Off', min: '₹40,000', status: 'Expired' },
                  ].map((item, idx) => (
                    <tr key={idx} className="border-b border-border hover:bg-muted/10">
                      <td className="px-4 py-3 font-mono font-bold text-primary">{item.code}</td>
                      <td className="px-4 py-3 font-semibold text-foreground">{item.val}</td>
                      <td className="px-4 py-3 text-muted-foreground">{item.min}</td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-0.5 rounded-full font-bold text-[10px] ${item.status === 'Active' ? 'bg-green-light text-primary' : 'bg-red-50 text-eco-error'}`}>
                          {item.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
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