import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { Leaf, Coffee, Heart, Sparkles } from 'lucide-react';

export function AboutPage() {
  const { mode } = useTheme();

  return (
    <div className={`
      min-h-screen pt-32 pb-24 transition-colors duration-700
      ${mode === 'matcha' ? 'bg-[#FAFAFA]' : 'bg-[#1E1E1E]'}
    `}>
      {/* Hero Section */}
      <section className="px-6 mb-24">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className={`
              font-['Playfair_Display'] mb-6 tracking-wider
              ${mode === 'matcha' ? 'text-[#3B2F2F]' : 'text-white'}
            `}
          >
            Our Story
          </motion.h1>

          <motion.p
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className={`
              text-xl leading-relaxed tracking-wide
              ${mode === 'matcha' ? 'text-gray-600' : 'text-gray-400'}
            `}
          >
            Where East meets West, calm meets energy, and tradition meets modern lifestyle.
          </motion.p>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="px-6 mb-24">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Matcha Philosophy */}
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              className={`
                p-12 rounded-3xl backdrop-blur-xl border
                ${mode === 'matcha'
                  ? 'bg-white/60 border-[#A8C3A0]/20'
                  : 'bg-[#3B2F2F]/60 border-[#CBA135]/20'
                }
              `}
            >
              <Leaf size={48} className="text-[#A8C3A0] mb-6" />
              <h2 className={`
                mb-4 font-['Playfair_Display'] tracking-wider
                ${mode === 'matcha' ? 'text-[#3B2F2F]' : 'text-white'}
              `}>
                The Zen of Matcha
              </h2>
              <p className={`
                leading-relaxed tracking-wide
                ${mode === 'matcha' ? 'text-gray-700' : 'text-gray-300'}
              `}>
                Rooted in centuries of Japanese tea ceremonies, matcha represents mindfulness, calm, and the art of being present. We source our ceremonial-grade matcha from Kyoto, where tradition and quality meet in every leaf.
              </p>
            </motion.div>

            {/* Coffee Philosophy */}
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              className={`
                p-12 rounded-3xl backdrop-blur-xl border
                ${mode === 'matcha'
                  ? 'bg-white/60 border-[#A8C3A0]/20'
                  : 'bg-[#3B2F2F]/60 border-[#CBA135]/20'
                }
              `}
            >
              <Coffee size={48} className="text-[#CBA135] mb-6" />
              <h2 className={`
                mb-4 font-['Playfair_Display'] tracking-wider
                ${mode === 'matcha' ? 'text-[#3B2F2F]' : 'text-white'}
              `}>
                The Bold of Coffee
              </h2>
              <p className={`
                leading-relaxed tracking-wide
                ${mode === 'matcha' ? 'text-gray-700' : 'text-gray-300'}
              `}>
                Coffee fuels the modern world—bold, energetic, and unapologetic. We celebrate this with ethically-sourced beans that deliver rich flavor and the energy to power your ambitions and daily hustle.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className={`
        py-24 px-6 transition-colors duration-700
        ${mode === 'matcha' ? 'bg-white' : 'bg-[#3B2F2F]/30'}
      `}>
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
          >
            <Heart size={48} className={`mx-auto mb-6 ${mode === 'matcha' ? 'text-[#A8C3A0]' : 'text-[#CBA135]'}`} />
            <h2 className={`
              mb-6 font-['Playfair_Display'] tracking-wider
              ${mode === 'matcha' ? 'text-[#3B2F2F]' : 'text-white'}
            `}>
              Our Mission
            </h2>
            <p className={`
              text-lg leading-relaxed mb-6 tracking-wide
              ${mode === 'matcha' ? 'text-gray-700' : 'text-gray-300'}
            `}>
              Coffeast isn't just about beverages—it's about creating daily rituals that empower Gen Z and Millennials to choose their mood, their energy, and their identity through what they drink.
            </p>
            <p className={`
              text-lg leading-relaxed tracking-wide
              ${mode === 'matcha' ? 'text-gray-700' : 'text-gray-300'}
            `}>
              Whether you need calm focus or bold energy, we believe your beverage should be as intentional as your lifestyle.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section className="px-6 py-24">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className={`
              text-center mb-16 font-['Playfair_Display'] tracking-wider
              ${mode === 'matcha' ? 'text-[#3B2F2F]' : 'text-white'}
            `}
          >
            What We Stand For
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Sparkles,
                title: 'Quality First',
                description: 'Premium ingredients sourced ethically from around the world. No shortcuts, no compromises.'
              },
              {
                icon: Heart,
                title: 'Sustainability',
                description: 'Eco-friendly packaging, carbon-neutral shipping, and support for sustainable farming practices.'
              },
              {
                icon: Leaf,
                title: 'Community',
                description: 'Building a global community of mindful, energetic, and intentional beverage lovers.'
              }
            ].map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className={`
                  p-8 rounded-3xl text-center backdrop-blur-xl border
                  ${mode === 'matcha'
                    ? 'bg-white/60 border-[#A8C3A0]/20 hover:shadow-xl'
                    : 'bg-[#3B2F2F]/60 border-[#CBA135]/20 hover:shadow-2xl hover:shadow-[#CBA135]/10'
                  }
                  transition-all duration-500
                `}
              >
                <value.icon
                  size={40}
                  className={`mx-auto mb-4 ${mode === 'matcha' ? 'text-[#A8C3A0]' : 'text-[#CBA135]'}`}
                />
                <h3 className={`
                  mb-3 tracking-wider
                  ${mode === 'matcha' ? 'text-[#3B2F2F]' : 'text-white'}
                `}>
                  {value.title}
                </h3>
                <p className={`
                  leading-relaxed tracking-wide
                  ${mode === 'matcha' ? 'text-gray-700' : 'text-gray-300'}
                `}>
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Closing Section */}
      <section className="px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            className={`
              p-12 rounded-3xl backdrop-blur-xl border
              ${mode === 'matcha'
                ? 'bg-gradient-to-br from-[#A8C3A0]/20 to-[#F5F5DC]/20 border-[#A8C3A0]/20'
                : 'bg-gradient-to-br from-[#CBA135]/20 to-[#3B2F2F]/20 border-[#CBA135]/20'
              }
            `}
          >
            <h2 className={`
              mb-4 font-['Playfair_Display'] tracking-wider
              ${mode === 'matcha' ? 'text-[#3B2F2F]' : 'text-white'}
            `}>
              Balance in Every Sip
            </h2>
            <p className={`
              text-lg leading-relaxed tracking-wide
              ${mode === 'matcha' ? 'text-gray-700' : 'text-gray-300'}
            `}>
              Coffeast is more than a brand—it's a lifestyle. Choose your mood. Embrace your ritual. Live intentionally.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
