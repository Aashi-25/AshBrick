import { ArrowRight } from 'lucide-react';

const Impact = () => (
  <section id="impact" className="relative z-10 px-6 py-20">
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
          Environmental Impact
        </h2>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          See the dramatic difference fly ash bricks make
        </p>
      </div>
      <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div className="space-y-4">
            <div className="text-red-400 text-lg font-semibold">Traditional Brick</div>
            <div className="space-y-2">
              <div className="text-2xl font-bold">0.18 kg CO₂</div>
              <div className="text-sm text-gray-400">per brick</div>
            </div>
            <div className="space-y-2">
              <div className="text-2xl font-bold">1.2 L water</div>
              <div className="text-sm text-gray-400">per brick</div>
            </div>
            <div className="space-y-2">
              <div className="text-2xl font-bold">Topsoil</div>
              <div className="text-sm text-gray-400">depletion</div>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <ArrowRight className="w-12 h-12 text-green-400 animate-pulse" />
          </div>
          <div className="space-y-4">
            <div className="text-green-400 text-lg font-semibold">Fly Ash Brick</div>
            <div className="space-y-2">
              <div className="text-2xl font-bold">0.03 kg CO₂</div>
              <div className="text-sm text-green-400">83% reduction</div>
            </div>
            <div className="space-y-2">
              <div className="text-2xl font-bold">0.6 L water</div>
              <div className="text-sm text-green-400">50% reduction</div>
            </div>
            <div className="space-y-2">
              <div className="text-2xl font-bold">Zero</div>
              <div className="text-sm text-green-400">land damage</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default Impact;