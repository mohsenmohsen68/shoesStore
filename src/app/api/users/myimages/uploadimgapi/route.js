import connectToDB from "@/root/configs/db";
import userModel from "@/root/models/User";


export async function PUT(req){
    connectToDB();
    const { userID, img } = await req.json();
    console.log(userID, img)
   
    const user = await userModel.findOneAndUpdate({ _id: userID }, {
      img
    });
    return Response.json({
      message: "user updated successfully",
      status: 200
    });
}