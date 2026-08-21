import React, { useState, useEffect } from 'react';
import Icon from '@/components/ui/AppIcon';

type OrderTab = 'sell' | 'buy';

interface DbOrder {
  _id: string;
  customer: string;
  device: string;
  amount: string;
  status: string;
  date: string;
  type: 'sell' | 'buy';
}

const sellOrders = [
  { id: 'SO-2026-0841', customer: 'Priya Nair', device: 'iPhone 14 Pro · 256GB', quote: '₹52,000', status: 'PICKUP_SCHEDULED', date: '21 Aug 2026' },
  { id: 'SO-2026-0840', customer: 'Rahul Mehta', device: 'Samsung S23 · 128GB', quote: '₹28,500', status: 'INSPECTION_PENDING', date: '21 Aug 2026' },
  { id: 'SO-2026-0839', customer: 'Ananya Singh', device: 'OnePlus 11 · 256GB', quote: '₹30,000', status: 'PAID', date: '20 Aug 2026' },
  { id: 'SO-2026-0838', customer: 'Vikram Patel', device: 'Redmi Note 12 · 128GB', quote: '₹12,000', status: 'PRICE_CONFIRMED', date: '20 Aug 2026' },
  { id: 'SO-2026-0837', customer: 'Meera Krishnan', device: 'iPhone 13 · 128GB', quote: '₹34,000', status: 'COMPLETED', date: '19 Aug 2026' },
];

const buyOrders = [
  { id: 'BO-2026-1241', customer: 'Arjun Sharma', device: 'iPhone 14 · GOOD', amount: '₹35,999', status: 'SHIPPED', date: '21 Aug 2026' },
  { id: 'BO-2026-1240', customer: 'Deepika Rao', device: 'Samsung A54 · SUPERB', amount: '₹19,999', status: 'DELIVERED', date: '20 Aug 2026' },
  { id: 'BO-2026-1239', customer: 'Suresh Kumar', device: 'OnePlus 11R · FAIR', amount: '₹21,999', status: 'CONFIRMED', date: '20 Aug 2026' },
  { id: 'BO-2026-1238', customer: 'Kavita Joshi', device: 'Google Pixel 8 · SUPERB', amount: '₹44,999', status: 'PACKED', date: '19 Aug 2026' },
  { id: 'BO-2026-1237', customer: 'Amit Verma', device: 'iPhone 12 · FAIR', amount: '₹21,999', status: 'RETURN_REQUESTED', date: '18 Aug 2026' },
];

const sellStatusConfig: Record<string, { label: string; color: string }> = {
  QUOTE_CREATED: { label: 'Quote Created', color: 'bg-blue-50 text-blue-700' },
  PICKUP_SCHEDULED: { label: 'Pickup Scheduled', color: 'bg-amber-50 text-amber-700' },
  PICKUP_ASSIGNED: { label: 'Pickup Assigned', color: 'bg-amber-50 text-amber-700' },
  PICKED_UP: { label: 'Picked Up', color: 'bg-purple-50 text-purple-700' },
  INSPECTION_PENDING: { label: 'Inspection Pending', color: 'bg-orange-50 text-orange-700' },
  INSPECTION_COMPLETED: { label: 'Inspected', color: 'bg-teal-50 text-teal-700' },
  PRICE_CONFIRMED: { label: 'Price Confirmed', color: 'bg-green-light text-primary' },
  PAYMENT_PENDING: { label: 'Payment Pending', color: 'bg-yellow-50 text-yellow-700' },
  PAID: { label: 'Paid', color: 'bg-green-light text-primary' },
  COMPLETED: { label: 'Completed', color: 'bg-green-light text-primary' },
  CANCELLED: { label: 'Cancelled', color: 'bg-red-50 text-eco-error' },
};

const buyStatusConfig: Record<string, { label: string; color: string }> = {
  PLACED: { label: 'Placed', color: 'bg-blue-50 text-blue-700' },
  CONFIRMED: { label: 'Confirmed', color: 'bg-teal-50 text-teal-700' },
  PACKED: { label: 'Packed', color: 'bg-purple-50 text-purple-700' },
  SHIPPED: { label: 'Shipped', color: 'bg-amber-50 text-amber-700' },
  OUT_FOR_DELIVERY: { label: 'Out for Delivery', color: 'bg-orange-50 text-orange-700' },
  DELIVERED: { label: 'Delivered', color: 'bg-green-light text-primary' },
  RETURN_REQUESTED: { label: 'Return Requested', color: 'bg-red-50 text-eco-error' },
  RETURNED: { label: 'Returned', color: 'bg-red-50 text-eco-error' },
  REFUNDED: { label: 'Refunded', color: 'bg-gray-100 text-gray-600' },
  CANCELLED: { label: 'Cancelled', color: 'bg-red-50 text-eco-error' },
};

export default function OrdersTable() {
  const [activeTab, setActiveTab] = useState<OrderTab>('sell');
  const [search, setSearch] = useState('');
  const [dbOrders, setDbOrders] = useState<DbOrder[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchDbOrders = async () => {
    try {
      const res = await fetch('/api/admin/orders');
      if (res.ok) {
        const data = await res.json();
        setDbOrders(data.orders || []);
      }
    } catch (err) {
      console.error('Error fetching admin orders:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDbOrders();
  }, []);

  const handleStatusChange = async (orderId: string, newStatus: string) => {
    try {
      const res = await fetch('/api/admin/orders', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderId, status: newStatus }),
      });
      if (res.ok) {
        setDbOrders((prev) =>
          prev.map((o) => (o._id === orderId ? { ...o, status: newStatus } : o))
        );
      }
    } catch (err) {
      console.error('Error updating order status:', err);
    }
  };

  // Merge dynamic DB orders and default static orders
  const formattedDbOrders = dbOrders
    .filter((o) => o.type === activeTab)
    .map((o) => ({
      id: o._id,
      customer: o.customer,
      device: o.device,
      amount: o.amount,
      status: o.status,
      date: o.date,
      isDb: true,
    }));

  const staticOrders = activeTab === 'sell'
    ? sellOrders.map((o) => ({ ...o, amount: o.quote, isDb: false }))
    : buyOrders.map((o) => ({ ...o, isDb: false }));

  const allOrders = [...formattedDbOrders, ...staticOrders];

  const filtered = allOrders.filter(
    (o) =>
      o.id.toLowerCase().includes(search.toLowerCase()) ||
      o.customer.toLowerCase().includes(search.toLowerCase()) ||
      o.device.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-card rounded-2xl border border-border overflow-hidden">
      {/* Table Header */}
      <div className="px-5 pt-5 pb-3 border-b border-border">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-sm font-bold text-foreground">Recent Orders</h3>
            <p className="text-xs text-muted-foreground">Last 30 days activity</p>
          </div>
          <div className="flex items-center gap-2">
            {/* Tabs */}
            <div className="flex items-center bg-muted rounded-xl p-1">
              {(['sell', 'buy'] as OrderTab[]).map((t) => (
                <button
                  key={t}
                  onClick={() => setActiveTab(t)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold capitalize transition-all ${
                    activeTab === t ? 'bg-card text-foreground shadow-sm' : 'text-muted-foreground'
                  }`}
                >
                  {t} Orders
                </button>
              ))}
            </div>
            {/* Search */}
            <div className="flex items-center gap-1.5 bg-muted border border-border rounded-xl px-3 py-2">
              <Icon name="MagnifyingGlassIcon" size={14} className="text-muted-foreground" />
              <input
                type="text"
                placeholder="Search orders..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="bg-transparent text-xs text-foreground placeholder:text-muted-foreground focus:outline-none w-28"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/50">
              <th className="text-left px-5 py-3 text-xs font-bold text-muted-foreground">Order ID</th>
              <th className="text-left px-4 py-3 text-xs font-bold text-muted-foreground">Customer</th>
              <th className="text-left px-4 py-3 text-xs font-bold text-muted-foreground">Device</th>
              <th className="text-left px-4 py-3 text-xs font-bold text-muted-foreground">Amount</th>
              <th className="text-left px-4 py-3 text-xs font-bold text-muted-foreground">Status</th>
              <th className="text-left px-4 py-3 text-xs font-bold text-muted-foreground">Date</th>
              <th className="text-left px-4 py-3 text-xs font-bold text-muted-foreground">Action</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((order, i) => {
              const statusConfig = activeTab === 'sell'
                ? sellStatusConfig[order.status]
                : buyStatusConfig[order.status];

              const displayId = order.isDb
                ? order.id.substring(order.id.length - 8).toUpperCase()
                : order.id;

              const statuses = activeTab === 'sell'
                ? Object.keys(sellStatusConfig)
                : Object.keys(buyStatusConfig);

              return (
                <tr
                  key={order.id}
                  className={`border-b border-border/50 hover:bg-muted/30 transition-colors ${i % 2 === 0 ? '' : 'bg-muted/10'}`}
                >
                  <td className="px-5 py-3.5">
                    <span className="text-xs font-bold text-primary font-mono">{displayId}</span>
                  </td>
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <span className="text-[10px] font-bold text-primary">
                          {order.customer.split(' ').map((n) => n[0]).join('')}
                        </span>
                      </div>
                      <span className="text-xs font-semibold text-foreground whitespace-nowrap">{order.customer}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3.5">
                    <span className="text-xs text-muted-foreground whitespace-nowrap">{order.device}</span>
                  </td>
                  <td className="px-4 py-3.5">
                    <span className="text-xs font-bold text-foreground">{order.amount}</span>
                  </td>
                  <td className="px-4 py-3.5">
                    {order.isDb ? (
                      <select
                        value={order.status}
                        onChange={(e) => handleStatusChange(order.id, e.target.value)}
                        className={`text-[10px] font-bold px-2 py-1 rounded-lg border border-border bg-card focus:outline-none ${statusConfig?.color || 'bg-muted text-muted-foreground'}`}
                      >
                        {statuses.map((st) => (
                          <option key={st} value={st}>
                            {activeTab === 'sell' ? sellStatusConfig[st].label : buyStatusConfig[st].label}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full whitespace-nowrap ${statusConfig?.color || 'bg-muted text-muted-foreground'}`}>
                        {statusConfig?.label || order.status}
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3.5">
                    <span className="text-xs text-muted-foreground whitespace-nowrap">{order.date}</span>
                  </td>
                  <td className="px-4 py-3.5">
                    <span className="text-xs font-semibold text-primary">
                      {order.isDb ? 'Dynamic' : 'Static'}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {filtered.length === 0 && (
          <div className="py-12 text-center">
            <Icon name="ClipboardDocumentListIcon" size={32} className="text-muted-foreground mx-auto mb-2" />
            <p className="text-sm text-muted-foreground">No orders found</p>
          </div>
        )}
      </div>

      {/* Table Footer */}
      <div className="px-5 py-3 border-t border-border flex items-center justify-between">
        <p className="text-xs text-muted-foreground">
          Showing {filtered.length} of {allOrders.length} orders
        </p>
        <div className="flex items-center gap-1">
          <button className="p-1.5 rounded-lg bg-muted hover:bg-border transition-colors">
            <Icon name="ChevronLeftIcon" size={14} className="text-muted-foreground" />
          </button>
          <span className="text-xs font-semibold text-foreground px-2">1 / 1</span>
          <button className="p-1.5 rounded-lg bg-muted hover:bg-border transition-colors">
            <Icon name="ChevronRightIcon" size={14} className="text-muted-foreground" />
          </button>
        </div>
      </div>
    </div>
  );
}