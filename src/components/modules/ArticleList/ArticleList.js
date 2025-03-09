import React from 'react'
import AdminArticlesTable from "@/components/modules/dashboard/AdminArticlesTable"
import userModel from '@/root/models/User';
import articlesModel from '@/root/models/article';
import connectToDB from '@/root/configs/db';
import { cookies } from 'next/headers';
import { verifyAccessToken } from '@/root/util/auth/auth';
// import { redirect } from 'next/navigation';

async function ArticleList() {
    connectToDB();
    let articles = [];
    const neededData = [];
    let user = null;
    const token = cookies().get("token");
    if (token) {
        const tokenPayLoad = verifyAccessToken(token.value);
        if (tokenPayLoad) {
            user = await userModel.findOne({ phoneNumber: tokenPayLoad.phoneNumber });
        }
    }
    if (user) {
        articles = await articlesModel.find({});
        console.log("fav:",articles)
        articles.map(item => { neededData.push({ 
            title: item.title,
            articleBody: item.articleBody,
            date: item.date,
            img: item.img,
            status: item.status,
            articleID:item._id,
        })
    })
    } else {
        // redirect("/login");
    }
    return (
        <div>
            <AdminArticlesTable datas={JSON.parse(JSON.stringify(neededData))}/>
        </div>
    )
}

export default ArticleList