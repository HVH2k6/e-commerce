'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

interface LinkProfileProps {
  href: string;
  title: string;
  icon: React.ReactNode;
}
export default function LinkProfile({ href, title, icon }: LinkProfileProps) {
  const pathName = usePathname();

  const isActive = href === pathName;

  return (
    <div
      className={`w-full p-2 rounded-lg mb-2.5 last:mb-0 ${isActive ? ' bg-slate-300' : ''}`}
    >
      <Link
        href={href}
        className={`font-medium ${
          isActive
            ? 'bg-blue-300/50 text-blue-500'
            : 'hover:bg-blue-300/50 hover:text-blue-500'
        }`}
      >
        <div className='flex items-center gap-x-5'>
          <span>{icon}</span>
          <span className='sidebar-item-title'>{title}</span>
        </div>
      </Link>
    </div>
  );
}
