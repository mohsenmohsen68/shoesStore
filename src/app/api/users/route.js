import connectToDB from "@/root/configs/db";
import userModel from "@/root/models/User";
import { validateEmail } from "@/root/util/auth/auth";

export async function PUT(req) {
  try {
    connectToDB();
    const { userID, userName, phoneNumber, email, role } = await req.json();
    console.log(userID, userName, phoneNumber, email, role)
    if (email.length > 0 && !validateEmail(email)) {
      return Response.json({ message: "پست الکترونیکی وارد شده نامعتبراست .", status: 400 })
  }
    const user = await userModel.findOneAndUpdate({ _id: userID }, {
      email,
      role
    });
    return Response.json({
      message: "user updated successfully",
      status: 200
    });
  } catch (err) {
    return Response.json({ message: err }, { status: 500 });
  }
}
export async function POST(req) {
  try {
    connectToDB();
    const { userName, email, password, phoneNumber, role } = await req.json();

    if (!validatePhoneNumber(phoneNumber)) {
      return Response.json({ message: "شماره تلفن وارد شده نامعتبراست .", status: 400 })
    }
    if (email.length > 0 && !validateEmail(email)) {
      return Response.json({ message: "پست الکترونیکی وارد شده نامعتبراست .", status: 400 })
    }
    if (!validatePassword(password)) {
      return Response.json({ message: " رمز وارد شده قابل حدس است .", status: 400 })
    }

    const isUserExist = await userModel.findOne({
      $or: [{ userName }, { phoneNumber }]
    });

    if (isUserExist) {
      return Response.json({
        message: " این کاربر قبلا ثبت نام کرده است ...",
        status: 422
      });
    }

    const newPassword = await hashPassword(password);

    const allUsers = await userModel.find({});
    const user = await userModel.create({
      userName,
      password: newPassword,
      email,
      role,
      phoneNumber
    });
    return Response.json({
      message: "کاربر با موفقیت اضافه شد ...",
      status: 201,
    });
  } catch (err) {
    return Response.json({ message: err }, { status: 500 });
  }
}
export async function DELETE(req) {
  try {
    connectToDB();
    const { userID } = await req.json();
    console.log("sdsads", userID);
    await userModel.findOneAndDelete({ _id: userID });

    return Response.json({
      message: "user deleted successfully",
      status: 200
    });
  } catch (err) {
    return Response.json({ message: err }, { status: 500 });
  }
}
export async function GET() {
  connectToDB();
  const users = await userModel.find({});
  return Response.json(
    { message: "data fetched successfully", comments },
    { status: 200 }
  );
}
