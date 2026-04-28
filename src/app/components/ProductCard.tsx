import { motion } from 'framer-motion';
import { Star, ShoppingCart } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onClick: () => void;
}

export function ProductCard({ product, onClick }: ProductCardProps) {
  const { mode } = useTheme();

  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -8 }}
      onClick={onClick}
      className={`
        group cursor-pointer rounded-3xl overflow-hidden backdrop-blur-xl
        ${mode === 'matcha'
          ? 'bg-white/60 shadow-lg hover:shadow-2xl border border-[#A8C3A0]/20'
          : 'bg-[#3B2F2F]/60 shadow-lg hover:shadow-2xl hover:shadow-[#CBA135]/10 border border-[#CBA135]/20'
        }
        transition-all duration-500
      `}
    >
      <div className="relative h-72 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        {product.tag && (
          <div className={`
            absolute top-4 right-4 px-4 py-2 rounded-full text-sm font-medium backdrop-blur-md
            ${mode === 'matcha'
              ? 'bg-[#A8C3A0]/90 text-white'
              : 'bg-[#CBA135]/90 text-[#1E1E1E]'
            }
          `}>
            {product.tag}
          </div>
        )}
      </div>

      <div className="p-6">
        <h3 className={`
          mb-2 tracking-wide
          ${mode === 'matcha' ? 'text-[#3B2F2F]' : 'text-white'}
        `}>
          {product.name}
        </h3>

        <div className="flex items-center gap-1 mb-3">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              size={16}
              className={i < product.rating ? 'fill-[#CBA135] text-[#CBA135]' : 'text-gray-300'}
            />
          ))}
          <span className={`ml-2 text-sm ${mode === 'matcha' ? 'text-gray-600' : 'text-gray-400'}`}>
            ({product.rating}.0)
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className={`
            tracking-wider
            ${mode === 'matcha' ? 'text-[#3B2F2F]' : 'text-[#CBA135]'}
          `}>
            ${product.price}
          </span>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className={`
              p-3 rounded-full
              ${mode === 'matcha'
                ? 'bg-[#A8C3A0] text-white hover:bg-[#8FAD87]'
                : 'bg-[#CBA135] text-[#1E1E1E] hover:bg-[#E0B647]'
              }
              transition-colors duration-300
            `}
          >
            <ShoppingCart size={20} />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
