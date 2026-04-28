import { motion } from 'framer-motion';
import { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { ProductCard } from '../components/ProductCard';
import { products } from '../data/products';
import { Filter } from 'lucide-react';

interface ShopPageProps {
  onProductClick: (id: number) => void;
}

export function ShopPage({ onProductClick }: ShopPageProps) {
  const { mode } = useTheme();
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'matcha' | 'coffee' | 'blend'>('all');
  const [selectedMood, setSelectedMood] = useState<string>('all');
  const [priceRange, setPriceRange] = useState<'all' | 'low' | 'mid' | 'high'>('all');

  const filteredProducts = products.filter(product => {
    const categoryMatch = selectedCategory === 'all' || product.category === selectedCategory;
    const moodMatch = selectedMood === 'all' || product.mood?.includes(selectedMood);
    const priceMatch =
      priceRange === 'all' ||
      (priceRange === 'low' && product.price < 7) ||
      (priceRange === 'mid' && product.price >= 7 && product.price <= 9) ||
      (priceRange === 'high' && product.price > 9);

    return categoryMatch && moodMatch && priceMatch;
  });

  return (
    <div className={`
      min-h-screen pt-32 pb-24 px-6 transition-colors duration-700
      ${mode === 'matcha' ? 'bg-[#FAFAFA]' : 'bg-[#1E1E1E]'}
    `}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-16"
        >
          <h1 className={`
            font-['Playfair_Display'] mb-4 tracking-wider
            ${mode === 'matcha' ? 'text-[#3B2F2F]' : 'text-white'}
          `}>
            Our Collection
          </h1>
          <p className={`
            text-lg tracking-wide
            ${mode === 'matcha' ? 'text-gray-600' : 'text-gray-400'}
          `}>
            Find your perfect beverage ritual
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Filters Sidebar */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="lg:w-64 flex-shrink-0"
          >
            <div className={`
              p-6 rounded-3xl backdrop-blur-xl border sticky top-32
              ${mode === 'matcha'
                ? 'bg-white/60 border-[#A8C3A0]/20'
                : 'bg-[#3B2F2F]/60 border-[#CBA135]/20'
              }
            `}>
              <div className="flex items-center gap-2 mb-6">
                <Filter size={20} className={mode === 'matcha' ? 'text-[#3B2F2F]' : 'text-[#CBA135]'} />
                <h3 className={`
                  tracking-wider
                  ${mode === 'matcha' ? 'text-[#3B2F2F]' : 'text-white'}
                `}>
                  Filters
                </h3>
              </div>

              {/* Category Filter */}
              <div className="mb-6">
                <h4 className={`
                  mb-3 font-medium tracking-wide
                  ${mode === 'matcha' ? 'text-[#3B2F2F]' : 'text-white'}
                `}>
                  Category
                </h4>
                <div className="space-y-2">
                  {['all', 'matcha', 'coffee', 'blend'].map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category as any)}
                      className={`
                        w-full text-left px-4 py-2 rounded-xl transition-all duration-300 capitalize
                        ${selectedCategory === category
                          ? mode === 'matcha'
                            ? 'bg-[#A8C3A0] text-white'
                            : 'bg-[#CBA135] text-[#1E1E1E]'
                          : mode === 'matcha'
                            ? 'text-[#3B2F2F] hover:bg-[#A8C3A0]/20'
                            : 'text-white hover:bg-[#CBA135]/20'
                        }
                      `}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              {/* Mood Filter */}
              <div className="mb-6">
                <h4 className={`
                  mb-3 font-medium tracking-wide
                  ${mode === 'matcha' ? 'text-[#3B2F2F]' : 'text-white'}
                `}>
                  Mood
                </h4>
                <div className="space-y-2">
                  {['all', 'Calm', 'Focus', 'Energy', 'Balance'].map((mood) => (
                    <button
                      key={mood}
                      onClick={() => setSelectedMood(mood)}
                      className={`
                        w-full text-left px-4 py-2 rounded-xl transition-all duration-300
                        ${selectedMood === mood
                          ? mode === 'matcha'
                            ? 'bg-[#A8C3A0] text-white'
                            : 'bg-[#CBA135] text-[#1E1E1E]'
                          : mode === 'matcha'
                            ? 'text-[#3B2F2F] hover:bg-[#A8C3A0]/20'
                            : 'text-white hover:bg-[#CBA135]/20'
                        }
                      `}
                    >
                      {mood}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range Filter */}
              <div>
                <h4 className={`
                  mb-3 font-medium tracking-wide
                  ${mode === 'matcha' ? 'text-[#3B2F2F]' : 'text-white'}
                `}>
                  Price Range
                </h4>
                <div className="space-y-2">
                  {[
                    { value: 'all', label: 'All Prices' },
                    { value: 'low', label: 'Under $7' },
                    { value: 'mid', label: '$7 - $9' },
                    { value: 'high', label: 'Over $9' }
                  ].map((range) => (
                    <button
                      key={range.value}
                      onClick={() => setPriceRange(range.value as any)}
                      className={`
                        w-full text-left px-4 py-2 rounded-xl transition-all duration-300
                        ${priceRange === range.value
                          ? mode === 'matcha'
                            ? 'bg-[#A8C3A0] text-white'
                            : 'bg-[#CBA135] text-[#1E1E1E]'
                          : mode === 'matcha'
                            ? 'text-[#3B2F2F] hover:bg-[#A8C3A0]/20'
                            : 'text-white hover:bg-[#CBA135]/20'
                        }
                      `}
                    >
                      {range.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Products Grid */}
          <div className="flex-1">
            <div className={`
              mb-6 text-sm tracking-wide
              ${mode === 'matcha' ? 'text-gray-600' : 'text-gray-400'}
            `}>
              {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''} found
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {filteredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <ProductCard
                    product={product}
                    onClick={() => onProductClick(product.id)}
                  />
                </motion.div>
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className={`
                text-center py-24 tracking-wide
                ${mode === 'matcha' ? 'text-gray-600' : 'text-gray-400'}
              `}>
                <p className="text-xl mb-4">No products found</p>
                <p>Try adjusting your filters</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
