import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useProduct } from '../hook/useProduct';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';

function Home() {
    const products = useSelector((state) => state.product.products);
    const { handleGetAllProducts } = useProduct();

    useEffect(() => {
        handleGetAllProducts();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="min-h-screen flex flex-col bg-[#FAFAFA] font-sans selection:bg-gray-200">
            <Navbar />

            <main className="flex-grow pt-[80px]"> 
                
                {/* Hero Section */}
                <section className="relative h-[80vh] min-h-[600px] bg-white flex items-center justify-center overflow-hidden border-b border-gray-100">
                    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-5 block mix-blend-multiply grayscale"></div>
                    
                    <div className="relative z-10 text-center px-8 max-w-5xl mx-auto space-y-10">
                        <span className="block text-xs uppercase tracking-[0.3em] text-gray-400 font-medium">New Collection</span>
                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-gray-900 tracking-tight leading-[1.1]">
                            ELEVATE YOUR <br />
                            <span className="italic font-light">WARDROBE</span>
                        </h1>
                        <p className="text-gray-500 text-lg md:text-xl max-w-2xl mx-auto font-light tracking-wide leading-relaxed">
                            Discover the pinnacle of luxury fashion. Exclusive collections crafted with precision for the discerning eye.
                        </p>
                        <div className="pt-12">
                            <a href="#collection" className="inline-block bg-gray-900 text-white px-12 py-5 uppercase tracking-[0.2em] text-[11px] font-medium hover:bg-gray-800 transition-all duration-300">
                                Explore Collection
                            </a>
                        </div>
                    </div>
                </section>

                {/* Products Section */}
                <section id="collection" className="max-w-[1400px] mx-auto px-6 py-32">
                    <div className="text-center mb-20 space-y-4">
                         <h2 className="text-3xl md:text-4xl font-serif text-gray-900 tracking-wide">LATEST ARRIVALS</h2>
                         <p className="text-gray-500 font-light tracking-wide uppercase text-xs">Curated selections for the modern elite</p>
                         <div className="w-12 h-px bg-gray-300 mx-auto mt-8"></div>
                    </div>

                    {products && products.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-16">
                            {products.map((product) => (
                                <ProductCard 
                                    key={product._id} 
                                    product={product} 
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-40">
                            <h3 className="text-lg font-serif text-gray-900 tracking-wide mb-2">No Products Available</h3>
                            <p className="text-gray-500 font-light">Our collections are currently being updated. Check back shortly.</p>
                        </div>
                    )}
                </section>

                {/* Concept Section */}
                <section className="bg-white py-32 border-t border-gray-100">
                    <div className="max-w-5xl mx-auto px-6 text-center space-y-10">
                        <h2 className="text-3xl font-serif text-gray-900 tracking-wide">THE ESSENCE OF VASTRA ELITE</h2>
                        <p className="text-gray-500 text-lg font-light leading-loose max-w-3xl mx-auto">
                            We believe that truly luxurious fashion speaks in whispers, not shouts. Our pieces are defined by an obsession with cut, fabric, and proportion. True elegance is seamless, effortless, and designed with proper breathing space to let you stand out.
                        </p>
                        <div className="w-12 h-px bg-gray-300 mx-auto mt-8"></div>
                    </div>
                </section>

            </main>

            <Footer />
        </div>
    );
}

export default Home;
