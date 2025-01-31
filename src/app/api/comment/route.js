import connectToDB from "@/root/configs/db";
import commentModel from "@/root/models/Comment";
import productModel from "@/root/models/Product";

export async function PUT(req) {
  try {
    connectToDB();
    const { commentID, status } = await req.json();

    const comment = await commentModel.findOneAndUpdate({_id:commentID},{status});

    return Response.json({
      message: "product added successfully",
      status: 200
    });
  } catch (err) {
    return Response.json({ message: err }, { status: 500 });
  }
}
export async function POST(req) {
  try {
    connectToDB();
    const { commentBody, score, product, user } = await req.json();

    const comment = await commentModel.create({
      commentBody,
      score,
      product,
      user
    });

    await productModel.findOneAndUpdate(
      { _id: product },
      {
        $push: {
          comments: comment._id
        }
      }
    );
    return Response.json({
      message: "product added successfully",
      status: 201
    });
  } catch (err) {
    return Response.json({ message: err }, { status: 500 });
  }
}
export async function DELETE(req) {
  try {
    connectToDB();
    const { commentID, productID } = await req.json();
    console.log("sdsads", commentID, productID);
    await commentModel.findOneAndDelete({ _id: commentID });

    await productModel.findOneAndUpdate(
      { _id: productID },
      {
        $pull: {
          comments: commentID
        }
      }
    );
    return Response.json({
      message: "comment deleted successfully",
      status: 200
    });
  } catch (err) {
    return Response.json({ message: err }, { status: 500 });
  }
}
export async function GET() {
  connectToDB();
  const comments = await commentModel.find({});
  return Response.json(
    { message: "data fetched successfully", comments },
    { status: 200 }
  );
}
