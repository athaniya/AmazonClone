import { useContext} from "react";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import { FaSquareMinus, FaSquarePlus } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { StoreContext } from "../context/StoreContext";


export default function FoodItem({ id, name, description, price, imgUrl }) {

  const {foodQuantity , increaseQuantity , decreaseQuantity} = useContext(StoreContext);
  
  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 w-full flex flex-col ">
      <img
        className="w-full h-48 object-cover rounded-t-xl"
        src={`http://localhost:8080/uploads/images/${imgUrl}`}
        alt={name}
      />
      <div className="p-4 flex flex-col justify-between flex-grow">
        <div>
          <h5 className="text-lg font-semibold text-gray-800">{name}</h5>
          <p className="text-gray-600 text-sm mt-1 line-clamp-2">{description}</p>
        </div>

        <div className="flex justify-between items-center mt-4">
          <span className="text-lg font-semibold text-blue-600">&#8377;{price}</span>
          <div className="flex items-center text-yellow-400 space-x-1">
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStarHalfAlt />
            <span className="text-gray-500 text-sm ml-1">(4.5)</span>
          </div>
        </div>
      </div>

      <div className="px-4 py-3 border-t flex justify-between items-center bg-gray-200">

        <Link className="text-white bg-blue-600 hover:bg-blue-700 font-medium text-sm px-4 py-2 rounded" to={`/food/${id}`}>
          View Food
        </Link>
        <div>

          {
            foodQuantity[`${id}`] > 0 ? (
              <>
                <button className="text-red-600 hover:text-red-500 text-2xl" onClick={() => decreaseQuantity(id)}>
                  <FaSquareMinus />
                </button>
                <span className="align-top text-l mx-2">{foodQuantity[`${id}`]}</span>
              </>)
              : ''
          }
          <button className="text-green-600 hover:text-green-500 text-2xl" onClick={() => increaseQuantity(id)}>
            <FaSquarePlus />
          </button>
        </div>

      </div>
    </div>
  );
}

