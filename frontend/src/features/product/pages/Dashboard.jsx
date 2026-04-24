import React, { useEffect } from 'react';
import { useProduct } from '../hook/useProduct';
import { useSelector } from 'react-redux';
import { Link } from 'react-router';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function Dashboard() {
    const { handleGetSellerProducts } = useProduct();
    const sellerProducts = useSelector((state) => state.product.sellerProducts);

    useEffect(() => {
        handleGetSellerProducts();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="min-h-screen flex flex-col bg-[#FAFAFA] font-sans">
            <Navbar />

            <main className="flex-grow pt-32 pb-24 px-6 max-w-7xl mx-auto w-full">
                
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 border-b border-gray-200 pb-8 gap-6">
                    <div className="space-y-2">
                        <span className="text-xs uppercase tracking-[0.2em] text-gray-400 font-medium">Administration</span>
                        <h1 className="text-4xl font-serif text-gray-900 tracking-wide">Seller Dashboard</h1>
                        <p className="text-gray-500 font-light">Manage your exclusive luxury product listings.</p>
                    </div>
                    
                    <Link 
                        to="/seller/create-product" 
                        className="bg-gray-900 text-white px-8 py-3 text-xs tracking-wider uppercase hover:bg-gray-800 transition-colors flex items-center gap-2"
                    >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="12" y1="5" x2="12" y2="19"></line>
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                        </svg>
                        Add Product
                    </Link>
                </div>

                {sellerProducts && sellerProducts.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-12">
                        {sellerProducts.map((product) => (
                            <Link to={`/product/${product._id}`} key={product._id} className="group bg-white border border-gray-100 flex flex-col hover:shadow-xl transition-shadow duration-500 h-full">
                                <div className="relative aspect-[3/4] overflow-hidden bg-gray-50 p-4">
                                    {product.image && product.image.length > 0 ? (
                                        <img 
                                            src={product.image[0].url} 
                                            alt={product.title} 
                                            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out" 
                                        />
                                    ) : (
                                        <div className="w-full h-full flex flex-col items-center justify-center text-gray-300">
                                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                                                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                                                <circle cx="8.5" cy="8.5" r="1.5"></circle>
                                                <polyline points="21 15 16 10 5 21"></polyline>
                                            </svg>
                                            <span className="text-xs uppercase tracking-widest mt-2">No Image</span>
                                        </div>
                                    )}
                                </div>
                                <div className="p-6 flex flex-col flex-grow text-center border-t border-gray-50">
                                    <h3 className="text-gray-900 font-serif text-lg line-clamp-1 mb-2">{product.title}</h3>
                                    <p className="text-gray-400 font-light text-sm line-clamp-2 mb-4 flex-grow px-2">
                                        {product.description}
                                    </p>
                                    <div className="text-gray-900 font-medium tracking-widest text-sm">
                                        {product.price?.amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} {product.price?.currency || 'INR'}
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-32 bg-white border border-gray-100">
                        <svg className="mx-auto h-12 w-12 text-gray-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path>
                            <line x1="7" y1="7" x2="7.01" y2="7"></line>
                        </svg>
                        <h3 className="mt-4 text-xl font-serif text-gray-900">No Products Listed</h3>
                        <p className="mt-2 text-gray-500 font-light max-w-sm mx-auto">Your boutique is currently empty. Start building your legacy by adding your first exclusive piece.</p>
                        <Link to="/seller/create-product" className="inline-block mt-8 bg-gray-900 text-white px-8 py-3 text-xs tracking-wider uppercase hover:bg-gray-800 transition-colors">
                            Start Selling
                        </Link>
                    </div>
                )}

            </main>

            <Footer />
        </div>
    );
}

export default Dashboard;
