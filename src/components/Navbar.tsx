'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaGithub } from 'react-icons/fa';

const GITHUB_REPO_URL = 'https://github.com/momo23546842';

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    // Close mobile menu when navigation changes
    setMobileOpen(false);
  }, [pathname]);

  const navLinks = [
    { href: '/persons', label: 'Persons' },
    { href: '/calorie-chat', label: 'Chat' },
    { href: '/about', label: 'About' },
    { href: '/database', label: 'Database' },
  ];

  const mobileLinks = navLinks.filter((l) => ['/persons', '/calorie-chat', '/database'].includes(l.href));

  return (
    <nav className="bg-slate-800 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-2xl">🍽️</span>
              <span className="text-white font-bold text-xl">Meal Tracker</span>
            </Link>
          </div>

          {/* Desktop links */}
          <div className="hidden md:flex items-center">
            <div className="flex items-baseline space-x-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    pathname === link.href
                      ? 'bg-slate-700 text-white'
                      : 'text-slate-300 hover:bg-slate-700 hover:text-white'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <a
              href={GITHUB_REPO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-6 text-white hover:text-slate-300 transition-colors"
              aria-label="View GitHub Repository"
            >
              <FaGithub className="w-6 h-6" />
            </a>
          </div>

          {/* Mobile */}
          <div className="md:hidden flex items-center">
            <a
              href={GITHUB_REPO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-slate-300 transition-colors mr-2"
              aria-label="View GitHub Repository"
            >
              <FaGithub className="w-6 h-6" />
            </a>

            <div className="relative">
              <button
                onClick={() => setMobileOpen((s) => !s)}
                aria-expanded={mobileOpen}
                aria-controls="mobile-menu"
                className="text-white p-2 rounded-md hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>

              <div
                id="mobile-menu"
                className={`absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 ${
                  mobileOpen ? 'block' : 'hidden'
                }`}
              >
                {mobileLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={`block px-4 py-2 text-sm ${
                      pathname === link.href ? 'bg-slate-100 text-slate-700' : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
