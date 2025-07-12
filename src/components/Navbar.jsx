@@ .. @@
 import { Factory, Menu, X } from 'lucide-react';
 
-const Navbar = ({ isMenuOpen, setIsMenuOpen }) => (
+const Navbar = ({ isMenuOpen, setIsMenuOpen, onAuthClick }) => (
   <nav className="relative z-50 px-6 py-4">
@@ .. @@
         <a href="#impact" className="hover:text-green-400 transition-colors">Impact</a>
         <a href="#pricing" className="hover:text-green-400 transition-colors">Pricing</a>
-        <button className="bg-gradient-to-r from-green-400 to-blue-500 px-6 py-2 rounded-full font-semibold hover:scale-105 transition-transform">
+        <button 
+          onClick={onAuthClick}
+          className="bg-gradient-to-r from-green-400 to-blue-500 px-6 py-2 rounded-full font-semibold hover:scale-105 transition-transform"
+        >
           Get Started
         </button>
@@ .. @@
         <a 
           href="#pricing" 
           className="block py-2 hover:text-green-400 transition-colors"
           onClick={() => setIsMenuOpen(false)}
         >
           Pricing
         </a>
-        <button className="w-full bg-gradient-to-r from-green-400 to-blue-500 px-6 py-3 rounded-full font-semibold hover:scale-105 transition-transform">
+        <button 
+          onClick={() => {
+            setIsMenuOpen(false);
+            onAuthClick();
+          }}
+          className="w-full bg-gradient-to-r from-green-400 to-blue-500 px-6 py-3 rounded-full font-semibold hover:scale-105 transition-transform"
+        >
           Get Started
         </button>