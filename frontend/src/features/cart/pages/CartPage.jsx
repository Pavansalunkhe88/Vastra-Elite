import React, { useEffect, useState } from "react";
import { useCart } from "../hook/useCart";
import { useRazorpay } from "react-razorpay";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { X, Minus, Plus, ShoppingBag } from "lucide-react";

function CartPage() {
  const {
    items,
    loading,
    handleGetCart,
    handleRemoveFromCart,
    handleUpdateQuantity,
    handleCreateOrder,
  } = useCart();

  const { error, isLoading, Razorpay } = useRazorpay();
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    handleGetCart();
  }, []);

  const subtotal = items.reduce(
    (acc, item) => acc + item.productId.price.amount * item.quantity,
    0,
  );

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'INR',
  });

  const handleClose = () => {
      setIsClosing(true);
      setTimeout(() => {
          navigate(-1);
      }, 300); // match animation duration
  };

  async function handleCheckout() {
    try {
      const order = await handleCreateOrder();
      
      const options = {
        key: "rzp_test_ShPLeL6jvXEWJb",
        amount: order.amount, 
        currency: order.currency,
        name: "VastraElite",
        description: "Order Transaction",
        order_id: order.id, 
        handler: (response) => {
          console.log(response);
          alert("Payment Successful!");
          handleClose();
        },
        prefill: {
          name: user?.fullname,
          email: user?.email,
          contact: user?.contact,
        },
        theme: {
          color: "#111111",
        },
      };

      const razorpayInstance = new Razorpay(options);
      razorpayInstance.open();
    } catch (err) {
      console.error("Checkout error:", err);
      alert("Failed to create order. Please try again.");
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex justify-end font-sans">
        
      {/* Backdrop */}
      <div 
        className={`absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${isClosing ? 'opacity-0' : 'opacity-100'}`}
        onClick={handleClose}
      />

      {/* Drawer */}
      <div 
        className={`relative w-full max-w-md bg-primary-bg h-full shadow-2xl flex flex-col transition-transform duration-300 ease-in-out transform ${isClosing ? 'translate-x-full' : 'translate-x-0'}`}
      >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-6 border-b border-border-color">
              <h2 className="text-lg font-serif tracking-wide text-text-primary">Shopping Cart ({items.length})</h2>
              <button onClick={handleClose} className="p-2 hover:bg-secondary-bg rounded-full transition-colors">
                  <X className="w-5 h-5 text-text-primary" strokeWidth={1.5} />
              </button>
          </div>

          {/* Content */}
          <div className="flex-grow overflow-y-auto p-6 scrollbar-hide">
              {loading && items.length === 0 ? (
                  <div className="flex justify-center py-12">
                      <div className="animate-spin w-6 h-6 border-2 border-text-primary border-t-transparent rounded-full"></div>
                  </div>
              ) : items.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-center space-y-6">
                      <div className="w-20 h-20 bg-secondary-bg rounded-full flex items-center justify-center mb-4">
                          <ShoppingBag className="w-8 h-8 text-text-secondary" strokeWidth={1} />
                      </div>
                      <h3 className="font-serif text-xl text-text-primary">Your cart is empty</h3>
                      <p className="text-sm text-text-secondary font-light max-w-[250px]">
                          Discover our latest collection and find something you love.
                      </p>
                      <button 
                          onClick={handleClose}
                          className="mt-4 px-8 py-3 bg-text-primary text-white text-xs font-semibold tracking-widest uppercase hover:bg-[#333333] transition-colors"
                      >
                          Continue Shopping
                      </button>
                  </div>
              ) : (
                  <div className="space-y-6">
                      {items.map((item) => (
                          <div key={item.productId._id} className="flex gap-4 pb-6 border-b border-border-color group">
                              <div className="w-24 aspect-[3/4] bg-secondary-bg overflow-hidden flex-shrink-0">
                                  <img 
                                      src={item.productId.image[0]?.url || "https://via.placeholder.com/200"} 
                                      alt={item.productId.title}
                                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                  />
                              </div>
                              <div className="flex flex-col flex-grow justify-between py-1">
                                  <div>
                                      <div className="flex justify-between items-start mb-1">
                                          <h3 className="text-sm font-medium text-text-primary line-clamp-2 pr-4">{item.productId.title}</h3>
                                          <button 
                                              onClick={() => handleRemoveFromCart(item.productId._id)}
                                              className="text-text-secondary hover:text-text-primary p-1"
                                          >
                                              <X className="w-4 h-4" strokeWidth={1.5} />
                                          </button>
                                      </div>
                                      <p className="text-xs text-text-secondary font-light mb-2">Color: Default</p>
                                      <p className="text-sm font-medium text-text-primary">{formatter.format(item.productId.price.amount)}</p>
                                  </div>
                                  
                                  <div className="flex items-center justify-between mt-4">
                                      <div className="flex items-center border border-border-color">
                                          <button 
                                              onClick={() => handleUpdateQuantity(item.productId._id, item.quantity - 1)}
                                              className="p-2 text-text-secondary hover:text-text-primary hover:bg-secondary-bg transition-colors"
                                          >
                                              <Minus className="w-3 h-3" strokeWidth={1.5} />
                                          </button>
                                          <span className="w-8 text-center text-sm">{item.quantity}</span>
                                          <button 
                                              onClick={() => handleUpdateQuantity(item.productId._id, item.quantity + 1)}
                                              className="p-2 text-text-secondary hover:text-text-primary hover:bg-secondary-bg transition-colors"
                                          >
                                              <Plus className="w-3 h-3" strokeWidth={1.5} />
                                          </button>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      ))}
                  </div>
              )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
              <div className="border-t border-border-color p-6 bg-primary-bg shadow-[0_-10px_20px_-10px_rgba(0,0,0,0.05)]">
                  <div className="space-y-3 mb-6 text-sm">
                      <div className="flex justify-between text-text-secondary">
                          <span>Subtotal</span>
                          <span className="text-text-primary">{formatter.format(subtotal)}</span>
                      </div>
                      <div className="flex justify-between text-text-secondary">
                          <span>Shipping</span>
                          <span className="text-text-primary uppercase text-xs tracking-widest font-medium">Complimentary</span>
                      </div>
                      <div className="flex justify-between font-serif text-lg text-text-primary pt-3 border-t border-border-color">
                          <span>Total</span>
                          <span>{formatter.format(subtotal)}</span>
                      </div>
                  </div>
                  <button 
                      onClick={handleCheckout}
                      disabled={isLoading}
                      className="w-full bg-text-primary text-white py-4 text-sm font-semibold hover:bg-[#333333] transition-colors disabled:opacity-70 flex items-center justify-center gap-2"
                  >
                      {isLoading ? 'Processing...' : 'Proceed to Checkout'}
                  </button>
              </div>
          )}
      </div>

    </div>
  );
}

export default CartPage;
