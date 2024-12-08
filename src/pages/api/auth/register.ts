import User from "@/models/UserModel";
import bcrypt from "bcryptjs";
import { connect } from "@/utils/dbConfig";
import * as yup from "yup";
const registerSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().email().required("Email is required"),  
  password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
});

connect();
export default async function handler(req: any, res: any) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Method not allowed" });
    }

    // validate request
    await registerSchema.validate(req.body, { abortEarly: false });

    const { name, email, password } = await req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    return res
      .status(201)
      .json({
        message: "User registered successfully",
        data: { user: { id: user._id, name: user.name, email: user.email } },
      });
  } catch (error: any) {
    if (error instanceof yup.ValidationError) {
      return res.status(400).json({ error: error.errors });
    }
    return res.status(500).json({ error: "Internal server error" });
  }
}
