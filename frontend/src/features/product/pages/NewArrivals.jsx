import React, { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { useSelector } from 'react-redux';
import { useProduct } from '../hook/useProduct';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';

function NewArrivals() {
    const { handleGetAllProducts } = useProduct();
    const products = useSelector((state) => state.product.products);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            if (!products || products.length === 0) {
                await handleGetAllProducts();
            }
            setLoading(false);
        };
        fetchProducts();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // New arrivals logic: sort by createdAt (if available) or just take the last added ones
    const newArrivals = [...(products || [])].sort((a, b) => {
        return new Date(b.createdAt) - new Date(a.createdAt);
    });

    return (
        <div className="min-h-screen flex flex-col bg-primary-bg font-sans">
            <Navbar />

            <main className="flex-grow pt-[80px]">
                
                {/* Header */}
                <section className="bg-secondary-bg py-20 px-6">
                    <div className="max-w-[800px] mx-auto text-center">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-text-primary mb-6">New Arrivals</h1>
                        <p className="text-text-secondary font-light text-lg">
                            Discover the latest additions to our collection. Thoughtfully designed and crafted for the modern lifestyle.
                        </p>
                    </div>
                </section>

                {/* Product Grid */}
                <section className="max-w-[1400px] mx-auto px-6 lg:px-12 py-16">
                    {/* Breadcrumbs */}
                    <div className="text-xs text-text-secondary uppercase tracking-widest mb-12 flex items-center gap-3">
                        <Link to="/" className="hover:text-text-primary transition-colors">Home</Link>
                        <span>/</span>
                        <span className="text-text-primary">New Arrivals</span>
                    </div>

                    <div className="flex justify-between items-center mb-8">
                        <span className="text-sm text-text-secondary">{newArrivals.length} Products</span>
                    </div>

                    {loading ? (
                        <div className="flex justify-center py-32">
                            <div className="animate-spin w-8 h-8 border-2 border-text-primary border-t-transparent rounded-full"></div>
                        </div>
                    ) : newArrivals.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 gap-y-12">
                            {newArrivals.map((product) => (
                                <ProductCard key={product._id} product={product} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-32">
                            <h2 className="text-2xl font-serif text-text-primary mb-4">No products found</h2>
                            <p className="text-text-secondary font-light mb-8">Check back later for our new collections.</p>
                            <Link to="/" className="bg-text-primary text-white px-8 py-4 text-sm font-semibold hover:bg-[#333333] transition-colors">
                                Return Home
                            </Link>
                        </div>
                    )}
                </section>

            </main>

            <Footer />
        </div>
    );
}

export default NewArrivals;
