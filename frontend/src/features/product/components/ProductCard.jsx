import React from 'react';
import { Link, useNavigate } from 'react-router'; 
import { useCart } from '../../cart/hook/useCart';

function ProductCard({ product, onAddToCart }) {
  const { handleAddToCart } = useCart();
  const navigate = useNavigate();
  const imageUrl = product.image && product.image.length > 0 
      ? product.image[0].url 
      : 'https://via.placeholder.com/400x500?text=No+Image';

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: product.price?.currency || 'INR',
  });
  
  const formattedPrice = formatter.format(product.price?.amount || 0);

  return (
    <div className="group flex flex-col h-full bg-white transition-all duration-700 hover:-translate-y-2">
      
      {/* Image Container */}
      <Link to={`/product/${product._id}`} className="relative aspect-[3/4] overflow-hidden bg-gray-50 mb-6 mx-4 mt-4 block">
        <img 
          src={imageUrl} 
          alt={product.title} 
          className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-1000 ease-out"
        />
        <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors duration-700" />
        
        {/* Quick Add Button */}
        <div className="absolute bottom-0 left-0 w-full p-4 translate-y-full group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500 ease-in-out">
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
                className="w-full bg-white text-gray-900 py-3 uppercase text-[10px] font-medium tracking-[0.2em] hover:bg-gray-900 hover:text-white transition-colors duration-300 shadow-xl"
            >
                Quick Add
            </button>
        </div>
      </Link>

      {/* Content */}
      <div className="flex flex-col flex-grow px-6 pb-8 text-center">
        <Link to={`/product/${product._id}`} className="text-gray-900 font-serif text-lg tracking-wide mb-2 line-clamp-1 group-hover:text-amber-700 transition-colors duration-300 cursor-pointer block">
            {product.title}
        </Link>
        <p className="text-gray-400 font-light text-sm line-clamp-2 mb-4 flex-grow px-4 leading-relaxed">
            {product.description}
        </p>
        <span className="text-gray-900 font-medium tracking-widest">{formattedPrice}</span>
      </div>

    </div>
  );
}

export default ProductCard;
