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
            await handleLogin({
                email: formData.email,
                password: formData.password
            });
            navigate("/");
        } catch (err) {
            // Error is already dispatched to Redux by useAuth
        }
    };

    return (
        <div style={styles.pageWrapper}>
            {/* Animated background orbs */}
            <div style={styles.orbOne}></div>
            <div style={styles.orbTwo}></div>
            <div style={styles.orbThree}></div>

            <div style={styles.container}>
                {/* Left Panel — Brand Side */}
                <div className="ve-left-panel" style={styles.leftPanel}>
                    <div style={styles.leftOverlay}></div>
                    <div style={styles.leftContent}>
                        <div style={styles.logoArea}>
                            <div style={styles.logoIcon}>VE</div>
                            <span style={styles.logoText}>Vastra Elite</span>
                        </div>

                        <div style={styles.heroText}>
                            <h1 style={styles.heroTitle}>
                                Welcome
                                <span style={styles.heroAccent}> Back</span>
                            </h1>
                            <p style={styles.heroSub}>
                                Sign in to explore the latest exclusive drops,
                                manage your collections, and continue your style journey.
                            </p>
                        </div>

                        {/* Decorative quote */}
                        <div style={styles.quoteSection}>
                            <div style={styles.quoteMark}>"</div>
                            <p style={styles.quoteText}>
                                Fashion is the armor to survive the reality of everyday life.
                            </p>
                            <p style={styles.quoteAuthor}>— Bill Cunningham</p>
                        </div>
                    </div>
                </div>

                {/* Right Panel — Form Side */}
                <div className="ve-right-panel" style={styles.rightPanel}>
                    {/* Mobile logo */}
                    <div className="ve-mobile-logo" style={styles.mobileLogo}>
                        <div style={styles.logoIcon}>VE</div>
                        <span style={styles.logoText}>Vastra Elite</span>
                    </div>

                    <div style={styles.formHeader}>
                        <h2 style={styles.formTitle}>Sign In</h2>
                        <p style={styles.formSubtitle}>Enter your credentials to access your account</p>
                    </div>

                    {/* Error display */}
                    {error && (
                        <div style={styles.errorBox}>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ff6b6b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="12" cy="12" r="10"></circle>
                                <line x1="15" y1="9" x2="9" y2="15"></line>
                                <line x1="9" y1="9" x2="15" y2="15"></line>
                            </svg>
                            <span>{error}</span>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} style={styles.form}>
                        {/* Email */}
                        <div style={styles.inputGroup}>
                            <label style={styles.label}>Email Address</label>
                            <div style={styles.inputWrapper}>
                                <svg style={styles.inputIcon} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                                    <polyline points="22,6 12,13 2,6"></polyline>
                                </svg>
                                <input
                                    className="ve-input"
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    style={styles.input}
                                    placeholder="your@email.com"
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div style={styles.inputGroup}>
                            <div style={styles.labelRow}>
                                <label style={styles.label}>Password</label>
                                <a href="#" className="ve-link" style={styles.forgotLink}>Forgot password?</a>
                            </div>
                            <div style={styles.inputWrapper}>
                                <svg style={styles.inputIcon} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                                    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                                </svg>
                                <input
                                    className="ve-input"
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                    style={styles.input}
                                    placeholder="Enter your password"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    style={styles.eyeBtn}
                                    aria-label="Toggle password visibility"
                                >
                                    {showPassword ? (
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                                            <line x1="1" y1="1" x2="23" y2="23"></line>
                                        </svg>
                                    ) : (
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                            <circle cx="12" cy="12" r="3"></circle>
                                        </svg>
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Divider */}
                        <div style={styles.dividerRow}>
                            <div style={styles.dividerLine}></div>
                        </div>

                        {/* Submit */}
                        <button
                            className="ve-submit"
                            type="submit"
                            disabled={loading}
                            style={{
                                ...styles.submitBtn,
                                ...(loading ? styles.submitBtnDisabled : {})
                            }}
                        >
                            {loading ? (
                                <div style={styles.spinner}></div>
                            ) : (
                                <>
                                    Sign In
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <line x1="5" y1="12" x2="19" y2="12"></line>
                                        <polyline points="12 5 19 12 12 19"></polyline>
                                    </svg>
                                </>
                            )}
                        </button>

                        <p style={styles.switchText}>
                            Don't have an account?{' '}
                            <Link to="/register" className="ve-link" style={styles.switchLink}>Create Account</Link>
                        </p>
                    </form>
                </div>
            </div>

            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Playfair+Display:wght@400;500;600;700&display=swap');
                @keyframes float1 { 0%,100%{transform:translate(0,0) scale(1)} 33%{transform:translate(30px,-50px) scale(1.1)} 66%{transform:translate(-20px,20px) scale(0.9)} }
                @keyframes float2 { 0%,100%{transform:translate(0,0) scale(1)} 33%{transform:translate(-40px,30px) scale(1.05)} 66%{transform:translate(25px,-40px) scale(0.95)} }
                @keyframes float3 { 0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(20px,30px) scale(1.08)} }
                @keyframes spin { to{transform:rotate(360deg)} }
                .ve-input:focus { border-color:#c9a84c !important; background:rgba(201,168,76,0.04) !important; box-shadow:0 0 0 3px rgba(201,168,76,0.1) !important; }
                .ve-input::placeholder { color:#6b7280; }
                .ve-submit:hover:not(:disabled) { transform:translateY(-2px); box-shadow:0 12px 40px rgba(201,168,76,0.35); }
                .ve-submit:active:not(:disabled) { transform:translateY(0); }
                .ve-link:hover { color:#e8d48b !important; }
                @media(min-width:1024px) { .ve-left-panel{display:flex !important} .ve-mobile-logo{display:none !important} }
                @media(max-width:640px) { .ve-right-panel{padding:28px 24px !important} }
            `}</style>
        </div>
    );
};

const styles = {
    pageWrapper: {
        minHeight: '100vh',
        background: '#09090b',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: "'Inter', sans-serif",
        padding: '16px',
        position: 'relative',
        overflow: 'hidden',
    },
    orbOne: {
        position: 'absolute',
        width: '600px',
        height: '600px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(201,168,76,0.08) 0%, transparent 70%)',
        top: '-200px',
        left: '-200px',
        animation: 'float1 20s ease-in-out infinite',
        pointerEvents: 'none',
    },
    orbTwo: {
        position: 'absolute',
        width: '500px',
        height: '500px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(201,168,76,0.06) 0%, transparent 70%)',
        bottom: '-150px',
        right: '-150px',
        animation: 'float2 25s ease-in-out infinite',
        pointerEvents: 'none',
    },
    orbThree: {
        position: 'absolute',
        width: '300px',
        height: '300px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(201,168,76,0.04) 0%, transparent 70%)',
        top: '40%',
        right: '30%',
        animation: 'float3 18s ease-in-out infinite',
        pointerEvents: 'none',
    },
    container: {
        display: 'flex',
        width: '100%',
        maxWidth: '1000px',
        minHeight: '580px',
        borderRadius: '24px',
        overflow: 'hidden',
        background: 'rgba(255,255,255, 0.02)',
        border: '1px solid rgba(255,255,255,0.06)',
        backdropFilter: 'blur(20px)',
        boxShadow: '0 25px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.03) inset',
        position: 'relative',
        zIndex: 1,
    },
    leftPanel: {
        flex: '1 1 45%',
        background: 'linear-gradient(160deg, #141414 0%, #0d0d0d 50%, #0a0a0a 100%)',
        position: 'relative',
        display: 'none',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '48px',
        overflow: 'hidden',
    },
    leftOverlay: {
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(135deg, rgba(201,168,76,0.03) 0%, transparent 50%, rgba(201,168,76,0.02) 100%)',
        pointerEvents: 'none',
    },
    leftContent: {
        position: 'relative',
        zIndex: 2,
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        justifyContent: 'space-between',
    },
    logoArea: {
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
    },
    logoIcon: {
        width: '40px',
        height: '40px',
        borderRadius: '10px',
        background: 'linear-gradient(135deg, #c9a84c, #e8d48b)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '14px',
        fontWeight: '800',
        color: '#09090b',
        letterSpacing: '-0.5px',
    },
    logoText: {
        fontSize: '18px',
        fontWeight: '700',
        color: '#fafafa',
        letterSpacing: '-0.3px',
    },
    heroText: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
    },
    heroTitle: {
        fontFamily: "'Playfair Display', serif",
        fontSize: '48px',
        fontWeight: '700',
        color: '#fafafa',
        lineHeight: '1.15',
        marginBottom: '20px',
        letterSpacing: '-0.5px',
    },
    heroAccent: {
        background: 'linear-gradient(135deg, #c9a84c, #e8d48b)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
    },
    heroSub: {
        fontSize: '15px',
        color: '#a1a1aa',
        lineHeight: '1.7',
        maxWidth: '360px',
    },
    quoteSection: {
        paddingTop: '32px',
        borderTop: '1px solid rgba(255,255,255,0.06)',
    },
    quoteMark: {
        fontFamily: "'Playfair Display', serif",
        fontSize: '48px',
        color: '#c9a84c',
        lineHeight: '0.5',
        marginBottom: '12px',
    },
    quoteText: {
        fontSize: '14px',
        color: '#a1a1aa',
        lineHeight: '1.6',
        fontStyle: 'italic',
        marginBottom: '8px',
    },
    quoteAuthor: {
        fontSize: '12px',
        color: '#52525b',
        letterSpacing: '0.05em',
    },
    rightPanel: {
        flex: '1 1 55%',
        padding: '48px 48px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        overflowY: 'auto',
    },
    mobileLogo: {
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        marginBottom: '40px',
    },
    formHeader: {
        marginBottom: '32px',
    },
    formTitle: {
        fontFamily: "'Playfair Display', serif",
        fontSize: '32px',
        fontWeight: '700',
        color: '#fafafa',
        marginBottom: '8px',
        letterSpacing: '-0.3px',
    },
    formSubtitle: {
        fontSize: '14px',
        color: '#71717a',
    },
    errorBox: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        padding: '12px 16px',
        background: 'rgba(239,68,68,0.08)',
        border: '1px solid rgba(239,68,68,0.2)',
        borderRadius: '12px',
        marginBottom: '24px',
        fontSize: '13px',
        color: '#fca5a5',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
    },
    inputGroup: {
        display: 'flex',
        flexDirection: 'column',
        gap: '6px',
    },
    label: {
        fontSize: '13px',
        fontWeight: '500',
        color: '#a1a1aa',
        letterSpacing: '0.02em',
    },
    labelRow: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    forgotLink: {
        fontSize: '12px',
        color: '#71717a',
        textDecoration: 'none',
        transition: 'color 0.2s',
    },
    inputWrapper: {
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
    },
    inputIcon: {
        position: 'absolute',
        left: '14px',
        color: '#52525b',
        pointerEvents: 'none',
    },
    input: {
        width: '100%',
        padding: '14px 14px 14px 44px',
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: '12px',
        color: '#fafafa',
        fontSize: '14px',
        outline: 'none',
        transition: 'all 0.25s ease',
        fontFamily: "'Inter', sans-serif",
        boxSizing: 'border-box',
    },
    eyeBtn: {
        position: 'absolute',
        right: '14px',
        background: 'none',
        border: 'none',
        color: '#52525b',
        cursor: 'pointer',
        padding: '4px',
        display: 'flex',
        alignItems: 'center',
        transition: 'color 0.2s',
    },
    dividerRow: {
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
    },
    dividerLine: {
        flex: 1,
        height: '1px',
        background: 'rgba(255,255,255,0.06)',
    },
    submitBtn: {
        width: '100%',
        padding: '14px 24px',
        background: 'linear-gradient(135deg, #c9a84c, #b8953f)',
        color: '#09090b',
        border: 'none',
        borderRadius: '12px',
        fontSize: '15px',
        fontWeight: '600',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        fontFamily: "'Inter', sans-serif",
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        letterSpacing: '0.02em',
    },
    submitBtnDisabled: {
        opacity: 0.7,
        cursor: 'not-allowed',
    },
    spinner: {
        width: '20px',
        height: '20px',
        border: '2px solid rgba(9,9,11,0.2)',
        borderTopColor: '#09090b',
        borderRadius: '50%',
        animation: 'spin 0.6s linear infinite',
    },
    switchText: {
        textAlign: 'center',
        fontSize: '14px',
        color: '#71717a',
    },
    switchLink: {
        color: '#c9a84c',
        textDecoration: 'none',
        fontWeight: '500',
        transition: 'color 0.2s',
    },
};

export default Login;