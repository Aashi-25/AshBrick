import { Factory } from 'lucide-react';

const Footer = () => (
  <footer className="relative z-10 px-6 py-12 glass-dark border-t border-white/10">
    <div className="max-w-7xl mx-auto text-center">
      <div className="flex items-center justify-center space-x-3 mb-4">
        <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-blue-500 rounded-xl flex items-center justify-center">
          <Factory className="w-6 h-6 text-white" />
        </div>
        <span className="text-2xl font-bold bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
          AshBrick
        </span>
      </div>
      <p className="text-gray-400 mb-4">
        Transforming waste into sustainable construction materials through AI-powered innovation.
      </p>
      <div className="flex justify-center space-x-8 text-sm text-gray-400">
        <a href="#" className="hover:text-green-400 transition-colors">Privacy Policy</a>
        <a href="#" className="hover:text-green-400 transition-colors">Terms of Service</a>
        <a href="#" className="hover:text-green-400 transition-colors">Contact Us</a>
      </div>
    </div>
  </footer>
);

export default Footer;