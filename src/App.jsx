@@ .. @@
 import { useState } from 'react';
 import Navbar from './components/Navbar';
+import AuthPage from './components/AuthPage';
 import Hero from './components/Hero';
@@ .. @@
 
 function App() {
   const [isMenuOpen, setIsMenuOpen] = useState(false);
+  const [showAuth, setShowAuth] = useState(false);
 
   return (
     <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-hidden">
       <BackgroundBlobs />
-      <Navbar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
+      <Navbar 
+        isMenuOpen={isMenuOpen} 
+        setIsMenuOpen={setIsMenuOpen}
+        onAuthClick={() => setShowAuth(true)}
+      />
       <Hero />
@@ .. @@
       <Impact />
      <CTA onAuthClick={() => setShowAuth(true)} />
       <Footer />
+      
+      {/* Auth Modal */}
+      {showAuth && <AuthPage onClose={() => setShowAuth(false)} />}
     </div>
   );
 }