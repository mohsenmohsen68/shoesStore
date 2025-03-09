import connectToDB from "@/root/configs/db";
import OtpModel from "@/root/models/Otp";
import userModel from "@/root/models/User";
import { generateAccessToken, generateRefreshToken } from "@/root/util/auth/auth";

export async function POST(req) {
    connectToDB();
    const { phoneNumber, code} = await req.json();
    console.log("phone and code : ", phoneNumber, code)

    const isCodeValid = await OtpModel.findOne({ phoneNumber, code })
    console.log("iscode valid : ", isCodeValid)
    if (isCodeValid) {
        const now = new Date().getTime();
        console.log(isCodeValid.expTime, " ", now)
        if (isCodeValid.expTime > now) {
            const accessToken = generateAccessToken({ phoneNumber })
            const refreshtoken = await generateRefreshToken({ phoneNumber });
            await userModel.findOneAndUpdate({ phoneNumber }, {
              $set: {
                refreshToken: refreshtoken,
              }
            })
            console.log("accesstoken", accessToken)
            return Response.json({ message: "the entered code is correct ..." }, {
                status: 200,
                headers: { "Set-Cookie": `token=${accessToken};path=/;httpOnly=true` }
            })
        } else {
            return Response.json({ message: "the entered code is expired ..." }, { status: 410 })
        }
    } else {
        return Response.json({ message: "there is not such a code ..." }, { status: 409 })
    }

}