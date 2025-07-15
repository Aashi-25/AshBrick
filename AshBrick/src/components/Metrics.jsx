import { useEffect, useState } from 'react';

const metrics = [
  { value: '8-15', unit: '$/ton', label: 'Disposal Cost Saved' },
  { value: '40%', unit: '', label: 'Material Cost Reduction' },
  { value: '83%', unit: '', label: 'CO₂ Emissions Cut' },
  { value: '100km', unit: '', label: 'Max Coverage Radius' }
];

const Metrics = () => {
  const [currentMetric, setCurrentMetric] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMetric((prev) => (prev + 1) % metrics.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="metrics" className="relative z-10 px-6 py-16">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8">
          {metrics.map((metric, index) => (
            <div key={index} className={`text-center p-6 rounded-2xl backdrop-blur-sm transition-all duration-500 ${
              currentMetric === index
                ? 'bg-gradient-to-br from-green-400/20 to-blue-500/20 border-2 border-green-400 scale-105'
                : 'bg-white/5 border border-white/10'
            }`}>
              <div className="text-4xl font-bold bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent mb-2">
                {metric.value}<span className="text-2xl">{metric.unit}</span>
              </div>
              <p className="text-gray-300">{metric.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Metrics;
