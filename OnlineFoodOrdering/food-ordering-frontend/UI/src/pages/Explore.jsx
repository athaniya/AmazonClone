import { useState } from "react";
import FoodDisplay from "../component/FoodDisplay";
import Searchbar from "../component/Searchbar";

export default function Explore() {

  const [category,setCategory] = useState('All');
  const [searchText,setSearchText] = useState('');

  return (
    <>
      <Searchbar setCategory = {setCategory} setSearchText = {setSearchText}/>
      <FoodDisplay category={category} searchText ={searchText}/>
    </>
    
  )
}
