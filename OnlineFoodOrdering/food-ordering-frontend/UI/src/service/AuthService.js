import axios from "axios";

const API_URL = "http://localhost:8080/api"

export async function registerUser(userData){
    const response  = await axios.post(API_URL+"/user/register",userData);
    return response.status;
}

export async function loginUser(loginData){
    const response = await axios.post(API_URL+"/auth/login",loginData);
    return response;
}