import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Navbar from "../layout/Navbar";

const OurFoods = () => {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let ignore = false;

    const getAllFoods = async () => {
      try {
        const response = await axios.get("http://localhost:8800/api/food/all-foods", {
          withCredentials: true,
        });
        if (!ignore) {
          setFoods(response.data.foods);
        }
      } catch (err) {
        if (!ignore) {
          console.log(err.response?.data || err.message);
          setError("Failed to load foods. Please try again later.");
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    };

    getAllFoods();

    return () => {
      ignore = true;
    };
  }, []);

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="flex justify-center items-center h-screen text-xl font-semibold">
          Loading Foods...
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Navbar />
        <div className="flex justify-center items-center h-screen text-xl font-semibold text-red-500">
          {error}
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <section className="bg-gray-100 min-h-screen py-12 px-5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold text-gray-800">Our Delicious Foods</h1>
            <p className="text-gray-500 mt-3">
              Choose your favourite food and enjoy the best taste.
            </p>
          </div>

          {foods.length === 0 ? (
            <p className="text-center text-gray-500">No food items available right now.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {foods.map((food) => (
                <div
                  key={food._id}
                  className="bg-white rounded-2xl shadow-md hover:shadow-xl duration-300 overflow-hidden"
                >
                  <img
                    src={food.image}
                    alt={food.name}
                    className="w-full h-56 object-cover"
                  />

                  <div className="p-5">
                    <h2 className="text-2xl font-bold text-gray-800">{food.name}</h2>
                    <p className="text-gray-500 text-sm mt-2 line-clamp-3">
                      {food.description}
                    </p>

                    <div className="flex items-center justify-between mt-5">
                      <div>
                        <p className="text-gray-400 line-through">₹{food.actualPrice}</p>
                        <p className="text-green-600 text-2xl font-bold">
                          ₹{food.discountPrice}
                        </p>
                      </div>

                      <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm font-semibold">
                        Save ₹{Number(food.actualPrice) - Number(food.discountPrice)}
                      </span>
                    </div>

                    <Link to={`/details/${food._id}`} className="block mt-6">
                      <button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-semibold duration-300">
                        View Details
                      </button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default OurFoods;