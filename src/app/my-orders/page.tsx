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

const statusConfig: Record<string, { label: string; color: string; stepIndex: number }> = {
  PLACED: { label: 'Order Placed', color: 'bg-blue-50 text-blue-700', stepIndex: 0 },
  CONFIRMED: { label: 'In Process', color: 'bg-teal-50 text-teal-700', stepIndex: 1 },
  PACKED: { label: 'In Process', color: 'bg-purple-50 text-purple-700', stepIndex: 1 },
  SHIPPED: { label: 'Out for Delivery', color: 'bg-amber-50 text-amber-700', stepIndex: 2 },
  OUT_FOR_DELIVERY: { label: 'Out for Delivery', color: 'bg-orange-50 text-orange-700', stepIndex: 2 },
  DELIVERED: { label: 'Delivered', color: 'bg-green-light text-primary', stepIndex: 3 },
  COMPLETED: { label: 'Delivered', color: 'bg-green-light text-primary', stepIndex: 3 },
  
  // Sell order statuses
  QUOTE_CREATED: { label: 'Quote Created', color: 'bg-blue-50 text-blue-700', stepIndex: 0 },
  PICKUP_SCHEDULED: { label: 'Pickup Scheduled', color: 'bg-amber-50 text-amber-700', stepIndex: 1 },
  INSPECTION_PENDING: { label: 'Inspection Pending', color: 'bg-orange-50 text-orange-700', stepIndex: 2 },
  PAID: { label: 'Paid & Completed', color: 'bg-green-light text-primary', stepIndex: 3 },
  CANCELLED: { label: 'Cancelled', color: 'bg-red-50 text-eco-error', stepIndex: -1 },
};

const buySteps = [
  { title: 'Order Placed', desc: 'Seller accepted your order request' },
  { title: 'In Process', desc: 'Quality checks and packaging completed' },
  { title: 'Out for Delivery', desc: 'Package is handed to delivery partner' },
  { title: 'Delivered', desc: 'Item successfully delivered to your doorstep' },
];

const sellSteps = [
  { title: 'Quote Created', desc: 'Instant pricing quote generated' },
  { title: 'Pickup Scheduled', desc: 'Agent scheduled to inspect and pick up' },
  { title: 'Inspection Pending', desc: 'Device inspection in progress' },
  { title: 'Paid & Completed', desc: 'Cash transferred successfully to your account' },
];

export default function MyOrdersPage() {
  const router = useRouter();
  const [user, setUser] = useState<{ id: string; name: string } | null>(null);
  const [orders, setOrders] = useState<OrderType[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<OrderType | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      router.replace('/login');
    } else {
      const parsed = JSON.parse(storedUser);
      setUser(parsed);
      fetchOrders(parsed.id);
    }
  }, []);

  const fetchOrders = async (userId: string) => {
    let apiOrders: OrderType[] = [];
    try {
      const res = await fetch(`/api/orders?userId=${userId}`);
      if (res.ok) {
        const data = await res.json();
        apiOrders = data.orders || [];
      }
    } catch (err) {
      console.error('Error fetching orders from API:', err);
    } finally {
      const localOrders = JSON.parse(localStorage.getItem('local_orders') || '[]');
      const filteredLocal = localOrders.filter((o: any) => o.userId === userId || !o.userId);
      
      // Combine API orders and local orders, preventing duplicates by ID
      const combined = [...apiOrders];
      filteredLocal.forEach((lo: any) => {
        if (!combined.some((co) => co._id === lo._id)) {
          combined.push(lo);
        }
      });

      setOrders(combined);
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
                <button
                  key={order._id}
                  onClick={() => setSelectedOrder(order)}
                  className="w-full text-left bg-card rounded-2xl border border-border p-4 shadow-sm hover:border-primary/30 transition-all space-y-3"
                >
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
                  <div className="text-right text-[10px] text-primary font-bold">
                    Click to view tracking status →
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Dynamic Order Progress Stepper Modal */}
      {selectedOrder && (() => {
        const isSell = selectedOrder.type === 'sell';
        const steps = isSell ? sellSteps : buySteps;
        const config = statusConfig[selectedOrder.status] || { stepIndex: 0 };
        const currentStep = config.stepIndex;

        return (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-end justify-center">
            <div className="bg-card w-full max-w-md rounded-t-3xl border-t border-border p-6 pb-20 space-y-6 bottom-sheet-enter max-h-[85vh] overflow-y-auto">
              <div className="flex justify-between items-start">
                <div>
                  <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${isSell ? 'bg-amber-50 text-amber-700' : 'bg-green-light text-primary'}`}>
                    {isSell ? 'Sell Request' : 'Buy Order'}
                  </span>
                  <h3 className="text-base font-extrabold text-foreground mt-1.5">{selectedOrder.device}</h3>
                  <p className="text-xs text-muted-foreground mt-0.5">ID: {selectedOrder._id.toUpperCase()}</p>
                </div>
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="p-1.5 rounded-full bg-muted text-muted-foreground hover:text-foreground"
                >
                  <Icon name="XMarkIcon" size={18} />
                </button>
              </div>

              <div className="h-px bg-border" />

              {/* Stepper Timeline */}
              <div className="space-y-6 relative pl-6">
                {/* Connecting Line */}
                <div className="absolute left-[31px] top-3 bottom-3 w-0.5 bg-border z-0" />

                {steps.map((step, idx) => {
                  const isCompleted = idx <= currentStep && currentStep !== -1;
                  const isActive = idx === currentStep;

                  return (
                    <div key={idx} className="flex gap-4 relative z-10 items-start">
                      {/* Step Indicator Dot */}
                      <div className="absolute left-[-1px] top-1">
                        {isCompleted ? (
                          <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center border-2 border-primary shadow-sm text-white">
                            <span className="text-[10px] font-bold">✓</span>
                          </div>
                        ) : (
                          <div className="w-5 h-5 rounded-full bg-card border-2 border-border flex items-center justify-center text-muted-foreground text-[10px] font-bold">
                            {idx + 1}
                          </div>
                        )}
                      </div>

                      {/* Content */}
                      <div className="pl-6">
                        <h4 className={`text-xs font-bold ${isActive ? 'text-primary' : isCompleted ? 'text-foreground' : 'text-muted-foreground'}`}>
                          {step.title}
                        </h4>
                        <p className="text-[11px] text-muted-foreground mt-0.5 leading-relaxed">
                          {step.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="h-px bg-border" />

              {/* Amount Details */}
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-[10px] text-muted-foreground">Order Value</p>
                  <p className="text-lg font-extrabold text-foreground">{selectedOrder.amount}</p>
                </div>
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="px-6 py-3 bg-primary text-white rounded-xl text-xs font-bold"
                >
                  Close Tracking
                </button>
              </div>
            </div>
          </div>
        );
      })()}

      <BottomNav activeTab="orders" />
    </div>
  );
}
