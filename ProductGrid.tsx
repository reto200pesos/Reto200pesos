import React, { useState, useMemo } from 'react';
import { ProductCard } from './ProductCard';
import { Filters } from './Filters';
import { CountdownTimer } from './CountdownTimer';
import { Product, FilterOptions } from '../types';
import { useToast } from '../hooks/useToast';

interface ProductGridProps {
  products: Product[];
}

export function ProductGrid({ products }: ProductGridProps) {
  const { addToast } = useToast();
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [filters, setFilters] = useState<FilterOptions>({
    category: '',
    priceRange: [0, 500],
    inStock: false,
    sortBy: 'name'
  });

  const handleAddToCart = (product: Product) => {
    addToast(`${product.name} added to cart!`, 'success');
  };

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products.filter(product => {
      // Category filter
      if (filters.category && product.category !== filters.category) {
        return false;
      }
      
      // Price range filter
      if (product.price > filters.priceRange[1]) {
        return false;
      }
      
      // Stock filter
      if (filters.inStock && product.stock === 0) {
        return false;
      }
      
      return true;
    });

    // Sort products
    filtered.sort((a, b) => {
      switch (filters.sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        default:
          return 0;
      }
    });

    return filtered;
  }, [products, filters]);

  // Calculate end date for countdown (7 days from now)
  const saleEndDate = new Date();
  saleEndDate.setDate(saleEndDate.getDate() + 7);

  const featuredDeals = products.filter(product => product.originalPrice);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Featured Deals Section */}
      <section id="deals" className="mb-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-slate-800 mb-4">🔥 Featured Deals</h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Limited time offers on our most popular products. Don't miss out!
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-1">
            <CountdownTimer targetDate={saleEndDate} title="Flash Sale Ends In" />
          </div>
          <div className="lg:col-span-2">
            <div className="grid sm:grid-cols-2 gap-6">
              {featuredDeals.slice(0, 2).map(product => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  onAddToCart={handleAddToCart}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-slate-800 mb-2">All Products</h2>
            <p className="text-slate-600">
              Showing {filteredAndSortedProducts.length} of {products.length} products
            </p>
          </div>
          
          <Filters
            filters={filters}
            onFiltersChange={setFilters}
            isOpen={isFiltersOpen}
            onToggle={() => setIsFiltersOpen(!isFiltersOpen)}
          />
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredAndSortedProducts.map(product => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>

        {filteredAndSortedProducts.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">😕</div>
            <h3 className="text-xl font-semibold text-slate-800 mb-2">No products found</h3>
            <p className="text-slate-600">
              Try adjusting your filters or browse our full catalog.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}