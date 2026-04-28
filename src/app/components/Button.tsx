import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost';
  onClick?: () => void;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

export function Button({
  children,
  variant = 'primary',
  onClick,
  className = '',
  type = 'button'
}: ButtonProps) {
  const { mode } = useTheme();

  const baseClasses = 'px-8 py-4 rounded-2xl font-medium transition-all duration-300 cursor-pointer';

  const variantClasses = {
    primary: mode === 'matcha'
      ? 'bg-[#A8C3A0] text-white hover:bg-[#8FAD87] shadow-lg hover:shadow-xl hover:scale-105'
      : 'bg-[#CBA135] text-[#1E1E1E] hover:bg-[#E0B647] shadow-lg hover:shadow-2xl hover:shadow-[#CBA135]/20 hover:scale-105',
    secondary: mode === 'matcha'
      ? 'bg-transparent border-2 border-[#A8C3A0] text-[#A8C3A0] hover:bg-[#A8C3A0] hover:text-white'
      : 'bg-transparent border-2 border-[#CBA135] text-[#CBA135] hover:bg-[#CBA135] hover:text-[#1E1E1E]',
    ghost: 'bg-transparent hover:bg-white/10'
  };

  return (
    <motion.button
      type={type}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
    >
      {children}
    </motion.button>
  );
}
