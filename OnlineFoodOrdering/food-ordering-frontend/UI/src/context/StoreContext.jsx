import { createContext, useEffect, useState } from "react";
import { getAllFood } from "../service/FoodService";
import { addToCart, getCartData, removeFromCart } from "../service/CartService";

export const StoreContext = createContext(null);

export const StoreContextProvider = (props) => {

    const [foodList, setFoodList] = useState([]);
    const[foodQuantity,setFoodQuantity] = useState({});
    const [token,setToken] = useState('');

    useEffect(() => {
        const loadData = async () => {
            try {
                const foodResponse = await getAllFood();
                setFoodList(foodResponse || []);

                if(localStorage.getItem('token')){
                    setToken(localStorage.getItem("token"))
                    await loadCartData(localStorage.getItem('token'))
                }
            } catch (error) {
                console.log(error);   
            }
        }
        loadData();
    }, [token])

    async function increaseQuantity(foodId){
        setFoodQuantity(prev => ({...prev,[foodId]:(prev[`${foodId}`] || 0 ) + 1}))
        await addToCart(foodId,token);
    }

    async function decreaseQuantity(foodId){
        setFoodQuantity(prev => ({...prev,[foodId] : (prev[`${foodId}`] || 0) - 1}))
        await removeFromCart(foodId,token);
    }

    async function loadCartData(token){
       const cartData = await getCartData(token);
       setFoodQuantity(cartData.items)
    }

    function removeQuantity(foodId){
        setFoodQuantity(prev => {
            const updatedQuantity = {...prev};
            delete updatedQuantity[foodId];
            return updatedQuantity;
        })
    }

    const contextValue = {
        foodList,
        increaseQuantity,
        decreaseQuantity,
        foodQuantity,
        setFoodQuantity,
        removeQuantity,
        token,
        setToken
    }

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}
