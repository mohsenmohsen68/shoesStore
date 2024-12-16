import connectToDB from "@/root/configs/db";
import productModel from "@/root/models/Product";

async function POST(req) {
    try {
        connectToDB();
        const body = await req.json();
        console.log(body)
        const { name, price, shortDesc, longDesc, size, color, model, suitableFor, score, count, tags } = body;
        console.log(name, price, shortDesc, longDesc, size, color, model, suitableFor, score, count, tags)
        const product = await productModel.create({
            name, price, shortDesc, longDesc, size, color, model, suitableFor, score, count, tags
        });

        return Response.json({ message: 'product added successfully', product }, { status: 201 })
    } catch (err) {
        return Response.json({ message: err }, { status: 500 })
    }
}

async function GET() {
    connectToDB();
    const product = await productModel.find({}, '-__v').populate('comments')
    return Response.json({ message: 'data accessed successfully', data: product })
}

export { POST, GET };
