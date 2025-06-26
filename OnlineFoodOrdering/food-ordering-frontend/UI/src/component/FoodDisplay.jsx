import { useContext } from "react";
import FoodItem from "./FoodItem";
import { StoreContext } from "../context/StoreContext";

export default function FoodDisplay({category,searchText}) {
  const {foodList} = useContext(StoreContext);

  const filteredFoodList = foodList.filter(food => (
    (category === 'All' || food.category === category) && 
    food.name.toLowerCase().includes(searchText.toLowerCase())
  ))

  return (
    <div className="container mx-auto px-4 mt-10 ">
      <div className="flex flex-wrap -mx-4">
        {filteredFoodList.length > 0 ? (
          filteredFoodList.map((food, index) => (
            <div
              className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 px-4 mb-6 flex"
              key={index}
            >
              <div className="w-full h-full flex">
                <FoodItem
                  id={food.id}
                  name={food.name}
                  description={food.description}
                  price={food.price}
                  imgUrl={food.imgUrl}
                />
              </div>
            </div>
          ))
        ) : (
          <div className="text-center w-full mt-4">
            <h4>No food found.</h4>
          </div>
        )}
      </div>
    </div>
  );
}

