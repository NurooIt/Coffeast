import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { Button } from '../components/Button';
import { ProductCard } from '../components/ProductCard';
import { products } from '../data/products';
import { Coffee, Leaf, Sparkles, Heart } from 'lucide-react';

interface LandingPageProps {
  onNavigate: (page: string) => void;
  onProductClick: (id: number) => void;
}

export function LandingPage({ onNavigate, onProductClick }: LandingPageProps) {
  const { mode, setMode } = useTheme();

  const featuredProducts = products.filter(p => p.rating === 5).slice(0, 3);

  return (
    <div className="min-h-screen pt-20">
      {/* Split Hero */}
      <section className="relative h-screen overflow-hidden">
        <div className="absolute inset-0 flex">
          {/* Matcha Side */}
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1 }}
            onHoverStart={() => setMode('matcha')}
            className={`
              w-1/2 relative cursor-pointer transition-all duration-700
              ${mode === 'matcha' ? 'flex-[1.2]' : 'flex-1'}
            `}
            style={{
              backgroundImage: 'url(https://unsplash.com/photos/a-shot-glass-filled-with-green-liquid-on-top-of-a-wooden-table-N1rmKN_EOaA)',
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#A8C3A0]/90 to-transparent flex items-center justify-center">
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-center text-white px-8"
              >
                <Leaf size={64} className="mx-auto mb-6" />
                <h2 className="font-['Playfair_Display'] mb-4 tracking-wider">
                  Mindful Calm
                </h2>
                <p className="text-lg mb-8 max-w-md tracking-wide">
                  Embrace the zen of premium matcha
                </p>
                <Button variant="secondary" onClick={() => onNavigate('shop')}>
                  Explore Matcha
                </Button>
              </motion.div>
            </div>
          </motion.div>

          {/* Coffee Side */}
          <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1 }}
            onHoverStart={() => setMode('coffee')}
            className={`
              w-1/2 relative cursor-pointer transition-all duration-700
              ${mode === 'coffee' ? 'flex-[1.2]' : 'flex-1'}
            `}
            style={{
              backgroundImage: 'url(https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=1200&q=80)',
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-l from-[#3B2F2F]/90 to-transparent flex items-center justify-center">
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-center text-white px-8"
              >
                <Coffee size={64} className="mx-auto mb-6" />
                <h2 className="font-['Playfair_Display'] mb-4 tracking-wider">
                  Bold Energy
                </h2>
                <p className="text-lg mb-8 max-w-md tracking-wide">
                  Fuel your modern lifestyle
                </p>
                <Button variant="secondary" onClick={() => onNavigate('shop')}>
                  Explore Coffee
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Center Logo & Tagline */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.5, type: 'spring' }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 text-center"
        >
          <div className="bg-white/95 backdrop-blur-xl rounded-3xl px-12 py-8 shadow-2xl border border-white/50">
            <h1 className="font-['Playfair_Display'] font-bold text-6xl mb-4 text-[#3B2F2F] tracking-wider">
              Coffeast
            </h1>
            <p className="text-xl text-gray-600 tracking-widest">
              Balance in Every Sip
            </p>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className={`
            w-6 h-10 border-2 rounded-full flex items-start justify-center p-2
            ${mode === 'matcha' ? 'border-white' : 'border-[#CBA135]'}
          `}>
            <div className={`
              w-1.5 h-1.5 rounded-full
              ${mode === 'matcha' ? 'bg-white' : 'bg-[#CBA135]'}
            `} />
          </div>
        </motion.div>
      </section>

      {/* Featured Products */}
      <section className={`
        py-24 px-6 transition-colors duration-700
        ${mode === 'matcha' ? 'bg-[#FAFAFA]' : 'bg-[#1E1E1E]'}
      `}>
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className={`
              font-['Playfair_Display'] mb-4 tracking-wider
              ${mode === 'matcha' ? 'text-[#3B2F2F]' : 'text-white'}
            `}>
              Featured Drinks
            </h2>
            <p className={`
              text-lg tracking-wide
              ${mode === 'matcha' ? 'text-gray-600' : 'text-gray-400'}
            `}>
              Discover our signature collection
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
              >
                <ProductCard
                  product={product}
                  onClick={() => onProductClick(product.id)}
                />
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button onClick={() => onNavigate('shop')}>
              View All Products
            </Button>
          </div>
        </div>
      </section>

      {/* Mood Categories */}
      <section className={`
        py-24 px-6 transition-colors duration-700
        ${mode === 'matcha' ? 'bg-white' : 'bg-[#3B2F2F]/30'}
      `}>
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className={`
              font-['Playfair_Display'] mb-4 tracking-wider
              ${mode === 'matcha' ? 'text-[#3B2F2F]' : 'text-white'}
            `}>
              Choose Your Mood
            </h2>
            <p className={`
              text-lg tracking-wide
              ${mode === 'matcha' ? 'text-gray-600' : 'text-gray-400'}
            `}>
              Every beverage is a mood, a moment, a ritual
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { icon: Leaf, label: 'Calm', color: '#A8C3A0' },
              { icon: Sparkles, label: 'Focus', color: '#CBA135' },
              { icon: Coffee, label: 'Energy', color: '#3B2F2F' },
              { icon: Heart, label: 'Balance', color: '#F5F5DC' }
            ].map((mood, index) => (
              <motion.div
                key={mood.label}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -8 }}
                className={`
                  p-8 rounded-3xl text-center cursor-pointer backdrop-blur-xl border
                  ${mode === 'matcha'
                    ? 'bg-white/60 border-[#A8C3A0]/20 hover:shadow-xl'
                    : 'bg-[#3B2F2F]/60 border-[#CBA135]/20 hover:shadow-2xl hover:shadow-[#CBA135]/10'
                  }
                  transition-all duration-500
                `}
              >
                <mood.icon
                  size={48}
                  className="mx-auto mb-4"
                  style={{ color: mood.color }}
                />
                <h3 className={`
                  tracking-wider
                  ${mode === 'matcha' ? 'text-[#3B2F2F]' : 'text-white'}
                `}>
                  {mood.label}
                </h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={`
        py-32 px-6 relative overflow-hidden transition-colors duration-700
        ${mode === 'matcha' ? 'bg-[#FAFAFA]' : 'bg-[#1E1E1E]'}
      `}>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2 className={`
              font-['Playfair_Display'] mb-6 tracking-wider
              ${mode === 'matcha' ? 'text-[#3B2F2F]' : 'text-white'}
            `}>
              Your Daily Ritual Awaits
            </h2>
            <p className={`
              text-xl mb-12 tracking-wide
              ${mode === 'matcha' ? 'text-gray-600' : 'text-gray-400'}
            `}>
              Join thousands who've transformed their beverage into a lifestyle statement
            </p>
            <Button onClick={() => onNavigate('shop')}>
              Start Your Journey
            </Button>
          </motion.div>
        </div>

        {/* Background decoration */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-gradient-to-br from-[#A8C3A0] to-[#CBA135] blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-gradient-to-tr from-[#CBA135] to-[#A8C3A0] blur-3xl" />
        </div>
      </section>
    </div>
  );
}
