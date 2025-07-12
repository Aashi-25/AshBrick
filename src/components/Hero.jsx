@@ .. @@
 import { Play } from 'lucide-react';
 
-const Hero = () => (
+const Hero = ({ onAuthClick }) => (
   <section className="relative z-10 px-6 py-20">
@@ .. @@
       <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-up delay-400">
-        <button className="bg-gradient-to-r from-green-400 to-blue-500 px-8 py-4 rounded-full font-semibold text-lg hover:scale-105 transition-transform flex items-center space-x-2">
+        <button 
+          onClick={onAuthClick}
+          className="bg-gradient-to-r from-green-400 to-blue-500 px-8 py-4 rounded-full font-semibold text-lg hover:scale-105 transition-transform flex items-center space-x-2"
+        >
           <Play className="w-5 h-5" />
-          <span>Watch Demo</span>
+          <span>Get Started</span>
         </button>
-        <button className="border-2 border-green-400 px-8 py-4 rounded-full font-semibold text-lg hover:bg-green-400 hover:text-gray-900 transition-colors">
-          Start Free Trial
+        <button className="border-2 border-green-400 px-8 py-4 rounded-full font-semibold text-lg hover:bg-green-400 hover:text-gray-900 transition-colors flex items-center space-x-2">
+          <Play className="w-5 h-5" />
+          <span>Watch Demo</span>
         </button>