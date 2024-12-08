import React from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useState } from "react";
import { Recipe } from "@/pages/types";
import Axios from "@/utils/axios";
const ItemCard = ({
  recipe,
  isFav,
  handleFav,
}: {
  recipe: Recipe;
  isFav: boolean;
  handleFav: any;
}) => {
  return (
    <div className="group">
      <div className="relative transform transition-transform duration-300 group-hover:scale-105  p-4">
        <img
          src={recipe.image}
          className="object-cover rounded-3xl"
          alt={recipe.name}
          width={200}
          height={200}
        />
        <div className="mt-2 font-semibold text-fontGray flex items-center">
          {recipe.category}
          <button className="ms-2" onClick={() => handleFav()}>
            {isFav ? (
              <FaHeart className="text-xl text-primary" />
            ) : (
              <FaRegHeart className="text-xl text-primary border" />
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
