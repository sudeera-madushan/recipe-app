"use client";
import React, { useEffect } from "react";
import ItemCard from "./card/ItemCard";
import MainScreen from "./MainScreen";
import CategoryButtonCard from "./card/CategoryButtonCard";
import Axios from "@/utils/axios";
import { Category, Recipe } from "@/utils/types";
import Loader from "./loader/Loader";

const HomeComponent = () => {
  const [categories, setCategories] = React.useState<Category[]>([]);
  const [recipes, setRecipes] = React.useState<Recipe[]>([]);
  const [faviouritRecipes, setFavouritRecipes] = React.useState<Recipe[]>([]);
  const [selectedCategory, setSelectedCategory] = React.useState<string>("");
  const [loading, setLoading] = React.useState<boolean>(true);
  useEffect(() => {
    handleFetch();
  }, [selectedCategory]);

  useEffect(() => {
    fetchFaviouritRecipes();
  }, []);

  const handleFetch = async () => {
    setLoading(true);
    if (!selectedCategory) {
      fetchCategories();
      fetchRecipes();
    } else {
      fetchRecipesByCategory(selectedCategory);
    }
  };
  const fetchFaviouritRecipes = async () => {
    try {
      const response = await Axios.get("favourit");
      setFavouritRecipes(response.data);
      setLoading(false);
    } catch (error) {
      console.log("error", error);
    }
  };
  const onSelectedCategory = (category: string) => {
    if (selectedCategory === category) {
      setSelectedCategory("");
      return;
    }
    setSelectedCategory(category);
  };
  const fetchCategories = async () => {
    try {
      const response = await Axios.get("categories");
      setCategories(response.data);
    } catch (error) {
      console.log("error", error);
    }
  };
  const fetchRecipes = async () => {
    try {
      const response = await Axios.get("recipes");
      setRecipes(response.data);
      setLoading(false);
    } catch (error) {
      console.log("error", error);
    }
  };
  const fetchRecipesByCategory = async (category: string) => {
    try {
      setRecipes([]);
      const response = await Axios.get("recipes?category=" + category);
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
      await handleFetch();
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <MainScreen>
      <div className="grid md:grid-cols-6 grid-cols-3 lg:grid-cols-8 gap-6 w-full pt-10 ">
        {categories.map((category) => (
          <CategoryButtonCard
            key={category.idCategory}
            category={category}
            onClick={() => onSelectedCategory(category.strCategory)}
            selected={selectedCategory}
          />
        ))}
      </div>

      {loading ? (
        <Loader />
      ) : recipes.length > 0 ? (
        <div className="grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 lg:grid-cols-6 gap-2 w-full my-10">
          {recipes.map((recipe) => (
            <ItemCard
              key={recipe.id}
              recipe={recipe}
              isFav={
                faviouritRecipes.filter((f) => f.id === recipe.id).length > 0
              }
              handleFav={() => {
                handleFav(recipe);
              }}
            />
          ))}
        </div>
      ) : (
        <div className="text-center text-2xl font-semibold text-fontGray h-lvh items-center justify-center flex w-full">
          <text>No recipes found</text>
        </div>
      )}
    </MainScreen>
  );
};

export default HomeComponent;
