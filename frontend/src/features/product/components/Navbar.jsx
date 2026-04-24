import React from 'react';
import { Link, useNavigate } from 'react-router';
import { useSelector } from 'react-redux';
import { useAuth } from '../../auth/hook/useAuth';

function Navbar() {
  const { user } = useSelector((state) => state.auth || { user: null });
  const { handleLogout } = useAuth();
  const navigate = useNavigate();

  const onLogout = async () => {
    await handleLogout();
    navigate('/');
  };

  return (
    <nav className="bg-white/80 backdrop-blur-md text-gray-900 px-6 py-5 fixed w-full top-0 z-50 border-b border-gray-100 transition-all duration-300">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Brand */}
        <Link to="/" className="text-2xl font-serif font-light tracking-[0.2em] text-gray-900 hover:opacity-80 transition-opacity">
          VASTRA ELITE
        </Link>

        {/* Links */}
        <div className="space-x-10 text-xs font-medium uppercase tracking-widest hidden md:flex items-center">
          <Link to="/" className="text-gray-500 hover:text-gray-900 transition-colors duration-300">Home</Link>
          <Link to="/products" className="text-gray-500 hover:text-gray-900 transition-colors duration-300">Collection</Link>
          
          {user?.role === 'seller' && (
            <Link to="/seller/dashboard" className="text-gray-500 hover:text-gray-900 transition-colors duration-300">
              Dashboard
            </Link>
          )}

          <Link to="/cart" className="text-gray-500 hover:text-gray-900 transition-colors duration-300 flex items-center gap-2 group">
            <span>Cart</span>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 group-hover:scale-110 transition-transform">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
            </svg>
          </Link>

          {/* Auth Button */}
          {user ? (
            <div className="flex items-center gap-6">
               <span className="text-gray-500 capitalize">{user.fullname}</span>
               <button 
                 onClick={onLogout}
                 className="border-b border-gray-900 text-gray-900 pb-1 hover:text-gray-500 hover:border-gray-500 transition-all duration-300 text-xs"
               >
                 LOGOUT
               </button>
            </div>
          ) : (
            <Link to="/login" className="bg-gray-900 text-white px-8 py-3 text-xs tracking-wider hover:bg-gray-800 hover:shadow-lg transition-all duration-300">
              LOGIN
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
