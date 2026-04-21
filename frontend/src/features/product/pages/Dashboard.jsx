import React,{useEffect} from 'react'
import { useProduct } from '../hook/useProduct';
import { useSelector } from 'react-redux';
import { Link } from 'react-router';
import '../styles/Dashboard.css';
import '../../auth/styles/Auth.css'; // Just in case we want to reuse the orb backgrounds

function Dashboard() {

    const {handleGetSellerProducts} = useProduct();
    const sellerProducts = useSelector((state)=>state.product.sellerProducts);

    useEffect(()=>{
        handleGetSellerProducts();
    },[])

  return (
    <div className="auth-page-wrapper" style={{alignItems: 'flex-start'}}>
      {/* Animated background orbs */}
      <div className="auth-orb orb-one"></div>
      <div className="auth-orb orb-two"></div>
      <div className="auth-orb orb-three"></div>

      <div className="dashboard-wrapper" style={{background: 'transparent'}}>
        <div className="dashboard-header">
          <div className="dashboard-title-area">
            <h1 className="dashboard-title">Seller Dashboard</h1>
            <p className="dashboard-subtitle">Manage your luxury product listings</p>
          </div>
          <Link to="/seller/create-product" className="dashboard-add-btn">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            Add New Product
          </Link>
        </div>

        <div className="products-container">
          <div className="products-grid">
            {sellerProducts && sellerProducts.length > 0 ? (
              sellerProducts.map((product) => (
                <div key={product._id} className="product-card">
                  <div className="product-image-container">
                    {product.image && product.image.length > 0 ? (
                      <img 
                        src={product.image[0].url} 
                        alt={product.title} 
                        className="product-image" 
                      />
                    ) : (
                      <div className="product-no-image">
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                          <circle cx="8.5" cy="8.5" r="1.5"></circle>
                          <polyline points="21 15 16 10 5 21"></polyline>
                        </svg>
                        <span style={{marginTop: '10px', fontSize: '0.9rem'}}>No Image</span>
                      </div>
                    )}
                  </div>
                  <div className="product-details">
                    <h3 className="product-title">{product.title}</h3>
                    <p className="product-description">{product.description}</p>
                    <div className="product-footer">
                      <div className="product-price">
                        {product.price?.amount.toLocaleString(undefined, {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2
                        })}
                        <span className="product-currency">{product.price?.currency || 'INR'}</span>
                      </div>
                      {/* <button className="auth-google-btn" style={{padding: '8px 16px', background: 'transparent', border: '1px solid rgba(255,255,255,0.2)', color: '#fff'}}>
                        Edit
                      </button> */}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="empty-state">
                <svg className="empty-state-icon" width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path>
                  <line x1="7" y1="7" x2="7.01" y2="7"></line>
                </svg>
                <h3>No Products Found</h3>
                <p>You haven't listed any luxury items yet.</p>
                <Link to="/seller/create-product" className="dashboard-add-btn" style={{display: 'inline-flex'}}>
                  Start Selling
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
