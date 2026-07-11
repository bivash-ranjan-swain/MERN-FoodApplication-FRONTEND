import { useState, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../layout/Navbar.jsx";
import "./CheckOutPage.css";

const DELIVERY_FEE = 40;

/** @typedef {{ cart: any[], total: number }} CheckoutState */

const Checkout = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  /** @type {CheckoutState} */
  const checkoutState = state || { cart: [], total: 0 };

  // Memoized so this doesn't create a brand-new [] reference on every render
  const cart = useMemo(() => checkoutState.cart || [], [checkoutState.cart]);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    notes: "",
  });
  const [payment, setPayment] = useState("cod");
  const [placing, setPlacing] = useState(false);
  const [order, setOrder] = useState(null); // holds ticket info once confirmed

  const itemLine = (item) => item.discountPrice ?? item.actualPrice ?? 0;

  const subtotal = useMemo(
    () => cart.reduce((sum, item) => sum + itemLine(item), 0),
    [cart]
  );
  const total = cart.length > 0 ? subtotal + DELIVERY_FEE : 0;

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const isFormValid = form.name.trim() && form.phone.trim() && form.address.trim();

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    if (!isFormValid || cart.length === 0 || placing) return;

    setPlacing(true);

    // Simulated order submission — swap for a real POST to your backend
    setTimeout(() => {
      const ticketNumber = Math.floor(100 + Math.random() * 900);
      setOrder({
        ticketNumber,
        placedAt: new Date(),
        total,
      });
      setPlacing(false);
    }, 900);
  };

  // Empty cart guard
  if (cart.length === 0 && !order) {
    return (
      <>
        <Navbar />
        <section className="checkout-page">
          <div className="empty-ticket">
            <p className="eyebrow">Order Ticket</p>
            <h2>Nothing on the ticket yet</h2>
            <p>Add a few dishes from the menu before checking out.</p>
            <button className="ghost-btn" onClick={() => navigate("/explore-menu")}>
              Back to Menu
            </button>
          </div>
        </section>
      </>
    );
  }

  // Confirmation state
  if (order) {
    return (
      <>
        <Navbar />
        <section className="checkout-page">
          <div className="receipt confirmed">
            <div className="stamp">Fired</div>
            <p className="eyebrow">Order Ticket #{order.ticketNumber}</p>
            <h2>Sent to the kitchen</h2>
            <p className="confirm-sub">
              {form.name}, your order is confirmed and on its way to prep.
            </p>
            <div className="receipt-divider" />
            <div className="receipt-row">
              <span>Placed</span>
              <span>
                {order.placedAt.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </div>
            <div className="receipt-row">
              <span>Deliver to</span>
              <span>{form.address}</span>
            </div>
            <div className="receipt-row total-row">
              <span>Total charged</span>
              <span>₹{order.total}</span>
            </div>
            <button className="primary-btn" onClick={() => navigate("/menu")}>
              Order Something Else
            </button>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <section className="checkout-page">
        <div className="checkout-grid">
          {/* Delivery details form */}
          <form className="details-form" onSubmit={handlePlaceOrder}>
            <p className="eyebrow">Step 1</p>
            <h2>Where's it heading?</h2>

            <label>
              Full name
              <input
                type="text"
                name="name"
                placeholder="Your name"
                value={form.name}
                onChange={handleChange}
                required
              />
            </label>

            <label>
              Phone number
              <input
                type="tel"
                name="phone"
                placeholder="10-digit mobile number"
                value={form.phone}
                onChange={handleChange}
                required
              />
            </label>

            <label>
              Delivery address
              <textarea
                name="address"
                placeholder="Flat, street, landmark, city"
                value={form.address}
                onChange={handleChange}
                rows={3}
                required
              />
            </label>

            <label>
              Notes for the kitchen (optional)
              <textarea
                name="notes"
                placeholder="Less spicy, no onions, ring the bell..."
                value={form.notes}
                onChange={handleChange}
                rows={2}
              />
            </label>

            <p className="eyebrow">Step 2</p>
            <h2>How will you pay?</h2>

            <div className="payment-options">
              <label className={`payment-option ${payment === "cod" ? "active" : ""}`}>
                <input
                  type="radio"
                  name="payment"
                  value="cod"
                  checked={payment === "cod"}
                  onChange={() => setPayment("cod")}
                />
                Cash on Delivery
              </label>
              <label className={`payment-option ${payment === "upi" ? "active" : ""}`}>
                <input
                  type="radio"
                  name="payment"
                  value="upi"
                  checked={payment === "upi"}
                  onChange={() => setPayment("upi")}
                />
                UPI
              </label>
              <label className={`payment-option ${payment === "card" ? "active" : ""}`}>
                <input
                  type="radio"
                  name="payment"
                  value="card"
                  checked={payment === "card"}
                  onChange={() => setPayment("card")}
                />
                Card
              </label>
            </div>

            <button
              type="submit"
              className="primary-btn submit-btn"
              disabled={!isFormValid || placing}
            >
              {placing ? "Sending to kitchen..." : `Send to Kitchen · ₹${total}`}
            </button>
          </form>

          {/* Order ticket / receipt summary */}
          <aside className="receipt">
            <p className="eyebrow">Order Ticket</p>
            <h2>Your Items</h2>

            <div className="receipt-items">
              {cart.map((item, index) => (
                <div className="receipt-item" key={item._id || index}>
                  <span className="receipt-item-name">{item.name}</span>
                  <span className="receipt-item-price">₹{itemLine(item)}</span>
                </div>
              ))}
            </div>

            <div className="receipt-divider" />

            <div className="receipt-row">
              <span>Subtotal</span>
              <span>₹{subtotal}</span>
            </div>
            <div className="receipt-row">
              <span>Delivery fee</span>
              <span>₹{DELIVERY_FEE}</span>
            </div>
            <div className="receipt-row total-row">
              <span>Total</span>
              <span>₹{total}</span>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
};

export default Checkout;