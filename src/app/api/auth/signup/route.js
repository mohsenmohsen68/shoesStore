import connectToDB from "@/configs/db";
import userModel from "@/root/models/User";
import { generateAccessToken, hashPassword, validateEmail, validatePassword, validatePhoneNumber } from "@/root/util/auth/auth";

export async function POST(req) {
    connectToDB();
    const { userName, email, password, phoneNumber } = await req.json();
    console.log(userName, email, password, phoneNumber);

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
    const accessToken = generateAccessToken({ userName })

    const allUsers = await userModel.find({});
    const role = allUsers.length > 0 ? "USER" : "ADMIN";
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
    }, {
        headers: { "Set-Cookie": `token=${accessToken};path=/;httpOnly=true` },
    });
}


export async function PUT(req) {
    connectToDB();
    const { userName, email, phoneNumber, id, hasUserNameChanged, hasPhoneNumberChanged } = await req.json();
    console.log(userName, email, phoneNumber, hasUserNameChanged, hasPhoneNumberChanged);

    if (!validatePhoneNumber(phoneNumber)) {
        return Response.json({ message: "شماره تلفن وارد شده نامعتبراست .", status: 400 })
    }
    if (email.length > 0 && !validateEmail(email)) {
        return Response.json({ message: "پست الکترونیکی وارد شده نامعتبراست .", status: 400 })
    }


    if (hasUserNameChanged) {
        const isUserExist = await userModel.findOne({ userName });

        if (isUserExist) {
            return Response.json({
                message: " این کاربر قبلا ثبت نام کرده است ...",
                status: 422
            });
        }
    }
    if (hasPhoneNumberChanged) {
        const isUserExist = await userModel.findOne({ phoneNumber });

        if (isUserExist) {
            return Response.json({
                message: " این کاربر قبلا ثبت نام کرده است ...",
                status: 422
            });
        }
    }
    const accessToken = generateAccessToken({ phoneNumber })
    const allUsers = await userModel.find({});
    const role = allUsers.length > 0 ? "USER" : "ADMIN";
    const user = await userModel.findOneAndUpdate({ _id: id }, {
        userName,
        email,
        role,
        phoneNumber
    });
    return Response.json({
        message: "کاربر با موفقیت بروز شد ...",
        status: 200,
    }, {
        headers: { "Set-Cookie": `token=${accessToken};path=/;httpOnly=true` },
    });
}
