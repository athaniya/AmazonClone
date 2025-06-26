import { useState } from 'react';
import { FaCamera } from 'react-icons/fa';  // Import Camera Icon from React Icons
import { addFood } from '../service/FoodService';
import { toast } from 'react-toastify';

function AddFood() {
 const [food,setFood] = useState({
    name : '',
    description : '',
    price : '',
    category : ''
 })

 const[foodImage ,setFoodImage] = useState(null);

  const handleImageChange = (e) => {
    setFoodImage(e.target.files[0]);
  };

  const handleFormData = (e) =>{
    const {name,value} =  e.target;
    setFood((prevFood) => ({...prevFood,[name] : value}));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(!foodImage){
      toast.error("Please select an image");
      return;
    }    
    
    try {
      const response  = await addFood(food,foodImage);

      if(response.status === 201){
        toast.success("Food added successfully..")
      }
      else{
        toast.error("Failed to add food");
      }
      
    } catch (error) {
      toast.error("Failed to add food");
    }
    
    setFood({
        name : '',
        description : '',
        price : '',
        category : ''
    })
    setFoodImage(null);
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-gray-800 text-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-center mb-6">Add New Food</h2>
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div>
          <label className="block text-sm font-medium text-gray-300">Food Name</label>
          <input 
            type="text" 
            name='name'
            className="w-full p-3 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700 text-white"
            value={food.name} 
            onChange={handleFormData} 
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300">Food Category</label>
          <select name="category" className="w-full p-3 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700 text-white"
           onChange={handleFormData} value={food.category}>
            <option defaultChecked>All</option>
            <option value="Biryani">Biryani</option>
            <option value="Roll">Roll</option>
            <option value="Ice Cream">Ice Cream</option>
            <option value="Pizza">Pizza</option>
            <option value="Cakes">Cakes</option>
            <option value="Burger">Burger</option>
            <option value="Salad">Salad</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-300">Food Description</label>
          <textarea 
            className="w-full p-3 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700 text-white"
            name='description'
            value={food.description} 
            onChange={handleFormData}
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-300">Food Price</label>
          <input 
            type="number" 
            name='price'
            className="w-full p-3 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700 text-white"
            value={food.price} 
            onChange={handleFormData} 
          />
        </div>

        <div className="relative">
          <label className="block text-sm font-medium text-gray-300">Upload Food Image</label>
          
          {/* Hidden file input */}
          <input 
            type="file" 
            accept="image/*"
            className="absolute inset-0 opacity-0 cursor-pointer"
            onChange={handleImageChange}
          />
          
          {/* Camera Icon or Image */}
          {foodImage ? (
            <img 
              src={URL.createObjectURL(foodImage)} 
              alt="Food Preview" 
              className="w-32 h-32 object-cover mt-2 mx-auto rounded-full border shadow-md cursor-pointer"
            />
          ) : (
            <div className="flex justify-center items-center w-20 h-20 mx-auto bg-gray-700 border border-gray-600 rounded-full cursor-pointer">
              <FaCamera className="text-white text-2xl" />
            </div>
          )}
        </div>

        <div className="text-center">
          <button 
            type="submit" 
            className="px-6 py-3 mt-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Add Food
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddFood;
