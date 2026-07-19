import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router';
import { useSelector } from 'react-redux';
import { useProduct } from '../hook/useProduct';
import { useCart } from '../../cart/hook/useCart';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router';
import { Truck, ShieldCheck, RefreshCcw, HeadphonesIcon } from 'lucide-react';



function ProductDetail() {
    const { id } = useParams();
    const { handleGetAllProducts } = useProduct();
    const { handleAddToCart: addToCart } = useCart();
    const products = useSelector((state) => state.product.products);
    const navigate = useNavigate();
    
    const [selectedSize, setSelectedSize] = useState('');
    const [selectedColor, setSelectedColor] = useState(null);
    const [activeImageIndex, setActiveImageIndex] = useState(0);

    useEffect(() => {
        if (!products || products.length === 0) {
            handleGetAllProducts();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const product = products?.find(p => p._id === id);

    useEffect(() => {
        if (product) {
            if (product.sizes && product.sizes.length > 0 && !selectedSize) {
                setSelectedSize(product.sizes[0]);
            }
            if (product.colors && product.colors.length > 0 && !selectedColor) {
                setSelectedColor(product.colors[0]);
            }
        }
    }, [product]);

    if (!product) {
        return (
            <div className="min-h-screen flex flex-col bg-primary-bg font-sans">
                <Navbar />
                <main className="flex-grow flex items-center justify-center pt-[80px]">
                    <div className="text-center space-y-4">
                        <div className="animate-spin w-8 h-8 border-2 border-text-primary border-t-transparent rounded-full mx-auto"></div>
                        <p className="text-xs uppercase tracking-widest text-text-secondary">Loading details...</p>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: product.price?.currency || 'INR',
    });
    const formattedPrice = formatter.format(product.price?.amount || 0);

    const handleAddToCart = async () => {
        await addToCart(product._id, 1);
        navigate("/cart");
    };

    return (
        <div className="min-h-screen flex flex-col bg-primary-bg font-sans">
            <Navbar />

            <main className="flex-grow pt-[80px] pb-32">
                <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-12">
                    
                    {/* Breadcrumbs */}
                    <div className="text-xs text-text-secondary uppercase tracking-widest mb-12 flex items-center gap-3">
                        <Link to="/" className="hover:text-text-primary transition-colors">Home</Link>
                        <span>/</span>
                        <Link to="/products" className="hover:text-text-primary transition-colors">Collection</Link>
                        <span>/</span>
                        <span className="text-text-primary truncate max-w-[200px]">{product.title}</span>
                    </div>

                    <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
                        
                        {/* Image Gallery (Sticky Left) */}
                        <div className="w-full lg:w-3/5 flex flex-col-reverse md:flex-row gap-4 lg:sticky lg:top-[120px] lg:h-[calc(100vh-160px)]">
                            
                            {/* Thumbnails */}
                            {product.image && product.image.length > 1 && (
                                <div className="flex md:flex-col gap-4 overflow-x-auto md:overflow-y-auto scrollbar-hide md:w-20 flex-shrink-0">
                                    {product.image.map((img, idx) => (
                                        <button 
                                            key={idx}
                                            onClick={() => setActiveImageIndex(idx)}
                                            className={`relative aspect-[3/4] overflow-hidden bg-secondary-bg transition-all duration-300 ${activeImageIndex === idx ? 'border border-text-primary opacity-100' : 'opacity-60 hover:opacity-100 border border-transparent'}`}
                                        >
                                            <img src={img.url} alt={`Thumbnail ${idx}`} className="w-full h-full object-cover" />
                                        </button>
                                    ))}
                                </div>
                            )}

                            {/* Main Image */}
                            <div className="flex-grow aspect-[3/4] lg:aspect-auto lg:h-full bg-secondary-bg overflow-hidden border border-border-color">
                                {product.image && product.image.length > 0 ? (
                                    <img 
                                        src={product.image[activeImageIndex].url} 
                                        alt={product.title} 
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-border-color">
                                        <span className="text-xs uppercase tracking-widest">No Image</span>
                                    </div>
                                )}
                            </div>

                        </div>

                        {/* Product Info (Scrollable Right) */}
                        <div className="w-full lg:w-2/5 flex flex-col pt-8">
                            
                            <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif text-text-primary leading-tight mb-4">
                                {product.title}
                            </h1>
                            
                            <div className="text-xl text-text-primary font-medium tracking-wide mb-8">
                                {formattedPrice}
                            </div>

                            <p className="text-text-secondary font-light leading-relaxed mb-10 text-sm md:text-base">
                                {product.description}
                            </p>

                            <div className="space-y-8 border-t border-border-color py-8">
                                
                                {/* Colors */}
                                {product.colors && product.colors.length > 0 && (
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center">
                                        <span className="text-xs uppercase tracking-widest text-text-primary font-semibold">Color</span>
                                        <span className="text-xs text-text-secondary font-light">{selectedColor?.name}</span>
                                    </div>
                                    <div className="flex gap-4">
                                        {product.colors.map((color, idx) => (
                                            <button
                                                key={idx}
                                                onClick={() => setSelectedColor(color)}
                                                className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all ${selectedColor?.name === color.name ? 'border-text-primary p-[2px]' : 'border-transparent'}`}
                                            >
                                                <div 
                                                    className="w-full h-full rounded-full border border-border-color" 
                                                    style={{ backgroundColor: color.hex }}
                                                />
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                )}

                                {/* Sizes */}
                                {product.sizes && product.sizes.length > 0 && (
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center">
                                        <span className="text-xs uppercase tracking-widest text-text-primary font-semibold">Size</span>
                                        <button className="text-xs text-text-secondary border-b border-text-secondary hover:text-text-primary hover:border-text-primary transition-colors">Size Guide</button>
                                    </div>
                                    <div className="grid grid-cols-4 gap-3">
                                        {product.sizes.map((size) => (
                                            <button
                                                key={size}
                                                onClick={() => setSelectedSize(size)}
                                                className={`py-3 text-sm transition-all duration-300 ${selectedSize === size ? 'bg-text-primary text-white border border-text-primary' : 'bg-primary-bg text-text-secondary border border-border-color hover:border-text-primary hover:text-text-primary'}`}
                                            >
                                                {size}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                )}

                            </div>

                            {/* Actions */}
                            <div className="pt-8">
                                <button 
                                    onClick={handleAddToCart}
                                    className="w-full bg-text-primary text-white text-sm font-semibold py-4 hover:bg-[#333333] transition-colors shadow-sm mb-6"
                                >
                                    Add to Cart
                                </button>
                                
                                <div className="grid grid-cols-2 gap-y-6 text-xs text-text-secondary font-light pt-8 border-t border-border-color">
                                    <div className="flex items-center gap-3">
                                        <Truck className="w-5 h-5 text-text-primary" strokeWidth={1.5} />
                                        Complimentary Shipping
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <ShieldCheck className="w-5 h-5 text-text-primary" strokeWidth={1.5} />
                                        Secure Checkout
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <RefreshCcw className="w-5 h-5 text-text-primary" strokeWidth={1.5} />
                                        Free Returns
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <HeadphonesIcon className="w-5 h-5 text-text-primary" strokeWidth={1.5} />
                                        24/7 Support
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>
            </main>

            <Footer />
        </div>
    );
}

export default ProductDetail;
