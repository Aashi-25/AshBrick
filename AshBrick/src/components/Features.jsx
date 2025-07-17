<<<<<<< HEAD
import { useState } from 'react';
=======
import { useState, useEffect, useRef } from 'react';
>>>>>>> upstream/main
import { 
  BarChart3, 
  MapPin, 
  Leaf, 
  Truck 
} from 'lucide-react';
<<<<<<< HEAD

const Features = () => {
  const [activeTab, setActiveTab] = useState('supply');
=======
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Features = () => {
  const [activeTab, setActiveTab] = useState('supply');
  const cardRefs = useRef([]);

  useEffect(() => {
    cardRefs.current.forEach((card) => {
      if (card) {
        gsap.fromTo(
          card,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.2,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 80%',
              toggleActions: 'play reverse play reverse',
            },
          }
        );
      }
    });
  }, []);
>>>>>>> upstream/main

  const features = [
    {
      id: 'supply',
<<<<<<< HEAD
      icon: <BarChart3 className="w-6 h-6" />,
=======
      icon: <BarChart3 className="w-6 h-6" />, 
>>>>>>> upstream/main
      title: 'Supply Intelligence',
      description: 'Real-time fly ash availability mapping with satellite imagery and IoT sensors',
      tech: ['GIS Integration', 'Google Earth Engine', 'IoT Sensors']
    },
    {
      id: 'demand',
<<<<<<< HEAD
      icon: <MapPin className="w-6 h-6" />,
=======
      icon: <MapPin className="w-6 h-6" />, 
>>>>>>> upstream/main
      title: 'Demand Matching',
      description: 'AI-powered matching engine connecting ash suppliers to construction sites',
      tech: ['Dynamic Routing', 'OR-Tools', 'Smart Algorithms']
    },
    {
      id: 'carbon',
<<<<<<< HEAD
      icon: <Leaf className="w-6 h-6" />,
=======
      icon: <Leaf className="w-6 h-6" />, 
>>>>>>> upstream/main
      title: 'Carbon Tracker',
      description: 'Automated ESG reporting and carbon credit documentation',
      tech: ['API Integration', 'Gold Standard', 'PDF Reports']
    },
    {
      id: 'transaction',
<<<<<<< HEAD
      icon: <Truck className="w-6 h-6" />,
=======
      icon: <Truck className="w-6 h-6" />, 
>>>>>>> upstream/main
      title: 'Transaction Hub',
      description: 'End-to-end commerce with escrow payments and quality verification',
      tech: ['UPI Integration', 'Quality Verification', 'Logistics']
    }
  ];

  return (
    <section id="features" className="relative z-10 px-6 py-20">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Four Integrated Modules
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Our geospatial marketplace connects every piece of the fly ash ecosystem
          </p>
        </div>

<<<<<<< HEAD
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {features.map((feature, index) => (
            <div 
              key={feature.id}
              className={`p-8 rounded-2xl backdrop-blur-sm border transition-all duration-500 cursor-pointer ${
                activeTab === feature.id 
                  ? 'bg-gradient-to-br from-green-400/20 to-blue-500/20 border-green-400 scale-105' 
                  : 'bg-white/5 border-white/10 hover:bg-white/10'
              }`}
=======
        <div className="flex flex-col items-end gap-8 mb-12">
          {features.map((feature, index) => (
            <div 
              key={feature.id}
              ref={el => cardRefs.current[index] = el}
              className={`feature-card w-full md:w-1/2 p-8 glass-dark transition-all duration-500 cursor-pointer ${activeTab === feature.id ? 'ring-2 ring-cyan-400' : ''}`}
>>>>>>> upstream/main
              onClick={() => setActiveTab(feature.id)}
            >
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-blue-500 rounded-xl flex items-center justify-center">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold">{feature.title}</h3>
              </div>
              <p className="text-gray-300 mb-4">{feature.description}</p>
              <div className="flex flex-wrap gap-2">
                {feature.tech.map((tech, techIndex) => (
                  <span 
                    key={techIndex}
                    className="bg-gradient-to-r from-green-400/20 to-blue-500/20 px-3 py-1 rounded-full text-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
