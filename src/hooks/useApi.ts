import { addOrRemoveFav, retrieveCategories, retrieveFavouritRecipes, retrieveRecipes } from "@/api/api";
import { Category, Recipe } from "@/utils/types";
import { useMutation, useQuery } from "react-query";
import { toast } from 'react-toastify';
export const useRecipes = (category: string) => {
  return useQuery<Recipe[], Error>(
    ["recipes", category],
    () => retrieveRecipes(category),
    {
      enabled: !!category || category === "",
    }
  );
};

export const useCategory = () => {
  return useQuery<Category[], Error>("category", retrieveCategories);
};
export const useFavRecipes = () => {
  return useQuery<Recipe[], Error>("favourit", retrieveFavouritRecipes);
};
