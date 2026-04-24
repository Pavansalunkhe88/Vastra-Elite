import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router';
import { useSelector } from 'react-redux';
import { useProduct } from '../hook/useProduct';
import { useCart } from '../../cart/hook/useCart';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router';

const SIZES = ['S', 'M', 'L', 'XL'];
const COLORS = [
    { name: 'Onyx Black', hex: '#111111' },
    { name: 'Pearl White', hex: '#F9F9F9' },
    { name: 'Sandstone', hex: '#D7C9B1' }
];

function ProductDetail() {
    const { id } = useParams();
    const { handleGetAllProducts } = useProduct();
    const { handleAddToCart: addToCart } = useCart();
    const products = useSelector((state) => state.product.products);
    const navigate = useNavigate();
    
    const [selectedSize, setSelectedSize] = useState('M');
    const [selectedColor, setSelectedColor] = useState(COLORS[0]);
    const [activeImageIndex, setActiveImageIndex] = useState(0);

    useEffect(() => {
        if (!products || products.length === 0) {
            handleGetAllProducts();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const product = products?.find(p => p._id === id);

    if (!product) {
        return (
            <div className="min-h-screen flex flex-col bg-[#FAFAFA] font-sans">
                <Navbar />
                <main className="flex-grow flex items-center justify-center pt-[80px]">
                    <div className="text-center space-y-4">
                        <div className="animate-spin w-8 h-8 border-2 border-gray-900 border-t-transparent rounded-full mx-auto"></div>
                        <p className="text-xs uppercase tracking-widest text-gray-500">Loading details...</p>
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
        <div className="min-h-screen flex flex-col bg-[#FAFAFA] font-sans selection:bg-gray-200">
            <Navbar />

            <main className="flex-grow pt-[120px] pb-32">
                <div className="max-w-7xl mx-auto px-6">
                    
                    {/* Breadcrumbs */}
                    <div className="text-xs text-gray-400 uppercase tracking-widest mb-12 flex items-center gap-3">
                        <Link to="/" className="hover:text-gray-900 transition-colors">Home</Link>
                        <span>/</span>
                        <Link to="/" className="hover:text-gray-900 transition-colors">Collection</Link>
                        <span>/</span>
                        <span className="text-gray-900 truncate max-w-[200px]">{product.title}</span>
                    </div>

                    <div className="flex flex-col lg:flex-row-reverse gap-16 lg:gap-24">
                        
                        {/* Image Gallery */}
                        <div className="w-full lg:w-3/5 flex flex-col-reverse md:flex-row gap-6">
                            
                            {/* Thumbnails */}
                            {product.image && product.image.length > 1 && (
                                <div className="flex md:flex-col gap-4 overflow-x-auto md:overflow-y-auto md:max-h-[80vh] scrollbar-hide">
                                    {product.image.map((img, idx) => (
                                        <button 
                                            key={idx}
                                            onClick={() => setActiveImageIndex(idx)}
                                            className={`relative w-20 aspect-[3/4] flex-shrink-0 overflow-hidden bg-gray-50 transition-all duration-300 ${activeImageIndex === idx ? 'border border-gray-900' : 'opacity-70 hover:opacity-100'}`}
                                        >
                                            <img src={img.url} alt={`Thumbnail ${idx}`} className="w-full h-full object-cover" />
                                        </button>
                                    ))}
                                </div>
                            )}

                            {/* Main Image */}
                            <div className="flex-grow aspect-[3/4] bg-gray-50 relative overflow-hidden group">
                                {product.image && product.image.length > 0 ? (
                                    <img 
                                        src={product.image[activeImageIndex].url} 
                                        alt={product.title} 
                                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-1000 ease-out"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-gray-300">
                                        <span className="text-xs uppercase tracking-widest">No Image</span>
                                    </div>
                                )}
                            </div>

                        </div>

                        {/* Product Info */}
                        <div className="w-full lg:w-2/5 flex flex-col justify-center">
                            
                            <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif text-gray-900 tracking-wide mb-6 leading-tight">
                                {product.title}
                            </h1>
                            
                            <div className="text-xl text-gray-900 font-medium tracking-widest mb-10">
                                {formattedPrice}
                            </div>

                            <p className="text-gray-500 font-light leading-relaxed mb-12 text-sm md:text-base">
                                {product.description}
                            </p>

                            <div className="space-y-10 border-t border-gray-200 py-10">
                                
                                {/* Colors */}
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center">
                                        <span className="text-xs uppercase tracking-widest text-gray-900 font-medium">Color</span>
                                        <span className="text-xs text-gray-500">{selectedColor.name}</span>
                                    </div>
                                    <div className="flex gap-4">
                                        {COLORS.map((color, idx) => (
                                            <button
                                                key={idx}
                                                onClick={() => setSelectedColor(color)}
                                                className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all ${selectedColor.name === color.name ? 'border-gray-900 p-1' : 'border-transparent'}`}
                                            >
                                                <div 
                                                    className="w-full h-full rounded-full border border-gray-200" 
                                                    style={{ backgroundColor: color.hex }}
                                                />
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Sizes */}
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center">
                                        <span className="text-xs uppercase tracking-widest text-gray-900 font-medium">Size</span>
                                        <a href="#" className="text-xs text-gray-400 border-b border-gray-400 hover:text-gray-900 hover:border-gray-900 transition-colors">Size Guide</a>
                                    </div>
                                    <div className="grid grid-cols-4 gap-4">
                                        {SIZES.map((size) => (
                                            <button
                                                key={size}
                                                onClick={() => setSelectedSize(size)}
                                                className={`py-3 text-xs tracking-widest uppercase transition-all duration-300 ${selectedSize === size ? 'bg-gray-900 text-white border border-gray-900 shadow-md' : 'bg-white text-gray-500 border border-gray-200 hover:border-gray-900 hover:text-gray-900'}`}
                                            >
                                                {size}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                            </div>

                            {/* Actions */}
                            <div className="pt-6">
                                <button 
                                    onClick={handleAddToCart}
                                    className="w-full bg-gray-900 text-white uppercase tracking-[0.2em] text-xs font-medium py-5 hover:bg-gray-800 transition-colors hover:shadow-xl duration-300"
                                >
                                    Add to Cart
                                </button>
                                
                                <div className="mt-8 grid grid-cols-2 gap-y-4 text-xs tracking-wide text-gray-500 font-light">
                                    <div className="flex items-center gap-3">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5 13l4 4L19 7"></path></svg>
                                        Complimentary Shipping
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>
                                        Secure Checkout
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>
                                        Free Returns
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
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
