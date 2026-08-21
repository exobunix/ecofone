'use client';
import React, { useState } from 'react';
import Header from '@/components/Header';
import BottomNav from '@/components/BottomNav';
import Icon from '@/components/ui/AppIcon';

export default function RaiseTicketPage() {
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Order Issues');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject || !description) return;
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setSubject('');
      setDescription('');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background pb-28">
      <Header title="Raise a Ticket" />

      <div className="max-w-md mx-auto px-4 pt-6 space-y-6">
        <div className="bg-card rounded-2xl border border-border p-6 shadow-sm space-y-4">
          <div className="flex justify-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
              <Icon name="TicketIcon" size={32} className="text-primary" />
            </div>
          </div>

          <h2 className="text-base font-extrabold text-foreground text-center">Customer Support Ticket</h2>
          <p className="text-xs text-muted-foreground text-center leading-relaxed">
            Report any transaction issues, device condition discrepancies, or payment updates. Our support agents will respond within 4 hours.
          </p>
        </div>

        {success ? (
          <div className="bg-card rounded-2xl border border-border p-8 shadow-sm text-center space-y-4">
            <div className="w-12 h-12 bg-green-50 text-primary border border-green-100 rounded-full flex items-center justify-center mx-auto">
              <Icon name="CheckCircleIcon" size={24} />
            </div>
            <div>
              <h3 className="text-sm font-bold text-foreground">Ticket Raised Successfully</h3>
              <p className="text-xs text-muted-foreground mt-1">Ticket Reference ID: #TCK-{Math.floor(Math.random() * 90000) + 10000}</p>
            </div>
            <button
              onClick={() => setSuccess(false)}
              className="px-6 py-2.5 bg-primary text-white rounded-xl text-xs font-bold"
            >
              Raise Another Ticket
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-card rounded-2xl border border-border p-6 shadow-sm space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-muted-foreground">Select Issue Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-muted rounded-xl px-4 py-3 text-xs text-foreground focus:outline-none border border-border"
              >
                <option value="Order Issues">Order Issues & Tracking</option>
                <option value="Payment Problems">Payment & Refunds</option>
                <option value="Device Discrepancy">Device Condition / Quality Issues</option>
                <option value="Account Login">Account / Signup Problems</option>
                <option value="Other">Other / General Inquiries</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-muted-foreground">Subject</label>
              <input
                type="text"
                required
                placeholder="Brief summary of the issue"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full bg-muted rounded-xl px-4 py-3 text-xs text-foreground focus:outline-none border border-border focus:border-primary transition-all"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-muted-foreground">Detailed Description</label>
              <textarea
                required
                rows={4}
                placeholder="Explain the problem in detail..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full bg-muted rounded-xl px-4 py-3 text-xs text-foreground focus:outline-none border border-border focus:border-primary transition-all resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-primary text-white rounded-xl text-xs font-bold shadow-cta-green hover:bg-primary/95 transition-all flex items-center justify-center"
            >
              {loading ? 'Submitting...' : 'Submit Support Ticket'}
            </button>
          </form>
        )}
      </div>

      <BottomNav activeTab="profile" />
    </div>
  );
}
