import connectToDB from "@/configs/db";
import userModel from "@/root/models/User";
import {
  generateAccessToken,
  generateRefreshToken,
  validatePassword,
  validatePhoneNumber,
  verifyPassword
} from "@/root/util/auth/auth";

export async function POST(req) {
  connectToDB()
  const { phoneNumber, password } = await req.json();
  console.log(phoneNumber, password);
  const isValidPassword = validatePassword(password);
  const isvalidphoneNumber = validatePhoneNumber(phoneNumber);
  console.log(isValidPassword, isvalidphoneNumber);
  if (!isValidPassword || !isvalidphoneNumber) {
    return Response.json({
      message: "the phoneNumber or password is invalid. ",
      status: 409
    });
  }

  const user = await userModel.findOne({ phoneNumber });
  console.log("user", user)
  const isCorrectPassword = await verifyPassword(password, user.password);
  console.log("kkkkk :::: ", isCorrectPassword);
  if (!isCorrectPassword) {
    return Response.json({
      message: "the email or pass is wrong",
      status: 422
    });
  }
  const accessoken = await generateAccessToken({ phoneNumber });
  const refreshtoken = await generateRefreshToken({ phoneNumber });

  await userModel.findOneAndUpdate({ phoneNumber }, {
    $set: {
      refreshToken: refreshtoken,
    }
  })
  console.log(accessoken);
  return Response.json(
    { message: "the user logged in successfully", status: 200 },
    {
      headers: {
        "Set-Cookie": `token=${accessoken};path=/;httpOnly=true;`
      }
    }
  );
}
