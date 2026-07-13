import React from 'react';
import { Link, useNavigate } from 'react-router';
import { useSelector } from 'react-redux';
import { useAuth } from '../../auth/hook/useAuth';
import { Search, Heart, ShoppingBag, User, LogIn } from 'lucide-react';
import { motion } from 'framer-motion';

function Navbar() {
  const { user } = useSelector((state) => state.auth || { user: null });
  const { handleLogout } = useAuth();
  const navigate = useNavigate();

  const onLogout = async () => {
    await handleLogout();
    navigate('/');
  };

  const NavLink = ({ to, children }) => (
    <Link 
      to={to} 
      className="relative text-sm font-medium text-text-secondary hover:text-text-primary transition-colors duration-200 group"
    >
      {children}
      <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-text-primary transition-all duration-200 group-hover:w-full"></span>
    </Link>
  );

  return (
    <nav className="h-[80px] bg-primary-bg sticky top-0 z-50 border-b border-border-color flex items-center px-6 lg:px-12 transition-all duration-300">
      <div className="max-w-[1400px] mx-auto w-full flex justify-between items-center">
        
        {/* Left - Logo */}
        <div className="flex-1">
          <Link to="/" className="text-2xl font-serif text-text-primary tracking-wide">
            VastraElite
          </Link>
        </div>

        {/* Center - Links (Hidden on small screens) */}
        <div className="hidden lg:flex flex-1 justify-center space-x-8">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/category/men">Men</NavLink>
          <NavLink to="/category/women">Women</NavLink>
          <NavLink to="/new-arrivals">New Arrivals</NavLink>
          <NavLink to="/collections">Collections</NavLink>
          <NavLink to="/sale">Sale</NavLink>
          <NavLink to="/about">About</NavLink>
        </div>

        {/* Right - Icons & Auth */}
        <div className="flex-1 flex justify-end items-center space-x-6 text-text-secondary">
          
          <button className="hover:text-text-primary transition-colors duration-200">
            <Search className="w-5 h-5" strokeWidth={1.5} />
          </button>
          
          <Link to="/wishlist" className="hover:text-text-primary transition-colors duration-200">
            <Heart className="w-5 h-5" strokeWidth={1.5} />
          </Link>
          
          <Link to="/cart" className="hover:text-text-primary transition-colors duration-200 relative group">
            <ShoppingBag className="w-5 h-5" strokeWidth={1.5} />
            <span className="absolute -top-2 -right-2 bg-text-primary text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">0</span>
          </Link>

          {user ? (
            <div className="flex items-center space-x-4">
              <Link to="/profile" className="hover:text-text-primary transition-colors duration-200">
                <User className="w-5 h-5" strokeWidth={1.5} />
              </Link>
              <button 
                onClick={onLogout}
                className="text-sm font-medium hover:text-text-primary transition-colors duration-200"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link to="/login" className="flex items-center space-x-2 text-sm font-medium hover:text-text-primary transition-colors duration-200">
              <LogIn className="w-5 h-5" strokeWidth={1.5} />
              <span className="hidden sm:inline">Login</span>
            </Link>
          )}

        </div>
      </div>
    </nav>
  );
}

export default Navbar;
