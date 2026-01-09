'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const DEFAULT_NAV: NavItem[] = [
  { key: 'dashboard', title: 'Dashboard', href: '/' },
  { key: 'boards', title: 'Boards', href: '/boards' },
  { key: 'tasks', title: 'Tasks', href: '/tasks' },
  { key: 'teams', title: 'Teams', href: '/teams' },
  { key: 'calendar', title: 'Calendar', href: '/calendar' },
  { key: 'reports', title: 'Reports', href: '/reports' },
  { key: 'settings', title: 'Settings', href: '/settings' },
];

export default function Sidebar({
  navItems = DEFAULT_NAV,
  onQuickAdd,
  className = '',
  user,
}: {
  navItems?: NavItem[];
  onQuickAdd?: () => void;
  className?: string;
  user?: User;
}) {
  const pathname = usePathname() || '/';

  return (
    <aside
      className={`bg-white border-r border-gray-200 w-64 flex flex-col ${className}`}
      aria-label='Sidebar'
    >
      <div className='flex items-center gap-3 px-4 h-16 border-b border-gray-100'>
        <Link href='/' className='flex items-center gap-3'>
          <div className='h-8 w-8 rounded-md bg-indigo-600 flex items-center justify-center text-white font-bold'>
            W
          </div>
          <span className='font-semibold text-gray-800'>Workflow</span>
        </Link>
      </div>

      <nav className='flex-1 overflow-y-auto px-2 py-4'>
        <ul className='space-y-1'>
          {navItems.map((item) => {
            const active = pathname === item.href;
            return (
              <li key={item.key}>
                <Link
                  href={item.href}
                  className={`group flex items-center gap-3 px-3 py-2 rounded-md text-sm hover:bg-gray-100 hover:text-gray-900 w-full ${
                    active ? 'bg-indigo-50 text-indigo-700' : 'text-gray-700'
                  }`}
                >
                  {/* simple icon placeholder */}

                  <span
                    className={`h-5 w-5 rounded-sm flex items-center justify-center text-xs ${
                      active ? 'text-indigo-700' : 'text-gray-400'
                    }`}
                    aria-hidden
                  >
                    {item.title.charAt(0)}
                  </span>
                  <span className='truncate'>{item.title}</span>
                  {typeof item.badge === 'number' && (
                    <span className='ml-auto inline-flex items-center rounded-full bg-red-100 px-2 py-0.5 text-xs text-red-700'>
                      {item.badge}
                    </span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className='mt-6 px-1'>
          <h4 className='px-3 text-xs font-semibold text-gray-500 uppercase tracking-wide'>
            Quick
          </h4>
          <div className='mt-2'>
            <button
              onClick={() => onQuickAdd?.()}
              className='flex w-full items-center gap-2 px-3 py-2 rounded-md text-sm text-gray-700 hover:bg-gray-100'
            >
              <span className='inline-flex h-5 w-5 items-center justify-center rounded bg-indigo-100 text-indigo-700'>
                +
              </span>
              <span>New task</span>
            </button>
          </div>
        </div>
      </nav>

      <div className='px-4 py-3 border-t border-gray-100'>
        <div className='flex items-center gap-3'>
          <Image
            src={user?.avatarUrl ?? '/avatar.png'}
            alt='User avatar'
            width={32}
            height={32}
            className='h-8 w-8 rounded-full bg-gray-200'
          />
          <div>
            <div className='text-sm font-medium'>
              {user?.name ?? 'Guest User'}
            </div>
            <div className='text-xs text-gray-500'>
              {user?.team ?? user?.role ?? user?.email ?? ''}
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
