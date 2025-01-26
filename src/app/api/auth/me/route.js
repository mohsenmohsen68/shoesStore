import connectToDB from "@/configs/db";
import userModel from "@/root/models/User";
import { verifyAccessToken } from "@/root/util/auth/auth";
import { cookies } from "next/headers";

export async function POST(req) {
    connectToDB();
    const { _id } = await req.json();
    console.log(_id);

    const user = await userModel.findOne({_id});
    return Response.json({
        message: "کاربر یافت شد ...",
        status: 200,
        data: user,
    });
}

export async function GET(){
    connectToDB()
    let user = null;
    const token = cookies().get('token')
    if(!token){
        return Response.json({message:'the user is invalid ..'}, { status:422})
    }
    const tokenPayLoad = verifyAccessToken(token.value)
    if (tokenPayLoad) {
      user = await userModel.findOne({ phoneNumber: tokenPayLoad.phoneNumber });
      return Response.json({message:"the user is valid ..",data:user},{status:200})
    }
  }

