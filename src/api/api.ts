import Axios from "@/utils/axios";
import { Category, Recipe } from "@/utils/types";

export const retrieveRecipes = async (category: string): Promise<Recipe[]> => {
  const url = category ? `recipes?category=${category}` : "recipes";
  const response = await Axios.get(url);
  return response.data || [];
};
export const retrieveFavouritRecipes = async (): Promise<Recipe[]> => {
  const response = await Axios.get("favourit");
  return response.data || [];
};

export const retrieveCategories = async (): Promise<Category[]> => {
  const response = await Axios.get("categories");
  return response.data || [];
};


export const addOrRemoveFav = async (recipe: Recipe): Promise<MutationResponse> => {
  const response = await Axios.post("favourit", recipe);
  return response.data;
};

export interface MutationResponse {
  message: string;
}