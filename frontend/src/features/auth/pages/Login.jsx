import React, { useState } from 'react';
import { useAuth } from "../hook/useAuth";
import { useNavigate, Link } from "react-router";
import { useSelector } from 'react-redux';

const Login = () => {
    const { handleLogin } = useAuth();
    const navigate = useNavigate();
    const { loading, error } = useSelector((state) => state.auth);

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const user = await handleLogin({
                email: formData.email,
                password: formData.password
            });
            if(user.role === "buyer"){
                navigate("/");
            }
            else if(user.role === "seller"){
                navigate("/seller/dashboard");
            }
        } catch (err) {}
    };

    return (
        <div className="min-h-screen flex bg-[#FAFAFA] font-sans">
            
            {/* Left Panel - Branding */}
            <div className="hidden lg:flex w-1/2 bg-white flex-col justify-between p-20 border-r border-gray-100 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-5 grayscale mix-blend-multiply"></div>
                
                <div className="relative z-10">
                    <Link to="/" className="text-3xl font-serif font-light tracking-[0.2em] text-gray-900">
                        VASTRA ELITE
                    </Link>
                </div>
                
                <div className="relative z-10 max-w-lg space-y-8">
                    <h1 className="text-5xl font-serif text-gray-900 leading-[1.2] tracking-tight">
                        Welcome <br/> <span className="italic font-light text-gray-400">Back</span>
                    </h1>
                    <p className="text-gray-500 font-light leading-relaxed text-lg">
                        Sign in to explore the latest exclusive drops, manage your collections, and continue your elegant style journey.
                    </p>
                </div>

                <div className="relative z-10">
                    <p className="text-xs uppercase tracking-[0.2em] text-gray-400 font-medium">Est. 2026</p>
                </div>
            </div>

            {/* Right Panel - Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-16 lg:p-24 relative">
                
                <div className="w-full max-w-md space-y-12">
                    
                    {/* Mobile Brand */}
                    <div className="lg:hidden text-center mb-16">
                        <Link to="/" className="text-2xl font-serif font-light tracking-[0.2em] text-gray-900 inline-block">
                            VASTRA ELITE
                        </Link>
                    </div>

                    <div className="space-y-3">
                        <h2 className="text-3xl font-serif tracking-wide text-gray-900">Sign In</h2>
                        <p className="text-gray-500 font-light text-sm">Enter your details to access your account.</p>
                    </div>

                    {error && (
                        <div className="bg-red-50 border border-red-100 text-red-600 px-4 py-3 text-sm flex items-center gap-3">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                            <span>{error}</span>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-8">
                        <div className="space-y-2">
                            <label className="text-xs uppercase tracking-wider text-gray-500 font-medium ml-1">Email Address</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                placeholder="name@example.com"
                                className="w-full bg-white border-b border-gray-300 px-4 py-4 focus:outline-none focus:border-gray-900 transition-colors font-light placeholder-gray-300"
                            />
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between items-center ml-1">
                                <label className="text-xs uppercase tracking-wider text-gray-500 font-medium">Password</label>
                                <a href="#" className="text-xs text-gray-400 hover:text-gray-900 transition-colors">Forgot password?</a>
                            </div>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                    placeholder="Enter your password"
                                    className="w-full bg-white border-b border-gray-300 px-4 py-4 focus:outline-none focus:border-gray-900 transition-colors font-light placeholder-gray-300 pr-12"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-900"
                                >
                                    {showPassword ? (
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>
                                    ) : (
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                                    )}
                                </button>
                            </div>
                        </div>

                        <button 
                            type="submit" 
                            disabled={loading}
                            className="w-full bg-gray-900 text-white uppercase tracking-[0.2em] text-xs font-medium py-5 hover:bg-gray-800 transition-colors disabled:bg-gray-300 mt-4"
                        >
                            {loading ? 'Processing...' : 'Sign In'}
                        </button>

                        <div className="flex items-center gap-4 py-6">
                            <div className="flex-1 h-px bg-gray-200"></div>
                            <span className="text-xs text-gray-400 uppercase tracking-widest">or</span>
                            <div className="flex-1 h-px bg-gray-200"></div>
                        </div>

                        <a 
                            href="/api/auth/google" 
                            className="w-full flex items-center justify-center gap-3 border border-gray-200 py-4 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24">
                                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 12-4.53z" fill="#EA4335"/>
                            </svg>
                            Continue with Google
                        </a>

                        <p className="text-center text-sm text-gray-500 pt-8">
                            Don't have an account? <Link to="/register" className="text-gray-900 border-b border-gray-900 pb-0.5 ml-2 hover:text-gray-500 hover:border-gray-500 transition-colors">Create Account</Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;