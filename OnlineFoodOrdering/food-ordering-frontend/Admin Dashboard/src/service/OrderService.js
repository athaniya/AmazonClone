import axios from "axios";

const API_URL = 'http://localhost:8080/api/orders';

export const fetchOrders = async() =>{
    const response = await axios.get(API_URL+"/allUserOrders");
    return response;
}

export const updateStatus = async(orderId,value) =>{
    const response = await axios.patch(`${API_URL}/status/${orderId}?status=${value}`);
    return response;
}