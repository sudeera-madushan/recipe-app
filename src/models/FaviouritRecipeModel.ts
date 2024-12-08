import mongoose, { Schema, model } from "mongoose";

const favouritRecipeSchema = new Schema({
  id: {
    type: String,
    unique: false,
  },
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  }
});

const FavouritRecipe = mongoose.models.FavouritRecipe || model("FavouritRecipe", favouritRecipeSchema);

export default FavouritRecipe;
