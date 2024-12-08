import { authenticate } from "@/middleware/auth";
import axios from "axios";

async function handler(req: any, res: any) {
  if (req.method === "GET") {
    try {
      const resipies = await getAllCategories();
      return res.status(200).json(resipies.slice(0, 8));
    } catch (error) {
      console.error(error);

      return res.status(500).json({ error: "Internal server error" });
    }
  }
}

async function getAllCategories() {
  try {
    const response = await axios.get(
      `${process.env.SAMPLE_DATA_URL}categories.php`
    );
    return response.data.categories;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export default authenticate(handler);
