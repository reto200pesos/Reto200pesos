import React, { useState, useEffect } from 'react';
import { ShoppingBag, Menu, X, Search } from 'lucide-react';
import { useCart } from '../context/CartContext';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { getTotalItems } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const totalItems = getTotalItems();

  return (
    <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
      isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <div className="flex items-center">
              <ShoppingBag className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-slate-800">TechStore</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <a href="#home" className="text-slate-700 hover:text-blue-600 transition-colors font-medium">
              Home
            </a>
            <a href="#products" className="text-slate-700 hover:text-blue-600 transition-colors font-medium">
              Products
            </a>
            <a href="#deals" className="text-slate-700 hover:text-blue-600 transition-colors font-medium">
              Deals
            </a>
            <a href="#about" className="text-slate-700 hover:text-blue-600 transition-colors font-medium">
              About
            </a>
            <a href="#contact" className="text-slate-700 hover:text-blue-600 transition-colors font-medium">
              Contact
            </a>
          </nav>

          {/* Right side actions */}
          <div className="flex items-center space-x-4">
            <button className="p-2 text-slate-700 hover:text-blue-600 transition-colors">
              <Search className="h-5 w-5" />
            </button>
            
            <button className="relative p-2 text-slate-700 hover:text-blue-600 transition-colors">
              <ShoppingBag className="h-5 w-5" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
                  {totalItems}
                </span>
              )}
            </button>

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 text-slate-700 hover:text-blue-600 transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white/95 backdrop-blur-md border-t border-slate-200 animate-fade-in">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <a href="#home" className="block px-3 py-2 text-slate-700 hover:text-blue-600 transition-colors font-medium">
                Home
              </a>
              <a href="#products" className="block px-3 py-2 text-slate-700 hover:text-blue-600 transition-colors font-medium">
                Products
              </a>
              <a href="#deals" className="block px-3 py-2 text-slate-700 hover:text-blue-600 transition-colors font-medium">
                Deals
              </a>
              <a href="#about" className="block px-3 py-2 text-slate-700 hover:text-blue-600 transition-colors font-medium">
                About
              </a>
              <a href="#contact" className="block px-3 py-2 text-slate-700 hover:text-blue-600 transition-colors font-medium">
                Contact
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}