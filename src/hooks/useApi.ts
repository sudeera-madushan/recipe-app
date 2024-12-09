import { retrieveCategories, retrieveFavouritRecipes, retrieveRecipes } from "@/api/api";
import { Category, Recipe } from "@/utils/types";
import { useQuery } from "@tanstack/react-query";
import { toast } from 'react-toastify';
export const useRecipes = (category: string) => {
  return useQuery({
    queryKey: ['recipes', category],
    queryFn: () => retrieveRecipes(category),
    enabled: !!category || category === "",
  });
};

export const useCategory = () => {
  return useQuery<Category[], Error>({
    queryKey: ['category'],
    queryFn: retrieveCategories,
  });
};

export const useFavRecipes = () => {
  return useQuery<Recipe[], Error>({
    queryKey: ['favourit'],
    queryFn: retrieveFavouritRecipes,
  });
};
