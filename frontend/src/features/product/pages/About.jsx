import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function About() {
    return (
        <div className="min-h-screen flex flex-col bg-primary-bg font-sans">
            <Navbar />

            <main className="flex-grow pt-[80px]">
                
                {/* Hero Section */}
                <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
                    <img 
                        src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?q=80&w=2070&auto=format&fit=crop" 
                        alt="About VastraElite"
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40"></div>
                    <div className="relative z-10 text-center px-6">
                        <h1 className="text-4xl md:text-5xl lg:text-7xl font-serif text-white mb-6">Our Story</h1>
                        <p className="text-white/90 font-light max-w-xl mx-auto text-lg">
                            Redefining everyday luxury with timeless design and uncompromising quality.
                        </p>
                    </div>
                </section>

                {/* Content Section */}
                <section className="max-w-[1000px] mx-auto px-6 lg:px-12 py-24 space-y-24">
                    
                    <div className="text-center max-w-[700px] mx-auto">
                        <h2 className="text-3xl font-serif text-text-primary mb-8">The Philosophy</h2>
                        <p className="text-text-secondary font-light leading-relaxed text-lg">
                            At VastraElite, we believe that fashion should be as enduring as it is elegant. 
                            Founded in 2026, our mission has been to strip away the excess and focus on what truly matters: 
                            exceptional fabrics, precise tailoring, and silhouettes that stand the test of time.
                        </p>
                    </div>

                    <div className="flex flex-col md:flex-row gap-12 items-center">
                        <div className="flex-1 w-full aspect-[4/5] bg-secondary-bg">
                            <img src="https://images.unsplash.com/photo-1550639525-c97d455acf70?q=80&w=1926&auto=format&fit=crop" alt="Craftsmanship" className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 space-y-6">
                            <h2 className="text-3xl font-serif text-text-primary">Craftsmanship</h2>
                            <p className="text-text-secondary font-light leading-relaxed">
                                Every piece in our collection is thoughtfully designed in our studio and crafted by skilled artisans. 
                                We source our materials from the finest mills around the world, ensuring that each garment not only looks beautiful but feels incredible against the skin.
                            </p>
                            <p className="text-text-secondary font-light leading-relaxed">
                                We prioritize quality over quantity, releasing curated collections that seamlessly integrate into a modern wardrobe.
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row-reverse gap-12 items-center">
                        <div className="flex-1 w-full aspect-[4/5] bg-secondary-bg">
                            <img src="https://images.unsplash.com/photo-1528698827591-e19ccd7bc23d?q=80&w=2076&auto=format&fit=crop" alt="Sustainability" className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 space-y-6">
                            <h2 className="text-3xl font-serif text-text-primary">Sustainability</h2>
                            <p className="text-text-secondary font-light leading-relaxed">
                                True luxury respects the environment. We are committed to ethical production practices and sustainable sourcing. 
                                By creating garments designed to last years, not just seasons, we aim to combat the culture of fast fashion and promote a more mindful approach to dressing.
                            </p>
                        </div>
                    </div>

                </section>

                {/* Final Call to action */}
                <section className="bg-secondary-bg py-24 px-6 text-center">
                    <h2 className="text-3xl font-serif text-text-primary mb-6">Experience VastraElite</h2>
                    <p className="text-text-secondary font-light mb-10 max-w-md mx-auto">
                        Explore our latest collections and discover the difference of true craftsmanship.
                    </p>
                    <a href="/collections" className="inline-block bg-text-primary text-white px-8 py-4 text-sm font-semibold hover:bg-[#333333] transition-colors">
                        Shop the Collection
                    </a>
                </section>

            </main>

            <Footer />
        </div>
    );
}

export default About;
