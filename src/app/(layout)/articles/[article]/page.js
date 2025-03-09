import BreadCrumb from "@/components/modules/BreadCrumb";
import React from "react";
import productModel from "@/root/models/Product";
import connectToDB from "@/root/configs/db";
import { cookies } from "next/headers";
import { verifyAccessToken } from "@/root/util/auth/auth";
import userModel from "@/root/models/User";
import articlesModel from "@/root/models/article";
import ArticlePreviewHandler from "@/components/modules/ArticlePreviewHandler/ArticlePreviewHandler";


export default async function page({ params }) {
    connectToDB();
    console.log("params : ", params)
    let user = null;
    const token = cookies().get("token");
    if (token) {
        const tokenPayLoad = verifyAccessToken(token.value);
        if (tokenPayLoad) {
            user = await userModel.findOne({ phoneNumber: tokenPayLoad.phoneNumber });
        }
    }
    const id = params.article;
    console.log("idddd : ", id)
    const userID = user?._id
    const myArticle = await articlesModel.findOne({ _id: id });
    console.log("mmm", myArticle)
    const allArticles = await articlesModel.find({})

    return (
        <div className='mt-28'>
            <BreadCrumb title={myArticle._id} />
            <div className="mt-1 mx-1 p-2">
                <ArticlePreviewHandler data={myArticle.articleBody} />
            </div>
        </div>
    );
}

