import { CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const OrderSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className="fixed inset-0 z-[9999] bg-gradient-to-br from-green-50 to-white flex justify-center items-center px-4">

      <div className="bg-white shadow-2xl rounded-3xl p-10 max-w-lg w-full text-center relative overflow-hidden">

        {/* Animated Background */}
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-green-100 rounded-full animate-ping opacity-30"></div>
        <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-green-200 rounded-full animate-pulse opacity-30"></div>

        {/* Success Icon */}
        <div className="flex justify-center">
          <div className="bg-green-100 rounded-full p-6 animate-bounce">
            <CheckCircle size={90} className="text-green-600" />
          </div>
        </div>

        {/* Heading */}
        <h1 className="text-4xl font-bold text-gray-800 mt-8">
          Order Successful!
        </h1>

        <p className="text-gray-500 mt-4 leading-7">
          Thank you for your order. 🎉 <br />
          Your food order has been placed successfully and will be prepared shortly.
        </p>

        {/* Order Info */}
        <div className="mt-8 bg-green-50 rounded-xl p-5">
          <h2 className="text-lg font-semibold text-green-700">
            Estimated Delivery
          </h2>

          <p className="text-3xl font-bold text-green-600 mt-2">
            25 - 35 Min
          </p>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mt-10">

          <button
            onClick={() => navigate("/our-foods")}
            className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl font-semibold transition duration-300"
          >
            Continue Shopping
          </button>

          <button
            onClick={() => navigate("/our-foods")}
            className="flex-1 border-2 border-gray-300 hover:bg-gray-100 py-3 rounded-xl font-semibold transition duration-300"
          >
            Go Back
          </button>

        </div>

      </div>
    </div>
  );
};

export default OrderSuccess;