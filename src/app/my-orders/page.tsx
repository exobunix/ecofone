'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import BottomNav from '@/components/BottomNav';
import Icon from '@/components/ui/AppIcon';

interface OrderType {
  _id: string;
  device: string;
  amount: string;
  status: string;
  date: string;
  type: 'sell' | 'buy';
}

const statusConfig: Record<string, { label: string; color: string }> = {
  PLACED: { label: 'Order Placed', color: 'bg-blue-50 text-blue-700' },
  CONFIRMED: { label: 'Confirmed', color: 'bg-teal-50 text-teal-700' },
  SHIPPED: { label: 'Shipped', color: 'bg-amber-50 text-amber-700' },
  DELIVERED: { label: 'Delivered', color: 'bg-green-light text-primary' },
  PICKUP_SCHEDULED: { label: 'Pickup Scheduled', color: 'bg-amber-50 text-amber-700' },
  INSPECTION_PENDING: { label: 'Inspection Pending', color: 'bg-orange-50 text-orange-700' },
  PAID: { label: 'Paid', color: 'bg-green-light text-primary' },
  COMPLETED: { label: 'Completed', color: 'bg-green-light text-primary' },
  CANCELLED: { label: 'Cancelled', color: 'bg-red-50 text-eco-error' },
};

export default function MyOrdersPage() {
  const router = useRouter();
  const [user, setUser] = useState<{ id: string; name: string } | null>(null);
  const [orders, setOrders] = useState<OrderType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsed = JSON.parse(storedUser);
      setUser(parsed);
      fetchOrders(parsed.id);
    } else {
      setLoading(false);
    }
  }, []);

  const fetchOrders = async (userId: string) => {
    try {
      const res = await fetch(`/api/orders?userId=${userId}`);
      if (res.ok) {
        const data = await res.json();
        setOrders(data.orders || []);
      }
    } catch (err) {
      console.error('Error fetching orders:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background pb-28">
      <Header title="My Orders" />

      <div className="max-w-md mx-auto px-4 pt-6">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            <p className="text-sm text-muted-foreground">Loading your orders...</p>
          </div>
        ) : !user ? (
          <div className="bg-card rounded-2xl border border-border p-6 text-center space-y-4 shadow-sm my-10">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto">
              <Icon name="LockClosedIcon" size={30} className="text-muted-foreground" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-foreground">Sign in to view orders</h2>
              <p className="text-xs text-muted-foreground mt-1">Please sign in with your account to see your buy and sell order history.</p>
            </div>
            <button
              onClick={() => router.push('/login')}
              className="w-full py-3.5 bg-primary text-white rounded-xl text-sm font-bold shadow-cta-green hover:bg-primary/90 transition-all"
            >
              Sign In
            </button>
          </div>
        ) : orders.length === 0 ? (
          <div className="text-center py-20 space-y-4">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto">
              <Icon name="ClipboardDocumentListIcon" size={30} className="text-muted-foreground" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-foreground">No orders yet</h2>
              <p className="text-xs text-muted-foreground mt-1">You haven&apos;t placed any buy or sell orders yet.</p>
            </div>
            <button
              onClick={() => router.push('/')}
              className="px-6 py-3 bg-primary text-white rounded-xl text-sm font-bold shadow-cta-green"
            >
              Explore Products
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <h2 className="text-sm font-bold text-foreground mb-1">Your Order History</h2>
            {orders.map((order) => {
              const config = statusConfig[order.status] || { label: order.status, color: 'bg-muted text-muted-foreground' };
              const isSell = order.type === 'sell';

              return (
                <div key={order._id} className="bg-card rounded-2xl border border-border p-4 shadow-sm space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-bold font-mono text-muted-foreground uppercase">
                      ID: {order._id.substring(order._id.length - 8)}
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${config.color}`}>
                      {config.label}
                    </span>
                  </div>

                  <div className="flex gap-3">
                    <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center flex-shrink-0">
                      <Icon
                        name={isSell ? 'TagIcon' : 'ShoppingBagIcon'}
                        size={22}
                        className={isSell ? 'text-amber-600' : 'text-primary'}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-bold text-foreground truncate">{order.device}</h3>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {isSell ? 'Selling Request' : 'Purchase Order'} · {order.date}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className={`text-sm font-extrabold ${isSell ? 'text-amber-600' : 'text-primary'}`}>
                        {order.amount}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <BottomNav activeTab="orders" />
    </div>
  );
}
