
import { useState, useEffect } from 'react';
import { Bot, TrendingUp, FileText, Mic } from 'lucide-react';

const AIFeatures = () => {
  const [isVisible, setIsVisible] = useState({});

  const aiFeatures = [
    {
      icon: <Bot className="w-8 h-8 text-black" />,
      title: 'AI Matchmaking Assistant',
      description: 'Like a dating app for fly ash! Auto-matches based on distance, quality, and pricing.',
      tech: 'Llama LLM + Agentic AI',
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-black" />,
      title: 'Smart Supply Predictor',
      description: 'Forecasts ash availability and demand like weather predictions.',
      tech: 'ML Models + Historical Data',
    },
    {
      icon: <FileText className="w-8 h-8 text-black" />,
      title: 'Instant Report Generator',
      description: 'Auto-generates professional ESG reports and contracts in seconds.',
      tech: 'Generative AI + Templates',
    },
    {
      icon: <Mic className="w-8 h-8 text-black" />,
      title: 'Voice Chat Helper',
      description: 'Talk to the platform like chatting with a human expert.',
      tech: 'Speech Recognition + Llama LLM',
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible((prev) => ({
            ...prev,
            [entry.target.id]: entry.isIntersecting,
          }));
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('[id^="ai-"]').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section id="ai-powered" className="relative z-10 px-6 py-20">
      {/* Optional Background Effects (uncomment to enable particles) */}
      {/*
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-2 h-2 bg-green-400/50 rounded-full animate-float-${i % 2 + 1} shadow-sm shadow-green-400/20`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${4 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>
      */}

      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-block bg-gradient-to-br from-green-400 to-blue-500 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            🤖 AI-Powered Intelligence
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Smart Features in Plain Language
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Advanced AI that actually makes sense - no technical jargon, just powerful results
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {aiFeatures.map((feature, index) => (
            <div
              key={index}
              className={`p-8 rounded-2xl backdrop-blur-sm bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-500 ${
                isVisible[`ai-${index}`] ? 'animate-slide-up' : 'opacity-0'
              }`}
              id={`ai-${index}`}
            >
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-blue-500 rounded-xl flex items-center justify-center shadow-md shadow-green-400/20">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-2">{feature.title}</h3>
                  <span className="text-sm text-purple-300 bg-purple-500/20 px-3 py-1 rounded-full">
                    {feature.tech}
                  </span>
                </div>
              </div>
              <p className="text-gray-300 text-lg">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes slide-up {
          0% { transform: translateY(20px); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }
        /* Optional particle animations (uncomment if enabling particles) */
        /*
        @keyframes float-1 {
          0%, 100% { transform: translateY(0px) translateX(0px); opacity: 0.3; }
          50% { transform: translateY(-10px) translateX(5px); opacity: 0.6; }
        }
        @keyframes float-2 {
          0%, 100% { transform: translateY(0px) translateX(0px); opacity: 0.3; }
          50% { transform: translateY(-8px) translateX(-4px); opacity: 0.5; }
        }
        .animate-float-1 { animation: float-1 5s ease-in-out infinite; }
        .animate-float-2 { animation: float-2 6s ease-in-out infinite; }
        */
        .animate-slide-up { animation: slide-up 0.5s ease-out forwards; }
      `}</style>
    </section>
  );
};

export default AIFeatures;
