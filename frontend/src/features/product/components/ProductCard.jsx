import React from 'react';
import { Link, useNavigate } from 'react-router'; 
import { useCart } from '../../cart/hook/useCart';
import { Heart, Star } from 'lucide-react';

function ProductCard({ product, onAddToCart }) {
  const { handleAddToCart } = useCart();
  const navigate = useNavigate();
  
  const imageUrl1 = product.image && product.image.length > 0 
      ? product.image[0].url 
      : 'https://via.placeholder.com/400x500?text=No+Image';
      
  const imageUrl2 = product.image && product.image.length > 1
      ? product.image[1].url
      : imageUrl1;

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: product.price?.currency || 'INR',
  });
  
  const formattedPrice = formatter.format(product.price?.amount || 0);

  return (
    <div className="group flex flex-col">
      
      {/* Image Container */}
      <div className="relative aspect-[3/4] overflow-hidden bg-secondary-bg mb-4 border border-border-color">
        <Link to={`/product/${product._id}`} className="block w-full h-full">
            <img 
              src={imageUrl1} 
              alt={product.title} 
              className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 group-hover:opacity-0"
            />
            <img 
              src={imageUrl2} 
              alt={`${product.title} alternate`} 
              className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 opacity-0 group-hover:opacity-100 transform group-hover:scale-105 transition-transform duration-[2s] ease-out"
            />
        </Link>
        
        {/* Wishlist Button */}
        <button className="absolute top-4 right-4 text-text-secondary hover:text-text-primary transition-colors bg-white/80 backdrop-blur-md p-2 rounded-full opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 duration-300">
            <Heart className="w-4 h-4" strokeWidth={1.5} />
        </button>
        
        {/* Quick Add Button */}
        <div className="absolute bottom-0 left-0 w-full p-4 translate-y-full group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out">
            <button 
                onClick={async (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    if(onAddToCart) {
                        onAddToCart(product);
                    } else {
                        await handleAddToCart(product._id, 1);
                        navigate("/cart");
                    }
                }}
                className="w-full bg-text-primary text-white py-3 text-sm font-semibold hover:bg-[#333333] transition-colors shadow-lg"
            >
                Quick Add
            </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col gap-1">
        <div className="flex justify-between items-start">
            <Link to={`/product/${product._id}`} className="text-text-primary text-sm font-medium line-clamp-1 hover:underline">
                {product.title}
            </Link>
            <span className="text-text-primary text-sm">{formattedPrice}</span>
        </div>
        <p className="text-text-secondary text-xs">VastraElite</p>
        <div className="flex items-center gap-1 mt-1 text-accent-gold">
            <Star className="w-3 h-3 fill-current" />
            <span className="text-text-secondary text-xs ml-1 font-sans">4.8</span>
        </div>
      </div>

    </div>
  );
}

export default ProductCard;
