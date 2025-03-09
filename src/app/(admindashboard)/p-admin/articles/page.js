import React from 'react'
import ArticleList from '@/components/modules/ArticleList/ArticleList'
import AddArticleBtn from '@/components/modules/dashboard/AddArticleBtn'
import connectToDB from '@/root/configs/db';
import userModel from '@/root/models/User';
import { verifyAccessToken } from '@/root/util/auth/auth';
import { cookies } from 'next/headers';
import articlesModel from '@/root/models/article';
async function page() {
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
          date: item.date ,
          img: item.img,
          status: item.status
      })
  })
  } else {
      // redirect("/login");
  }
  return (
    <div>
      <AddArticleBtn userID={JSON.parse(JSON.stringify(user._id))}/>
      <ArticleList />
      {/* <AddArticle/> */}
      {/* <ArticleEditor/> */}
    </div>
  )
}

export default page