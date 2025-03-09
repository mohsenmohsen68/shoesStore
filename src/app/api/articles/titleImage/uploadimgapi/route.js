
import connectToDB from "@/root/configs/db";
import courseModel from "./../../../../../models/course"


export async function PUT(req){
    connectToDB();
    const { courseID, img } = await req.json();
    console.log(courseID, img)
   
    const user = await courseModel.findOneAndUpdate({ _id: courseID }, {
      img
    });
    return Response.json({
      message: "user updated successfully",
      status: 200
    });
}