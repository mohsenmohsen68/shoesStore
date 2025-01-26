import connectToDB from "@/root/configs/db";
import requestModel from "@/root/models/Requests";

export async function POST(req) {
  try {
    connectToDB();
    const { title,  requestBody, user } = await req.json();
    console.log(title, requestBody, user);
    const request = await requestModel.create({
      title,
      requestBody,
      response: "",
      isChecked:false,
      user
    });
    return Response.json({
      message: "request added successfully",
      status: 201
    });
  } catch (err) {
    return Response.json({ message: err }, { status: 500 });
  }
}
export async function PUT(req) {
  try {
    connectToDB();
    const { title,  requestBody, user,isChecked,id } = await req.json();
    console.log(title, requestBody, user,isChecked);
    const request = await requestModel.findOneAndUpdate({_id:id},{
      title,
      requestBody,
      response: "",
      isChecked,
      user
    });
    if(request){
      return Response.json({
        message: "request added successfully",
        status: 200
      });
    }else{
      return Response.json({
        message: "there is no such a ticket",
        status: 400
      });
    }
  } catch (err) {
    return Response.json({ message: err }, { status: 500 });
  }
}
export async function GET() {
  try {
    connectToDB();
    const request = await requestModel.find({});
    return Response.json({
      message: "requests returned",
      status: 200
    });
  } catch (err) {
    return Response.json({ message: err }, { status: 500 });
  }
}
