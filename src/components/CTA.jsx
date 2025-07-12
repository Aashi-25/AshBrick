@@ .. @@
-const CTA = () => (
)
+const CTA = ({ onAuthClick }) => (
   <section className="relative z-10 px-6 py-20">
@@ .. @@
         <div className="flex flex-col sm:flex-row gap-4 justify-center">
-          <button className="bg-gradient-to-r from-green-400 to-blue-500 px-8 py-4 rounded-full font-semibold text-lg hover:scale-105 transition-transform">
-            Start Free Trial
+          <button 
)
+            onClick={onAuthClick}
+            className="bg-gradient-to-r from-green-400 to-blue-500 px-8 py-4 rounded-full font-semibold text-lg hover:scale-105 transition-transform"
+          >
+            Get Started Free
           </button>
           <button className="border-2 border-green-400 px-8 py-4 rounded-full font-semibold text-lg hover:bg-green-400 hover:text-gray-900 transition-colors">
             Schedule Demo