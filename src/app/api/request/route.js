import connectToDB from "@/root/configs/db";
import requestModel from "@/root/models/Requests";

export async function POST(req) {
  try {
    connectToDB();
    const { name, email, requestBody, company, phoneNumber, user } = await req.json();
    console.log(name, email, requestBody, company, phoneNumber, user);
    const request = await requestModel.create({
      name,
      email,
      requestBody,
      company,
      phoneNumber,
      response: "",
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
