import React from 'react';
import { Factory, Leaf, Zap, Globe } from 'lucide-react';

const stats = [
  { number: '50M+', label: 'Bricks Processed', icon: Factory },
  { number: '95%', label: 'Waste Reduction', icon: Leaf },
  { number: '200+', label: 'Cities Served', icon: Globe },
  { number: '1M+', label: 'Tons CO₂ Saved', icon: Zap }
];

const Metrics = () => (
  <section id="metrics" className="relative z-20 w-full py-16 bg-gradient-to-r from-green-600/5 to-green-800/10 backdrop-blur-sm border-b border-green-400/20">
    <div className="w-full px-0">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 w-full max-w-screen-2xl mx-auto px-4 md:px-12">
        {stats.map((stat, index) => (
          <div 
            key={index}
            className="text-center group cursor-pointer transform hover:scale-105 transition-all duration-300"
            style={{ animationDelay: `${index * 200}ms` }}
          >
            <div className="flex justify-center mb-4">
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-all duration-300 shadow-lg shadow-green-400/30">
                  <stat.icon className="w-8 h-8 text-black" />
                </div>
                <div className="absolute inset-0 w-16 h-16 bg-green-400 opacity-0 group-hover:opacity-40 blur-xl transition-all duration-300 rounded-full" />
              </div>
            </div>
            <div className="text-3xl font-bold text-green-400 mb-2 group-hover:text-green-300 transition-colors duration-300">
              {stat.number}
            </div>
            <div className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Metrics;
