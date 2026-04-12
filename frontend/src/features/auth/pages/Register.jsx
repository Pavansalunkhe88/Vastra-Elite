import React, { useState } from 'react';
import { useAuth } from "../hook/useAuth";
import { useNavigate, Link } from 'react-router';
import { useSelector } from 'react-redux';
import '../styles/Auth.css';

const Register = () => {
    const { handleRegister } = useAuth();
    const navigate = useNavigate();
    const { loading, error } = useSelector((state) => state.auth);

    const [formData, setFormData] = useState({
        fullName: '',
        contactNumber: '',
        email: '',
        password: '',
        isSeller: false
    });

    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await handleRegister({
                email: formData.email,
                contact: formData.contactNumber,
                password: formData.password,
                isSeller: formData.isSeller,
                fullname: formData.fullName
            });
            navigate("/");
        } catch (err) {
            // Error is already dispatched to Redux by useAuth
        }
    };

    return (
        <div className="auth-page-wrapper">
            <div className="auth-orb orb-one"></div>
            <div className="auth-orb orb-two"></div>
            <div className="auth-orb orb-three"></div>

            <div className="auth-container">
                {/* Left Panel */}
                <div className="auth-left-panel">
                    <div className="auth-left-overlay"></div>
                    <div className="auth-left-content">
                        <div className="auth-logo-area">
                            <div className="auth-logo-icon">VE</div>
                            <span className="auth-logo-text">Vastra Elite</span>
                        </div>
                        <div className="auth-hero-text">
                            <h1 className="auth-hero-title">
                                Elevate Your
                                <span className="auth-hero-accent"> Style Journey</span>
                            </h1>
                            <p className="auth-hero-sub">
                                Join an exclusive community of fashion connoisseurs.
                                Curate your wardrobe with premium collections that define elegance.
                            </p>
                        </div>
                        <div className="auth-stats-row">
                            <div className="auth-stat-item">
                                <span className="auth-stat-number">50K+</span>
                                <span className="auth-stat-label">Members</span>
                            </div>
                            <div className="auth-stat-divider"></div>
                            <div className="auth-stat-item">
                                <span className="auth-stat-number">2K+</span>
                                <span className="auth-stat-label">Brands</span>
                            </div>
                            <div className="auth-stat-divider"></div>
                            <div className="auth-stat-item">
                                <span className="auth-stat-number">100%</span>
                                <span className="auth-stat-label">Authentic</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Panel */}
                <div className="auth-right-panel">
                    <div className="auth-mobile-logo">
                        <div className="auth-logo-icon">VE</div>
                        <span className="auth-logo-text">Vastra Elite</span>
                    </div>

                    <div className="auth-form-header">
                        <h2 className="auth-form-title">Create Account</h2>
                        <p className="auth-form-subtitle">Begin your exclusive fashion experience</p>
                    </div>

                    {error && (
                        <div className="auth-error-box">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ff6b6b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="12" cy="12" r="10"></circle>
                                <line x1="15" y1="9" x2="9" y2="15"></line>
                                <line x1="9" y1="9" x2="15" y2="15"></line>
                            </svg>
                            <span>{error}</span>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="auth-form">
                        <div className="auth-input-group">
                            <label className="auth-input-label">Full Name</label>
                            <div className="auth-input-wrapper">
                                <svg className="auth-input-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                    <circle cx="12" cy="7" r="4"></circle>
                                </svg>
                                <input className="auth-input" type="text" name="fullName" value={formData.fullName} onChange={handleChange} required placeholder="Enter your full name" />
                            </div>
                        </div>

                        <div className="auth-input-group">
                            <label className="auth-input-label">Contact Number</label>
                            <div className="auth-input-wrapper">
                                <svg className="auth-input-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"></path>
                                </svg>
                                <input className="auth-input" type="tel" name="contactNumber" value={formData.contactNumber} onChange={handleChange} required placeholder="Enter your phone number" />
                            </div>
                        </div>

                        <div className="auth-input-group">
                            <label className="auth-input-label">Email Address</label>
                            <div className="auth-input-wrapper">
                                <svg className="auth-input-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                                    <polyline points="22,6 12,13 2,6"></polyline>
                                </svg>
                                <input className="auth-input" type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="your@email.com" />
                            </div>
                        </div>

                        <div className="auth-input-group">
                            <label className="auth-input-label">Password</label>
                            <div className="auth-input-wrapper">
                                <svg className="auth-input-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                                    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                                </svg>
                                <input className="auth-input" type={showPassword ? "text" : "password"} name="password" value={formData.password} onChange={handleChange} required placeholder="Min. 6 characters" />
                                <button type="button" onClick={() => setShowPassword(!showPassword)} className="auth-eye-btn" aria-label="Toggle password visibility">
                                    {showPassword ? (
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>
                                    ) : (
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                                    )}
                                </button>
                            </div>
                        </div>

                        <div className="auth-seller-row">
                            <label htmlFor="isSeller" className="auth-seller-label">
                                <div className={`auth-toggle ${formData.isSeller ? 'active' : ''}`}>
                                    <div className="auth-toggle-knob"></div>
                                </div>
                                <span>Register as a Seller</span>
                            </label>
                            <input type="checkbox" name="isSeller" id="isSeller" checked={formData.isSeller} onChange={handleChange} style={{ display: 'none' }} />
                        </div>

                        <button className="auth-submit-btn" type="submit" disabled={loading}>
                            {loading ? (
                                <div className="auth-spinner"></div>
                            ) : (
                                <>
                                    Create Account
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                                </>
                            )}
                        </button>

                        <div className="auth-divider-row">
                            <div className="auth-divider-line"></div>
                            <span className="auth-divider-text">or</span>
                            <div className="auth-divider-line"></div>
                        </div>

                        <a href="/api/auth/google" className="auth-google-btn">
                            <svg width="20" height="20" viewBox="0 0 24 24">
                                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 12-4.53z" fill="#EA4335"/>
                            </svg>
                            Continue with Google
                        </a>

                        <p className="auth-switch-text">
                            Already have an account?{' '}
                            <Link to="/login" className="auth-switch-link">Sign In</Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;