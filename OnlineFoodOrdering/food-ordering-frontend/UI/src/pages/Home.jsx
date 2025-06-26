
import { useState } from "react";
import ExploreMenu from "../component/ExploreMenu";
import FoodDisplay from "../component/FoodDisplay";
import Header from "../component/Header";

export default function Home() {
  const [category,setCategory] = useState('All');
  return (
    <main>
      <Header />
      <ExploreMenu category={category} setCategory={setCategory}/>
      <FoodDisplay category={category} searchText={''}/>
    </main>

  )
}
