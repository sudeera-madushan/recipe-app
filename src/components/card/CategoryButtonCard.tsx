import { Category } from "@/pages/types";
import React from "react";;

const CategoryButtonCard = ({ category, onClick, selected }: { category: Category , onClick: any, selected: string}) => {
  return (
    <button onClick={onClick} className={`border-2 border-primary rounded-full py-3 hover:bg-primary font-semibold hover:text-secondary duration-200 ${category.strCategory === selected && "bg-primary text-secondary"}`}>
      {category.strCategory}
    </button>
  );
};

export default CategoryButtonCard;
