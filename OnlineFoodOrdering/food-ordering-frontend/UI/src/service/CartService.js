import axios from "axios";

const API_URL = "http://localhost:8080/api/cart";

export const addToCart = async (foodId,token) => {
    await axios.post(API_URL,{foodId},{headers:{Authorization:`Bearer ${token}`}});
}

export const removeFromCart = async (foodId,token) => {
    await axios.put(API_URL,{foodId},{headers:{Authorization : `Bearer ${token}`}})
}

export const getCartData = async (token) => {
    const response = await axios.get(API_URL,{headers:{Authorization:`Bearer ${token}`}});
    return response.data;
}

export const clearCart = async (token) =>{
    axios.delete(API_URL, {headers:{Authorization:`Bearer ${token}`}});
}