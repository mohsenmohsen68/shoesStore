import { connectToDB } from "@/root/configs/db";
import userModel from "@/root/models/users";
import {
  generateAccessToken,
  generateRefreshToken,
  validateEmail,
  validatePassword,
  verifyPassword
} from "@/root/public/util/auth/auth";

export async function POST(req) {
  connectToDB();
  const body = await req.json();
  const { email, password } = body;

  const isValidPassword = validatePassword(password);
  const isValidEmail = validateEmail(email);

  if (!isValidEmail || !isValidEmail) {
    return Response.json(
      { message: "email or password is invalid" },
      { status: 422 }
    );
  }

  const user = await userModel.findOne({ email });

  if (!user) {
    return Response.json(
      { message: "email or password is incorrect" },
      { status: 422 }
    );
  }

  const isPasswordValid =await verifyPassword(password, user.password);
  console.log(password, user.password , isPasswordValid)

  if (!isPasswordValid) {
    return Response.json(
      { message: "email or password is incorrect" },
      { status: 422 }
    );
  }

  const accessToken = generateAccessToken({ email });
  const refreshToken = generateRefreshToken({ email });

  return Response.json(
    { message: "logged in successfully" },
    {
      status: 200,
      headers: { "Set-Cookie": `token=${accessToken};path=/;httpOnly=true` }
    }
  );
}
