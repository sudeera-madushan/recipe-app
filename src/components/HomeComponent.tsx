"use client";
import React, { useEffect } from "react";
import ItemCard from "./card/ItemCard";
import MainScreen from "./MainScreen";
import CategoryButtonCard from "./card/CategoryButtonCard";
import Axios from "@/utils/axios";
import { Category, Recipe } from "@/utils/types";
import Loader from "./loader/Loader";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useCategory, useFavRecipes, useRecipes } from "@/hooks/useApi";
import { addOrRemoveFav } from "@/api/api";
import { toast } from "react-toastify";


const HomeComponent = () => {
  // const [categories, setCategories] = React.useState<Category[]>([]);
  // const [recipes, setRecipes] = React.useState<Recipe[]>([]);
  const [selectedCategory, setSelectedCategory] = React.useState<string>("");
  // const [loading, setLoading] = React.useState<boolean>(true);
 
  const {
    data: categories,
    isLoading: categoriesLoading
  } = useCategory();
  const { data: recipes, isLoading: recipesLoading } = useRecipes(selectedCategory || '');
  const { data: faviouritRecipes, isLoading: favLoading , refetch } = useFavRecipes();
 

 
  const onSelectedCategory = (category: string) => {
    if (selectedCategory === category) {
      setSelectedCategory("");
      return;
    }
    setSelectedCategory(category);
  };


  if (recipesLoading || categoriesLoading || favLoading) return <Loader />;
  return (
    <MainScreen>
      <div className="grid md:grid-cols-6 grid-cols-3 lg:grid-cols-8 gap-2 px-2 md:gap-6 w-full pt-10 sm:gap-1 ">
        {categories && categories.map((category) => (
          <CategoryButtonCard
            key={category.idCategory}
            category={category}
            onClick={() => onSelectedCategory(category.strCategory)}
            selected={selectedCategory}
          />
        ))}
      </div>

      {recipes && recipes.length > 0 ? (
        <div className="grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 lg:grid-cols-6 gap-2 w-full my-10">
          {recipes.map((recipe) => (
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
      ) : (
        <div className="text-center text-2xl font-semibold text-fontGray h-lvh items-center justify-center flex w-full">
          <text>No recipes found</text>
        </div>
      )}
      {/* <ToastContainer /> */}
    </MainScreen>
  );
};

export default HomeComponent;
