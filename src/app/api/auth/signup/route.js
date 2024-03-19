import { connectToDB } from "@/root/configs/db";
import userModel from "@/root/models/users";
import {
  generateAccessToken,
  hashPassword
} from "@/root/public/util/auth/auth";
import { hash } from "bcryptjs";

export async function GET(req) {
  await connectToDB();
  return Response.json({ message: "welcome to this project" }, { status: 200 });
}

export async function POST(req) {
  connectToDB();
  const body = await req.json();
  const { userName, phoneNumber, email, password } = body;

  console.log(userName, phoneNumber, email, password);

  //validation

  const isUserExist = await userModel.findOne({
    $or: [{ email }, { userName }, { phoneNumber }]
  });
  console.log(isUserExist);
  if (isUserExist) {
    return Response.json(
      { message: "user is registered already ..." },
      { status: 422 }
    );
  }

  const hashedPassword = await hashPassword(password);
  const token = generateAccessToken(userName);

  const users = await userModel.find({});

  await userModel.create({
    userName,
    email,
    password: hashedPassword,
    phoneNumber,
    role: users.length > 0 ? "user" : "admin"
  });

  return Response.json(
    { message: "user added successfully ... " },
    {
      status: 201,
      headers: { "Set-Cookie": `token = ${token};parh=/;httpOnly=true` }
    }
  );
}
