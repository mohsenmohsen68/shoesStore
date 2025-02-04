import connectToDB from "@/root/configs/db";
import commentModel from "@/root/models/Comment";
import favoriteModel from "@/root/models/Favorites";
import productModel from "@/root/models/Product";

async function POST(req) {
    try {
        connectToDB();
        const body = await req.json();
        const { name, price, shortDesc, longDesc, size, color, shoesmodel, suitableFor, wholeScore, count, tags } = body;
        console.log( name, price, shortDesc, longDesc, size, color, shoesmodel, suitableFor, wholeScore, count, tags)
        const product = await productModel.create({
            name, price, shortDesc, longDesc, size, color, shoesmodel, suitableFor, wholeScore, count, tags, img:["img"]
        });

        return Response.json({ message: 'product added successfully',  status: 201 })
    } catch (err) {
        return Response.json({ message: err , status: 500 })
    }
}

async function GET() {
    connectToDB();
    const product = await productModel.find({}, '-__v').populate('comments')
    return Response.json({ message: 'data accessed successfully', data: product })
}
async function DELETE(req) {
    try{
        connectToDB();
        const {productID} = await req.json()
        console.log(productID)
        await productModel.findOneAndDelete({_id:productID})
        await commentModel.deleteMany({product:productID})
        await favoriteModel.deleteMany({product:productID})
        return Response.json({ message: 'the product removed successfully', status:200 })

    }catch(err){
        return Response.json({message: err, status:500})
    }
}

async function PUT(req) {
    try {
        connectToDB();
        const body = await req.json();
        const { name, price, shortDesc, longDesc, size, color, shoesmodel, suitableFor, wholeScore, count, tags, userID } = body;
        console.log( name, price, shortDesc, longDesc, size, color, shoesmodel, suitableFor, wholeScore, count, tags,userID)
        const product = await productModel.findOneAndUpdate({_id:userID},{
            name, price, shortDesc, longDesc, size, color, shoesmodel, suitableFor, wholeScore, count, tags, img:["img"]
        });

        return Response.json({ message: 'product updated successfully',  status: 200 })
    } catch (err) {
        return Response.json({ message: err , status: 500 })
    }
}

export { POST, GET, DELETE,PUT };
