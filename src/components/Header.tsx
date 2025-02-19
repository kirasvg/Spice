'use client';

import Link from 'next/link';
import Image from 'next/image';
import MarketTicker from './MarketTicker';
import { useState, useEffect } from 'react';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl shadow-lg' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-center">
          <div className="flex items-center justify-between w-full max-w-6xl">
            <Link href="/" className="flex items-center group">
              <div className="relative">
                <Image
                  src="/images/spice-logo.png"
                  alt="Spice News"
                  width={150}
                  height={40}
                  className="h-10 w-auto transition-all duration-300 group-hover:scale-105"
                  priority
                />
                <span className="absolute -top-1 -right-2 bg-gradient-to-r from-primary to-secondary text-white text-xs px-2 py-0.5 rounded-full transform rotate-12">
                  🔥 Hot
                </span>
              </div>
            </Link>
            
            {/* Mobile Menu Button */}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-1">
              <Link href="/" className="nav-link group">
                <span className="emoji-float inline-block mr-2">🏠</span>
                <span className="group-hover:gradient-text">Home</span>
              </Link>
              <Link href="/markets" className="nav-link group">
                <span className="emoji-float inline-block mr-2">📈</span>
                <span className="group-hover:gradient-text">Markets</span>
              </Link>
              <Link href="/technology" className="nav-link group">
                <span className="emoji-float inline-block mr-2">💻</span>
                <span className="group-hover:gradient-text">Tech</span>
              </Link>
              <Link href="/sports" className="nav-link group">
                <span className="emoji-float inline-block mr-2">⚽</span>
                <span className="group-hover:gradient-text">Sports</span>
              </Link>
              <Link href="/entertainment" className="nav-link group">
                <span className="emoji-float inline-block mr-2">🎬</span>
                <span className="group-hover:gradient-text">Entertainment</span>
              </Link>
            </nav>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className={`md:hidden transition-all duration-300 overflow-hidden ${
          isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <nav className="flex flex-col space-y-2 pt-4">
            <Link href="/" className="mobile-nav-link">
              <span className="emoji-float inline-block mr-2">🏠</span>
              Home
            </Link>
            <Link href="/markets" className="mobile-nav-link">
              <span className="emoji-float inline-block mr-2">📈</span>
              Markets
            </Link>
            <Link href="/technology" className="mobile-nav-link">
              <span className="emoji-float inline-block mr-2">💻</span>
              Tech
            </Link>
            <Link href="/sports" className="mobile-nav-link">
              <span className="emoji-float inline-block mr-2">⚽</span>
              Sports
            </Link>
            <Link href="/entertainment" className="mobile-nav-link">
              <span className="emoji-float inline-block mr-2">🎬</span>
              Entertainment
            </Link>
          </nav>
        </div>

        <div className="mt-4 max-w-6xl mx-auto overflow-hidden">
          <MarketTicker />
        </div>
      </div>

      <style jsx>{`
        .nav-link {
          @apply px-4 py-2 text-gray-700 dark:text-gray-300 rounded-full transition-all duration-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:scale-105;
        }
        
        .mobile-nav-link {
          @apply px-4 py-3 text-gray-700 dark:text-gray-300 rounded-xl transition-all duration-300 hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center;
        }
      `}</style>
    </header>
  );
}
