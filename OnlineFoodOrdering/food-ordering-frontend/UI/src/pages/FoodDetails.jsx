import { useContext, useEffect, useState } from 'react';
import { BsCartFill } from 'react-icons/bs';
import { useNavigate, useParams } from 'react-router-dom'
import { getFood } from '../service/FoodService';
import { toast } from 'react-toastify';
import { StoreContext } from '../context/StoreContext';

export default function FoodDetails() {

  const { id } = useParams();
  const [food, setFood] = useState({});
  const {increaseQuantity} = useContext(StoreContext);
  const navigate = useNavigate();


  useEffect(() => {

    const loadData = async () => {
      try {
        const foodData = await getFood(id);
        console.log(foodData);

        if (foodData === null) {
          toast.error("No food found")
        }
        else {
          setFood(foodData)
        }
      } catch (error) {
        toast.error("Error Occured while fetching food")
      }
    }
    loadData();
  }, [id])

  function addToCart(foodId){
    increaseQuantity(foodId)
    navigate('/cart')

  }

  return (


    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-10">
          {/* Image */}
          <div className="w-full md:w-1/2">
            <img
              className="w-full h-auto mb-6 md:mb-0 object-cover rounded"
              src={`http://localhost:8080/uploads/images/${food.imgUrl}`}
              alt="Product"
            />
          </div>

          {/* Product Info */}
          <div className="w-full md:w-1/2">
            <div className="text-sm text-gray-500 mb-2">Category: <span className='bg-yellow-100 text-yellow-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded-sm dark:bg-yellow-900 dark:text-yellow-300'>{food.category}</span></div>
            <h1 className="text-4xl font-bold mb-4">{food.name}</h1>
            <div className="text-2xl mb-6">
              <span className="text-green-600 font-semibold">&#8377; {(food.price)?.toFixed(2)}</span>
            </div>
            <p className="text-lg text-gray-700 mb-6">
              {food.description}
            </p>

            {/* Quantity & Button */}
            <div className="flex items-center gap-4">
              <button
                className="flex items-center gap-2 border border-gray-800 text-gray-800 hover:bg-gray-800 hover:text-white px-5 py-2 rounded transition cursor-pointer"
                type="button"
                onClick={() => addToCart(food.id)}
              >
                <BsCartFill />
                Add to cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>


  )
}
