import { motion } from 'framer-motion';
import { ShoppingCart, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { useTheme } from '../context/ThemeContext';

interface NavigationProps {
  onNavigate: (page: string) => void;
  cartCount: number;
}

export function Navigation({ onNavigate, cartCount }: NavigationProps) {
  const { mode, toggleMode } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: 'Home', page: 'home' },
    { label: 'Shop', page: 'shop' },
    { label: 'About', page: 'about' }
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`
        fixed top-0 left-0 right-0 z-50 backdrop-blur-xl border-b
        ${mode === 'matcha'
          ? 'bg-white/80 border-[#A8C3A0]/20'
          : 'bg-[#1E1E1E]/80 border-[#CBA135]/20'
        }
        transition-all duration-500
      `}
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            onClick={() => onNavigate('home')}
            className="cursor-pointer"
          >
            <h1 className={`
              tracking-wider font-['Playfair_Display'] font-bold
              ${mode === 'matcha' ? 'text-[#3B2F2F]' : 'text-white'}
            `}>
              Coffeast
            </h1>
          </motion.div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-12">
            {navItems.map((item) => (
              <motion.button
                key={item.page}
                whileHover={{ scale: 1.1 }}
                onClick={() => onNavigate(item.page)}
                className={`
                  font-medium transition-colors tracking-wide
                  ${mode === 'matcha'
                    ? 'text-[#3B2F2F] hover:text-[#A8C3A0]'
                    : 'text-white hover:text-[#CBA135]'
                  }
                `}
              >
                {item.label}
              </motion.button>
            ))}

            {/* Mode Toggle */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleMode}
              className={`
                px-6 py-2 rounded-full font-medium transition-all duration-500
                ${mode === 'matcha'
                  ? 'bg-[#A8C3A0] text-white hover:bg-[#8FAD87]'
                  : 'bg-[#CBA135] text-[#1E1E1E] hover:bg-[#E0B647]'
                }
              `}
            >
              {mode === 'matcha' ? '☕ Coffee' : '🍵 Matcha'}
            </motion.button>

            {/* Cart */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              onClick={() => onNavigate('cart')}
              className="relative"
            >
              <ShoppingCart
                className={mode === 'matcha' ? 'text-[#3B2F2F]' : 'text-white'}
                size={24}
              />
              {cartCount > 0 && (
                <span className={`
                  absolute -top-2 -right-2 w-5 h-5 rounded-full text-xs flex items-center justify-center font-medium
                  ${mode === 'matcha'
                    ? 'bg-[#A8C3A0] text-white'
                    : 'bg-[#CBA135] text-[#1E1E1E]'
                  }
                `}>
                  {cartCount}
                </span>
              )}
            </motion.button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden"
          >
            {mobileMenuOpen ? (
              <X className={mode === 'matcha' ? 'text-[#3B2F2F]' : 'text-white'} />
            ) : (
              <Menu className={mode === 'matcha' ? 'text-[#3B2F2F]' : 'text-white'} />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="md:hidden pt-4 pb-2"
          >
            {navItems.map((item) => (
              <button
                key={item.page}
                onClick={() => {
                  onNavigate(item.page);
                  setMobileMenuOpen(false);
                }}
                className={`
                  block w-full text-left py-3 font-medium
                  ${mode === 'matcha' ? 'text-[#3B2F2F]' : 'text-white'}
                `}
              >
                {item.label}
              </button>
            ))}
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
}
