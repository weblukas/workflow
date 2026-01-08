'use client';
import React from 'react';
import Image from 'next/image';
export default function Topbar({
  onToggleSidebar,
  onQuickAdd,
  onSearch,
}: {
  onToggleSidebar?: () => void;
  onQuickAdd?: () => void;
  onSearch?: (q: string) => void;
}) {
  const [query, setQuery] = React.useState('');
  function handleSearchChange(e: React.ChangeEvent<HTMLInputElement>) {
    setQuery(e.target.value);
    const v = e.target.value;
    // debouncing maybe
    onSearch?.(v);
  }
  return (
    <header className='w-full border-b border-gray-100 bg-white'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex h-16 items-center justify-between gap-4'>
          <div className='flex items-center gap-3'>
            <button
              aria-label='Open sidebar'
              onClick={() => onToggleSidebar?.()}
              className='p-2 rounded-md hover:bg-gray-100 md:hidden'
            >
              <svg
                className='h-5 w-5 text-gray-700'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M4 6h16M4 12h16M4 18h16'
                />
              </svg>
            </button>
            <div className='hidden sm:flex items-center gap-3'>
              <h1 className='text-lg font-semibold text-gray-800'>Dashboard</h1>
            </div>
          </div>
          <div className='flex flex-1 items-center justify-center sm:justify-end gap-3'>
            <div className='max-w-md w-full hidden sm:block'>
              <label htmlFor='search' className='sr-only'>
                Search
              </label>
              <input
                id='search'
                value={query}
                onChange={handleSearchChange}
                className='block w-full rounded-md border border-gray-200 px-3 py-2 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-300'
                placeholder='Search (⌘K)'
              />
            </div>
            <div className='flex items-center gap-2'>
              <button
                onClick={() => onQuickAdd?.()}
                className='hidden sm:inline-flex items-center gap-2 rounded-md bg-indigo-600 px-3 py-2 text-sm font-medium text-white hover:bg-indigo-700'
              >
                <span className='text-sm'>+ New</span>
              </button>
              <button
                className='p-2 rounded-md hover:bg-gray-100'
                aria-label='Notifications'
              >
                <svg
                  className='h-5 w-5 text-gray-700'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5'
                  />
                </svg>
              </button>
              <div className='relative'>
                <button
                  className='flex items-center gap-2 rounded-md p-1 hover:bg-gray-100'
                  aria-label='Open user menu'
                >
                  <Image
                    src='/avatar.png'
                    alt='avatar'
                    width={32}
                    height={32}
                    className='h-8 w-8 rounded-full bg-gray-200'
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
