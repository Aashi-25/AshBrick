<<<<<<< HEAD
import { Factory } from 'lucide-react';

const Footer = () => (
  <footer className="relative z-10 px-6 py-12 border-t border-white/10">
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
=======
import {
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Youtube,
  Factory
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-white border-t py-12 text-gray-700 text-sm">
      <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-5 gap-8">
        {/* Logo */}
        <div>
          <div className="flex items-center space-x-2 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-blue-500 rounded-xl flex items-center justify-center">
              <Factory className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold">Logo</span>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-semibold mb-2">Quick Links</h4>
          <ul className="space-y-1">
            <li><a href="#">About Us</a></li>
            <li><a href="#">Contact Us</a></li>
            <li><a href="#">Our Services</a></li>
            <li><a href="#">Blog Posts</a></li>
            <li><a href="#">FAQs</a></li>
          </ul>
        </div>

        {/* Follow Us */}
        <div>
          <h4 className="font-semibold mb-2">Follow Us</h4>
          <ul className="space-y-1">
            <li><a href="#">Facebook Page</a></li>
            <li><a href="#">Twitter Feed</a></li>
            <li><a href="#">LinkedIn Profile</a></li>
            <li><a href="#">Instagram Gallery</a></li>
            <li><a href="#">YouTube Channel</a></li>
          </ul>
        </div>

        {/* Stay Updated */}
        <div>
          <h4 className="font-semibold mb-2">Stay Updated</h4>
          <ul className="space-y-1">
            <li><a href="#">Email Alerts</a></li>
            <li><a href="#">News Updates</a></li>
            <li><a href="#">Special Offers</a></li>
            <li><a href="#">Event Notifications</a></li>
            <li><a href="#">Product Launches</a></li>
          </ul>
        </div>

        {/* Subscribe */}
        <div>
          <h4 className="font-semibold mb-2">Subscribe</h4>
          <p className="mb-2 text-xs">Join our newsletter for the latest updates and exclusive offers.</p>
          <div className="flex items-center space-x-2">
            <input
              type="email"
              placeholder="Your Email Here"
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
            />
            <button className="px-4 py-2 text-white bg-black rounded-md text-sm">Join</button>
          </div>
          <p className="text-[10px] mt-1">
            By subscribing, you consent to our <a href="#" className="underline">Privacy Policy</a> and receive updates.
          </p>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="max-w-7xl mx-auto px-4 mt-10 flex flex-col md:flex-row justify-between items-center border-t pt-6 text-xs text-gray-500">
        <p>© 2025 Your Company. All rights reserved.</p>
        <div className="flex space-x-4 mt-3 md:mt-0">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
          <a href="#">Cookie Settings</a>
        </div>
        <div className="flex space-x-3 mt-3 md:mt-0">
          <Facebook className="w-4 h-4" />
          <Instagram className="w-4 h-4" />
          <Twitter className="w-4 h-4" />
          <Linkedin className="w-4 h-4" />
          <Youtube className="w-4 h-4" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
>>>>>>> upstream/main
