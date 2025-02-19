'use client';

import Link from 'next/link';
import Image from 'next/image';
import MarketTicker from './MarketTicker';

export default function Header() {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-center mb-4">
          <div className="flex items-center justify-between w-full max-w-5xl">
            <Link href="/" className="flex items-center">
              <Image
                src="/images/spice-logo.png"
                alt="Spice News"
                width={150}
                height={40}
                className="h-10 w-auto"
                priority
              />
            </Link>
            <nav className="flex items-center">
              <Link 
                href="/" 
                className="px-5 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors"
              >
                Home
              </Link>
              <Link 
                href="/markets" 
                className="px-5 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors"
              >
                Markets
              </Link>
              <Link 
                href="/technology" 
                className="px-5 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors"
              >
                Technology
              </Link>
              <Link 
                href="/sports" 
                className="px-5 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors"
              >
                Sports
              </Link>
              <Link 
                href="/entertainment" 
                className="px-5 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors"
              >
                Entertainment
              </Link>
            </nav>
          </div>
        </div>
        <MarketTicker />
      </div>
    </header>
  );
}
