import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useProduct } from '../hook/useProduct';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { Link } from 'react-router';

function Home() {
    const products = useSelector((state) => state.product.products);
    const { handleGetAllProducts } = useProduct();

    useEffect(() => {
        handleGetAllProducts();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const bestSellers = products ? products.slice(0, 4) : [];
    const newArrivals = products ? products.slice(0, 8) : [];

    const fadeUp = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
    };

    return (
        <div className="min-h-screen flex flex-col bg-primary-bg font-sans">
            <Navbar />

            <main className="flex-grow pt-[80px]"> 
                
                {/* Hero Section */}
                <section className="w-full max-w-[1400px] mx-auto px-6 lg:px-12 py-12 lg:py-20 flex flex-col lg:flex-row items-center gap-12">
                    <motion.div 
                        initial="hidden" animate="visible" variants={fadeUp}
                        className="flex-1 space-y-8"
                    >
                        <span className="text-xs font-semibold tracking-widest text-text-secondary uppercase">NEW COLLECTION 2026</span>
                        <h1 className="text-5xl lg:text-7xl font-serif text-text-primary leading-[1.1]">
                            Timeless Fashion,<br/>
                            Designed for Everyday.
                        </h1>
                        <p className="text-text-secondary text-lg max-w-md font-light leading-relaxed">
                            Premium clothing designed with elegance, comfort and simplicity.
                        </p>
                        <div className="flex gap-4 pt-4">
                            <Link to="/category/women" className="bg-text-primary text-white px-8 py-4 font-semibold text-sm hover:bg-[#333333] transition-colors duration-200">
                                Shop Women
                            </Link>
                            <Link to="/category/men" className="border border-border-color bg-transparent text-text-primary px-8 py-4 font-semibold text-sm hover:border-text-primary transition-colors duration-200">
                                Shop Men
                            </Link>
                        </div>
                    </motion.div>
                    <motion.div 
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}
                        className="flex-1 w-full"
                    >
                        <div className="aspect-[4/5] bg-secondary-bg overflow-hidden relative">
                            <img src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070&auto=format&fit=crop" alt="Fashion Lifestyle" className="w-full h-full object-cover" />
                        </div>
                    </motion.div>
                </section>

                {/* Featured Categories */}
                <section className="max-w-[1400px] mx-auto px-6 lg:px-12 py-[80px]">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { title: 'Women', img: 'https://images.unsplash.com/photo-1434389673922-0941961456a0?q=80&w=1920&auto=format&fit=crop' },
                            { title: 'Men', img: 'https://images.unsplash.com/photo-1516257984-b1b4d707412e?q=80&w=2000&auto=format&fit=crop' },
                            { title: 'Ethnic', img: 'https://images.unsplash.com/photo-1583391733958-d25e07fac04f?q=80&w=1920&auto=format&fit=crop' },
                            { title: 'Accessories', img: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=2070&auto=format&fit=crop' }
                        ].map((cat, i) => (
                            <Link to={`/category/${cat.title.toLowerCase()}`} key={i} className="group relative aspect-square overflow-hidden bg-secondary-bg block">
                                <img src={cat.img} alt={cat.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                                <div className="absolute inset-0 bg-black/10 transition-opacity duration-300 group-hover:bg-black/0"></div>
                                <div className="absolute bottom-6 left-6 text-white text-xl font-serif">
                                    {cat.title}
                                </div>
                            </Link>
                        ))}
                    </div>
                </section>

                {/* Best Sellers */}
                <section className="max-w-[1400px] mx-auto px-6 lg:px-12 py-[80px]">
                    <div className="flex justify-between items-end mb-12">
                        <h2 className="text-3xl font-serif text-text-primary">Best Sellers</h2>
                        <Link to="/shop" className="text-sm font-medium border-b border-text-primary hover:text-text-secondary hover:border-text-secondary transition-colors duration-200 pb-1">
                            View All
                        </Link>
                    </div>
                    
                    {bestSellers.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {bestSellers.map((product) => (
                                <ProductCard key={product._id} product={product} />
                            ))}
                        </div>
                    ) : (
                        <div className="py-20 text-center text-text-secondary">Loading products...</div>
                    )}
                </section>

                {/* Collections Section */}
                <section className="bg-secondary-bg py-[80px]">
                    <div className="max-w-[1400px] mx-auto px-6 lg:px-12 flex flex-col md:flex-row items-center gap-12">
                        <div className="flex-1 w-full aspect-[4/3] overflow-hidden">
                            <img src="https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=2071&auto=format&fit=crop" alt="Autumn Collection" className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 space-y-6">
                            <h2 className="text-4xl font-serif text-text-primary">The Autumn Edit</h2>
                            <p className="text-text-secondary font-light max-w-md leading-relaxed">
                                Discover our latest collection featuring warm tones, premium wool blends, and structured silhouettes designed for the transitioning seasons.
                            </p>
                            <Link to="/collections/autumn" className="inline-flex items-center gap-2 bg-text-primary text-white px-8 py-4 font-semibold text-sm hover:bg-[#333333] transition-colors duration-200">
                                Discover Collection <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </div>
                </section>

                {/* New Arrival Carousel (Simplified for now) */}
                <section className="max-w-[1400px] mx-auto px-6 lg:px-12 py-[80px]">
                    <div className="flex justify-between items-center mb-12">
                        <h2 className="text-3xl font-serif text-text-primary">New Arrivals</h2>
                        <div className="flex gap-2">
                            <button className="w-10 h-10 border border-border-color flex items-center justify-center hover:bg-secondary-bg transition-colors duration-200"><ChevronLeft className="w-5 h-5 text-text-primary" strokeWidth={1} /></button>
                            <button className="w-10 h-10 border border-border-color flex items-center justify-center hover:bg-secondary-bg transition-colors duration-200"><ChevronRight className="w-5 h-5 text-text-primary" strokeWidth={1} /></button>
                        </div>
                    </div>
                    {newArrivals.length > 0 && (
                        <div className="flex overflow-x-auto gap-6 snap-x scrollbar-hide pb-4">
                            {newArrivals.map((product) => (
                                <div key={product._id} className="min-w-[280px] sm:min-w-[320px] snap-start">
                                    <ProductCard product={product} />
                                </div>
                            ))}
                        </div>
                    )}
                </section>

                {/* Instagram Style Gallery */}
                <section className="max-w-[1400px] mx-auto px-6 lg:px-12 py-[80px]">
                    <h2 className="text-center text-3xl font-serif text-text-primary mb-12">@VastraElite</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
                        {[
                            'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1920&auto=format&fit=crop',
                            'https://images.unsplash.com/photo-1550639525-c97d455acf70?q=80&w=1926&auto=format&fit=crop',
                            'https://images.unsplash.com/photo-1485230895905-ef54ab696e54?q=80&w=1920&auto=format&fit=crop',
                            'https://images.unsplash.com/photo-1492447273231-0f8fecec1e3a?q=80&w=1974&auto=format&fit=crop',
                            'https://images.unsplash.com/photo-1550639524-a6f58345a278?q=80&w=1926&auto=format&fit=crop',
                            'https://images.unsplash.com/photo-1532453288672-3a27e9be9efd?q=80&w=1964&auto=format&fit=crop'
                        ].map((img, i) => (
                            <div key={i} className="aspect-square relative group overflow-hidden bg-secondary-bg">
                                <img src={img} alt={`Gallery ${i}`} className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Testimonials */}
                <section className="bg-secondary-bg py-[80px]">
                    <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {[1,2,3].map((i) => (
                                <div key={i} className="bg-primary-bg p-8 flex flex-col gap-6">
                                    <div className="flex text-accent-gold">
                                        {[1,2,3,4,5].map(s => <Star key={s} fill="currentColor" className="w-4 h-4" />)}
                                    </div>
                                    <p className="text-text-secondary font-light text-sm italic">
                                        "The quality of the pieces is absolutely remarkable. I've never felt more confident in everyday wear. Truly timeless fashion."
                                    </p>
                                    <div className="flex items-center gap-4 mt-auto">
                                        <div className="w-10 h-10 rounded-full bg-border-color overflow-hidden">
                                            <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="Customer" className="w-full h-full object-cover" />
                                        </div>
                                        <div className="text-sm">
                                            <p className="font-semibold text-text-primary">Sarah Jenkins</p>
                                            <p className="text-text-secondary text-xs">Verified Buyer</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Newsletter */}
                <section className="py-[120px] text-center px-6">
                    <h2 className="text-3xl font-serif text-text-primary mb-4">Stay Updated</h2>
                    <p className="text-text-secondary font-light mb-8 max-w-md mx-auto">Subscribe to our newsletter for exclusive offers, new arrivals, and editorial content.</p>
                    <form className="max-w-md mx-auto flex flex-col sm:flex-row gap-4" onSubmit={(e) => e.preventDefault()}>
                        <input 
                            type="email" 
                            placeholder="Your email address" 
                            className="flex-1 px-4 py-3 border border-border-color focus:outline-none focus:border-text-primary transition-colors text-sm"
                            required
                        />
                        <button type="submit" className="bg-text-primary text-white px-8 py-3 text-sm font-semibold hover:bg-[#333333] transition-colors">
                            Subscribe
                        </button>
                    </form>
                </section>

            </main>

            <Footer />
        </div>
    );
}

export default Home;
