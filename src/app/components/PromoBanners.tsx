import React from 'react';
import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';

export default function PromoBanners() {
  return (
    <div className="grid grid-cols-2 gap-3">
      {/* Bonus Banner */}
      <div className="bg-green-light rounded-2xl p-4 relative overflow-hidden min-h-[130px] flex flex-col justify-between">
        <div className="absolute bottom-0 right-0 w-20 h-20 blob-accent opacity-50 pointer-events-none" />
        <div className="relative z-10">
          <p className="text-sm font-bold text-foreground leading-tight">
            Extra <span className="text-primary">₹500 Bonus</span>
          </p>
          <p className="text-xs text-charcoal mt-0.5">On your first sale</p>
        </div>
        <div className="relative z-10">
          <div className="inline-block border border-primary rounded-lg px-2 py-1 text-xs font-bold text-foreground bg-white/60">
            Use Code: <span className="text-primary">ECO500</span>
          </div>
        </div>
        <div className="absolute bottom-2 right-2 w-14 h-10 opacity-70">
          <AppImage
            src="https://img.rocket.new/generatedImages/rocket_gen_img_11b4f9747-1787318421801.png"
            alt="Stack of cash representing ₹500 bonus on first device sale"
            width={56}
            height={40}
            className="object-contain" />

        </div>
      </div>

      {/* Pickup Banner */}
      <div className="bg-secondary rounded-2xl p-4 relative overflow-hidden min-h-[130px] flex flex-col justify-between">
        <div className="relative z-10">
          <p className="text-sm font-bold text-foreground leading-tight">Free Doorstep Pickup</p>
          <p className="text-xs text-charcoal mt-0.5">Hassle-free & contactless</p>
        </div>
        <Link
          href="/sell-device"
          className="relative z-10 text-xs font-bold text-primary underline underline-offset-2">

          Schedule Now →
        </Link>
        <div className="absolute bottom-0 right-0 w-20 h-16 overflow-hidden">
          <AppImage
            src="https://images.unsplash.com/photo-1695654399279-2015b56b1e49"
            alt="Delivery person on scooter wearing green Ecofone uniform for contactless doorstep pickup service"
            width={80}
            height={64}
            className="object-cover" />

        </div>
      </div>
    </div>);

}