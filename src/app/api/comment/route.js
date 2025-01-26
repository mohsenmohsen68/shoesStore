import connectToDB from "@/root/configs/db";
import commentModel from "@/root/models/Comment";
import productModel from "@/root/models/Product";

export async function POST(req) {
    try {
        connectToDB()
        const {
            commentBody,
            score,
            product,
            user,
        } = await req.json()

        const comment = await commentModel.create({
            commentBody,
            score,
            product,
            user,
        })


        await productModel.findOneAndUpdate({ _id: product }, {
            $push: {
                comments: comment._id
            }
        })
        return Response.json({ message: 'product added successfully', status: 201 })

    } catch (err) {

        return Response.json({ message: err }, { status: 500 })
    }


}
export async function GET() {
    connectToDB()
    const comments = await commentModel.find({})
    return Response.json({ message: 'data fetched successfully', comments }, { status: 200 })
}