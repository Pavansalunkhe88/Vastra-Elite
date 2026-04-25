import React, { useEffect } from "react";
import { useCart } from "../hook/useCart";
import "../styles/Cart.css";
import { useRazorpay } from "react-razorpay";
import { use } from "react";
import { useSelector } from "react-redux";

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

  useEffect(() => {
    handleGetCart();
  }, []);

  const subtotal = items.reduce(
    (acc, item) => acc + item.productId.price.amount * item.quantity,
    0,
  );

  async function handleCheckout() {
    try {
      const order = await handleCreateOrder();
      // Redirect to payment page with order details
      console.log(order);

      const options = {

        key: "rzp_test_ShPLeL6jvXEWJb",
        amount: order.amount, // Amount in paise
        currency: order.currency,
        name: "Vastra Elite",
        description: "Order Transaction",
        order_id: order.id, // Generate order_id on server
        handler: (response) => {
          console.log(response);
          alert("Payment Successful!");
        },
        prefill: {
          name: user?.fullname,
          email: user?.email,
          contact: user?.contact,
        },
        theme: {
          color: "#F37254",
        },
      };

      const razorpayInstance = new Razorpay(options);
      razorpayInstance.open();
    } catch (err) {
      console.error("Checkout error:", err);
      alert("Failed to create order. Please try again.");
    }
  }

  if (loading && items.length === 0)
    return <div className="cart-container">Loading...</div>;

  return (
    <div className="cart-container">
      <h1 className="cart-title">Your Cart</h1>

      {items.length === 0 ? (
        <div className="empty-cart">
          <div className="empty-cart-icon">🛒</div>
          <h2>Your cart is empty</h2>
          <p>Looks like you haven't added anything yet.</p>
          <button
            className="checkout-btn"
            style={{ width: "auto", padding: "1rem 2rem" }}
            onClick={() => (window.location.href = "/")}
          >
            Start Shopping
          </button>
        </div>
      ) : (
        <div className="cart-layout">
          <div className="cart-items">
            {items.map((item) => (
              <div key={item.productId._id} className="cart-item">
                <img
                  src={
                    item.productId.image[0]?.url ||
                    "https://via.placeholder.com/200"
                  }
                  alt={item.productId.title}
                  className="cart-item-image"
                />
                <div className="cart-item-details">
                  <div>
                    <h3 className="cart-item-title">{item.productId.title}</h3>
                    <p className="cart-item-price">
                      ₹{item.productId.price.amount}
                    </p>
                  </div>
                  <div className="quantity-controls">
                    <button
                      className="quantity-btn"
                      onClick={() =>
                        handleUpdateQuantity(
                          item.productId._id,
                          item.quantity - 1,
                        )
                      }
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      className="quantity-btn"
                      onClick={() =>
                        handleUpdateQuantity(
                          item.productId._id,
                          item.quantity + 1,
                        )
                      }
                    >
                      +
                    </button>
                  </div>
                  <button
                    className="remove-btn"
                    onClick={() => handleRemoveFromCart(item.productId._id)}
                  >
                    Remove item
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h2 className="summary-title">Order Summary</h2>
            <div className="summary-row">
              <span>Subtotal</span>
              <span>₹{subtotal}</span>
            </div>
            <div className="summary-row">
              <span>Shipping</span>
              <span>FREE</span>
            </div>
            <div className="summary-total">
              <span>Total</span>
              <span>₹{subtotal}</span>
            </div>
            <button className="checkout-btn" onClick={handleCheckout}>
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CartPage;
