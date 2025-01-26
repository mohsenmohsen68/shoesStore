import connectToDB from "@/configs/db";
import userModel from "@/root/models/User";
import {
  hashPassword,
  validatePassword,
  verifyPassword,
} from "@/root/util/auth/auth";

export async function PUT(req) {
  connectToDB();
  const { id, lastPass, newPass1, newPass2 } = await req.json();
  console.log(id, lastPass, newPass1, newPass2);
  const isValidPassword = validatePassword(newPass1);
  if (!isValidPassword) {
    return Response.json({
      message: "the new password is invalid. ",
      status: 409
    });
  }

  const user = await userModel.findOne({ _id: id });
  console.log("user", user);
  const isCorrectPassword = await verifyPassword(lastPass, user.password);
  console.log("kkkkk :::: ", isCorrectPassword);
  if (!isCorrectPassword) {
    return Response.json({
      message: "the password is wrong",
      status: 422
    });
  }

  const newPassword = await hashPassword(newPass1);

  await userModel.findOneAndUpdate({ _id: id }, { password: newPassword });

  return Response.json({
    message: "رمز کاربر با موفقیت تغییر کرد...",
    status: 200
  });
}
