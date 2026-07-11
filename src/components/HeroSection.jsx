import { useEffect, useState } from "react";
import axios from "axios";
// import "./OurMenu.css";

const OurMenu = () => {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  
  // State for managing cart items and dropdown toggle
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    const getFoods = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8800/api/food/all-foods"
        );

        console.log("Foods Response:", res.data);

        if (Array.isArray(res.data)) {
          setFoods(res.data);
        } else if (Array.isArray(res.data.foods)) {
          setFoods(res.data.foods);
        } else if (Array.isArray(res.data.data)) {
          setFoods(res.data.data);
        } else {
          setFoods([]);
        }
      } catch (err) {
        console.error("Error fetching foods:", err);
        setError("Failed to load foods");
        setFoods([]);
      } finally {
        setLoading(false);
      }
    };

    getFoods();
  }, []);

  // Add an item to the cart
  const addToCart = (foodItem) => {
    setCart((prevCart) => [...prevCart, foodItem]);
  };

  // Remove a specific item from the cart using its array index
  const removeFromCart = (indexToRemove) => {
    setCart((prevCart) => prevCart.filter((_, index) => index !== indexToRemove));
  };

  if (loading) {
    return (
      <section className="menu-section">
        <h2>Loading menu...</h2>
      </section>
    );
  }

  if (error) {
    return (
      <section className="menu-section">
        <h2>{error}</h2>
      </section>
    );
  }

  return (
    <section className="menu-section">
      
      {/* Top Header Cart Button & Dropdown Container */}
      <div className="cart-header-container">
        <button className="cart-btn" onClick={() => setIsCartOpen(!isCartOpen)}>
          🛒 Cart
          {cart.length > 0 && <span className="cart-count">{cart.length}</span>}
        </button>

        {/* Small Square Dropdown Container */}
        {isCartOpen && (
          <div className="cart-dropdown">
            <h4>Your Items ({cart.length})</h4>
            <hr />
            {cart.length === 0 ? (
              <p className="empty-cart-text">Your cart is empty</p>
            ) : (
              <div className="cart-items-list">
                {cart.map((item, index) => (
                  <div className="cart-dropdown-item" key={item._id || index}>
                    <img 
                      src={item.image || "https://via.placeholder.com/50"} 
                      alt={item.name} 
                      className="cart-item-thumb"
                    />
                    <div className="cart-item-details">
                      <p className="cart-item-name">{item.name}</p>
                      <p className="cart-item-price">₹{item.discountPrice ?? item.actualPrice ?? 0}</p>
                    </div>
                    <button 
                      className="cart-item-delete-btn" 
                      onClick={() => removeFromCart(index)}
                      title="Remove item"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            )}
            {cart.length > 0 && (
              <button className="checkout-btn">Proceed to Checkout</button>
            )}
          </div>
        )}
      </div>

      <div className="menu-heading">
        <p>Fresh • Delicious • Made Daily</p>
        <h1>Our Menu</h1>
        <span>
          Explore our handcrafted dishes made with fresh ingredients and
          authentic flavors.
        </span>
      </div>

      <div className="menu-grid">
        {foods.length > 0 ? (
          foods.map((food, index) => (
            <div
              className="menu-card"
              key={food?._id || index}
            >
              <div className="menu-image">
                <img
                  src={
                    food?.image ||
                    "https://via.placeholder.com/300x200?text=Food"
                  }
                  alt={food?.name || "Food Item"}
                  onError={(e) => {
                    e.target.src =
                      "https://via.placeholder.com/300x200?text=Food";
                  }}
                />
              </div>

              <div className="menu-content">
                <h3>{food?.name || "Unnamed Food"}</h3>

                {food?.description && (
                  <p className="menu-description">
                    {food.description}
                  </p>
                )}

                <div className="menu-bottom">
                  <div className="price-wrapper">
                    <p className="actualPrice">₹{food?.actualPrice ?? 0}</p>
                    <p className="disc-price">₹{food?.discountPrice ?? 0}</p>
                  </div>

                  <button 
                    type="button" 
                    className="add-to-cart-btn"
                    onClick={() => addToCart(food)}
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="no-foods">
            <h3>No food items available</h3>
          </div>
        )}
      </div>
    </section>
  );
};

export default OurMenu;