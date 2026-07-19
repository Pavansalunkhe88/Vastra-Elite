import React, { useEffect } from 'react';
import { useCart } from '../hook/useCart';
import { useRazorpay } from 'react-razorpay';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import Navbar from '../../product/components/Navbar';
import Footer from '../../product/components/Footer';
import { ShieldCheck, Lock } from 'lucide-react';

function CheckoutPage() {
    const { items, handleGetCart, handleCreateOrder } = useCart();
    const { error, isLoading, Razorpay } = useRazorpay();
    const user = useSelector((state) => state.auth?.user || state.user);
    const navigate = useNavigate();

    useEffect(() => {
        handleGetCart();
    }, []);

    const subtotal = items.reduce(
        (acc, item) => acc + item.productId.price.amount * item.quantity,
        0
    );

    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'INR',
    });

    const handlePayment = async (e) => {
        e.preventDefault();
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
                    navigate("/success");
                },
                prefill: {
                    name: user?.fullname || '',
                    email: user?.email || '',
                    contact: user?.contact || '',
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
    };

    if (items.length === 0) {
        return (
            <div className="min-h-screen flex flex-col bg-primary-bg font-sans">
                <Navbar />
                <main className="flex-grow flex items-center justify-center pt-[80px]">
                    <div className="text-center space-y-4">
                        <h2 className="text-2xl font-serif text-text-primary">Your cart is empty</h2>
                        <button onClick={() => navigate("/")} className="text-sm border-b border-text-primary pb-1">Return to Shop</button>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col bg-primary-bg font-sans">
            <Navbar />
            <main className="flex-grow pt-[100px] pb-24">
                <div className="max-w-[1200px] mx-auto px-6 lg:px-12">
                    <h1 className="text-3xl font-serif text-text-primary mb-12 border-b border-border-color pb-6">Secure Checkout</h1>
                    
                    <div className="flex flex-col lg:flex-row gap-16">
                        {/* Billing Info Form */}
                        <div className="flex-1 space-y-8">
                            <h2 className="text-xl font-serif text-text-primary">Billing Details</h2>
                            <form id="checkout-form" onSubmit={handlePayment} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-xs uppercase tracking-widest text-text-secondary">Full Name</label>
                                        <input type="text" defaultValue={user?.fullname} required className="w-full border border-border-color bg-transparent px-4 py-3 text-sm focus:outline-none focus:border-text-primary transition-colors" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs uppercase tracking-widest text-text-secondary">Email Address</label>
                                        <input type="email" defaultValue={user?.email} required className="w-full border border-border-color bg-transparent px-4 py-3 text-sm focus:outline-none focus:border-text-primary transition-colors" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs uppercase tracking-widest text-text-secondary">Phone Number</label>
                                    <input type="tel" defaultValue={user?.contact} required className="w-full border border-border-color bg-transparent px-4 py-3 text-sm focus:outline-none focus:border-text-primary transition-colors" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs uppercase tracking-widest text-text-secondary">Shipping Address</label>
                                    <textarea required rows="3" className="w-full border border-border-color bg-transparent px-4 py-3 text-sm focus:outline-none focus:border-text-primary transition-colors" placeholder="Street address, city, state, zip code"></textarea>
                                </div>
                            </form>
                        </div>

                        {/* Order Summary */}
                        <div className="w-full lg:w-[400px]">
                            <div className="bg-secondary-bg p-8 space-y-6 sticky top-[120px]">
                                <h2 className="text-xl font-serif text-text-primary">Order Summary</h2>
                                
                                <div className="space-y-4 max-h-[300px] overflow-y-auto scrollbar-hide">
                                    {items.map((item) => (
                                        <div key={item.productId._id} className="flex gap-4">
                                            <div className="w-16 aspect-[3/4] bg-primary-bg overflow-hidden flex-shrink-0">
                                                <img src={item.productId.image[0]?.url} alt={item.productId.title} className="w-full h-full object-cover" />
                                            </div>
                                            <div className="flex-1 flex flex-col justify-between py-1 text-sm">
                                                <span className="font-medium line-clamp-1">{item.productId.title}</span>
                                                <span className="text-text-secondary">Qty: {item.quantity}</span>
                                                <span>{formatter.format(item.productId.price.amount)}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="border-t border-border-color pt-6 space-y-4 text-sm">
                                    <div className="flex justify-between text-text-secondary">
                                        <span>Subtotal</span>
                                        <span>{formatter.format(subtotal)}</span>
                                    </div>
                                    <div className="flex justify-between text-text-secondary">
                                        <span>Shipping</span>
                                        <span className="uppercase text-xs tracking-widest font-medium text-text-primary">Complimentary</span>
                                    </div>
                                    <div className="flex justify-between font-serif text-lg text-text-primary pt-4 border-t border-border-color">
                                        <span>Total</span>
                                        <span>{formatter.format(subtotal)}</span>
                                    </div>
                                </div>

                                <button 
                                    form="checkout-form"
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full bg-text-primary text-white py-4 text-sm font-semibold hover:bg-[#333333] transition-colors disabled:opacity-70 mt-6 flex items-center justify-center gap-2"
                                >
                                    <Lock className="w-4 h-4" />
                                    {isLoading ? 'Processing...' : `Pay ${formatter.format(subtotal)}`}
                                </button>
                                
                                <div className="flex items-center justify-center gap-2 text-xs text-text-secondary font-light pt-4">
                                    <ShieldCheck className="w-4 h-4" />
                                    Payments are secure and encrypted
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

export default CheckoutPage;
