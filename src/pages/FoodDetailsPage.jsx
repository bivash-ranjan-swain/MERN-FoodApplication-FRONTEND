import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const FoodDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [food, setFood] = useState(null);
  const [loading, setLoading] = useState(true);

  const getSingleFood = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8800/api/food/get-single/${id}`
      );

      setFood(response.data.food);
    } catch (error) {
      console.log(error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getSingleFood();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-2xl font-semibold">
        Loading...
      </div>
    );
  }

  if (!food) {
    return (
      <div className="flex justify-center items-center h-screen text-2xl font-semibold">
        Food Not Found
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen py-10 px-4">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">

        <div className="grid lg:grid-cols-2">

          {/* Image */}
          <div>
            <img
              src={food.image}
              alt={food.name}
              className="w-full h-[300px] sm:h-[450px] lg:h-full object-cover"
            />
          </div>

          {/* Details */}
          <div className="p-6 md:p-10 flex flex-col justify-center">

            <h1 className="text-3xl md:text-5xl font-bold text-gray-800">
              {food.name}
            </h1>

            <p className="mt-6 text-gray-600 leading-8 text-lg">
              {food.description}
            </p>

            <div className="mt-8 flex items-center gap-5 flex-wrap">

              <h2 className="text-4xl font-bold text-green-600">
                ₹{food.discoutPrice}
              </h2>

              <h3 className="text-2xl text-gray-400 line-through">
                ₹{food.actualPrice}
              </h3>

              <span className="bg-red-100 text-red-600 px-4 py-2 rounded-full font-semibold">
                Save ₹
                {Number(food.actualPrice) -
                  Number(food.discoutPrice)}
              </span>

            </div>

            <div className="mt-10 flex flex-col sm:flex-row gap-4">

              <button
                className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-lg font-semibold duration-300"
              >
                Order Now
              </button>

              <button
                onClick={() => navigate(-1)}
                className="border border-gray-400 hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold duration-300"
              >
                Back
              </button>

            </div>

            <div className="mt-10 border-t pt-6">

              <h3 className="text-xl font-bold mb-3">
                Product Information
              </h3>

              <div className="space-y-2 text-gray-600">

                <p>
                  <strong>Food Name :</strong> {food.name}
                </p>

                <p>
                  <strong>Original Price :</strong> ₹{food.actualPrice}
                </p>

                <p>
                  <strong>Offer Price :</strong> ₹{food.discoutPrice}
                </p>

                <p>
                  <strong>You Save :</strong> ₹
                  {Number(food.actualPrice) -
                    Number(food.discoutPrice)}
                </p>

              </div>

            </div>

          </div>

        </div>
      </div>
    </div>
  );
};

export default FoodDetailsPage;