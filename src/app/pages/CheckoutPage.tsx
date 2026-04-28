import { motion } from 'framer-motion';
import { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { Button } from '../components/Button';
import { CheckCircle } from 'lucide-react';
import { CartItem } from '../types';

interface CheckoutPageProps {
  cart: CartItem[];
  onNavigate: (page: string) => void;
}

export function CheckoutPage({ cart, onNavigate }: CheckoutPageProps) {
  const { mode } = useTheme();
  const [currentStep, setCurrentStep] = useState<'info' | 'payment' | 'confirmation'>('info');
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    cardNumber: '',
    expiry: '',
    cvv: ''
  });

  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const shipping = 5.99;
  const total = subtotal + shipping;

  const steps = [
    { id: 'info', label: 'Shipping Info' },
    { id: 'payment', label: 'Payment' },
    { id: 'confirmation', label: 'Confirmation' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentStep === 'info') {
      setCurrentStep('payment');
    } else if (currentStep === 'payment') {
      setCurrentStep('confirmation');
    }
  };

  if (currentStep === 'confirmation') {
    return (
      <div className={`
        min-h-screen pt-32 px-6 flex items-center justify-center transition-colors duration-700
        ${mode === 'matcha' ? 'bg-[#FAFAFA]' : 'bg-[#1E1E1E]'}
      `}>
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center max-w-md"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring' }}
          >
            <CheckCircle
              size={80}
              className={`mx-auto mb-6 ${mode === 'matcha' ? 'text-[#A8C3A0]' : 'text-[#CBA135]'}`}
            />
          </motion.div>

          <h2 className={`
            font-['Playfair_Display'] mb-4 tracking-wider
            ${mode === 'matcha' ? 'text-[#3B2F2F]' : 'text-white'}
          `}>
            Order Confirmed!
          </h2>

          <p className={`
            mb-2 tracking-wide
            ${mode === 'matcha' ? 'text-gray-600' : 'text-gray-400'}
          `}>
            Thank you for your order!
          </p>

          <p className={`
            mb-8 tracking-wide
            ${mode === 'matcha' ? 'text-gray-600' : 'text-gray-400'}
          `}>
            We've sent a confirmation email to <strong>{formData.email}</strong>
          </p>

          <div className={`
            p-6 rounded-2xl mb-8 backdrop-blur-xl border
            ${mode === 'matcha'
              ? 'bg-white/60 border-[#A8C3A0]/20'
              : 'bg-[#3B2F2F]/60 border-[#CBA135]/20'
            }
          `}>
            <div className={`
              text-sm mb-2 tracking-wide
              ${mode === 'matcha' ? 'text-gray-600' : 'text-gray-400'}
            `}>
              Order Total
            </div>
            <div className={`
              tracking-wider
              ${mode === 'matcha' ? 'text-[#A8C3A0]' : 'text-[#CBA135]'}
            `}>
              ${total.toFixed(2)}
            </div>
          </div>

          <Button onClick={() => onNavigate('home')}>
            Back to Home
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
      <div className="max-w-4xl mx-auto">
        {/* Progress Indicator */}
        <div className="mb-12">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center flex-1">
                <div className="flex flex-col items-center flex-1">
                  <div className={`
                    w-10 h-10 rounded-full flex items-center justify-center font-medium transition-all duration-300
                    ${steps.findIndex(s => s.id === currentStep) >= index
                      ? mode === 'matcha'
                        ? 'bg-[#A8C3A0] text-white'
                        : 'bg-[#CBA135] text-[#1E1E1E]'
                      : mode === 'matcha'
                        ? 'bg-gray-200 text-gray-500'
                        : 'bg-gray-700 text-gray-500'
                    }
                  `}>
                    {index + 1}
                  </div>
                  <span className={`
                    text-sm mt-2 tracking-wide
                    ${mode === 'matcha' ? 'text-gray-600' : 'text-gray-400'}
                  `}>
                    {step.label}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div className={`
                    h-0.5 flex-1 mx-4 transition-all duration-300
                    ${steps.findIndex(s => s.id === currentStep) > index
                      ? mode === 'matcha'
                        ? 'bg-[#A8C3A0]'
                        : 'bg-[#CBA135]'
                      : mode === 'matcha'
                        ? 'bg-gray-200'
                        : 'bg-gray-700'
                    }
                  `} />
                )}
              </div>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <motion.div
            key={currentStep}
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className={`
              p-8 rounded-3xl backdrop-blur-xl border
              ${mode === 'matcha'
                ? 'bg-white/60 border-[#A8C3A0]/20'
                : 'bg-[#3B2F2F]/60 border-[#CBA135]/20'
              }
            `}
          >
            {currentStep === 'info' && (
              <div>
                <h2 className={`
                  mb-6 tracking-wider
                  ${mode === 'matcha' ? 'text-[#3B2F2F]' : 'text-white'}
                `}>
                  Shipping Information
                </h2>

                <div className="space-y-4">
                  <div>
                    <label className={`
                      block mb-2 text-sm tracking-wide
                      ${mode === 'matcha' ? 'text-gray-700' : 'text-gray-300'}
                    `}>
                      Email
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className={`
                        w-full px-4 py-3 rounded-xl border backdrop-blur-md transition-all
                        ${mode === 'matcha'
                          ? 'bg-white/50 border-[#A8C3A0]/30 text-[#3B2F2F] focus:border-[#A8C3A0]'
                          : 'bg-[#1E1E1E]/50 border-[#CBA135]/30 text-white focus:border-[#CBA135]'
                        }
                        outline-none
                      `}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className={`
                        block mb-2 text-sm tracking-wide
                        ${mode === 'matcha' ? 'text-gray-700' : 'text-gray-300'}
                      `}>
                        First Name
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.firstName}
                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                        className={`
                          w-full px-4 py-3 rounded-xl border backdrop-blur-md transition-all
                          ${mode === 'matcha'
                            ? 'bg-white/50 border-[#A8C3A0]/30 text-[#3B2F2F] focus:border-[#A8C3A0]'
                            : 'bg-[#1E1E1E]/50 border-[#CBA135]/30 text-white focus:border-[#CBA135]'
                          }
                          outline-none
                        `}
                      />
                    </div>

                    <div>
                      <label className={`
                        block mb-2 text-sm tracking-wide
                        ${mode === 'matcha' ? 'text-gray-700' : 'text-gray-300'}
                      `}>
                        Last Name
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.lastName}
                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                        className={`
                          w-full px-4 py-3 rounded-xl border backdrop-blur-md transition-all
                          ${mode === 'matcha'
                            ? 'bg-white/50 border-[#A8C3A0]/30 text-[#3B2F2F] focus:border-[#A8C3A0]'
                            : 'bg-[#1E1E1E]/50 border-[#CBA135]/30 text-white focus:border-[#CBA135]'
                          }
                          outline-none
                        `}
                      />
                    </div>
                  </div>

                  <div>
                    <label className={`
                      block mb-2 text-sm tracking-wide
                      ${mode === 'matcha' ? 'text-gray-700' : 'text-gray-300'}
                    `}>
                      Address
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      className={`
                        w-full px-4 py-3 rounded-xl border backdrop-blur-md transition-all
                        ${mode === 'matcha'
                          ? 'bg-white/50 border-[#A8C3A0]/30 text-[#3B2F2F] focus:border-[#A8C3A0]'
                          : 'bg-[#1E1E1E]/50 border-[#CBA135]/30 text-white focus:border-[#CBA135]'
                        }
                        outline-none
                      `}
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className={`
                        block mb-2 text-sm tracking-wide
                        ${mode === 'matcha' ? 'text-gray-700' : 'text-gray-300'}
                      `}>
                        City
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        className={`
                          w-full px-4 py-3 rounded-xl border backdrop-blur-md transition-all
                          ${mode === 'matcha'
                            ? 'bg-white/50 border-[#A8C3A0]/30 text-[#3B2F2F] focus:border-[#A8C3A0]'
                            : 'bg-[#1E1E1E]/50 border-[#CBA135]/30 text-white focus:border-[#CBA135]'
                          }
                          outline-none
                        `}
                      />
                    </div>

                    <div>
                      <label className={`
                        block mb-2 text-sm tracking-wide
                        ${mode === 'matcha' ? 'text-gray-700' : 'text-gray-300'}
                      `}>
                        State
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.state}
                        onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                        className={`
                          w-full px-4 py-3 rounded-xl border backdrop-blur-md transition-all
                          ${mode === 'matcha'
                            ? 'bg-white/50 border-[#A8C3A0]/30 text-[#3B2F2F] focus:border-[#A8C3A0]'
                            : 'bg-[#1E1E1E]/50 border-[#CBA135]/30 text-white focus:border-[#CBA135]'
                          }
                          outline-none
                        `}
                      />
                    </div>

                    <div>
                      <label className={`
                        block mb-2 text-sm tracking-wide
                        ${mode === 'matcha' ? 'text-gray-700' : 'text-gray-300'}
                      `}>
                        ZIP
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.zip}
                        onChange={(e) => setFormData({ ...formData, zip: e.target.value })}
                        className={`
                          w-full px-4 py-3 rounded-xl border backdrop-blur-md transition-all
                          ${mode === 'matcha'
                            ? 'bg-white/50 border-[#A8C3A0]/30 text-[#3B2F2F] focus:border-[#A8C3A0]'
                            : 'bg-[#1E1E1E]/50 border-[#CBA135]/30 text-white focus:border-[#CBA135]'
                          }
                          outline-none
                        `}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {currentStep === 'payment' && (
              <div>
                <h2 className={`
                  mb-6 tracking-wider
                  ${mode === 'matcha' ? 'text-[#3B2F2F]' : 'text-white'}
                `}>
                  Payment Details
                </h2>

                <div className="space-y-4">
                  <div>
                    <label className={`
                      block mb-2 text-sm tracking-wide
                      ${mode === 'matcha' ? 'text-gray-700' : 'text-gray-300'}
                    `}>
                      Card Number
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="1234 5678 9012 3456"
                      value={formData.cardNumber}
                      onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
                      className={`
                        w-full px-4 py-3 rounded-xl border backdrop-blur-md transition-all
                        ${mode === 'matcha'
                          ? 'bg-white/50 border-[#A8C3A0]/30 text-[#3B2F2F] focus:border-[#A8C3A0] placeholder:text-gray-400'
                          : 'bg-[#1E1E1E]/50 border-[#CBA135]/30 text-white focus:border-[#CBA135] placeholder:text-gray-600'
                        }
                        outline-none
                      `}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className={`
                        block mb-2 text-sm tracking-wide
                        ${mode === 'matcha' ? 'text-gray-700' : 'text-gray-300'}
                      `}>
                        Expiry Date
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="MM/YY"
                        value={formData.expiry}
                        onChange={(e) => setFormData({ ...formData, expiry: e.target.value })}
                        className={`
                          w-full px-4 py-3 rounded-xl border backdrop-blur-md transition-all
                          ${mode === 'matcha'
                            ? 'bg-white/50 border-[#A8C3A0]/30 text-[#3B2F2F] focus:border-[#A8C3A0] placeholder:text-gray-400'
                            : 'bg-[#1E1E1E]/50 border-[#CBA135]/30 text-white focus:border-[#CBA135] placeholder:text-gray-600'
                          }
                          outline-none
                        `}
                      />
                    </div>

                    <div>
                      <label className={`
                        block mb-2 text-sm tracking-wide
                        ${mode === 'matcha' ? 'text-gray-700' : 'text-gray-300'}
                      `}>
                        CVV
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="123"
                        value={formData.cvv}
                        onChange={(e) => setFormData({ ...formData, cvv: e.target.value })}
                        className={`
                          w-full px-4 py-3 rounded-xl border backdrop-blur-md transition-all
                          ${mode === 'matcha'
                            ? 'bg-white/50 border-[#A8C3A0]/30 text-[#3B2F2F] focus:border-[#A8C3A0] placeholder:text-gray-400'
                            : 'bg-[#1E1E1E]/50 border-[#CBA135]/30 text-white focus:border-[#CBA135] placeholder:text-gray-600'
                          }
                          outline-none
                        `}
                      />
                    </div>
                  </div>

                  {/* Order Summary */}
                  <div className={`
                    mt-8 p-6 rounded-2xl border
                    ${mode === 'matcha'
                      ? 'bg-white/30 border-[#A8C3A0]/30'
                      : 'bg-[#1E1E1E]/30 border-[#CBA135]/30'
                    }
                  `}>
                    <h3 className={`
                      mb-4 font-medium tracking-wide
                      ${mode === 'matcha' ? 'text-[#3B2F2F]' : 'text-white'}
                    `}>
                      Order Summary
                    </h3>

                    <div className="space-y-2">
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
                        pt-2 border-t flex justify-between font-medium tracking-wider
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
                  </div>
                </div>
              </div>
            )}

            <div className="flex gap-4 mt-8">
              {currentStep === 'payment' && (
                <Button
                  variant="secondary"
                  onClick={() => setCurrentStep('info')}
                  type="button"
                  className="flex-1"
                >
                  Back
                </Button>
              )}
              <Button type="submit" className="flex-1">
                {currentStep === 'info' ? 'Continue to Payment' : 'Place Order'}
              </Button>
            </div>
          </motion.div>
        </form>
      </div>
    </div>
  );
}
