'use client';
import React from 'react';
import Link from 'next/link';
import AppLogo from '@/components/ui/AppLogo';
import Icon from '@/components/ui/AppIcon';

interface HeaderProps {
  title?: string;
  showBack?: boolean;
  onBack?: () => void;
  rightElement?: React.ReactNode;
}

export default function Header({ title, showBack, onBack, rightElement }: HeaderProps) {
  return (
    <header className="glass-nav sticky top-0 z-40 px-4 py-3 flex items-center gap-3">
      {showBack ? (
        <button
          onClick={onBack}
          className="p-2 rounded-xl bg-muted hover:bg-border transition-colors min-w-[40px] min-h-[40px] flex items-center justify-center"
        >
          <Icon name="ArrowLeftIcon" size={18} className="text-foreground" />
        </button>
      ) : (
        <Link href="/" className="flex items-center gap-2">
          <AppLogo size={28} />
          <span className="font-bold text-base text-primary">ecofone</span>
        </Link>
      )}
      {title && (
        <h1 className="flex-1 text-base font-bold text-foreground truncate">{title}</h1>
      )}
      {rightElement && <div className="ml-auto">{rightElement}</div>}
    </header>
  );
}