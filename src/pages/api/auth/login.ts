import User from "@/models/UserModel";
import { signToken } from "@/utils/jwt";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import * as yup from "yup";

const loginSchema = yup.object().shape({
  email: yup.string().email().required("Email is required"),  
  password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
});

export default async function handler(req: any, res: any) {
  if (req.method === "POST") {
    try {
      // validate request
      await loginSchema.validate(req.body, { abortEarly: false });

      const { email, password } = req.body;

      // find user by email
      const user = await User.findOne({ email });
    //   console.log(user);
      if (!user) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      // compare password
      const isMatch = await bcrypt.compare(password, user.password);
      console.log(isMatch);
      if (!isMatch) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      // sign token
      const token: string = signToken({
        id: user._id,
        name: user.name,
        email: user.email,
      });

      // console.log("token", token);
      // return token in cookie
      res.setHeader("Set-Cookie", `token=${token}; HttpOnly; Path=/; Secure`);

      return res.status(200).json({
        message: "Login successful",
        data: {
          user: { id: user._id, name: user.name, email: user.email },
          token,
        },
      });
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        return res.status(400).json({ error: error.errors });
      }
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  res.status(405).json({ error: "Method not allowed" });
}
