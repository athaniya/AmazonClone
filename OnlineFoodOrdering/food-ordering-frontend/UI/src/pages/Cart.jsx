import { useContext } from "react";
import { FaTrash } from "react-icons/fa";
import { FaCircleMinus, FaCirclePlus } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { StoreContext } from "../context/StoreContext";
import { calculateCartTotals } from "../utils/cartUtils";

export default function Cart() {
  const {
    foodList,
    increaseQuantity,
    decreaseQuantity,
    foodQuantity,
    removeQuantity
  } = useContext(StoreContext);

  const cartFood = foodList.filter(food => foodQuantity[`${food.id}`] > 0);
  const navigate = useNavigate();

  const {subTotal,tax,total,shipping} = calculateCartTotals(cartFood,foodQuantity);

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-10 text-gray-800">Your Shopping Cart</h1>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Cart Items Section */}
        <div className="w-full lg:w-2/3">
          <div className="bg-white rounded shadow p-6 mb-6">
            {cartFood.length > 0 ? (
              cartFood.map(food => (
                <div key={food.id}>
                  <div className="flex items-center mb-6">
                    <img
                      src={`http://localhost:8080/uploads/images/${food.imgUrl}`}
                      alt={food.name}
                      className="w-24 h-auto rounded"
                    />
                    <div className="ml-6 flex-1">
                      <h5 className="text-lg font-semibold">{food.name}</h5>
                      <p className="text-gray-500">Category: {food.category}</p>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-2">
                      <button
                        className="p-2 bg-red-100 text-red-500 rounded-full hover:bg-red-200 transition cursor-pointer"
                        onClick={() => decreaseQuantity(food.id)}
                      >
                        <FaCircleMinus className="w-4 h-4" />
                      </button>
                      <input
                        type="text"
                        value={foodQuantity[food.id]}
                        readOnly
                        className="w-12 text-center border border-gray-300 rounded text-sm py-1"
                      />
                      <button
                        className="p-2 bg-green-100 text-green-500 rounded-full hover:bg-green-200 transition cursor-pointer"
                        onClick={() => increaseQuantity(food.id)}
                      >
                        <FaCirclePlus className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Price and Delete */}
                    <div className="ml-6 text-right">
                      <p className="font-bold">&#8377; {(food.price * foodQuantity[food.id]).toFixed(2)}</p>
                      <button
                        className="inline-flex items-center mt-5 justify-center p-2 border border-red-500 text-red-500 rounded hover:bg-red-100 hover:text-red-700 transition cursor-pointer"
                        aria-label="Delete item"
                        onClick={() => removeQuantity(food.id)}
                      >
                        <FaTrash className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <hr className="my-4" />
                </div>
              ))
            ) : (
              <h4>No food added in cart</h4>
            )}

            <div className="text-left mt-4">
              <Link
                to="/"
                className="inline-flex items-center px-4 py-2 border border-blue-600 text-blue-600 rounded hover:bg-blue-50 transition"
              >
                <span className="mr-2">←</span>Continue Shopping
              </Link>
            </div>
          </div>
        </div>

        {/* Order Summary Section */}
        <div className="w-full lg:w-1/3">
          <div className="bg-gray-100 rounded-lg p-6 mb-6 shadow">
            <h5 className="text-lg font-semibold mb-4">Order Summary</h5>

            <div className="flex justify-between mb-2">
              <span>Subtotal</span>
              <span>&#8377; {subTotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Shipping</span>
              <span>&#8377; {shipping.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Tax (10%)</span>
              <span>&#8377; {tax.toFixed(2)}</span>
            </div>
            <hr className="my-4" />
            <div className="flex justify-between font-bold text-lg mb-4">
              <span>Total</span>
              <span>&#8377; {total.toFixed(2)}</span>
            </div>

            <button
              disabled={cartFood.length === 0}
              className={`w-full py-2 rounded text-white transition cursor-pointer
              ${cartFood.length === 0 ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
              onClick={() => navigate('/order')}
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
