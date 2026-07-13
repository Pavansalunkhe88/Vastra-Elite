import React from 'react';
import { Link } from 'react-router';

function Footer() {
  return (
    <footer className="bg-primary-bg text-text-primary py-20 border-t border-border-color">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
        
        {/* Shop */}
        <div>
          <h3 className="font-semibold text-sm mb-6">Shop</h3>
          <ul className="space-y-4 text-sm text-text-secondary">
            <li><Link to="/category/women" className="hover:text-text-primary transition-colors">Women</Link></li>
            <li><Link to="/category/men" className="hover:text-text-primary transition-colors">Men</Link></li>
            <li><Link to="/new-arrivals" className="hover:text-text-primary transition-colors">New Arrivals</Link></li>
            <li><Link to="/collections" className="hover:text-text-primary transition-colors">Collections</Link></li>
            <li><Link to="/sale" className="hover:text-text-primary transition-colors">Sale</Link></li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h3 className="font-semibold text-sm mb-6">Company</h3>
          <ul className="space-y-4 text-sm text-text-secondary">
            <li><Link to="/about" className="hover:text-text-primary transition-colors">About VastraElite</Link></li>
            <li><Link to="/careers" className="hover:text-text-primary transition-colors">Careers</Link></li>
            <li><Link to="/sustainability" className="hover:text-text-primary transition-colors">Sustainability</Link></li>
            <li><Link to="/press" className="hover:text-text-primary transition-colors">Press</Link></li>
            <li><Link to="/stores" className="hover:text-text-primary transition-colors">Store Locator</Link></li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="font-semibold text-sm mb-6">Support</h3>
          <ul className="space-y-4 text-sm text-text-secondary">
            <li><Link to="/faq" className="hover:text-text-primary transition-colors">FAQ</Link></li>
            <li><Link to="/shipping" className="hover:text-text-primary transition-colors">Shipping Information</Link></li>
            <li><Link to="/returns" className="hover:text-text-primary transition-colors">Returns & Exchanges</Link></li>
            <li><Link to="/size-guide" className="hover:text-text-primary transition-colors">Size Guide</Link></li>
            <li><Link to="/contact" className="hover:text-text-primary transition-colors">Contact Us</Link></li>
          </ul>
        </div>

        {/* Social & Contact */}
        <div>
           <h3 className="font-semibold text-sm mb-6">Connect</h3>
           <div className="flex space-x-6 mb-8 text-xs font-medium tracking-widest uppercase text-text-secondary">
             <a href="#" className="hover:text-text-primary transition-colors">Instagram</a>
             <a href="#" className="hover:text-text-primary transition-colors">Facebook</a>
             <a href="#" className="hover:text-text-primary transition-colors">Twitter</a>
             <a href="#" className="hover:text-text-primary transition-colors">Pinterest</a>
           </div>
           
           <h3 className="font-semibold text-sm mb-4">Payment Methods</h3>
           <div className="flex gap-2 text-text-secondary text-xs uppercase font-semibold">
              <span>VISA</span>
              <span>·</span>
              <span>MASTERCARD</span>
              <span>·</span>
              <span>UPI</span>
           </div>
        </div>

      </div>
      
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 mt-20 pt-8 border-t border-border-color text-xs text-text-secondary flex flex-col md:flex-row justify-between items-center gap-4">
        <p>&copy; {new Date().getFullYear()} VastraElite. All rights reserved.</p>
        <div className="flex space-x-6">
           <Link to="/privacy" className="hover:text-text-primary transition-colors">Privacy Policy</Link>
           <Link to="/terms" className="hover:text-text-primary transition-colors">Terms of Service</Link>
           <Link to="/cookies" className="hover:text-text-primary transition-colors">Cookie Policy</Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
