'use client';
import React, { useRef } from 'react';
import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

const smartphones = [
{
  id: 1,
  name: 'iPhone 14',
  price: '₹38,999',
  badge: 'Best Seller',
  badgeIcon: '🔥',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_10f249037-1772991353272.png",
  alt: 'iPhone 14 in deep purple color displayed against dark background, showing front screen with dynamic island',
  slug: 'apple-iphone-14'
},
{
  id: 2,
  name: 'iPhone 13',
  price: '₹32,999',
  badge: null,
  badgeIcon: null,
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_1ee3ab382-1772135481057.png",
  alt: 'iPhone 13 in pink color showing vibrant display with iOS interface',
  slug: 'apple-iphone-13'
},
{
  id: 3,
  name: 'OnePlus 11R',
  price: '₹24,999',
  badge: 'Hot Deal',
  badgeIcon: '⚡',
  image: "https://images.unsplash.com/photo-1603543245818-22c7984c76cd",
  alt: 'OnePlus smartphone in dark color with Never Settle branding on screen',
  slug: 'oneplus-11r'
},
{
  id: 4,
  name: 'Samsung S23',
  price: '₹29,999',
  badge: null,
  badgeIcon: null,
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_1f4a061ef-1772450277404.png",
  alt: 'Samsung Galaxy S23 in phantom black showing camera system and sleek design',
  slug: 'samsung-galaxy-s23'
},
{
  id: 5,
  name: 'Redmi Note 12',
  price: '₹14,999',
  badge: 'Popular',
  badgeIcon: '⭐',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_14f1d1b86-1785453317643.png",
  alt: 'Redmi Note 12 smartphone in ice blue color with gradient back panel',
  slug: 'redmi-note-12'
}];


export default function TopSmartphones() {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-base font-bold text-foreground">Top Selling Smartphones</h2>
        <Link
          href="/product-listing"
          className="flex items-center gap-1 text-sm font-semibold text-primary">

          View All
          <Icon name="ArrowRightIcon" size={14} className="text-primary" />
        </Link>
      </div>
      <div
        ref={scrollRef}
        className="flex gap-3 overflow-x-auto scrollbar-hide pb-2">

        {smartphones?.map((phone, index) =>
        <Link
          key={phone?.id}
          href="/product-detail"
          className="flex-shrink-0 w-36 bg-card rounded-2xl border border-border p-3 card-hover shadow-sm"
          style={{ transitionDelay: `${index * 60}ms` }}>

            <div className="w-full aspect-square rounded-xl bg-muted overflow-hidden mb-2 relative">
              <AppImage
              src={phone?.image}
              alt={phone?.alt}
              fill
              className="object-cover"
              sizes="144px" />

            </div>
            <p className="text-xs font-bold text-foreground mb-1 truncate">{phone?.name}</p>
            <p className="text-xs font-semibold text-primary mb-1.5">From {phone?.price}</p>
            {phone?.badge &&
          <span className="inline-flex items-center gap-1 text-[10px] font-bold bg-amber-50 text-amber-700 rounded-full px-2 py-0.5">
                {phone?.badgeIcon} {phone?.badge}
              </span>
          }
          </Link>
        )}
      </div>
    </div>);

}