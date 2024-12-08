import { authenticate } from "@/middleware/auth";
import FavouritRecipe from "@/models/FaviouritRecipeModel";
import { connect } from "@/utils/dbConfig";
import mongoose from "mongoose";
import * as yup from "yup";

connect();
const recipSchema = yup.object().shape({
  id: yup.string().required("Id is required"),
  name: yup.string().required("Name is required"),
  category: yup.string().required("Category is required"),
  image: yup.string().required("Image is required"),
});
async function handler(req: any, res: any) {

  if (req.method === "GET") {
    try {
      //find bu user objectid
      
      const favouritRecipes = await FavouritRecipe.find({userId: req.user.id});

      return res.status(200).json(favouritRecipes);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  } else if (req.method === "POST") {
    try {
      await recipSchema.validate(req.body, { abortEarly: false });
      const { id, name, category, image } = req.body;
      const favouritRecipe = await FavouritRecipe.findOne({ id, userId: req.user.id });
      if (favouritRecipe) {
        await FavouritRecipe.deleteOne({ id });
        return res.status(200).json({ message: "Recipe deleted successfully" });
      } else {
        const newFavouritRecipe = new FavouritRecipe({
          userId: req.user.id,
          id,
          name,
          category,
          image,
        });
        await newFavouritRecipe.save();
        return res.status(200).json({ message: "Recipe added successfully" });
      }
    } catch (error: any) {
      console.log("error", error);
      if (error instanceof yup.ValidationError) {
        return res.status(400).json({ error: error.message });
      } else if (error.response?.status === 400) {
        return res.status(400).json({ error: error.message });
      }

      return res.status(500).json({ error: "Internal server error" });
    }
  }
}

export default authenticate(handler);
