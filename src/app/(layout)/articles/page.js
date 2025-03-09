import ArticleBox from '@/components/modules/ArticleBox';
import BreadCrumb from '@/components/modules/BreadCrumb';
import connectToDB from '@/root/configs/db';
import articlesModel from '@/root/models/article';
import React from 'react'

async function page() {
    connectToDB();
    const myArticles = await articlesModel.find({})
   
    return (
      <div className='mt-28'>
        <BreadCrumb titles={"مقالات"} />
        <div className="my-4 p-4 place-items-center grid gap-x-4 gap-y-8 grid-cols-5 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {myArticles.map((item) =><ArticleBox key={item._id} article={JSON.parse(JSON.stringify(item))} />)}
        </div>
      </div>
  )
}

export default page
