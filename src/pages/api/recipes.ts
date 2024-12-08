import { authenticate } from "@/middleware/auth";
import axios from "axios";

async function handler(req: any, res: any) {
  if (req.method === "GET") {
    const { id, category } = req.query;
    try {
      // if get one
      if (id) {
        const resipies = await getOneRecipes(id);
        if (resipies.meals) {
          return res.status(200).json({
            ...formatObject(resipies.meals[0]),
            category: resipies.meals[0]?.strCategory,
            area: resipies.meals[0]?.strstrArea,
            description: resipies.meals[0]?.strInstructions,
          });
        } else {
          return res.status(404).json({ error: "Recipe not found" });
        }
      } else if (category) {
        const resipies = await getAllRecipesByCategory(category);
        return res.status(200).json(
          resipies.map((meal: any) => {
            return formatObject(meal);
          })
        );
      } else {
        const resipies = await getAllRecipes();
        return res.status(200).json(
          resipies.map((meal: any) => {
            return formatObject(meal);
          })
        );
      }
    } catch (error) {
      console.error(error);

      return res.status(500).json({ error: "Internal server error" });
    }
  }
}

async function getAllRecipesByCategory(category: string) {
  try {
    const response = await axios.get(
      `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
    );
    return response.data.meals;
  } catch (error) {
    console.error(error);
    return [];
  }
}
async function getAllRecipes() {
  try {
    const response = await axios.get(
      "https://www.themealdb.com/api/json/v1/1/search.php?s="
    );
    return response.data.meals;
  } catch (error) {
    console.error(error);
    return [];
  }
}

async function getOneRecipes(id: string) {
  try {
    console.log("id", id);
    const response = await axios.get(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
}

function formatObject(meal: any) {
  return {
    id: meal.idMeal,
    name: meal.strMeal,
    image: meal.strMealThumb,
  };
}

export default authenticate(handler);
