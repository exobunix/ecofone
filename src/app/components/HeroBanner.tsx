'use client';
import React from 'react';
import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

export default function HeroBanner() {
  return (
    <div className="sell-banner-gradient rounded-2xl overflow-hidden relative min-h-[200px]">
      {/* Blob decorations */}
      <div className="absolute top-0 right-0 w-48 h-48 blob-primary opacity-60 pointer-events-none" />
      <div className="absolute bottom-0 left-1/2 w-32 h-32 blob-accent opacity-40 pointer-events-none" />

      <div className="relative z-10 flex items-stretch min-h-[200px]">
        {/* Left content */}
        <div className="flex-1 p-5 flex flex-col justify-between">
          <div>
            <p className="text-charcoal text-sm font-semibold mb-1">Sell Your Old Device</p>
            <h2 className="text-foreground text-2xl font-extrabold leading-tight mb-1">
              Get Instant
            </h2>
            <h2 className="text-primary text-2xl font-extrabold leading-tight mb-4">
              Cash
            </h2>
            <div className="space-y-1.5 mb-5">
              <div className="flex items-center gap-2">
                <Icon name="CheckCircleIcon" size={16} className="text-primary flex-shrink-0" variant="solid" />
                <span className="text-xs text-charcoal font-medium">Free doorstep pickup</span>
              </div>
              <div className="flex items-center gap-2">
                <Icon name="CheckCircleIcon" size={16} className="text-primary flex-shrink-0" variant="solid" />
                <span className="text-xs text-charcoal font-medium">Instant payment</span>
              </div>
            </div>
          </div>
          <Link
            href="/sell-device"
            className="inline-flex items-center gap-2 bg-foreground text-white rounded-full px-5 py-2.5 text-sm font-bold w-fit hover:bg-primary transition-colors duration-300 shadow-lg">

            Sell Now
            <Icon name="ArrowRightIcon" size={14} className="text-white" />
          </Link>
        </div>

        {/* Right: device image */}
        <div className="w-44 relative flex items-end justify-center pb-0 overflow-hidden">
          <div className="absolute bottom-0 right-0 w-36 h-36 rounded-full bg-primary/15 blur-xl" />
          <div className="relative animate-float-device">
            <AppImage
              src="https://img.rocket.new/generatedImages/rocket_gen_img_1e55ec123-1774964150376.png"
              alt="Multiple smartphones displayed with golden coins representing instant cash payment for selling old devices"
              width={160}
              height={200}
              className="object-contain drop-shadow-xl"
              priority />

          </div>
          {/* Floating coin badges */}
          <div className="absolute top-4 right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center shadow-md text-xs font-bold text-yellow-900">
            ₹
          </div>
          <div className="absolute top-16 right-0 w-6 h-6 bg-yellow-300 rounded-full flex items-center justify-center shadow-sm text-xs font-bold text-yellow-800">
            ₹
          </div>
        </div>
      </div>
    </div>);

}