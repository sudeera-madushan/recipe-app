"use client";
import React, { useEffect } from "react";
import Axios from "@/utils/axios";
import { Category, Recipe } from "@/utils/types";
import MainScreen from "../MainScreen";
import Loader from "../loader/Loader";
import ItemCard from "../card/ItemCard";

const SuggesItems = ({ category }: { category: string }) => {
    const [faviouritRecipes, setFavouritRecipes] = React.useState<Recipe[]>([]);
  const [recipes, setRecipes] = React.useState<Recipe[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);

  useEffect(() => {
    fetchRecipes();
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
  const fetchRecipes = async () => {
    try {
      const response = await Axios.get(`recipes?category=${category}`);
      setRecipes(response.data);
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
      ) : recipes.length > 0 ? (
        <div>
            <hr/>
          <h3 className="text-4xl font-semibold mb-4 mt-6">Related Meals for you !</h3>
          <div className="grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 lg:grid-cols-6 gap-2 w-full my-10">
            {recipes.map((recipe: Recipe) => (
              <ItemCard
                key={recipe.id}
                recipe={recipe}
                isFav={faviouritRecipes.filter((f) => f.id === recipe.id).length > 0}
                handleFav={() => {
                  handleFav(recipe);
                }}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center text-2xl font-semibold text-fontGray h-screen items-center justify-center flex w-full">
          <text>No recipes found</text>
        </div>
      )}
    </MainScreen>
  );
};

export default SuggesItems;
