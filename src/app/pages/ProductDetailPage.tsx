import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { Button } from '../components/Button';
import { products } from '../data/products';
import { Star, Heart, ShoppingCart, ArrowLeft, Zap } from 'lucide-react';

interface ProductDetailPageProps {
  productId: number;
  onNavigate: (page: string) => void;
  onAddToCart: (productId: number) => void;
}

export function ProductDetailPage({ productId, onNavigate, onAddToCart }: ProductDetailPageProps) {
  const { mode } = useTheme();
  const product = products.find(p => p.id === productId);

  if (!product) {
    return (
      <div className="min-h-screen pt-32 px-6 flex items-center justify-center">
        <p>Product not found</p>
      </div>
    );
  }

  return (
    <div className={`
      min-h-screen pt-32 pb-24 px-6 transition-colors duration-700
      ${mode === 'matcha' ? 'bg-[#FAFAFA]' : 'bg-[#1E1E1E]'}
    `}>
      <div className="max-w-7xl mx-auto">
        {/* Back Button */}
        <motion.button
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          onClick={() => onNavigate('shop')}
          className={`
            flex items-center gap-2 mb-8 transition-colors
            ${mode === 'matcha'
              ? 'text-[#3B2F2F] hover:text-[#A8C3A0]'
              : 'text-white hover:text-[#CBA135]'
            }
          `}
        >
          <ArrowLeft size={20} />
          <span>Back to Shop</span>
        </motion.button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="relative"
          >
            <div className={`
              rounded-3xl overflow-hidden backdrop-blur-xl border aspect-square
              ${mode === 'matcha'
                ? 'bg-white/60 border-[#A8C3A0]/20'
                : 'bg-[#3B2F2F]/60 border-[#CBA135]/20'
              }
            `}>
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>

            {product.tag && (
              <div className={`
                absolute top-6 right-6 px-6 py-3 rounded-full text-sm font-medium backdrop-blur-md
                ${mode === 'matcha'
                  ? 'bg-[#A8C3A0]/90 text-white'
                  : 'bg-[#CBA135]/90 text-[#1E1E1E]'
                }
              `}>
                {product.tag}
              </div>
            )}
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="flex flex-col"
          >
            <div className="mb-6">
              <span className={`
                text-sm uppercase tracking-widest mb-2 block
                ${mode === 'matcha' ? 'text-[#A8C3A0]' : 'text-[#CBA135]'}
              `}>
                {product.category}
              </span>
              <h1 className={`
                font-['Playfair_Display'] mb-4 tracking-wider
                ${mode === 'matcha' ? 'text-[#3B2F2F]' : 'text-white'}
              `}>
                {product.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={20}
                      className={i < product.rating ? 'fill-[#CBA135] text-[#CBA135]' : 'text-gray-300'}
                    />
                  ))}
                </div>
                <span className={`text-sm ${mode === 'matcha' ? 'text-gray-600' : 'text-gray-400'}`}>
                  ({product.rating}.0)
                </span>
              </div>

              {/* Price */}
              <div className={`
                mb-6 tracking-wider
                ${mode === 'matcha' ? 'text-[#3B2F2F]' : 'text-[#CBA135]'}
              `}>
                ${product.price.toFixed(2)}
              </div>

              {/* Description */}
              <p className={`
                mb-6 leading-relaxed tracking-wide
                ${mode === 'matcha' ? 'text-gray-700' : 'text-gray-300'}
              `}>
                {product.description}
              </p>
            </div>

            {/* Caffeine Level */}
            {product.caffeineLevel && (
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <Zap size={18} className={mode === 'matcha' ? 'text-[#A8C3A0]' : 'text-[#CBA135]'} />
                  <h3 className={`
                    font-medium tracking-wide
                    ${mode === 'matcha' ? 'text-[#3B2F2F]' : 'text-white'}
                  `}>
                    Caffeine Level
                  </h3>
                </div>
                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-500 ${
                      mode === 'matcha' ? 'bg-[#A8C3A0]' : 'bg-[#CBA135]'
                    }`}
                    style={{ width: `${product.caffeineLevel}%` }}
                  />
                </div>
                <p className={`text-sm mt-1 ${mode === 'matcha' ? 'text-gray-600' : 'text-gray-400'}`}>
                  {product.caffeineLevel}mg
                </p>
              </div>
            )}

            {/* Mood Tags */}
            {product.mood && product.mood.length > 0 && (
              <div className="mb-6">
                <h3 className={`
                  mb-3 font-medium tracking-wide
                  ${mode === 'matcha' ? 'text-[#3B2F2F]' : 'text-white'}
                `}>
                  Perfect For
                </h3>
                <div className="flex flex-wrap gap-2">
                  {product.mood.map((mood) => (
                    <span
                      key={mood}
                      className={`
                        px-4 py-2 rounded-full text-sm backdrop-blur-md
                        ${mode === 'matcha'
                          ? 'bg-[#A8C3A0]/20 text-[#3B2F2F]'
                          : 'bg-[#CBA135]/20 text-[#CBA135]'
                        }
                      `}
                    >
                      {mood}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Ingredients */}
            {product.ingredients && product.ingredients.length > 0 && (
              <div className="mb-8">
                <h3 className={`
                  mb-3 font-medium tracking-wide
                  ${mode === 'matcha' ? 'text-[#3B2F2F]' : 'text-white'}
                `}>
                  Ingredients
                </h3>
                <div className="flex flex-wrap gap-2">
                  {product.ingredients.map((ingredient) => (
                    <span
                      key={ingredient}
                      className={`
                        px-3 py-1 rounded-lg text-sm border
                        ${mode === 'matcha'
                          ? 'border-[#A8C3A0]/30 text-gray-700'
                          : 'border-[#CBA135]/30 text-gray-300'
                        }
                      `}
                    >
                      {ingredient}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-4 mt-auto">
              <Button
                onClick={() => {
                  onAddToCart(product.id);
                }}
                className="flex-1 flex items-center justify-center gap-2"
              >
                <ShoppingCart size={20} />
                Add to Cart
              </Button>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className={`
                  p-4 rounded-2xl border-2 transition-colors
                  ${mode === 'matcha'
                    ? 'border-[#A8C3A0] text-[#A8C3A0] hover:bg-[#A8C3A0] hover:text-white'
                    : 'border-[#CBA135] text-[#CBA135] hover:bg-[#CBA135] hover:text-[#1E1E1E]'
                  }
                `}
              >
                <Heart size={24} />
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
