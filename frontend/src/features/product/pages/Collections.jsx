import React, { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { useSelector } from 'react-redux';
import { useProduct } from '../hook/useProduct';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function Collections() {
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

    const collections = [
        {
            title: "The Autumn Edit",
            description: "Warm tones, premium wool blends, and structured silhouettes designed for the transitioning seasons.",
            image: "https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=2071&auto=format&fit=crop",
            link: "/category/women" // Placeholder link
        },
        {
            title: "Summer Essentials",
            description: "Lightweight fabrics, breathable materials, and relaxed fits for the perfect summer getaway.",
            image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=2070&auto=format&fit=crop",
            link: "/category/men" // Placeholder link
        },
        {
            title: "Festive Collection",
            description: "Elegant ethnic wear to celebrate traditions in style and comfort.",
            image: "https://images.unsplash.com/photo-1583391733958-d25e07fac04f?q=80&w=1920&auto=format&fit=crop",
            link: "/category/ethnic" // Placeholder link
        }
    ];

    return (
        <div className="min-h-screen flex flex-col bg-primary-bg font-sans">
            <Navbar />

            <main className="flex-grow pt-[80px]">
                
                {/* Header */}
                <section className="bg-secondary-bg py-20 px-6">
                    <div className="max-w-[800px] mx-auto text-center">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-text-primary mb-6">Collections</h1>
                        <p className="text-text-secondary font-light text-lg">
                            Curated selections for every season and occasion. Explore our exclusive collections designed to elevate your wardrobe.
                        </p>
                    </div>
                </section>

                {/* Collections List */}
                <section className="max-w-[1400px] mx-auto px-6 lg:px-12 py-16 space-y-16">
                    
                    {/* Breadcrumbs */}
                    <div className="text-xs text-text-secondary uppercase tracking-widest flex items-center gap-3">
                        <Link to="/" className="hover:text-text-primary transition-colors">Home</Link>
                        <span>/</span>
                        <span className="text-text-primary">Collections</span>
                    </div>

                    {loading ? (
                        <div className="flex justify-center py-32">
                            <div className="animate-spin w-8 h-8 border-2 border-text-primary border-t-transparent rounded-full"></div>
                        </div>
                    ) : (
                        <div className="flex flex-col gap-16 lg:gap-24">
                            {collections.map((collection, index) => (
                                <div key={index} className={`flex flex-col ${index % 2 !== 0 ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-12`}>
                                    <div className="flex-1 w-full aspect-[4/3] overflow-hidden group relative">
                                        <Link to={collection.link} className="block w-full h-full">
                                            <img 
                                                src={collection.image} 
                                                alt={collection.title} 
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                                            />
                                            <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-300"></div>
                                        </Link>
                                    </div>
                                    <div className="flex-1 space-y-6 lg:px-8">
                                        <h2 className="text-3xl md:text-4xl font-serif text-text-primary">{collection.title}</h2>
                                        <p className="text-text-secondary font-light leading-relaxed max-w-md">
                                            {collection.description}
                                        </p>
                                        <Link to={collection.link} className="inline-block border-b border-text-primary text-text-primary font-medium hover:text-text-secondary hover:border-text-secondary transition-colors pb-1">
                                            Explore Collection
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </section>

            </main>

            <Footer />
        </div>
    );
}

export default Collections;
