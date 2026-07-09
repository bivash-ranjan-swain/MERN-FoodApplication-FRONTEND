import { useEffect, useState } from "react";
import axios from "axios";
import "./OurMenu.css";

const OurMenu = () => {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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
                  <p>₹{food?.price ?? 0}</p>

                  <button type="button">Add</button>
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