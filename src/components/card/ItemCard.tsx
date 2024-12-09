import React from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useState } from "react";
import { Recipe } from "@/utils/types";
import Router from "next/router";
import Image from "next/image";
import { useMutation } from "@tanstack/react-query";
import { addOrRemoveFav, MutationResponse } from "@/api/api";
import { toast } from "react-toastify";
import { useFavRecipes } from "@/hooks/useApi";
const ItemCard = ({
  recipe,
  isFav,
  refetch
}: {
  recipe: Recipe;
  isFav: boolean;
  refetch: any
}) => {
  const mutation = useMutation<MutationResponse, Error, Recipe>({
    mutationFn: addOrRemoveFav,
    onSuccess: (res) => {
      console.log(res);
      refetch();
      toast.success(res.message);
    },
    onError: (error: any) => {
      toast.error(`Error: ${error.message}`);
    },
  });
  const [fav, setFav] = useState(isFav)
  const handleClickFav = () => {
    setFav(!fav)
    mutation.mutate(recipe)
  }
  return (
    <div className="group" >
      <div className="relative transform transition-transform duration-300 group-hover:scale-105  p-4">
        <Image
          onClick={() => Router.push(`/recipe/${recipe.id}`)}
          src={recipe.image}
          className="object-cover rounded-3xl cursor-pointer "
          alt={recipe.name}
          width={200}
          height={200}
        />
        <div className="mt-2 font-semibold text-fontGray flex items-center">
          {recipe.category}
          <button className="ms-2" onClick={() => handleClickFav()}>
            {fav ? (
              <FaHeart className="text-xl text-primary" />
            ) : (
              <FaRegHeart className="text-xl text-primary" />
            )}
          </button>
        </div>
        <div className="font-semibold text-[15px] text-gray-900">
          {recipe.name.length > 15
            ? `${recipe.name.slice(0, 15)}...`
            : recipe.name}
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
