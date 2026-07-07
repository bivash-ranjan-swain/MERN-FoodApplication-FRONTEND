import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const OurFoods = () => {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);

  const getAllFoods = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8800/api/food/all"
      );

      setFoods(response.data.foods);
    } catch (error) {
      console.log(error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllFoods();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-xl font-semibold">
        Loading Foods...
      </div>
    );
  }

  return (
    <section className="bg-gray-100 min-h-screen py-12 px-5">
      <div className="max-w-7xl mx-auto">

        {/* Heading */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-800">
            Our Delicious Foods
          </h1>
          <p className="text-gray-500 mt-3">
            Choose your favourite food and enjoy the best taste.
          </p>
        </div>

        {/* Food Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">

          {foods.map((food) => (
            <div
              key={food._id}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl duration-300 overflow-hidden"
            >
              {/* Image */}
              <img
                src={food.image}
                alt={food.name}
                className="w-full h-56 object-cover"
              />

              {/* Content */}
              <div className="p-5">

                <h2 className="text-2xl font-bold text-gray-800">
                  {food.name}
                </h2>

                <p className="text-gray-500 text-sm mt-2 line-clamp-3">
                  {food.description}
                </p>

                <div className="flex items-center justify-between mt-5">
                  <div>
                    <p className="text-gray-400 line-through">
                      ₹{food.actualPrice}
                    </p>

                    <p className="text-green-600 text-2xl font-bold">
                      ₹{food.discoutPrice}
                    </p>
                  </div>

                  <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm font-semibold">
                    Save ₹
                    {Number(food.actualPrice) -
                      Number(food.discoutPrice)}
                  </span>
                </div>

                <Link
                  to={`/details/${food._id}`}
                  className="block mt-6"
                >
                  <button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-semibold duration-300">
                    View Details
                  </button>
                </Link>

              </div>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
};

export default OurFoods;