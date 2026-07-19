import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router';
import { useSelector } from 'react-redux';
import { useProduct } from '../hook/useProduct';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';

function CategoryPage() {
    const { categoryName } = useParams();
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
    }, [categoryName]);

    // Filter products by category
    const categoryProducts = products?.filter(p => p.category?.toLowerCase() === categoryName?.toLowerCase()) || [];

    // Map categories to header images (optional placeholder logic)
    const getCategoryHeader = () => {
        switch (categoryName?.toLowerCase()) {
            case 'women':
                return {
                    title: 'Womenswear Collection',
                    desc: 'Elegant and timeless pieces designed for the modern woman.',
                    img: 'https://images.unsplash.com/photo-1434389673922-0941961456a0?q=80&w=1920&auto=format&fit=crop'
                };
            case 'men':
                return {
                    title: 'Menswear Collection',
                    desc: 'Structured silhouettes and premium fabrics for everyday refinement.',
                    img: 'https://images.unsplash.com/photo-1516257984-b1b4d707412e?q=80&w=2000&auto=format&fit=crop'
                };
            case 'kids':
                return {
                    title: 'Kids Collection',
                    desc: 'Comfortable, durable, and stylish clothing for the little ones.',
                    img: 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?q=80&w=2000&auto=format&fit=crop'
                };
            case 'accessories':
                return {
                    title: 'Accessories',
                    desc: 'The perfect finishing touches to elevate your look.',
                    img: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=2070&auto=format&fit=crop'
                };
            case 'ethnic':
                return {
                    title: 'Ethnic Collection',
                    desc: 'Celebrate traditions with our elegant ethnic wear.',
                    img: 'https://images.unsplash.com/photo-1583391733958-d25e07fac04f?q=80&w=1920&auto=format&fit=crop'
                };
            default:
                return {
                    title: `${categoryName?.charAt(0).toUpperCase()}${categoryName?.slice(1)} Collection`,
                    desc: `Explore our latest ${categoryName} collection.`,
                    img: 'https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=2071&auto=format&fit=crop'
                };
        }
    };

    const headerInfo = getCategoryHeader();

    return (
        <div className="min-h-screen flex flex-col bg-primary-bg font-sans">
            <Navbar />

            <main className="flex-grow pt-[80px]">
                
                {/* Category Header */}
                <section className="relative h-[40vh] md:h-[50vh] flex items-center justify-center overflow-hidden">
                    <img 
                        src={headerInfo.img} 
                        alt={headerInfo.title}
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40"></div>
                    <div className="relative z-10 text-center px-6">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-white mb-4">{headerInfo.title}</h1>
                        <p className="text-white/80 font-light max-w-lg mx-auto">{headerInfo.desc}</p>
                    </div>
                </section>

                {/* Product Grid */}
                <section className="max-w-[1400px] mx-auto px-6 lg:px-12 py-16">
                    {/* Breadcrumbs */}
                    <div className="text-xs text-text-secondary uppercase tracking-widest mb-12 flex items-center gap-3">
                        <Link to="/" className="hover:text-text-primary transition-colors">Home</Link>
                        <span>/</span>
                        <span className="text-text-primary">{categoryName}</span>
                    </div>

                    <div className="flex justify-between items-center mb-8">
                        <span className="text-sm text-text-secondary">{categoryProducts.length} Products</span>
                        <div className="flex items-center gap-2">
                            <span className="text-xs text-text-secondary uppercase tracking-widest">Sort By:</span>
                            <select className="bg-transparent border-none text-sm text-text-primary font-medium focus:outline-none cursor-pointer">
                                <option>Newest</option>
                                <option>Price: Low to High</option>
                                <option>Price: High to Low</option>
                            </select>
                        </div>
                    </div>

                    {loading ? (
                        <div className="flex justify-center py-32">
                            <div className="animate-spin w-8 h-8 border-2 border-text-primary border-t-transparent rounded-full"></div>
                        </div>
                    ) : categoryProducts.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 gap-y-12">
                            {categoryProducts.map((product) => (
                                <ProductCard key={product._id} product={product} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-32">
                            <h2 className="text-2xl font-serif text-text-primary mb-4">No products found</h2>
                            <p className="text-text-secondary font-light mb-8">We couldn't find any products in this category.</p>
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

export default CategoryPage;
