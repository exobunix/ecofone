'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Icon from '@/components/ui/AppIcon';
import AppImage from '@/components/ui/AppImage';

type CheckoutStep = 'address' | 'summary' | 'payment';

const savedAddresses = [
{ id: 1, name: 'Arjun Sharma', phone: '+91 98765 43210', line1: '204, Green Park Apartments', line2: 'Sector 18, Dwarka', city: 'New Delhi', pincode: '110078', label: 'Home' },
{ id: 2, name: 'Arjun Sharma', phone: '+91 98765 43210', line1: 'Plot 45, Tech Hub', line2: 'Okhla Industrial Area', city: 'New Delhi', pincode: '110020', label: 'Office' }];


const paymentMethods = [
{ id: 'upi', label: 'UPI', icon: 'QrCodeIcon', sub: 'GPay, PhonePe, Paytm' },
{ id: 'card', label: 'Credit / Debit Card', icon: 'CreditCardIcon', sub: 'Visa, Mastercard, RuPay' },
{ id: 'netbanking', label: 'Net Banking', icon: 'BuildingLibraryIcon', sub: 'All major banks' },
{ id: 'cod', label: 'Cash on Delivery', icon: 'BanknotesIcon', sub: 'Pay when delivered' }];


export default function CheckoutScreen() {
  const router = useRouter();
  const [step, setStep] = useState<CheckoutStep>('address');
  const [selectedAddress, setSelectedAddress] = useState(1);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponError, setCouponError] = useState('');
  const [selectedPayment, setSelectedPayment] = useState('upi');
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [user, setUser] = useState<{ id: string; name: string; email: string } | null>(null);
  const [orderId, setOrderId] = useState('');

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      router.push('/login');
    } else {
      setUser(JSON.parse(storedUser));
    }
  }, [router]);

  const basePrice = 35999;
  const discount = 2000;
  const couponDiscount = couponApplied ? 500 : 0;
  const delivery = 0;
  const total = basePrice - discount - couponDiscount + delivery;

  const applyCoupon = () => {
    if (couponCode.toUpperCase() === 'ECO500') {
      setCouponApplied(true);
      setCouponError('');
    } else {
      setCouponError('Invalid coupon code');
      setCouponApplied(false);
    }
  };

  const placeOrder = async () => {
    if (!user) return;
    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user.id,
          customer: user.name,
          device: 'iPhone 14 · GOOD',
          amount: `₹${total.toLocaleString('en-IN')}`,
          status: 'PLACED',
          date: new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }),
          type: 'buy',
        }),
      });

      if (res.ok) {
        const data = await res.json();
        setOrderId(data.order._id);
        setOrderPlaced(true);
      }
    } catch (err) {
      console.error('Error placing order:', err);
    }
  };

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6 text-center">
        <div className="w-24 h-24 bg-green-light rounded-full flex items-center justify-center mb-6 animate-pulse-green">
          <Icon name="CheckCircleIcon" size={48} className="text-primary" variant="solid" />
        </div>
        <h2 className="text-2xl font-extrabold text-foreground mb-2">Order Placed!</h2>
        <p className="text-muted-foreground text-sm mb-1">Order #{orderId ? orderId.substring(orderId.length - 8).toUpperCase() : 'ECO-2026'}</p>
        <p className="text-muted-foreground text-sm mb-6">
          Estimated delivery in <strong>2-4 business days</strong>
        </p>
        <div className="bg-card rounded-2xl border border-border shadow-card-green p-5 w-full mb-6 text-left">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-muted overflow-hidden">
              <AppImage
                src="https://images.unsplash.com/photo-1696234055070-b80b75097906"
                alt="iPhone 14 order confirmation thumbnail"
                width={48}
                height={48}
                className="object-cover" />

            </div>
            <div>
              <p className="text-sm font-bold text-foreground">iPhone 14 · GOOD</p>
              <p className="text-xs text-muted-foreground">128 GB · Midnight Black</p>
            </div>
            <p className="ml-auto text-sm font-extrabold text-primary">₹{total.toLocaleString('en-IN')}</p>
          </div>
          <div className="h-px bg-border mb-3" />
          <div className="flex items-center gap-2">
            <Icon name="MapPinIcon" size={14} className="text-primary" />
            <p className="text-xs text-muted-foreground">Delivering to: Green Park Apartments, New Delhi</p>
          </div>
        </div>
        <button
          onClick={() => router.push('/')}
          className="w-full py-4 bg-primary text-white rounded-2xl text-sm font-bold shadow-cta-green">

          Back to Home
        </button>
        <button
          onClick={() => router.push('/product-listing')}
          className="w-full mt-3 py-3.5 rounded-2xl text-sm font-bold border-2 border-border text-muted-foreground hover:border-primary/40 transition-all">

          Continue Shopping
        </button>
      </div>);

  }


  return (
    <div className="min-h-screen bg-background pb-8">
      <Header
        title="Checkout"
        showBack
        onBack={() => {
          if (step === 'address') router.push('/product-detail');else
          if (step === 'summary') setStep('address');else
          setStep('summary');
        }}
        rightElement={
        <span className="text-xs font-semibold text-muted-foreground">
            {step === 'address' ? '1/3' : step === 'summary' ? '2/3' : '3/3'}
          </span>
        } />


      {/* Step indicator */}
      <div className="px-4 pt-3 pb-4">
        <div className="flex items-center gap-2">
          {['address', 'summary', 'payment'].map((s, i) => {
            const stepIndex = ['address', 'summary', 'payment'].indexOf(step);
            return (
              <React.Fragment key={s}>
                <div className={`flex items-center gap-1.5 ${i <= stepIndex ? 'text-primary' : 'text-muted-foreground'}`}>
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold border-2 transition-all ${i < stepIndex ? 'bg-primary border-primary text-white' : i === stepIndex ? 'border-primary text-primary bg-transparent' : 'border-border text-muted-foreground'}`}>
                    {i < stepIndex ? '✓' : i + 1}
                  </div>
                  <span className="text-xs font-semibold capitalize hidden xs:block">{s}</span>
                </div>
                {i < 2 && <div className={`flex-1 h-px ${i < stepIndex ? 'bg-primary' : 'bg-border'}`} />}
              </React.Fragment>);

          })}
        </div>
      </div>

      <div className="px-4 space-y-4">
        {/* ── STEP 1: ADDRESS ── */}
        {step === 'address' &&
        <div className="step-transition">
            <h2 className="text-base font-bold text-foreground mb-3">Delivery Address</h2>
            <div className="space-y-3 mb-4">
              {savedAddresses.map((addr) =>
            <button
              key={addr.id}
              onClick={() => setSelectedAddress(addr.id)}
              className={`w-full text-left p-4 rounded-2xl border-2 transition-all ${
              selectedAddress === addr.id ? 'border-primary bg-green-light' : 'border-border bg-card'}`
              }>

                  <div className="flex items-start justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold bg-primary/10 text-primary px-2 py-0.5 rounded-full">{addr.label}</span>
                    </div>
                    <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${selectedAddress === addr.id ? 'border-primary bg-primary' : 'border-border'}`}>
                      {selectedAddress === addr.id && <div className="w-1.5 h-1.5 bg-white rounded-full" />}
                    </div>
                  </div>
                  <p className="text-sm font-bold text-foreground">{addr.name}</p>
                  <p className="text-xs text-muted-foreground">{addr.line1}, {addr.line2}</p>
                  <p className="text-xs text-muted-foreground">{addr.city} – {addr.pincode}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{addr.phone}</p>
                </button>
            )}
            </div>

            <button
            onClick={() => setShowAddressForm(!showAddressForm)}
            className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl border-2 border-dashed border-primary/40 text-primary text-sm font-semibold hover:bg-green-light transition-colors mb-4">

              <Icon name="PlusCircleIcon" size={18} className="text-primary" />
              Add New Address
            </button>

            {showAddressForm &&
          <div className="bg-card border border-border rounded-2xl p-4 space-y-3 mb-4 step-transition">
                {[
            { placeholder: 'Full Name', type: 'text' },
            { placeholder: 'Phone Number', type: 'tel' },
            { placeholder: 'Address Line 1', type: 'text' },
            { placeholder: 'Address Line 2 (Optional)', type: 'text' },
            { placeholder: 'City', type: 'text' },
            { placeholder: 'PIN Code', type: 'text' }].
            map((field) =>
            <input
              key={field.placeholder}
              type={field.type}
              placeholder={field.placeholder}
              className="w-full bg-muted rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 border border-border focus:border-primary transition-all" />

            )}
                <button className="w-full py-3 bg-primary text-white rounded-xl text-sm font-bold">
                  Save Address
                </button>
              </div>
          }

            <button
            onClick={() => setStep('summary')}
            className="w-full py-4 bg-primary text-white rounded-2xl text-sm font-bold shadow-cta-green hover:bg-primary/90 transition-all">

              Deliver to This Address
            </button>
          </div>
        }

        {/* ── STEP 2: ORDER SUMMARY ── */}
        {step === 'summary' &&
        <div className="step-transition">
            <h2 className="text-base font-bold text-foreground mb-3">Order Summary</h2>

            {/* Product Card */}
            <div className="bg-card rounded-2xl border border-border p-4 flex items-center gap-3 mb-4">
              <div className="w-16 h-16 rounded-xl bg-muted overflow-hidden flex-shrink-0">
                <AppImage
                src="https://img.rocket.new/generatedImages/rocket_gen_img_10f249037-1772991353272.png"
                alt="iPhone 14 in deep purple color for checkout order summary"
                width={64}
                height={64}
                className="object-cover w-full h-full" />

              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-foreground truncate">iPhone 14 · GOOD</p>
                <p className="text-xs text-muted-foreground">128 GB · Midnight Black</p>
                <div className="flex items-center gap-1.5 mt-1">
                  <span className="text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200 rounded-full px-2 py-0.5">GOOD</span>
                  <span className="text-xs text-muted-foreground">6 months warranty</span>
                </div>
              </div>
              <p className="text-sm font-extrabold text-primary flex-shrink-0">₹{basePrice.toLocaleString('en-IN')}</p>
            </div>

            {/* Coupon */}
            <div className="bg-card rounded-2xl border border-border p-4 mb-4">
              <p className="text-sm font-bold text-foreground mb-3">Apply Coupon</p>
              <div className="flex gap-2">
                <input
                type="text"
                placeholder="Enter coupon code"
                value={couponCode}
                onChange={(e) => {setCouponCode(e.target.value.toUpperCase());setCouponError('');setCouponApplied(false);}}
                className="flex-1 bg-muted rounded-xl px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none border border-border focus:border-primary transition-all uppercase" />

                <button
                onClick={applyCoupon}
                className="px-4 py-2.5 bg-primary text-white rounded-xl text-sm font-bold">

                  Apply
                </button>
              </div>
              {couponApplied &&
            <p className="text-xs text-success font-semibold mt-2 flex items-center gap-1">
                  <Icon name="CheckCircleIcon" size={12} className="text-success" variant="solid" />
                  Coupon ECO500 applied! ₹500 saved
                </p>
            }
              {couponError &&
            <p className="text-xs text-eco-error font-semibold mt-2">{couponError}</p>
            }
            </div>

            {/* Price Breakdown */}
            <div className="bg-card rounded-2xl border border-border p-4 mb-4 space-y-3">
              <p className="text-sm font-bold text-foreground">Price Details</p>
              <div className="space-y-2.5">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">MRP</span>
                  <span className="text-foreground font-medium">₹{basePrice.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Ecofone Discount</span>
                  <span className="text-success font-semibold">-₹{discount.toLocaleString('en-IN')}</span>
                </div>
                {couponApplied &&
              <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Coupon (ECO500)</span>
                    <span className="text-success font-semibold">-₹{couponDiscount.toLocaleString('en-IN')}</span>
                  </div>
              }
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Delivery</span>
                  <span className="text-success font-semibold">FREE</span>
                </div>
                <div className="h-px bg-border" />
                <div className="flex justify-between">
                  <span className="text-sm font-bold text-foreground">Total Amount</span>
                  <span className="text-base font-extrabold text-primary">₹{total.toLocaleString('en-IN')}</span>
                </div>
              </div>
            </div>

            {/* Delivery Address Summary */}
            <div className="bg-card rounded-2xl border border-border p-4 mb-4 flex items-start gap-3">
              <Icon name="MapPinIcon" size={18} className="text-primary flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-bold text-foreground mb-0.5">Delivering to: Home</p>
                <p className="text-xs text-muted-foreground">204, Green Park Apartments, Sector 18, Dwarka, New Delhi – 110078</p>
              </div>
            </div>

            <button
            onClick={() => setStep('payment')}
            className="w-full py-4 bg-primary text-white rounded-2xl text-sm font-bold shadow-cta-green hover:bg-primary/90 transition-all">

              Proceed to Payment · ₹{total.toLocaleString('en-IN')}
            </button>
          </div>
        }

        {/* ── STEP 3: PAYMENT ── */}
        {step === 'payment' &&
        <div className="step-transition">
            <h2 className="text-base font-bold text-foreground mb-3">Payment Method</h2>

            <div className="space-y-2 mb-4">
              {paymentMethods.map((method) =>
            <button
              key={method.id}
              onClick={() => setSelectedPayment(method.id)}
              className={`w-full flex items-center gap-3 p-4 rounded-2xl border-2 transition-all text-left ${
              selectedPayment === method.id ? 'border-primary bg-green-light' : 'border-border bg-card hover:border-primary/40'}`
              }>

                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${selectedPayment === method.id ? 'bg-primary/10' : 'bg-muted'}`}>
                    <Icon name={method.icon as 'QrCodeIcon'} size={20} className={selectedPayment === method.id ? 'text-primary' : 'text-muted-foreground'} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-bold text-foreground">{method.label}</p>
                    <p className="text-xs text-muted-foreground">{method.sub}</p>
                  </div>
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${selectedPayment === method.id ? 'border-primary bg-primary' : 'border-border'}`}>
                    {selectedPayment === method.id && <div className="w-2 h-2 bg-white rounded-full" />}
                  </div>
                </button>
            )}
            </div>

            {/* UPI Input */}
            {selectedPayment === 'upi' &&
          <div className="bg-card border border-border rounded-2xl p-4 mb-4 step-transition">
                <p className="text-sm font-bold text-foreground mb-2">Enter UPI ID</p>
                <input
              type="text"
              placeholder="yourname@upi"
              className="w-full bg-muted rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none border border-border focus:border-primary transition-all" />

                <p className="text-[11px] text-muted-foreground mt-2">e.g. arjun@okicici, 9876543210@ybl</p>
              </div>
          }

            {/* Card Input */}
            {selectedPayment === 'card' &&
          <div className="bg-card border border-border rounded-2xl p-4 mb-4 space-y-3 step-transition">
                <input
              type="text"
              placeholder="Card Number"
              maxLength={19}
              className="w-full bg-muted rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none border border-border focus:border-primary transition-all" />

                <div className="grid grid-cols-2 gap-3">
                  <input
                type="text"
                placeholder="MM / YY"
                className="bg-muted rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none border border-border focus:border-primary transition-all" />

                  <input
                type="text"
                placeholder="CVV"
                maxLength={3}
                className="bg-muted rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none border border-border focus:border-primary transition-all" />

                </div>
                <input
              type="text"
              placeholder="Cardholder Name"
              className="w-full bg-muted rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none border border-border focus:border-primary transition-all" />

              </div>
          }

            {/* Security Note */}
            <div className="flex items-center gap-2 mb-4 p-3 bg-green-light rounded-xl">
              <Icon name="LockClosedIcon" size={14} className="text-primary flex-shrink-0" />
              <p className="text-xs text-primary font-medium">Secured by 256-bit SSL encryption. Your payment info is safe.</p>
            </div>

            {/* Order Total */}
            <div className="bg-card border border-border rounded-2xl p-4 mb-4 flex justify-between items-center">
              <div>
                <p className="text-xs text-muted-foreground">Total Payable</p>
                <p className="text-xl font-extrabold text-primary">₹{total.toLocaleString('en-IN')}</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-success font-semibold">You save ₹{(discount + couponDiscount).toLocaleString('en-IN')}</p>
                <p className="text-[10px] text-muted-foreground">incl. all taxes</p>
              </div>
            </div>

            <button
            onClick={placeOrder}
            className="w-full py-4 bg-primary text-white rounded-2xl text-sm font-bold shadow-cta-green hover:bg-primary/90 transition-all flex items-center justify-center gap-2">

              <Icon name="LockClosedIcon" size={16} className="text-white" />
              Place Order · ₹{total.toLocaleString('en-IN')}
            </button>
          </div>
        }
      </div>
    </div>);

}