import React, { useState } from 'react';
import { useProduct } from '../hook/useProduct';
import { useNavigate } from "react-router";
import '../../auth/styles/Auth.css';

const CreateProduct = () => {
    const { handleCreateProduct } = useProduct();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        priceAmount: ''
    });
    const [files, setFiles] = useState([]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleFileChange = (e) => {
        setFiles(e.target.files);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const submitData = new FormData();
            submitData.append('title', formData.title);
            submitData.append('description', formData.description);
            submitData.append('priceAmount', formData.priceAmount);
            
            if (files) {
                for (let i = 0; i < files.length; i++) {
                    submitData.append('images', files[i]);
                }
            }

            await handleCreateProduct(submitData);
            navigate("/seller/dashboard");
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to create product');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-page-wrapper">
            {/* Animated background orbs */}
            <div className="auth-orb orb-one"></div>
            <div className="auth-orb orb-two"></div>
            <div className="auth-orb orb-three"></div>

            <div className="auth-container" style={{ maxWidth: '1000px' }}>
                {/* Left Panel — Brand Side */}
                <div className="auth-left-panel">
                    <div className="auth-left-overlay"></div>
                    <div className="auth-left-content">
                        <div className="auth-logo-area">
                            <div className="auth-logo-icon">VE</div>
                            <span className="auth-logo-text">Vastra Elite</span>
                        </div>

                        <div className="auth-hero-text">
                            <h1 className="auth-hero-title">
                                Expand Your
                                <span className="auth-hero-accent"> Collection</span>
                            </h1>
                            <p className="auth-hero-sub">
                                List new exclusive drops to your Vastra Elite storefront.
                                Showcase your premium luxury pieces to the world.
                            </p>
                        </div>

                        {/* Decorative quote */}
                        <div className="auth-quote-section">
                            <div className="auth-quote-mark">"</div>
                            <p className="auth-quote-text">
                                Detail is what gives a product its soul.
                            </p>
                            <p className="auth-quote-author">— Vastra Elite</p>
                        </div>
                    </div>
                </div>

                {/* Right Panel — Form Side */}
                <div className="auth-right-panel" style={{ overflowY: 'auto' }}>
                    {/* Mobile logo */}
                    <div className="auth-mobile-logo">
                        <div className="auth-logo-icon">VE</div>
                        <span className="auth-logo-text">Vastra Elite</span>
                    </div>

                    <div className="auth-form-header">
                        <h2 className="auth-form-title">Create Product</h2>
                        <p className="auth-form-subtitle">Add a new luxury item to your inventory</p>
                    </div>

                    {/* Error display */}
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
                        {/* Title */}
                        <div className="auth-input-group">
                            <label className="auth-input-label">Product Title</label>
                            <div className="auth-input-wrapper">
                                <svg className="auth-input-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path>
                                    <line x1="7" y1="7" x2="7.01" y2="7"></line>
                                </svg>
                                <input
                                    className="auth-input"
                                    type="text"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    required
                                    placeholder="Enter product title"
                                />
                            </div>
                        </div>

                        {/* Description */}
                        <div className="auth-input-group">
                            <label className="auth-input-label">Description</label>
                            <div className="auth-input-wrapper" style={{ height: 'auto' }}>
                                <textarea
                                    className="auth-input"
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    required
                                    placeholder="Describe your product..."
                                    style={{ paddingTop: '12px', paddingBottom: '12px', minHeight: '100px', resize: 'vertical' }}
                                />
                            </div>
                        </div>

                        {/* Price */}
                        <div className="auth-input-group">
                            <label className="auth-input-label">Price Amount</label>
                            <div className="auth-input-wrapper">
                                <svg className="auth-input-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="12" y1="1" x2="12" y2="23"></line>
                                    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                                </svg>
                                <input
                                    className="auth-input"
                                    type="number"
                                    name="priceAmount"
                                    value={formData.priceAmount}
                                    onChange={handleChange}
                                    required
                                    min="0"
                                    step="0.01"
                                    placeholder="e.g. 5000"
                                />
                            </div>
                        </div>

                        {/* Images */}
                        <div className="auth-input-group">
                            <label className="auth-input-label">Product Images (up to 7)</label>
                            <div className="auth-input-wrapper">
                                <svg className="auth-input-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                                    <circle cx="8.5" cy="8.5" r="1.5"></circle>
                                    <polyline points="21 15 16 10 5 21"></polyline>
                                </svg>
                                <input
                                    className="auth-input"
                                    type="file"
                                    name="images"
                                    onChange={handleFileChange}
                                    multiple
                                    accept="image/*"
                                    style={{ paddingTop: '10px' }}
                                    required
                                />
                            </div>
                        </div>

                        {/* Submit */}
                        <button className="auth-submit-btn" type="submit" disabled={loading}>
                            {loading ? (
                                <div className="auth-spinner"></div>
                            ) : (
                                <>
                                    Publish Product
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <line x1="12" y1="5" x2="12" y2="19"></line>
                                        <line x1="5" y1="12" x2="19" y2="12"></line>
                                    </svg>
                                </>
                            )}
                        </button>
                        
                        <button 
                            type="button" 
                            className="auth-google-btn" 
                            onClick={() => navigate('/seller/dashboard')}
                            style={{ justifyContent: 'center', marginTop: '12px' }}
                        >
                            Cancel
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreateProduct;
