import  { useEffect, useState } from 'react';
import { getAllFood , deleteFood } from '../service/FoodService';
import { toast } from 'react-toastify';

const ShowAllFood = () => {
  // Dummy data for food items
  const [foodItems, setFoodItems] = useState(null);

  useEffect(() =>{
    async function loadData(){
      try{
        const foodData = await getAllFood();
        if(foodData !== null){
          setFoodItems(foodData);
        }
        else{
          toast.error("Error fetching food detail")
        }
      }catch(e){
        toast.error("Error fetching food detail")
      }
    }
    loadData();
  },[])

  const handleEdit = (id) => {
    console.log("Editing food with id:", id);
  };

  const handleDelete = async (id) => {
    try {
      const status = await deleteFood(id);
      console.log("got status " + status);
      
      if(status === 204){
        toast.success("Food deleted successfully");
      }else{
        toast.error("Some error occurred while deleting food");
      }
    } catch (error) {
      console.log(error);
      
      toast.error("Some error occurred while deleting food");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-800 text-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold text-center mb-6">Show All Food</h2>
      <div className="space-y-4">
        { 
        
        foodItems === null ? <h3 className='text-red-500 flex font-bold align-middle justify-center'>No Food Content Available</h3>
        :
        foodItems.map((food) => (
          <div key={food.id} className="flex items-center justify-between bg-gray-700 p-4 rounded-lg shadow-md">
            {/* Thumbnail */}
            <img 
              src={food.imgUrl === null || food.imgUrl === undefined ? null : `http://localhost:8080/uploads/images/${food.imgUrl}`} 
              alt={food.name} 
              className="w-24 h-24 object-cover rounded-md mr-4"
            />
            {/* Food Info */}
            <div className="flex-1">
              <h3 className="text-xl font-semibold">{food.name}</h3>
              <p className="text-gray-400">{food.description}</p>
              <p className="text-lg font-bold mt-1">&#8377;{food.price}.00</p>
            </div>
            {/* Action Buttons */}
            <div className="flex space-x-4">
              <button 
                onClick={() => handleEdit(food.id)} 
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none"
              >
                Edit
              </button>
              <button 
                onClick={() => handleDelete(food.id)} 
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ShowAllFood;
