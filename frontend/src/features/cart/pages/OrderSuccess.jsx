import React from 'react';
import { Link } from 'react-router';
import Navbar from '../../product/components/Navbar';
import Footer from '../../product/components/Footer';
import { CheckCircle } from 'lucide-react';

function OrderSuccess() {
    return (
        <div className="min-h-screen flex flex-col bg-primary-bg font-sans">
            <Navbar />
            <main className="flex-grow flex items-center justify-center py-[120px] px-6">
                <div className="max-w-md w-full bg-secondary-bg p-12 text-center space-y-6">
                    <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle className="w-10 h-10 text-green-600" strokeWidth={1.5} />
                    </div>
                    
                    <h1 className="text-3xl font-serif text-text-primary">Order Confirmed</h1>
                    
                    <p className="text-text-secondary font-light text-sm leading-relaxed">
                        Thank you for your purchase. We've received your order and will email you a confirmation and shipping update shortly.
                    </p>
                    
                    <div className="pt-6">
                        <Link 
                            to="/"
                            className="inline-block bg-text-primary text-white px-8 py-4 text-sm font-semibold hover:bg-[#333333] transition-colors"
                        >
                            Continue Shopping
                        </Link>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}

export default OrderSuccess;
