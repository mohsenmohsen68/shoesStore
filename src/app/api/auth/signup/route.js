import { connectToDB } from "@/root/configs/db";

export async function GET(req) {
  await connectToDB();
  return Response.json({message:'welcome to this project'},{status:200})
}
