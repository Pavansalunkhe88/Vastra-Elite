import React from 'react';
import { Link } from 'react-router';

function Footer() {
  return (
    <footer className="bg-white text-gray-800 py-24 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-16 md:gap-8">
        
        {/* Brand */}
        <div className="space-y-6 md:col-span-1">
          <Link to="/" className="text-2xl font-serif font-light tracking-[0.2em] text-gray-900 block">
            VASTRA ELITE
          </Link>
          <p className="text-sm text-gray-500 leading-relaxed font-light">
            Redefining luxury fashion. Curated collections for the modern elite, crafted with precision and care.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-gray-900 font-medium text-xs uppercase tracking-[0.15em] mb-6">Explore</h3>
          <ul className="space-y-4 text-sm font-light text-gray-500">
            <li><Link to="/products" className="hover:text-gray-900 transition-colors duration-300">New Arrivals</Link></li>
            <li><Link to="/products" className="hover:text-gray-900 transition-colors duration-300">Bestsellers</Link></li>
            <li><Link to="/products" className="hover:text-gray-900 transition-colors duration-300">Collections</Link></li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="text-gray-900 font-medium text-xs uppercase tracking-[0.15em] mb-6">Support</h3>
          <ul className="space-y-4 text-sm font-light text-gray-500">
            <li><Link to="#" className="hover:text-gray-900 transition-colors duration-300">FAQ</Link></li>
            <li><Link to="#" className="hover:text-gray-900 transition-colors duration-300">Shipping & Returns</Link></li>
            <li><Link to="#" className="hover:text-gray-900 transition-colors duration-300">Contact Us</Link></li>
          </ul>
        </div>

        {/* Newsletter / Social */}
        <div>
           <h3 className="text-gray-900 font-medium text-xs uppercase tracking-[0.15em] mb-6">Newsletter</h3>
           <p className="text-sm text-gray-500 mb-6 font-light">Subscribe to receive updates, access to exclusive deals, and more.</p>
           <form className="flex border-b border-gray-300 pb-2 relative group focus-within:border-gray-900 transition-colors">
             <input 
                type="email" 
                placeholder="Email address" 
                className="bg-transparent text-gray-900 px-0 py-2 w-full focus:outline-none text-sm font-light placeholder-gray-400" 
             />
             <button type="submit" className="text-gray-900 px-4 py-2 text-xs tracking-wider uppercase hover:opacity-70 transition-opacity">
               Join
             </button>
           </form>
        </div>

      </div>
      
      <div className="max-w-7xl mx-auto px-6 mt-20 pt-8 border-t border-gray-100 text-xs font-light text-gray-400 flex flex-col md:flex-row justify-between items-center">
        <p>&copy; {new Date().getFullYear()} Vastra Elite. All rights reserved.</p>
        <div className="space-x-8 mt-4 md:mt-0 uppercase tracking-wider">
           <Link to="#" className="hover:text-gray-800 transition-colors">Privacy Policy</Link>
           <Link to="#" className="hover:text-gray-800 transition-colors">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
