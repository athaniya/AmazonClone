import axios from "axios";

const API_URL = 'http://localhost:8080/api/orders';

export const createOrder = async(orderData,token) =>{
   const response = await axios.post(API_URL,orderData,{headers:{Authorization:`Bearer ${token}`}});
   return response;
}

export const verifyPayment = async (paymentData,token) => {
   const response = await axios.post(API_URL+"/verify",paymentData,{headers:{Authorization:`Bearer ${token}`}});
   return response;
   
}

export const deleteOrder = async (orderId,token) => {
   await axios.delete(API_URL+"/"+orderId,{headers:{Authorization:`Bearer ${token}`}});
}

export const fetchOrders = async (token) => {
   const response = await axios.get(API_URL,{headers:{Authorization:`Bearer ${token}`}});
   return response;
} 