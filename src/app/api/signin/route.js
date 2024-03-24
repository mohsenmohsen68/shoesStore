import connectToDB from "../../../../configs/db";
import userModel from "../../../../models/users";
import {
  generateAccessToken,
  generateRefreshToken,
  validateEmail,
  validatePassword,
  verifyPassword
} from "../../../../public/util/auth/auth.js";

async function POST(req) {
  connectToDB();
  const body = await req.json();
  console.log(body)
  const { email, password } = body;
  const isValidPassword = validatePassword(password);
  const isValidEmail = validateEmail(email);

  if (!isValidEmail || !isValidPassword) {
    return Response.json(
      { message: "email or password is invalid" },
      { status: 422 }
    );
  }

  const user = await userModel.findOne({ email });

  if (!user) {
    return Response.json(
      { message: "email or password is incorrect" },
      { status: 419 }
    );
  }

  console.log(password, user.password);
  const isPasswordValid = await verifyPassword(password, user.password);

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

export {POST}
