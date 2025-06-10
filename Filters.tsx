import React from 'react';
import { Filter, X } from 'lucide-react';
import { FilterOptions } from '../types';

interface FiltersProps {
  filters: FilterOptions;
  onFiltersChange: (filters: FilterOptions) => void;
  isOpen: boolean;
  onToggle: () => void;
}

export function Filters({ filters, onFiltersChange, isOpen, onToggle }: FiltersProps) {
  const categories = ['All', 'Electronics', 'Appliances', 'Furniture'];
  const sortOptions = [
    { value: 'name', label: 'Name A-Z' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'rating', label: 'Highest Rated' }
  ];

  const handleCategoryChange = (category: string) => {
    onFiltersChange({
      ...filters,
      category: category === 'All' ? '' : category
    });
  };

  const handlePriceRangeChange = (min: number, max: number) => {
    onFiltersChange({
      ...filters,
      priceRange: [min, max]
    });
  };

  const handleSortChange = (sortBy: FilterOptions['sortBy']) => {
    onFiltersChange({
      ...filters,
      sortBy
    });
  };

  const handleStockToggle = () => {
    onFiltersChange({
      ...filters,
      inStock: !filters.inStock
    });
  };

  return (
    <div className="relative">
      {/* Filter Toggle Button */}
      <button
        onClick={onToggle}
        className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors shadow-sm"
      >
        <Filter className="w-4 h-4" />
        <span>Filters</span>
      </button>

      {/* Filter Panel */}
      {isOpen && (
        <div className="absolute top-12 left-0 z-30 bg-white border border-slate-300 rounded-lg shadow-xl p-6 w-80 animate-slide-in-up">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-slate-800">Filters</h3>
            <button
              onClick={onToggle}
              className="p-1 hover:bg-slate-100 rounded-full transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-6">
            {/* Category Filter */}
            <div>
              <h4 className="font-medium text-slate-700 mb-3">Category</h4>
              <div className="grid grid-cols-2 gap-2">
                {categories.map(category => (
                  <button
                    key={category}
                    onClick={() => handleCategoryChange(category)}
                    className={`px-3 py-2 rounded-lg text-sm transition-colors ${
                      (category === 'All' && !filters.category) || filters.category === category
                        ? 'bg-blue-600 text-white'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div>
              <h4 className="font-medium text-slate-700 mb-3">Price Range</h4>
              <div className="space-y-2">
                <input
                  type="range"
                  min="0"
                  max="500"
                  value={filters.priceRange[1]}
                  onChange={(e) => handlePriceRangeChange(0, parseInt(e.target.value))}
                  className="w-full accent-blue-600"
                />
                <div className="flex justify-between text-sm text-slate-600">
                  <span>$0</span>
                  <span>${filters.priceRange[1]}</span>
                </div>
              </div>
            </div>

            {/* Sort By */}
            <div>
              <h4 className="font-medium text-slate-700 mb-3">Sort By</h4>
              <select
                value={filters.sortBy}
                onChange={(e) => handleSortChange(e.target.value as FilterOptions['sortBy'])}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                {sortOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* In Stock Only */}
            <div>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.inStock}
                  onChange={handleStockToggle}
                  className="w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500"
                />
                <span className="text-slate-700">In stock only</span>
              </label>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}