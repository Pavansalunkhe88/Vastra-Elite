import React, { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { useSelector } from 'react-redux';
import { useProduct } from '../hook/useProduct';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';

function Sale() {
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

    // For demonstration, we'll assume products with a price less than 2000 are "on sale"
    // Or just pick a random subset. Here we filter by a simple price criteria as a placeholder.
    const saleProducts = products?.filter(p => p.price?.amount < 3000) || [];

    return (
        <div className="min-h-screen flex flex-col bg-primary-bg font-sans">
            <Navbar />

            <main className="flex-grow pt-[80px]">
                
                {/* Header */}
                <section className="bg-red-900/10 py-20 px-6">
                    <div className="max-w-[800px] mx-auto text-center">
                        <span className="text-red-700 font-semibold tracking-widest text-sm uppercase block mb-4">End of Season Sale</span>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-text-primary mb-6">Up to 50% Off</h1>
                        <p className="text-text-secondary font-light text-lg">
                            Exceptional pieces at extraordinary prices. Shop the sale before it's gone.
                        </p>
                    </div>
                </section>

                {/* Product Grid */}
                <section className="max-w-[1400px] mx-auto px-6 lg:px-12 py-16">
                    {/* Breadcrumbs */}
                    <div className="text-xs text-text-secondary uppercase tracking-widest mb-12 flex items-center gap-3">
                        <Link to="/" className="hover:text-text-primary transition-colors">Home</Link>
                        <span>/</span>
                        <span className="text-red-700">Sale</span>
                    </div>

                    <div className="flex justify-between items-center mb-8">
                        <span className="text-sm text-text-secondary">{saleProducts.length} Products</span>
                        <div className="flex items-center gap-2">
                            <span className="text-xs text-text-secondary uppercase tracking-widest">Sort By:</span>
                            <select className="bg-transparent border-none text-sm text-text-primary font-medium focus:outline-none cursor-pointer">
                                <option>Price: Low to High</option>
                                <option>Price: High to Low</option>
                                <option>Biggest Discount</option>
                            </select>
                        </div>
                    </div>

                    {loading ? (
                        <div className="flex justify-center py-32">
                            <div className="animate-spin w-8 h-8 border-2 border-text-primary border-t-transparent rounded-full"></div>
                        </div>
                    ) : saleProducts.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 gap-y-12">
                            {saleProducts.map((product) => (
                                <ProductCard key={product._id} product={product} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-32">
                            <h2 className="text-2xl font-serif text-text-primary mb-4">No products on sale</h2>
                            <p className="text-text-secondary font-light mb-8">Sign up for our newsletter to be notified of our next sale.</p>
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

export default Sale;
