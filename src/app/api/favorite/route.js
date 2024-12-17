import mongoose from "mongoose";
import favoriteModel from "@/root/models/Favorites";
const { default: connectToDB } = require("@/root/configs/db");


export async function POST(req){
   connectToDB()
    try{
       const {user,product} = await req.json();
       console.log("---> : ",user,product)
       if(!mongoose.isValidObjectId(user) || !mongoose.isValidObjectId(product)){
        return Response.json({message: "user or product is invalid ....", status:422})
       }else{
         const isFavoriteAdded = await favoriteModel.findOne({user,product})
         console.log("add",isFavoriteAdded)
         if(isFavoriteAdded){
            return Response.json({message: "this favorite had been added already ..", status:409})
         }else{
            const favorite = await favoriteModel.create({user,product})
            return Response.json({message: "favorites added successfully ..", status:201})
         }
       }
    }catch(err){
       return Response.json({message: "something went wrong on serer side....", status:500}) 
    }
}

export async function DELETE(req){
   connectToDB()
    try{
       const {user,product} = await req.json();
       console.log("---> : ",user,product)
       if(!mongoose.isValidObjectId(user) || !mongoose.isValidObjectId(product)){
        return Response.json({message: "user or product is invalid ....", status:422})
       }else{
         const isFavoriteAdded = await favoriteModel.findOne({user,product})
         console.log("del",isFavoriteAdded)
         if(!isFavoriteAdded){
            return Response.json({message: "there is no such a favorite", status:409})
         }else{
            const favorite = await favoriteModel.findOneAndDelete({user,product})
            return Response.json({message: "favorites deleted successfully ..", status:200})
         }
       }
    }catch(err){
       return Response.json({message: "something went wrong on serer side....", status:500}) 
    }
}

