
import connectToDB from "../../../../configs/db"; 
import userModel from '../../../../models/users';
import {
  generateAccessToken,
  hashPassword
} from "../../../../public/util/auth/auth.js";



async function POST(req) {

  connectToDB();
  const body = await req.json();
  const { userName, phoneNumber, email, password } = body;

  const isUserExist = await userModel.findOne({
    $or: [{ email }, { userName }, { phoneNumber }]
  });
  console.log("userexist --> ",isUserExist);
  if (isUserExist) {
    return Response.json(
      { message: "user is registered already ....." },
      { status: 422 }
    );
  }

  const hashedPassword = await hashPassword(password);
  const token = generateAccessToken({email});
  const users = await userModel.find();

console.log(hashedPassword,token)


  await userModel.create({
    userName,
    email,
    password: hashedPassword,
    phoneNumber,
    role: users.length > 0 ? "user" : "admin"
  });

  return Response.json(
    { message: "user added success fullym ... " },
    {
      status: 201,
      headers: { "Set-Cookie": `token=${token};path=/;httpOnly=true` }
    }
  );


  }

  export {POST}



