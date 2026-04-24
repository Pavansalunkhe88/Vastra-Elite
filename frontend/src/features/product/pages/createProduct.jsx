import React, { useState } from 'react';
import { useProduct } from '../hook/useProduct';
import { useNavigate, Link } from "react-router";

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
        <div className="min-h-screen flex bg-[#FAFAFA] font-sans">
            
            {/* Left Panel */}
            <div className="hidden lg:flex w-1/3 bg-white flex-col justify-between p-16 border-r border-gray-100 relative overflow-hidden">
                 <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-5 grayscale mix-blend-multiply"></div>
                 
                 <div className="relative z-10">
                     <Link to="/" className="text-xl font-serif font-light tracking-[0.2em] text-gray-900">
                         VASTRA ELITE
                     </Link>
                 </div>
                 
                 <div className="relative z-10 space-y-6">
                     <span className="text-xs uppercase tracking-[0.2em] text-gray-400 font-medium">Boutique</span>
                     <h1 className="text-4xl font-serif text-gray-900 leading-[1.2] tracking-tight">
                         Expand Your <br/> <span className="italic font-light text-gray-400">Collection</span>
                     </h1>
                     <p className="text-gray-500 font-light leading-relaxed text-sm">
                         List new exclusive pieces to your elegant storefront. Showcase your premium luxury items to the world.
                     </p>
                 </div>
 
                 <div className="relative z-10">
                     <p className="text-xs uppercase tracking-[0.2em] text-gray-400 font-medium">Create Listing</p>
                 </div>
            </div>

            {/* Right Panel */}
            <div className="w-full lg:w-2/3 py-16 px-8 sm:px-16 lg:px-24 overflow-y-auto">
                <div className="w-full max-w-2xl mx-auto space-y-12">
                    
                    <div className="lg:hidden text-center mb-12">
                        <Link to="/" className="text-2xl font-serif font-light tracking-[0.2em] text-gray-900 inline-block">
                            VASTRA ELITE
                        </Link>
                    </div>

                    <div className="space-y-2 border-b border-gray-200 pb-6">
                        <h2 className="text-3xl font-serif tracking-wide text-gray-900">New Product</h2>
                        <p className="text-gray-500 font-light text-sm">Add a luxury item to your inventory.</p>
                    </div>

                    {error && (
                        <div className="bg-red-50 border border-red-100 text-red-600 px-4 py-3 text-sm flex items-center gap-3">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                            <span>{error}</span>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-8">
                        
                        <div className="space-y-2">
                            <label className="text-xs uppercase tracking-wider text-gray-500 font-medium ml-1">Product Title</label>
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                required
                                placeholder="Enter product title"
                                className="w-full bg-white border border-gray-200 px-4 py-3 focus:outline-none focus:border-gray-900 transition-colors font-light placeholder-gray-300"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs uppercase tracking-wider text-gray-500 font-medium ml-1">Description</label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                required
                                placeholder="Describe your product..."
                                className="w-full bg-white border border-gray-200 px-4 py-3 focus:outline-none focus:border-gray-900 transition-colors font-light placeholder-gray-300 min-h-[120px] resize-y"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs uppercase tracking-wider text-gray-500 font-medium ml-1">Price Amount (INR)</label>
                            <input
                                type="number"
                                name="priceAmount"
                                value={formData.priceAmount}
                                onChange={handleChange}
                                required
                                min="0"
                                step="0.01"
                                placeholder="e.g. 5000"
                                className="w-full bg-white border border-gray-200 px-4 py-3 focus:outline-none focus:border-gray-900 transition-colors font-light placeholder-gray-300"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs uppercase tracking-wider text-gray-500 font-medium ml-1">Product Images (up to 7)</label>
                            <div className="w-full bg-white border border-dashed border-gray-300 p-6 flex flex-col items-center justify-center hover:border-gray-900 transition-colors cursor-pointer relative">
                                <svg className="w-8 h-8 text-gray-400 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
                                <span className="text-sm text-gray-500 font-light">Click to upload or drag and drop</span>
                                <span className="text-xs text-gray-400 mt-1">PNG, JPG, JPEG</span>
                                <input
                                    type="file"
                                    name="images"
                                    onChange={handleFileChange}
                                    multiple
                                    accept="image/*"
                                    required
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                />
                                {files && files.length > 0 && (
                                    <div className="mt-4 pt-4 border-t border-gray-100 w-full text-center">
                                        <span className="text-sm font-medium text-gray-900">{files.length} file(s) selected</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="flex gap-4 pt-6">
                            <button 
                                type="button" 
                                onClick={() => navigate('/seller/dashboard')}
                                className="w-1/3 bg-white text-gray-900 border border-gray-200 uppercase tracking-[0.2em] text-xs font-medium py-4 hover:bg-gray-50 transition-colors"
                            >
                                Cancel
                            </button>
                            <button 
                                type="submit" 
                                disabled={loading}
                                className="w-2/3 bg-gray-900 text-white uppercase tracking-[0.2em] text-xs font-medium py-4 hover:bg-gray-800 transition-colors disabled:bg-gray-300"
                            >
                                {loading ? 'Processing...' : 'Publish Product'}
                            </button>
                        </div>
                        
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreateProduct;
