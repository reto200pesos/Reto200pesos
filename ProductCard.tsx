import React, { useState } from 'react';
import { Star, ShoppingCart, Eye, Heart } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isImageExpanded, setIsImageExpanded] = useState(false);
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product);
    onAddToCart(product);
  };

  const getBadgeStyles = (badge: string) => {
    switch (badge) {
      case 'bestseller':
        return 'bg-green-500 text-white';
      case 'low-stock':
        return 'bg-orange-500 text-white';
      case 'new-arrival':
        return 'bg-blue-500 text-white';
      default:
        return 'bg-slate-500 text-white';
    }
  };

  const getBadgeText = (badge: string) => {
    switch (badge) {
      case 'bestseller':
        return 'Best Seller';
      case 'low-stock':
        return 'Only Few Left';
      case 'new-arrival':
        return 'New Arrival';
      default:
        return '';
    }
  };

  const stockPercentage = (product.stock / product.maxStock) * 100;
  const isLowStock = stockPercentage < 30;

  return (
    <>
      <div className="group bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-slate-200 hover:border-blue-300">
        {/* Image Section */}
        <div className="relative aspect-square overflow-hidden bg-slate-100">
          <img
            src={product.images[currentImageIndex]}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          
          {/* Badge */}
          {product.badge && (
            <div className={`absolute top-3 left-3 px-2 py-1 rounded-full text-xs font-medium ${getBadgeStyles(product.badge)}`}>
              {getBadgeText(product.badge)}
            </div>
          )}

          {/* Discount Badge */}
          {product.originalPrice && (
            <div className="absolute top-3 right-3 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
              -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
            </div>
          )}

          {/* Quick Actions */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <button
                onClick={() => setIsImageExpanded(true)}
                className="p-2 bg-white rounded-full shadow-lg hover:bg-slate-50 transition-colors"
              >
                <Eye className="w-4 h-4" />
              </button>
              <button className="p-2 bg-white rounded-full shadow-lg hover:bg-slate-50 transition-colors">
                <Heart className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Image Navigation */}
          {product.images.length > 1 && (
            <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex gap-1">
              {product.images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-2 h-2 rounded-full ${
                    index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Content Section */}
        <div className="p-5">
          {/* Rating */}
          <div className="flex items-center gap-1 mb-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.floor(product.rating)
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'text-slate-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-slate-600">({product.reviews})</span>
          </div>

          {/* Product Name */}
          <h3 className="font-semibold text-slate-800 mb-2 line-clamp-2 leading-snug">
            {product.name}
          </h3>

          {/* Description */}
          <p className={`text-sm text-slate-600 mb-3 ${isExpanded ? '' : 'line-clamp-2'}`}>
            {product.description}
          </p>
          
          {product.description.length > 100 && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-blue-600 text-sm hover:text-blue-700 transition-colors mb-3"
            >
              {isExpanded ? 'Show less' : 'Show more'}
            </button>
          )}

          {/* Stock Indicator */}
          <div className="mb-4">
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs text-slate-600">Stock Level</span>
              <span className={`text-xs font-medium ${isLowStock ? 'text-orange-600' : 'text-green-600'}`}>
                {product.stock} left
              </span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-2">
              <div
                className={`h-2 rounded-full transition-all duration-300 ${
                  isLowStock ? 'bg-orange-400' : 'bg-green-400'
                }`}
                style={{ width: `${Math.max(stockPercentage, 5)}%` }}
              />
            </div>
          </div>

          {/* Pricing */}
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xl font-bold text-slate-900">
              ${product.price.toFixed(2)}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-slate-500 line-through">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className={`w-full py-3 px-4 rounded-lg font-medium transition-all duration-300 flex items-center justify-center gap-2 ${
              product.stock === 0
                ? 'bg-slate-200 text-slate-500 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700 text-white transform hover:scale-105 active:scale-95'
            }`}
          >
            <ShoppingCart className="w-4 h-4" />
            {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
          </button>
        </div>
      </div>

      {/* Image Expansion Modal */}
      {isImageExpanded && (
        <div 
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={() => setIsImageExpanded(false)}
        >
          <div className="max-w-4xl max-h-full">
            <img
              src={product.images[currentImageIndex]}
              alt={product.name}
              className="max-w-full max-h-full object-contain rounded-lg"
            />
          </div>
        </div>
      )}
    </>
  );
}