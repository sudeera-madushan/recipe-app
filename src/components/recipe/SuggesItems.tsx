"use client";
import React, { useEffect } from "react";
import Axios from "@/utils/axios";
import { Category, Recipe } from "@/utils/types";
import MainScreen from "../MainScreen";
import Loader from "../loader/Loader";
import ItemCard from "../card/ItemCard";
import { useFavRecipes, useRecipes } from "@/hooks/useApi";

const SuggesItems = ({ category }: { category: string }) => {
  const {
    data: faviouritRecipes,
    isLoading: loading,
    refetch,
  } = useFavRecipes();

  const { data: recipes, isLoading: recipesLoading } = useRecipes(category);


  if (recipesLoading) return <Loader/>
  return (
    <MainScreen>
      {recipes && recipes.length > 0 ? (
        <div>
          <hr />
          <h3 className="text-4xl font-semibold mb-4 mt-6">
            Related Meals for you !
          </h3>
          <div className="grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 lg:grid-cols-6 gap-2 w-full my-10">
            {recipes.map((recipe: Recipe) => (
              <ItemCard
                key={recipe.id}
                recipe={recipe}
                isFav={
                  !faviouritRecipes ? false : faviouritRecipes.filter((f) => f.id === recipe.id).length > 0 
                }
                refetch={refetch}
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
