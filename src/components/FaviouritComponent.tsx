"use client";
import React, { useEffect } from "react";
import ItemCard from "./card/ItemCard";
import MainScreen from "./MainScreen";
import CategoryButtonCard from "./card/CategoryButtonCard";
import Axios from "@/utils/axios";
import { Category, Recipe } from "@/utils/types";
import Loader from "./loader/Loader";
import { useFavRecipes } from "@/hooks/useApi";

const FaviouritComponent = () => {
  const { data: faviouritRecipes, isLoading: favLoading , refetch } = useFavRecipes();

  if (favLoading) return <Loader/>

  return (
    <MainScreen>
      { faviouritRecipes && faviouritRecipes.length > 0 ? (
        <div className="grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 lg:grid-cols-6 gap-2 w-full my-10">
          {faviouritRecipes.map((recipe: Recipe) => (
            <ItemCard
              key={recipe.id}
              recipe={recipe}
              isFav={
                true
              }
              refetch={refetch}
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
