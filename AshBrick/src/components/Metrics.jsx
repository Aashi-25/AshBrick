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
            <div key={index} className={`text-center p-6 glass-dark transition-all duration-500 ${currentMetric === index ? 'ring-2 ring-cyan-400 scale-105' : ''}` }>
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
