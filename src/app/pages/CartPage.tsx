import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { Button } from '../components/Button';
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import { CartItem } from '../types';

interface CartPageProps {
  cart: CartItem[];
  onUpdateQuantity: (productId: number, quantity: number) => void;
  onRemoveItem: (productId: number) => void;
  onNavigate: (page: string) => void;
}

export function CartPage({ cart, onUpdateQuantity, onRemoveItem, onNavigate }: CartPageProps) {
  const { mode } = useTheme();

  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const shipping = subtotal > 0 ? 5.99 : 0;
  const total = subtotal + shipping;

  if (cart.length === 0) {
    return (
      <div className={`
        min-h-screen pt-32 px-6 flex flex-col items-center justify-center transition-colors duration-700
        ${mode === 'matcha' ? 'bg-[#FAFAFA]' : 'bg-[#1E1E1E]'}
      `}>
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center"
        >
          <ShoppingBag
            size={80}
            className={`mx-auto mb-6 ${mode === 'matcha' ? 'text-gray-400' : 'text-gray-600'}`}
          />
          <h2 className={`
            font-['Playfair_Display'] mb-4 tracking-wider
            ${mode === 'matcha' ? 'text-[#3B2F2F]' : 'text-white'}
          `}>
            Your Cart is Empty
          </h2>
          <p className={`
            mb-8 tracking-wide
            ${mode === 'matcha' ? 'text-gray-600' : 'text-gray-400'}
          `}>
            Start adding some beverages to your cart
          </p>
          <Button onClick={() => onNavigate('shop')}>
            Browse Products
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className={`
      min-h-screen pt-32 pb-24 px-6 transition-colors duration-700
      ${mode === 'matcha' ? 'bg-[#FAFAFA]' : 'bg-[#1E1E1E]'}
    `}>
      <div className="max-w-6xl mx-auto">
        <motion.h1
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className={`
            font-['Playfair_Display'] mb-12 tracking-wider
            ${mode === 'matcha' ? 'text-[#3B2F2F]' : 'text-white'}
          `}
        >
          Shopping Cart
        </motion.h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item, index) => (
              <motion.div
                key={item.product.id}
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                className={`
                  p-6 rounded-3xl backdrop-blur-xl border flex gap-6
                  ${mode === 'matcha'
                    ? 'bg-white/60 border-[#A8C3A0]/20'
                    : 'bg-[#3B2F2F]/60 border-[#CBA135]/20'
                  }
                `}
              >
                {/* Product Image */}
                <div className="w-32 h-32 rounded-2xl overflow-hidden flex-shrink-0">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Product Info */}
                <div className="flex-1 flex flex-col">
                  <h3 className={`
                    mb-2 tracking-wide
                    ${mode === 'matcha' ? 'text-[#3B2F2F]' : 'text-white'}
                  `}>
                    {item.product.name}
                  </h3>

                  <p className={`
                    text-sm mb-4 tracking-wider
                    ${mode === 'matcha' ? 'text-[#A8C3A0]' : 'text-[#CBA135]'}
                  `}>
                    ${item.product.price.toFixed(2)}
                  </p>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-4 mt-auto">
                    <div className={`
                      flex items-center gap-2 border rounded-xl overflow-hidden
                      ${mode === 'matcha' ? 'border-[#A8C3A0]/30' : 'border-[#CBA135]/30'}
                    `}>
                      <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={() => onUpdateQuantity(item.product.id, Math.max(1, item.quantity - 1))}
                        className={`
                          p-2 transition-colors
                          ${mode === 'matcha'
                            ? 'hover:bg-[#A8C3A0]/20 text-[#3B2F2F]'
                            : 'hover:bg-[#CBA135]/20 text-white'
                          }
                        `}
                      >
                        <Minus size={16} />
                      </motion.button>

                      <span className={`
                        w-12 text-center
                        ${mode === 'matcha' ? 'text-[#3B2F2F]' : 'text-white'}
                      `}>
                        {item.quantity}
                      </span>

                      <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                        className={`
                          p-2 transition-colors
                          ${mode === 'matcha'
                            ? 'hover:bg-[#A8C3A0]/20 text-[#3B2F2F]'
                            : 'hover:bg-[#CBA135]/20 text-white'
                          }
                        `}
                      >
                        <Plus size={16} />
                      </motion.button>
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => onRemoveItem(item.product.id)}
                      className={`
                        p-2 rounded-lg transition-colors ml-auto
                        ${mode === 'matcha'
                          ? 'hover:bg-red-100 text-red-600'
                          : 'hover:bg-red-900/20 text-red-400'
                        }
                      `}
                    >
                      <Trash2 size={20} />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Order Summary */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="lg:col-span-1"
          >
            <div className={`
              p-8 rounded-3xl backdrop-blur-xl border sticky top-32
              ${mode === 'matcha'
                ? 'bg-white/60 border-[#A8C3A0]/20'
                : 'bg-[#3B2F2F]/60 border-[#CBA135]/20'
              }
            `}>
              <h2 className={`
                mb-6 tracking-wider
                ${mode === 'matcha' ? 'text-[#3B2F2F]' : 'text-white'}
              `}>
                Order Summary
              </h2>

              <div className="space-y-4 mb-6">
                <div className={`
                  flex justify-between tracking-wide
                  ${mode === 'matcha' ? 'text-gray-700' : 'text-gray-300'}
                `}>
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>

                <div className={`
                  flex justify-between tracking-wide
                  ${mode === 'matcha' ? 'text-gray-700' : 'text-gray-300'}
                `}>
                  <span>Shipping</span>
                  <span>${shipping.toFixed(2)}</span>
                </div>

                <div className={`
                  pt-4 border-t flex justify-between font-medium tracking-wider
                  ${mode === 'matcha'
                    ? 'border-[#A8C3A0]/30 text-[#3B2F2F]'
                    : 'border-[#CBA135]/30 text-white'
                  }
                `}>
                  <span>Total</span>
                  <span className={mode === 'matcha' ? 'text-[#A8C3A0]' : 'text-[#CBA135]'}>
                    ${total.toFixed(2)}
                  </span>
                </div>
              </div>

              <Button
                onClick={() => onNavigate('checkout')}
                className="w-full"
              >
                Proceed to Checkout
              </Button>

              <button
                onClick={() => onNavigate('shop')}
                className={`
                  w-full mt-4 text-center tracking-wide transition-colors
                  ${mode === 'matcha'
                    ? 'text-[#3B2F2F] hover:text-[#A8C3A0]'
                    : 'text-white hover:text-[#CBA135]'
                  }
                `}
              >
                Continue Shopping
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
