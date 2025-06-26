import axios from "axios"

const BASE_URL = "http://localhost:8080/";

const API_URL =`${BASE_URL}api/foods`


export async function addFood(foodData,image){

   const formData = new FormData();
    formData.append("imgFile",image);
    formData.append("food",JSON.stringify(foodData));

   try{
      const response  = await axios.post( API_URL, formData, { headers : { "Content-Type" : "multipart/form-data"}});
      return response;
   }catch(error){
      console.log("Error",error);
      throw error;
   }
}

export  async function getAllFood(){
   try {
      const foodResponseData = await axios.get(API_URL);
      return foodResponseData.data
   } catch (error) {
      throw error;
   }
}

export async function  deleteFood(id) {
   try{
      const deleteResponse = await axios.delete(`${API_URL}/${id}`);
      console.log(deleteResponse.status);
      
      return deleteResponse.status;
   }catch(error){
      console.log(error);
      
      throw error;
   }
}