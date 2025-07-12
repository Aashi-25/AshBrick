import { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Metrics from './components/Metrics';
import Features from './components/Features';
import AIFeatures from './components/AIFeatures';
import Impact from './components/Impact';
import CTA from './components/CTA';
import Footer from './components/Footer';
import BackgroundBlobs from './components/BackgroundBlobs';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-hidden">
      <BackgroundBlobs />
      <Navbar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      <Hero />
      <Metrics />
      <Features />
      <AIFeatures />
      <Impact />
      <CTA />
      <Footer />
    </div>
  );
}

export default App;
