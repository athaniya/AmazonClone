import axios from "axios";

const API_URL = "http://localhost:8080/api/foods"

export  async function getAllFood() {

  try {
    const response = await axios.get(API_URL);
    return response.data;
    
  } catch (error) {
    throw error;
  }


}

export async function getFood(id){
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    
    return response.data;
  } catch (error) {
    console.log(error);
    
    throw error;
    
  }
}
