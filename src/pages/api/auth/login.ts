import User from "@/models/UserModel";
import { signToken } from "@/utils/jwt";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
export default async function handler(req: any, res: any) {
  if (req.method === "POST") {
    try {
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
      const token = signToken({
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
      console.log(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  res.status(405).json({ error: "Method not allowed" });
}
