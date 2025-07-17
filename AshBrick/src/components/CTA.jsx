<<<<<<< HEAD
import { ArrowRight } from 'lucide-react';

const CTA = ({ onAuthClick }) => (
  <section className="relative z-10 px-6 py-20">
    <div className="max-w-4xl mx-auto text-center">
      <div className="bg-gradient-to-r from-green-400/20 to-blue-500/20 backdrop-blur-sm rounded-2xl p-12 border border-green-400/30">
=======
const CTA = () => (
  <section className="relative z-10 px-6 py-20">
    <div className="max-w-4xl mx-auto text-center">
      <div className="glass-dark p-12">
>>>>>>> upstream/main
        <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
          Ready to Transform Your Business?
        </h2>
        <p className="text-xl text-gray-300 mb-8">
          Join the green construction revolution. Save money, save the planet.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
<<<<<<< HEAD
          <button 
            onClick={onAuthClick}
            className="bg-gradient-to-r from-green-400 to-blue-500 px-8 py-4 rounded-full font-semibold text-lg hover:scale-105 transition-transform flex items-center justify-center space-x-2"
          >
            <span>Start Free Trial</span>
            <ArrowRight className="w-5 h-5" />
          </button>
          <button 
            onClick={onAuthClick}
            className="border-2 border-green-400 px-8 py-4 rounded-full font-semibold text-lg hover:bg-green-400 hover:text-gray-900 transition-colors"
          >
=======
          <button className="bg-gradient-to-r from-green-400 to-blue-500 px-8 py-4 rounded-full font-semibold text-lg hover:scale-105 transition-transform">
            Start Free Trial
          </button>
          <button className="border-2 border-green-400 px-8 py-4 rounded-full font-semibold text-lg hover:bg-green-400 hover:text-gray-900 transition-colors">
>>>>>>> upstream/main
            Schedule Demo
          </button>
        </div>
      </div>
    </div>
  </section>
);

<<<<<<< HEAD
export default CTA;
=======
export default CTA;
>>>>>>> upstream/main
