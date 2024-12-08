"use client";
import React, { useEffect } from "react";
import ItemCard from "./card/ItemCard";
import MainScreen from "./MainScreen";
import CategoryButtonCard from "./card/CategoryButtonCard";
import Axios from "@/utils/axios";
import { Category, Recipe } from "@/pages/types";
import Loader from "./loader/Loader";
import { set } from "mongoose";

const FaviouritComponent = () => {
  const [faviouritRecipes, setFavouritRecipes] = React.useState<Recipe[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);


  useEffect(() => {
    fetchFaviouritRecipes();
  }, []);


  const fetchFaviouritRecipes = async () => {
    try {
      const response = await Axios.get("favourit");
      setFavouritRecipes(response.data);
      setLoading(false);
    } catch (error) {
      console.log("error", error);
    }
  };


  const handleFav = async (recipe: Recipe) => {
    // setIsFav(!isFav);
    try {
      setLoading(true);
      await Axios.post("favourit", recipe);
      fetchFaviouritRecipes();
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <MainScreen>
      {loading ? (
        <Loader />
      ) : faviouritRecipes.length > 0 ? (
        <div className="grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 lg:grid-cols-6 gap-2 w-full my-10">
          {faviouritRecipes.map((recipe: Recipe) => (
            <ItemCard
              key={recipe.id}
              recipe={recipe}
              isFav={
                true
              }
              handleFav={() => {handleFav(recipe)}}
            />
          ))}
        </div>
      ) : (
        <div className="text-center text-2xl font-semibold text-fontGray h-screen items-center justify-center flex w-full">
          <text>

          No recipes found
          </text>
        </div>
      )}
    </MainScreen>
  );
};

export default FaviouritComponent;
