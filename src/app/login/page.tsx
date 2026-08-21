'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import BottomNav from '@/components/BottomNav';
import Icon from '@/components/ui/AppIcon';

export default function LoginPage() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);

  useEffect(() => {
    // Check if user is already logged in
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    const endpoint = isLogin ? '/api/auth/login' : '/api/auth/signup';
    const payload = isLogin ? { email, password } : { name, email, password };

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Something went wrong');
      }

      if (isLogin) {
        localStorage.setItem('user', JSON.stringify(data.user));
        setUser(data.user);
        setSuccess('Logged in successfully!');
        setTimeout(() => router.push('/'), 1500);
      } else {
        setSuccess('Registered successfully! Please log in.');
        setIsLogin(true);
        setName('');
        setEmail('');
        setPassword('');
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    setSuccess('Logged out successfully.');
  };

  return (
    <div className="min-h-screen bg-background pb-28">
      <Header title={user ? 'Profile' : isLogin ? 'Sign In' : 'Sign Up'} />

      <div className="max-w-md mx-auto px-6 pt-10">
        {user ? (
          <div className="bg-card rounded-2xl border border-border p-6 shadow-sm text-center space-y-4">
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
              <Icon name="UserIcon" size={40} className="text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-extrabold text-foreground">{user.name}</h2>
              <p className="text-sm text-muted-foreground">{user.email}</p>
            </div>
            <div className="h-px bg-border" />
            <div className="flex flex-col gap-2">
              <button
                onClick={() => router.push('/my-orders')}
                className="w-full py-3.5 bg-green-light text-primary rounded-xl text-sm font-bold border border-primary/20 hover:bg-primary/5 transition-all"
              >
                View My Orders
              </button>
              <button
                onClick={handleLogout}
                className="w-full py-3.5 bg-eco-error/10 text-eco-error rounded-xl text-sm font-bold border border-eco-error/20 hover:bg-eco-error/20 transition-all"
              >
                Sign Out
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-card rounded-2xl border border-border p-6 shadow-sm space-y-6">
            {/* Tabs */}
            <div className="flex bg-muted p-1 rounded-xl">
              <button
                onClick={() => { setIsLogin(true); setError(''); }}
                className={`flex-1 py-2.5 rounded-lg text-sm font-bold transition-all ${isLogin ? 'bg-card text-foreground shadow-sm' : 'text-muted-foreground'}`}
              >
                Sign In
              </button>
              <button
                onClick={() => { setIsLogin(false); setError(''); }}
                className={`flex-1 py-2.5 rounded-lg text-sm font-bold transition-all ${!isLogin ? 'bg-card text-foreground shadow-sm' : 'text-muted-foreground'}`}
              >
                Sign Up
              </button>
            </div>

            <h2 className="text-lg font-bold text-foreground text-center">
              {isLogin ? 'Welcome Back!' : 'Create an Account'}
            </h2>

            {error && (
              <div className="p-3 bg-red-50 text-eco-error text-xs font-semibold rounded-xl border border-red-100 flex items-center gap-2">
                <Icon name="InformationCircleIcon" size={16} />
                {error}
              </div>
            )}

            {success && (
              <div className="p-3 bg-green-50 text-primary text-xs font-semibold rounded-xl border border-green-100 flex items-center gap-2">
                <Icon name="CheckCircleIcon" size={16} />
                {success}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && (
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-muted-foreground">Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-muted rounded-xl px-4 py-3 text-sm text-foreground focus:outline-none border border-border focus:border-primary transition-all"
                  />
                </div>
              )}

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-muted-foreground">Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-muted rounded-xl px-4 py-3 text-sm text-foreground focus:outline-none border border-border focus:border-primary transition-all"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-muted-foreground">Password</label>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-muted rounded-xl px-4 py-3 text-sm text-foreground focus:outline-none border border-border focus:border-primary transition-all"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-primary text-white rounded-2xl text-sm font-bold shadow-cta-green hover:bg-primary/90 transition-all flex items-center justify-center"
              >
                {loading ? 'Processing...' : isLogin ? 'Sign In' : 'Create Account'}
              </button>
            </form>
          </div>
        )}
      </div>

      <BottomNav activeTab="profile" />
    </div>
  );
}
