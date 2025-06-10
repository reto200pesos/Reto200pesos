import React from 'react';
import { Header } from './components/Header';
import { Banner } from './components/Banner';
import { ProductGrid } from './components/ProductGrid';
import { ToastContainer } from './components/Toast';
import { CartProvider } from './context/CartContext';
import { useToast } from './hooks/useToast';
import { products } from './data/products';

function AppContent() {
  const { toasts, removeToast } = useToast();

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <main>
        <Banner />
        <ProductGrid products={products} />
      </main>
      
      {/* Footer */}
      <footer className="bg-slate-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">TechStore</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Your trusted partner for premium technology and electronics. 
                Quality products, competitive prices, exceptional service.
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Support</a></li>
                <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-4">Categories</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><a href="#" className="hover:text-white transition-colors">Electronics</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Appliances</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Furniture</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Accessories</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-4">Newsletter</h4>
              <p className="text-slate-400 text-sm mb-4">Subscribe for exclusive deals and updates</p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Enter email"
                  className="flex-1 px-3 py-2 bg-slate-800 text-white rounded-l-lg border border-slate-700 focus:outline-none focus:border-blue-500"
                />
                <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-r-lg transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
          <div className="border-t border-slate-800 mt-12 pt-8 text-center text-slate-400 text-sm">
            <p>&copy; 2024 TechStore. All rights reserved. Made with ❤️ for tech enthusiasts.</p>
          </div>
        </div>
      </footer>

      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </div>
  );
}

function App() {
  return (
    <CartProvider>
      <AppContent />
    </CartProvider>
  );
}

export default App;